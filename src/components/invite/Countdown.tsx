import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { GildedCorners } from "./Ornaments";
import { art } from "@/lib/art";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

/** A gilded reliquary clock: glass cusped-arch cells under a floral crown. */
export function Countdown({ date }: { date: string }) {
  const target = new Date(date).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = window.setInterval(() => setT(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const cells: Array<[string, number]> = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ];

  return (
    <div className="relative mx-auto max-w-3xl px-3 sm:px-10">
      {/* floral crown above the clock */}
      <img
        aria-hidden
        src={art.cluster.src}
        alt=""
        width={art.cluster.w}
        height={art.cluster.h}
        loading="lazy"
        decoding="async"
        className="animate-drift pointer-events-none absolute -top-16 left-1/2 w-56 -translate-x-1/2 sm:-top-24 sm:w-80"
      />

      <div className="glass lux-shadow relative overflow-hidden px-3 py-10 sm:px-10 sm:py-14">
        <GildedCorners size="w-16 sm:w-28" />
        <span aria-hidden className="pointer-events-none absolute inset-3 border border-gold/35" />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 silk opacity-60"
        />


        <div className="relative flex items-stretch justify-center gap-1.5 sm:gap-4">
          {cells.map(([label, value], i) => (
            <Reveal
              key={label}
              variant="scale"
              delay={i * 140}
              className="flex items-center gap-1.5 sm:gap-4"
            >
              <div className="arch-cusp relative w-[66px] bg-card/45 px-1 pt-5 pb-4 text-center sm:w-[110px] sm:pt-8 sm:pb-6">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden opacity-70"
                >
                  <span
                    className="absolute inset-y-0 -left-1/3 block w-1/3 bg-gradient-to-r from-transparent via-gold-light to-transparent"
                    style={{ animation: `shimmer-sweep 6s ${i * 0.8}s ease-in-out infinite` }}
                  />
                </span>
                <div className="font-display text-gold text-4xl leading-none tabular-nums sm:text-6xl">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="mx-auto mt-3 h-px w-6 bg-[image:var(--gradient-gold)] sm:w-10" />
                <div className="mt-2.5 text-[8px] tracking-[0.28em] text-muted-foreground uppercase sm:text-[10px]">
                  {label}
                </div>
              </div>
              {i < cells.length - 1 && (
                <span
                  aria-hidden
                  className="-mt-6 block h-1.5 w-1.5 rotate-45 bg-[image:var(--gradient-gold)]"
                />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
