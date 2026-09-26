import { createFileRoute } from "@tanstack/react-router";
import { PublicShell, PageHero } from "@/components/solan/public-shell";
import { Area, Btn, Field, Lab } from "@/components/solan/ui";
import { submitEnquiry } from "@/lib/solan/public";
import { useState } from "react";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [status, setStatus] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await submitEnquiry({
        data: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          message: String(fd.get("message") || ""),
        },
      });
      setStatus("Received. An operations lead will reply.");
      e.currentTarget.reset();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not send");
    }
  }
  return (
    <PublicShell>
      <PageHero kicker="Contact" title="Talk to Solan operations." image="/img/hero-farm.jpg" />
      <section className="mx-auto max-w-xl px-4 py-16">
        <form onSubmit={onSubmit} className="space-y-4">
          <div><Lab>Name</Lab><Field name="name" required /></div>
          <div><Lab>Email</Lab><Field name="email" type="email" required /></div>
          <div><Lab>Phone</Lab><Field name="phone" /></div>
          <div><Lab>Message</Lab><Area name="message" required /></div>
          <Btn variant="gold" type="submit">Send enquiry</Btn>
          {status ? <p className="text-sm text-leaf">{status}</p> : null}
        </form>
      </section>
    </PublicShell>
  );
}
