"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(pointer: fine) and (hover: hover)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const pointerMedia = window.matchMedia(QUERY);
  const motionMedia = window.matchMedia(REDUCED_MOTION_QUERY);
  pointerMedia.addEventListener("change", callback);
  motionMedia.addEventListener("change", callback);
  return () => {
    pointerMedia.removeEventListener("change", callback);
    motionMedia.removeEventListener("change", callback);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia(QUERY).matches &&
    !window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

function getServerSnapshot() {
  return false;
}

/** True only on fine-pointer, hover-capable devices without reduced motion. */
export function useCursorCapability() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
