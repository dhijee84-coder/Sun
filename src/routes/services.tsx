import { createFileRoute } from "@tanstack/react-router";
import { PublicShell, PageHero } from "@/components/solan/public-shell";
import { useEffect, useState } from "react";
import { getPublicSite } from "@/lib/solan/public";
import { inr } from "@/lib/solan/ids";

export const Route = createFileRoute("/services")({ component: Services });

function Services() {
  const [items, setItems] = useState<Awaited<ReturnType<typeof getPublicSite>>["services"]>([]);
  useEffect(() => { getPublicSite().then((s) => setItems(s.services)).catch(() => {}); }, []);
  return (
    <PublicShell>
      <PageHero kicker="Services" title="Farm operations included. Optional extras on request." image="/img/hero-farm.jpg" />
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-16 md:grid-cols-3">
        {items.map((s) => (
          <article key={s.id} className="rounded-lg border border-line bg-card p-6">
            <h3 className="font-display text-xl font-semibold">{s.name}</h3>
            <p className="mt-2 text-sm text-muted">{s.description}</p>
            <p className="mt-4 font-mono text-gold">{Number(s.base_price) ? inr(s.base_price) : "Included / on request"}</p>
          </article>
        ))}
      </section>
    </PublicShell>
  );
}
