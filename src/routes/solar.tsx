import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell, PageHero } from "@/components/solan/public-shell";
import { useEffect, useState } from "react";
import { getPublicSite } from "@/lib/solan/public";

export const Route = createFileRoute("/solar")({ component: Solar });

function Solar() {
  const [projects, setProjects] = useState<Awaited<ReturnType<typeof getPublicSite>>["projects"]>([]);
  useEffect(() => { getPublicSite().then((s) => setProjects(s.projects)).catch(() => {}); }, []);
  return (
    <PublicShell>
      <PageHero kicker="Our farms" title="Parks on open land, not rooftops." image="/img/hero-cells.jpg" />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="max-w-2xl text-muted">Every farm is owned and operated by Solan. Clients buy panels from live inventory. Nothing is installed on a house.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.id} className="rounded-lg border border-line bg-card p-6">
              <p className="font-mono text-xs text-gold">{p.project_code}</p>
              <h3 className="mt-1 font-display text-2xl font-semibold">{p.project_name}</h3>
              <p className="text-sm text-muted">{p.location} · {p.total_panels} panels · {Number(p.capacity_kw)} kW</p>
              <p className="mt-3 text-sm text-muted">{p.public_description}</p>
            </article>
          ))}
        </div>
        <Link to="/projects" className="mt-8 inline-block font-semibold text-sky no-underline">See public projects →</Link>
      </section>
    </PublicShell>
  );
}
