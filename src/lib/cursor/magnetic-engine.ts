"use client";

import { MAGNETIC_SELECTOR } from "./constants";
import { pointerTracker } from "./pointer-tracker";
import { springIsSettled, stepSpring, type SpringState } from "./spring";

const DEFAULT_STRENGTH = 1;
const DEFAULT_MAX_DISPLACEMENT = 56;
const STIFFNESS = 0.45;
const DAMPING = 0.76;

interface MagneticEntry {
  el: HTMLElement;
  rect: DOMRect;
  strength: number;
  maxDisplacement: number;
  x: SpringState;
  y: SpringState;
  settled: boolean;
}

function readNumberAttr(el: HTMLElement, attr: string, fallback: number) {
  const raw = el.getAttribute(attr);
  const parsed = raw ? Number.parseFloat(raw) : NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * Singleton engine that auto-discovers `.magnetic` / `[data-magnetic]`
 * elements anywhere in the DOM (including ones rendered later) and animates
 * them toward the pointer with clamped, spring-damped displacement.
 * All per-frame work happens outside React (no re-renders).
 */
class MagneticEngine {
  private entries = new Map<HTMLElement, MagneticEntry>();
  private observer: MutationObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private rafId: number | null = null;
  private enabled = false;
  private started = false;
  private scrollDirty = true;

  start() {
    if (this.started || typeof window === "undefined") return;
    this.started = true;
    this.enabled = true;
    pointerTracker.acquire();

    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const found = this.entries.get(entry.target as HTMLElement);
        if (found) found.rect = entry.target.getBoundingClientRect();
      }
    });

    document.querySelectorAll<HTMLElement>(MAGNETIC_SELECTOR).forEach(el => {
      this.register(el);
    });

    this.observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach(node => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(MAGNETIC_SELECTOR)) this.register(node);
          node
            .querySelectorAll<HTMLElement>(MAGNETIC_SELECTOR)
            .forEach(el => this.register(el));
        });
        mutation.removedNodes.forEach(node => {
          if (!(node instanceof HTMLElement)) return;
          if (this.entries.has(node)) this.unregister(node);
          node
            .querySelectorAll<HTMLElement>(MAGNETIC_SELECTOR)
            .forEach(el => this.unregister(el));
        });
        if (
          mutation.type === "attributes" &&
          mutation.target instanceof HTMLElement
        ) {
          const el = mutation.target;
          const matches = el.matches(MAGNETIC_SELECTOR);
          if (matches && !this.entries.has(el)) this.register(el);
          if (!matches && this.entries.has(el)) this.unregister(el);
        }
      }
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "data-magnetic"],
    });

    window.addEventListener("scroll", this.markScrollDirty, { passive: true });
    window.addEventListener("resize", this.markScrollDirty);

    this.ensureLoopRunning();
  }

  stop() {
    if (!this.started) return;
    this.started = false;
    pointerTracker.release();
    this.observer?.disconnect();
    this.resizeObserver?.disconnect();
    window.removeEventListener("scroll", this.markScrollDirty);
    window.removeEventListener("resize", this.markScrollDirty);
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
    for (const el of this.entries.keys()) this.unregister(el);
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      for (const entry of this.entries.values()) {
        entry.x.value = 0;
        entry.x.velocity = 0;
        entry.y.value = 0;
        entry.y.velocity = 0;
        entry.settled = true;
        entry.el.style.transform = "";
      }
    }
  }

  private register(el: HTMLElement) {
    if (this.entries.has(el)) return;
    const entry: MagneticEntry = {
      el,
      rect: el.getBoundingClientRect(),
      strength: readNumberAttr(el, "data-magnetic-strength", DEFAULT_STRENGTH),
      maxDisplacement: readNumberAttr(
        el,
        "data-magnetic-max",
        DEFAULT_MAX_DISPLACEMENT,
      ),
      x: { value: 0, velocity: 0 },
      y: { value: 0, velocity: 0 },
      settled: true,
    };
    el.style.willChange = "transform";
    this.entries.set(el, entry);
    this.resizeObserver?.observe(el);
    this.ensureLoopRunning();
  }

  private unregister(el: HTMLElement) {
    const entry = this.entries.get(el);
    if (!entry) return;
    this.resizeObserver?.unobserve(el);
    el.style.transform = "";
    el.style.willChange = "";
    this.entries.delete(el);
  }

  private markScrollDirty = () => {
    this.scrollDirty = true;
  };

  private ensureLoopRunning() {
    if (this.rafId === null && this.started) {
      this.rafId = requestAnimationFrame(this.loop);
    }
  }

  private refreshRects() {
    for (const entry of this.entries.values()) {
      entry.rect = entry.el.getBoundingClientRect();
    }
    this.scrollDirty = false;
  }

  private loop = () => {
    if (this.scrollDirty) this.refreshRects();

    const { x: pointerX, y: pointerY, hasMoved } = pointerTracker;

    for (const entry of this.entries.values()) {
      let targetX = 0;
      let targetY = 0;

      // Only engage once the pointer is actually over the element — the
      // same condition that flips the cursor to "pointer" for a click.
      const withinBounds =
        pointerX >= entry.rect.left &&
        pointerX <= entry.rect.right &&
        pointerY >= entry.rect.top &&
        pointerY <= entry.rect.bottom;

      if (this.enabled && hasMoved && withinBounds) {
        const centerX = entry.rect.left + entry.rect.width / 2;
        const centerY = entry.rect.top + entry.rect.height / 2;
        const dx = pointerX - centerX;
        const dy = pointerY - centerY;

        let x = dx * entry.strength;
        let y = dy * entry.strength;
        const magnitude = Math.hypot(x, y);
        if (magnitude > entry.maxDisplacement) {
          const scale = entry.maxDisplacement / magnitude;
          x *= scale;
          y *= scale;
        }
        targetX = x;
        targetY = y;
      }

      if (
        entry.settled &&
        targetX === 0 &&
        targetY === 0 &&
        entry.x.value === 0 &&
        entry.y.value === 0
      ) {
        continue;
      }

      stepSpring(entry.x, targetX, STIFFNESS, DAMPING);
      stepSpring(entry.y, targetY, STIFFNESS, DAMPING);

      entry.settled =
        springIsSettled(entry.x, targetX) && springIsSettled(entry.y, targetY);

      if (entry.settled && targetX === 0 && targetY === 0) {
        entry.x.value = 0;
        entry.y.value = 0;
        entry.el.style.transform = "";
      } else {
        entry.el.style.transform = `translate3d(${entry.x.value.toFixed(2)}px, ${entry.y.value.toFixed(2)}px, 0)`;
      }
    }

    if (this.entries.size > 0) {
      this.rafId = requestAnimationFrame(this.loop);
    } else {
      this.rafId = null;
    }
  };
}

export const magneticEngine = new MagneticEngine();
