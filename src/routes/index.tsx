import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/solan/public-shell";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

const SLIDES = [
  { image: "/img/hero-farm.jpg", heading: "You buy the panels. We run the farm.", desc: "Solan builds solar parks on open land. Clients purchase panels there. We install, maintain and operate everything — and you pay for the energy those panels generate." },
  { image: "/img/hero-cells.jpg", heading: "Serial-tracked modules. Fair allocation.", desc: "Every panel has a warranty life and a farm string. Capacity is allocated from live inventory — not from a rooftop survey." },
  { image: "/img/hero-plant.jpg", heading: "Energy billed on usage.", desc: "Watch daily generation from your panels. Pay for the kilowatt-hours they actually produce." },
];

function Home() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);
  const slide = SLIDES[i];

  return (
    <PublicShell>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#0f172a] text-white">
        {SLIDES.map((s, n) => (
          <img
            key={s.image}
            src={s.image}
            alt=""
            fetchPriority={n === 0 ? "high" : "low"}
            decoding={n === 0 ? "sync" : "async"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${n === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/45 to-transparent" />
        <div className="hero-copy relative z-10 max-w-xl px-8 py-20 md:px-16">
          <p className="font-mono text-[11px] font-bold tracking-[0.16em] text-gold uppercase">Solan</p>
          <h1 className="mt-3 font-display text-5xl leading-[1.05] font-semibold tracking-tight">{slide.heading}</h1>
          <p className="mt-5 text-lg text-white/90">{slide.desc}</p>
          <Link to="/login" className="mt-6 inline-flex min-h-11 items-center rounded-sm bg-ember px-6 py-3 text-sm font-bold text-bg no-underline">Buy panels</Link>
        </div>
        <button type="button" aria-label="Previous" className="absolute top-1/2 left-4 z-10 size-10 -translate-y-1/2 rounded-full bg-white/15 text-2xl text-white" onClick={() => setI((n) => (n + SLIDES.length - 1) % SLIDES.length)}>‹</button>
        <button type="button" aria-label="Next" className="absolute top-1/2 right-4 z-10 size-10 -translate-y-1/2 rounded-full bg-white/15 text-2xl text-white" onClick={() => setI((n) => (n + 1) % SLIDES.length)}>›</button>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
        <img src="/img/hero-farm.jpg" alt="Solan solar farm on open land" width={1400} height={787} loading="lazy" decoding="async" className="aspect-4/3 w-full rounded-md bg-[#1e293b] object-cover" />
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-sky uppercase">Who we are</p>
          <h2 className="mt-2 font-display text-4xl font-medium">Solan</h2>
          <p className="mt-4 text-muted">Solan is not a rooftop installer. We develop solar farms on empty land, sell panel capacity to clients, and keep the plant running. Your panels stay on our site. Your portal shows generation, usage billing, warranty and support.</p>
          <p className="mt-3 text-muted">No work on your house. No roof mounting. We own the land and the operations. You own the panels and the energy they produce.</p>
          <Link to="/about" className="mt-4 inline-block font-bold text-sky no-underline">Know more →</Link>
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-sky uppercase">The model</p>
            <h2 className="mt-2 font-display text-4xl font-medium">Energy billed on usage</h2>
            <p className="mt-4 text-muted">Buy a block of panels at a Solan farm. We commission and maintain them. You see daily generation and pay for the energy those panels actually produce.</p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div><strong className="block">Our land</strong><span className="text-sm text-muted">Farms on open sites</span></div>
              <div><strong className="block">Your panels</strong><span className="text-sm text-muted">Purchased capacity</span></div>
              <div><strong className="block">Our ops</strong><span className="text-sm text-muted">Install + maintenance</span></div>
            </div>
          </div>
          <img src="/img/hero-plant.jpg" alt="Solan plant operations" width={1400} height={787} loading="lazy" decoding="async" className="w-full rounded-md bg-[#1e293b] object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="font-mono text-[11px] tracking-[0.16em] text-sky uppercase">What we do</p>
        <h2 className="mt-2 font-display text-4xl font-medium">Farm-side solar, end to end</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ["/img/hero-cells.jpg", "Panel sales", "Buy serial-tracked modules from live farm inventory.", "/solar"],
            ["/img/hero-farm.jpg", "Farm operations", "We install, inspect, connect and maintain every panel on our land.", "/how-it-works"],
            ["/img/hero-plant.jpg", "Usage billing", "Track generation from your panels and pay for the energy used.", "/login"],
          ].map(([img, t, d, href]) => (
            <article key={t} className="overflow-hidden rounded-lg border border-line bg-card">
              <img src={img} alt="" width={1400} height={787} loading="lazy" decoding="async" className="aspect-video w-full bg-[#1e293b] object-cover" />
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted">{d}</p>
                <a href={href} className="mt-3 inline-block text-sm font-semibold text-sky no-underline">Learn more →</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
