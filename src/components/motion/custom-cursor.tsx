"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { INTERACTIVE_SELECTOR } from "@/lib/cursor/constants";
import { useCursorCapability } from "@/lib/cursor/use-cursor-capability";

const RING_SIZE = 36;
const RING_HOVER_SCALE = 1.8;
const RING_PRESS_SCALE = RING_HOVER_SCALE * 0.85;

// Dot: tight and responsive — just enough smoothing to remove micro-jitter.
const DOT_SPRING = { stiffness: 700, damping: 40, mass: 0.35 };
// Ring: floaty trailing spring for the premium "follows the dot" feel.
const RING_SPRING = { stiffness: 110, damping: 16, mass: 0.7 };
// Scale: bouncier spring so hover/press transitions feel elastic.
const SCALE_SPRING = { stiffness: 320, damping: 16, mass: 0.4 };

/**
 * Awwwards-style custom cursor: a fixed dot + trailing ring built on top of
 * the project's existing `motion` springs (no React state per frame — the
 * raw pointer position and hover/press target feed motion values directly).
 * Renders nothing on touch/coarse-pointer devices or with reduced motion.
 */
export function CustomCursor() {
  const enabled = useCursorCapability();
  const ringRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const dotX = useSpring(pointerX, DOT_SPRING);
  const dotY = useSpring(pointerY, DOT_SPRING);
  const ringX = useSpring(pointerX, RING_SPRING);
  const ringY = useSpring(pointerY, RING_SPRING);

  const scaleTarget = useMotionValue(1);
  const ringScale = useSpring(scaleTarget, SCALE_SPRING);

  const isHovering = useRef(false);
  const isPressed = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const applyScaleTarget = () => {
      scaleTarget.set(
        isPressed.current
          ? RING_PRESS_SCALE
          : isHovering.current
            ? RING_HOVER_SCALE
            : 1,
      );
    };

    const setHover = (value: boolean) => {
      if (isHovering.current === value) return;
      isHovering.current = value;
      ringRef.current?.classList.toggle("is-hover", value);
      applyScaleTarget();
    };

    const setPressed = (value: boolean) => {
      if (isPressed.current === value) return;
      isPressed.current = value;
      ringRef.current?.classList.toggle("is-press", value);
      applyScaleTarget();
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) setHover(true);
    };

    const onPointerOut = (event: PointerEvent) => {
      if (isPressed.current) return;
      const target = event.target as Element | null;
      if (!target?.closest(INTERACTIVE_SELECTOR)) return;
      const related = event.relatedTarget as Element | null;
      if (!related?.closest(INTERACTIVE_SELECTOR)) setHover(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) setPressed(true);
    };

    const onPointerRelease = () => {
      if (!isPressed.current) return;
      setPressed(false);
      const el = document.elementFromPoint(pointerX.get(), pointerY.get());
      setHover(!!el?.closest(INTERACTIVE_SELECTOR));
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerRelease, { passive: true });
    window.addEventListener("pointercancel", onPointerRelease, {
      passive: true,
    });
    window.addEventListener("blur", onPointerRelease);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerRelease);
      window.removeEventListener("pointercancel", onPointerRelease);
      window.removeEventListener("blur", onPointerRelease);
    };
  }, [enabled, pointerX, pointerY, scaleTarget]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="cursor-dot -translate-x-1/2 -translate-y-1/2"
        style={{ x: dotX, y: dotY }}
        aria-hidden="true"
      />
      <motion.div
        ref={ringRef}
        className="cursor-ring -translate-x-1/2 -translate-y-1/2"
        style={{
          x: ringX,
          y: ringY,
          scale: ringScale,
          width: RING_SIZE,
          height: RING_SIZE,
        }}
        aria-hidden="true"
      />
    </>
  );
}
