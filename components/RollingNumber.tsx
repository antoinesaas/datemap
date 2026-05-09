"use client";

import { useEffect, useState } from "react";

function RollingDigit({
  target,
  delayMs,
  run,
}: {
  target: number;
  delayMs: number;
  run: boolean;
}) {
  const d = Math.min(9, Math.max(0, target));
  return (
    <span className="relative inline-block h-[1.2em] min-w-[0.58em] overflow-hidden align-baseline">
      <span
        className="flex flex-col transition-[transform] duration-[1.15s] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: run ? `translateY(calc(-${d} * 1.2em))` : "translateY(0)",
          transitionDelay: `${delayMs}ms`,
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className="flex h-[1.2em] shrink-0 items-center justify-center leading-none tabular-nums"
          >
            {i}
          </span>
        ))}
      </span>
    </span>
  );
}

/** Affiche un entier avec un léger effet « compteur » qui défile chiffre par chiffre. */
export function RollingNumber({ value }: { value: number | null }) {
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (value == null) return;
    setRun(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setRun(true));
    });
    return () => cancelAnimationFrame(id);
  }, [value]);

  if (value == null) {
    return <span className="tabular-nums">…</span>;
  }

  const digits = String(value)
    .split("")
    .map((c) => Number.parseInt(c, 10));

  return (
    <span className="inline-flex items-baseline tabular-nums">
      {digits.map((d, i) => (
        <RollingDigit
          key={`${value}-${i}-${digits.length}`}
          target={Number.isFinite(d) ? d : 0}
          delayMs={i * 75}
          run={run}
        />
      ))}
    </span>
  );
}
