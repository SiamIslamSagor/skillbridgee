"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { Button, IconButton } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", latest => {
    setScrolled(latest > 24);
  });

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md shadow-[0_1px_0_0_rgba(15,23,42,0.04)]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container>
          <nav
            className="flex h-[4.5rem] items-center justify-between py-4"
            aria-label="Primary"
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                SB
              </span>
              SkillBridge
            </Link>

            <ul className="hidden items-center gap-8 md:flex">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Button href={link.href} variant="navigation" size="sm">
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />
              <Button href="/contact" size="sm" variant={"arrow"}>
                Get Started
              </Button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <IconButton
                aria-label="Open menu"
                aria-expanded={isMobileOpen}
                onClick={() => setIsMobileOpen(true)}
              >
                <Menu className="size-6" aria-hidden="true" />
              </IconButton>
            </div>
          </nav>
        </Container>
      </header>

      <AnimatePresence>
        {isMobileOpen ? (
          <MobileMenu onClose={() => setIsMobileOpen(false)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col bg-dark text-white md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <Container className="flex items-center justify-between py-6">
        <span className="text-lg font-semibold">SkillBridge</span>
        <IconButton
          variant="ghost"
          className="text-white hover:bg-white/10 hover:text-white"
          aria-label="Close menu"
          onClick={onClose}
        >
          <X className="size-6" aria-hidden="true" />
        </IconButton>
      </Container>

      <motion.ul
        className="flex flex-1 flex-col justify-center gap-2 px-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.06, delayChildren: 0.1 },
          },
        }}
      >
        {navLinks.map(link => (
          <motion.li
            key={link.href}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: EASE },
              },
            }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="block py-3 text-3xl font-semibold tracking-tight text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      <Container className="pb-10">
        <Button
          href="/contact"
          variant="light"
          size="lg"
          className="w-full"
          onClick={onClose}
        >
          Get Started
        </Button>
      </Container>
    </motion.div>
  );
}
