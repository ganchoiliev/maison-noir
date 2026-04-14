"use client";

import { useEffect, useState, useCallback } from "react";

const phrases = [
  "Covent Garden",
  "Seasonal",
  "Counter-Forward",
  "Twelve Courses",
  "Reservation Only",
];

export function Typewriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = phrases[index] ?? "";

    if (!deleting && displayed === current) {
      return; // pause handled by timeout in effect
    }

    if (deleting && displayed === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    setDisplayed(
      deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1),
    );
  }, [displayed, deleting, index]);

  useEffect(() => {
    const current = phrases[index] ?? "";
    const isPausing = !deleting && displayed === current;
    const speed = isPausing ? 2000 : deleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (isPausing) {
        setDeleting(true);
      } else {
        tick();
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, deleting, index, tick]);

  return (
    <span className="text-ember">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}
