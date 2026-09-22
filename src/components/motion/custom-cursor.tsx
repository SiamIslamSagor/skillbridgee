"use client";

import { useEffect, useRef } from "react";
import { INTERACTIVE_SELECTOR } from "@/lib/cursor/constants";
import { magneticEngine } from "@/lib/cursor/magnetic-engine";
import { pointerTracker } from "@/lib/cursor/pointer-tracker";
import { stepSpring, type SpringState } from "@/lib/cursor/spring";
import { useCursorCapability } from "@/lib/cursor/use-cursor-capability";

const RING_SIZE = 36;
const RING_HOVER_SCALE = 1.8;
const RING_PRESS_SCALE = RING_HOVER_SCALE * 0.85;

const DOT_STIFFNESS = 0.22;
const DOT_DAMPING = 0.78;
const RING_STIFFNESS = 0.12;
const RING_DAMPING = 0.82;
const SCALE_STIFFNESS = 0.32;
const SCALE_DAMPING = 0.72;

/**
 * Awwwards-style custom cursor: a fixed dot + trailing ring, both driven by
 * a single rAF loop using spring interpolation (no per-frame React state).
 * Renders nothing on touch/coarse-pointer devices or with reduced motion.
 */
export function CustomCursor() {
  const enabled = useCursorCapability();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const dotX = useRef<SpringState>({ value: 0, velocity: 0 });
  const dotY = useRef<SpringState>({ value: 0, velocity: 0 });
  const ringX = useRef<SpringState>({ value: 0, velocity: 0 });
  const ringY = useRef<SpringState>({ value: 0, velocity: 0 });
  const ringScale = useRef<SpringState>({ value: 1, velocity: 0 });

  const isHovering = useRef(false);
  const isPressed = useRef(false);
  const prevHoverClass = useRef(false);
  const prevPressClass = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    pointerTracker.acquire();
    magneticEngine.start();
    magneticEngine.setEnabled(true);

    const resetHoverFromPoint = () => {
      const el = document.elementFromPoint(pointerTracker.x, pointerTracker.y);
      isHovering.current = !!el?.closest(INTERACTIVE_SELECTOR);
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) isHovering.current = true;
    };

    const onPointerOut = (event: PointerEvent) => {
      if (isPressed.current) return;
      const target = event.target as Element | null;
      if (!target?.closest(INTERACTIVE_SELECTOR)) return;
      const related = event.relatedTarget as Element | null;
      if (!related?.closest(INTERACTIVE_SELECTOR)) isHovering.current = false;
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) isPressed.current = true;
    };

    const onPointerRelease = () => {
      if (!isPressed.current) return;
      isPressed.current = false;
      resetHoverFromPoint();
    };

    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerRelease, { passive: true });
    window.addEventListener("pointercancel", onPointerRelease, {
      passive: true,
    });
    window.addEventListener("blur", onPointerRelease);

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      const { x, y } = pointerTracker;

      stepSpring(dotX.current, x, DOT_STIFFNESS, DOT_DAMPING);
      stepSpring(dotY.current, y, DOT_STIFFNESS, DOT_DAMPING);
      stepSpring(ringX.current, x, RING_STIFFNESS, RING_DAMPING);
      stepSpring(ringY.current, y, RING_STIFFNESS, RING_DAMPING);

      const targetScale = isPressed.current
        ? RING_PRESS_SCALE
        : isHovering.current
          ? RING_HOVER_SCALE
          : 1;
      stepSpring(
        ringScale.current,
        targetScale,
        SCALE_STIFFNESS,
        SCALE_DAMPING,
      );

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX.current.value.toFixed(2)}px, ${dotY.current.value.toFixed(2)}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.current.value.toFixed(2)}px, ${ringY.current.value.toFixed(2)}px, 0) translate(-50%, -50%) scale(${ringScale.current.value.toFixed(3)})`;

        if (prevHoverClass.current !== isHovering.current) {
          ringRef.current.classList.toggle("is-hover", isHovering.current);
          prevHoverClass.current = isHovering.current;
        }
        if (prevPressClass.current !== isPressed.current) {
          ringRef.current.classList.toggle("is-press", isPressed.current);
          prevPressClass.current = isPressed.current;
        }
      }
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      pointerTracker.release();
      magneticEngine.setEnabled(false);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerRelease);
      window.removeEventListener("pointercancel", onPointerRelease);
      window.removeEventListener("blur", onPointerRelease);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{ width: RING_SIZE, height: RING_SIZE }}
      />
    </>
  );
}
