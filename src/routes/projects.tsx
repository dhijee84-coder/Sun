import { createFileRoute } from "@tanstack/react-router";
import { PublicShell, PageHero } from "@/components/solan/public-shell";
import { useEffect, useState } from "react";
import { getPublicSite } from "@/lib/solan/public";

export const Route = createFileRoute("/projects")({ component: Projects });

function Projects() {
  const [projects, setProjects] = useState<Awaited<ReturnType<typeof getPublicSite>>["projects"]>([]);
  useEffect(() => { getPublicSite().then((s) => setProjects(s.projects)).catch(() => {}); }, []);
  return (
    <PublicShell>
      <PageHero kicker="Projects" title="Public farms you can buy into." image="/img/hero-farm.jpg" />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="mb-8 max-w-xl text-muted">Only parks marked public appear here. Private expansion sites stay off the marketing site.</p>
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-card font-mono text-[11px] tracking-wider text-muted uppercase">
              <tr>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Farm</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Capacity</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-line">
                  <td className="px-4 py-3 font-mono text-gold">{p.project_code}</td>
                  <td className="px-4 py-3">{p.project_name}</td>
                  <td className="px-4 py-3 text-muted">{p.location}</td>
                  <td className="px-4 py-3">{Number(p.capacity_kw)} kW · {p.total_panels} panels</td>
                  <td className="px-4 py-3">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PublicShell>
  );
}
