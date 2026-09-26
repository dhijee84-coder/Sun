import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell, PageHero } from "@/components/solan/public-shell";

export const Route = createFileRoute("/how-it-works")({ component: How });

const STEPS = [
  ["Buy panels", "Choose capacity from a live Solan farm. Serials are reserved from available stock."],
  ["We commission", "Solan installs, inspects and interconnects on our land. You never host hardware."],
  ["Track generation", "The client portal shows daily kWh from your strings."],
  ["Pay for usage", "Billing follows actual generation, not a rooftop estimate."],
  ["We maintain", "Cleaning, warranty and replacements stay with Solan operations."],
];

function How() {
  return (
    <PublicShell>
      <PageHero kicker="How it works" title="Four steps from purchase to usage billing." image="/img/hero-plant.jpg" />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <ol className="space-y-6">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="flex gap-4">
              <span className="font-display text-2xl font-semibold text-gold">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-xl font-semibold">{t}</h3>
                <p className="mt-1 text-muted">{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link to="/login" className="mt-10 inline-flex min-h-11 items-center rounded-md bg-gold px-5 py-2 font-semibold text-bg no-underline">Open client portal</Link>
      </section>
    </PublicShell>
  );
}
