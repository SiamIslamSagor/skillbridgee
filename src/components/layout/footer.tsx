"use client";

import Link from "next/link";
import { useState } from "react";
import { footerLinks, socialLinks } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "./preloader";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-dark text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40"
        aria-hidden="true"
      />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex w-fit items-center">
              <Logo className="w-40" />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Bridging the gap between learning and opportunity, one practical
              skill at a time.
            </p>
            <ul className="flex gap-4 pt-2">
              {socialLinks.map(social => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Programs" links={footerLinks.programs} />
          <FooterColumn title="Resources" links={footerLinks.resources} />

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">
              Stay in the loop
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              Get program updates, career tips, and success stories in your
              inbox.
            </p>
            <form
              className="flex gap-2"
              onSubmit={event => {
                event.preventDefault();
                setSubscribed(true);
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="you@example.com"
                className="h-11 w-full min-w-0 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              <Button type="submit" size="sm" className="shrink-0">
                Subscribe
              </Button>
            </form>
            {subscribed ? (
              <p className="text-xs text-primary/80">
                You&apos;re on the list.
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} SkillBridge. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/80">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white/80">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {links.map(link => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
