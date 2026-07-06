"use client";

/**
 * ContactForm — sends messages via Web3Forms (https://web3forms.com), a
 * free service built for static sites: the browser POSTs straight to their
 * API and they email the message to the business. No backend needed.
 *
 * WHY "use client": this is the one interactive island on the page — it
 * tracks typing/sending/sent state, which requires React state in the
 * browser. Everything around it stays zero-JS static HTML.
 *
 * GRACEFUL DEGRADATION: if NEXT_PUBLIC_WEB3FORMS_KEY is empty at build
 * time, the form renders disabled with a clear "demo mode" notice instead
 * of failing silently when someone hits Send. (The key is public by design
 * — Web3Forms keys are meant to be exposed in frontend code.)
 */

import { useState } from "react";
import { siteConfig } from "@/lib/site.config";
import { WEB3FORMS_KEY } from "@/lib/env";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const enabled = Boolean(WEB3FORMS_KEY);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stop the browser's full-page form submit
    const formElement = event.currentTarget; // capture before any `await`
    setStatus("sending");

    // access_key and subject are already in the form as hidden inputs
    // (so the no-JS fallback works too) — FormData picks them up.
    const formData = new FormData(formElement);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        formElement.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-neutral-900 " +
    "placeholder:text-neutral-400 focus:border-primary focus:outline-none " +
    "focus:ring-2 focus:ring-primary/30 disabled:bg-neutral-100";

  return (
    // action/method make the form work even before React hydrates (or with
    // JS disabled): the browser then POSTs directly to Web3Forms, which
    // shows its own thank-you page. With JS, handleSubmit takes over.
    <form
      onSubmit={handleSubmit}
      action="https://api.web3forms.com/submit"
      method="POST"
      className="space-y-4"
    >
      <h3 className="font-bold text-primary">Send us a message</h3>

      {/* Hidden fields Web3Forms needs — present in the static HTML so the
          no-JS fallback submit carries them too. */}
      <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
      <input
        type="hidden"
        name="subject"
        value={`New website message — ${siteConfig.business.name}`}
      />

      {/* Demo-mode notice — shown only when no Web3Forms key is configured. */}
      {!enabled && (
        <p className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-3 text-sm text-neutral-600">
          <strong>Demo mode:</strong> the contact form is disabled because no
          Web3Forms key is configured. Add{" "}
          <code className="text-xs">NEXT_PUBLIC_WEB3FORMS_KEY</code> to your
          env and rebuild to activate it.
        </p>
      )}

      {/* Honeypot: invisible to humans, bots fill it in and Web3Forms
          discards those submissions. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          disabled={!enabled}
          placeholder="Your name"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          disabled={!enabled}
          placeholder="you@example.com"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          disabled={!enabled}
          rows={4}
          placeholder="How can we help?"
          className={inputClasses}
        />
      </div>

      <button
        type="submit"
        disabled={!enabled || status === "sending"}
        className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>

      {/* Post-submit feedback. aria-live announces it to screen readers. */}
      <p aria-live="polite" className="min-h-5 text-sm">
        {status === "success" && (
          <span className="font-medium text-green-700">
            Thanks! Your message has been sent — we&apos;ll get back to you soon.
          </span>
        )}
        {status === "error" && (
          <span className="font-medium text-red-700">
            Something went wrong. Please try again, or call us instead.
          </span>
        )}
      </p>
    </form>
  );
}
