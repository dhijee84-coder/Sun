import { createFileRoute } from "@tanstack/react-router";
import { PublicShell, PageHero } from "@/components/solan/public-shell";
import { useEffect, useState } from "react";
import { getPublicSite } from "@/lib/solan/public";

export const Route = createFileRoute("/faq")({ component: Faq });

function Faq() {
  const [faqs, setFaqs] = useState<Awaited<ReturnType<typeof getPublicSite>>["faqs"]>([]);
  useEffect(() => { getPublicSite().then((s) => setFaqs(s.faqs)).catch(() => {}); }, []);
  return (
    <PublicShell>
      <PageHero kicker="FAQ" title="Straight answers about farm-side solar." image="/img/hero-plant.jpg" />
      <section className="mx-auto max-w-3xl px-4 py-16">
        {faqs.map((f) => (
          <details key={f.id} className="border-b border-line py-4">
            <summary className="cursor-pointer font-semibold">{f.question}</summary>
            <p className="mt-2 text-muted">{f.answer}</p>
          </details>
        ))}
      </section>
    </PublicShell>
  );
}
