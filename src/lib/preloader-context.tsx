"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const PreloaderReadyContext = createContext<boolean>(false);
const SetPreloaderReadyContext = createContext<(() => void) | null>(null);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  return (
    <SetPreloaderReadyContext value={() => setIsReady(true)}>
      <PreloaderReadyContext value={isReady}>{children}</PreloaderReadyContext>
    </SetPreloaderReadyContext>
  );
}

/** True once the preloader has fully exited and page content is visible. */
export function usePreloaderReady() {
  return useContext(PreloaderReadyContext);
}

/** Call once the preloader's exit animation finishes. */
export function useMarkPreloaderReady() {
  const markReady = useContext(SetPreloaderReadyContext);
  if (!markReady) {
    throw new Error(
      "useMarkPreloaderReady must be used within a PreloaderProvider",
    );
  }
  return markReady;
}
