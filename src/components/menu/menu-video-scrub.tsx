"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 156;

function frameSrc(i: number): string {
  return `/frames/frame-${String(Math.max(1, Math.min(i, TOTAL_FRAMES))).padStart(4, "0")}.jpg`;
}

export function MenuVideoScrub() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const frameRef = useRef(1);

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded >= TOTAL_FRAMES) setReady(true);
      };
    }
  }, []);

  // Native scroll + rAF loop — works with Lenis
  const onScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section || !ready) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportH = window.innerHeight;
    const scrolled = -rect.top;
    const scrollRange = sectionHeight - viewportH;
    const p = Math.max(0, Math.min(1, scrolled / scrollRange));

    setProgress(p);

    const frame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(p * (TOTAL_FRAMES - 1)) + 1));
    if (frame !== frameRef.current && imgRef.current) {
      frameRef.current = frame;
      imgRef.current.src = frameSrc(frame);
    }
  }, [ready]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    let rafId: number;
    const loop = () => {
      onScroll();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [onScroll]);

  const textVisible = progress > 0.65;

  return (
    <div ref={sectionRef} style={{ height: "250vh" }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-ink">
        {/* Loading */}
        {!ready && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-ink">
            <div className="h-px w-20 overflow-hidden bg-border">
              <div className="h-full animate-pulse bg-brass/60" style={{ width: "60%" }} />
            </div>
          </div>
        )}

        {/* Frame image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={frameSrc(1)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: "contrast(1.2) brightness(0.55)",
          }}
        />

        {/* Top gradient — fades from previous section */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink to-transparent" />
        {/* Bottom gradient — fades into next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
        {/* Side vignette */}
        <div className="vignette" />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          {/* Scroll prompt — fades out as you scroll */}
          <div
            className="transition-all duration-500"
            style={{
              opacity: progress < 0.15 ? 1 : 0,
              transform: `translateY(${progress < 0.15 ? 0 : -20}px)`,
            }}
          >
            <p className="small-caps text-xs tracking-[0.25em] text-bone/30">Scroll to pour</p>
            <div className="mx-auto mt-4 flex h-8 w-5 items-start justify-center rounded-full border border-bone/15 p-1">
              <div className="h-1.5 w-0.5 animate-bounce rounded-full bg-bone/30" />
            </div>
          </div>

          {/* Wine text — fades in at the end */}
          <div
            className="absolute inset-x-0 transition-all duration-700"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: `translateY(${textVisible ? 0 : 25}px)`,
            }}
          >
            <div className="mx-auto mb-4 h-px w-12 bg-brass/40" />
            <p className="small-caps text-xs tracking-[0.2em] text-brass md:text-sm">
              From the Cellar
            </p>
            <h2 className="mt-3 font-display text-3xl text-bone md:text-5xl">
              Wine &amp; Beverages
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-xs text-bone/40 md:max-w-md md:text-sm">
              Curated by Head Sommelier Elena Voss to complement every course.
            </p>
          </div>
        </div>

        {/* Progress rail — right side, responsive positioning */}
        <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2 md:right-8">
          <div className="h-20 w-px bg-bone/8 md:h-32">
            <div
              className="w-full bg-brass/50 transition-[height] duration-75"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
