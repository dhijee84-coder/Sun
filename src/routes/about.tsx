import { createFileRoute } from "@tanstack/react-router";
import { PublicShell, PageHero } from "@/components/solan/public-shell";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <PublicShell>
      <PageHero kicker="About us" title="Open land. Company farms. Client-owned panels." image="/img/hero-farm.jpg" />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-lg text-muted">Solan develops solar parks on empty land. We do not mount anything on houses. You purchase panels at a Solan farm. We install, maintain, insure and operate them. You pay for the energy those panels generate.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            ["Land", "We acquire and operate farm sites."],
            ["Panels", "You buy serial-tracked capacity."],
            ["Energy", "Usage billing from live generation."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg border border-line bg-card p-5">
              <h3 className="font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
