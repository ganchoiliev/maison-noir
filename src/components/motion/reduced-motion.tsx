"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

const ReducedMotionContext = createContext(false);

export function useReducedMotion() {
  return useContext(ReducedMotionContext);
}

function subscribe(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <ReducedMotionContext.Provider value={prefersReduced}>{children}</ReducedMotionContext.Provider>
  );
}
