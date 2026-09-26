#!/bin/sh
# Start Solan (TanStack Start) on 0.0.0.0:8080 for the live preview.
set -eu
cd /workspace

is_up() { curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; }

vite_running() {
  for d in /proc/[0-9]*; do
    cmd=$(tr '\0' ' ' < "$d/cmdline" 2>/dev/null || true)
    echo "$cmd" | grep -q "vite" || continue
    echo "$cmd" | grep -q "dev" && return 0
  done
  return 1
}

if is_up; then
  if vite_running; then
    exit 0
  fi
  for d in /proc/[0-9]*; do
    cmd=$(tr '\0' ' ' < "$d/cmdline" 2>/dev/null || true)
    echo "$cmd" | grep -q "uvicorn" || continue
    pid=${d#/proc/}
    kill "$pid" 2>/dev/null || true
  done
  sleep 1
fi

if is_up && vite_running; then
  exit 0
fi

npm run dev > /tmp/solan-dev.log 2>&1 &
i=0
while [ "$i" -lt 30 ]; do
  if is_up; then
    exit 0
  fi
  i=$((i + 1))
  sleep 1
done
exit 0
