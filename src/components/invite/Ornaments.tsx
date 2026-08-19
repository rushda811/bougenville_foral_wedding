import type { ReactNode } from "react";
import { art } from "@/lib/art";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Gilded filigree corners from the reference border, placed as a frame. */
export function GildedCorners({
  className,
  size = "w-24 sm:w-40",
  which = "all",
}: {
  className?: string;
  size?: string;
  which?: "all" | "top" | "bottom";
}) {
  const base = "pointer-events-none absolute opacity-85";
  const img = (extra: string, style?: React.CSSProperties) => (
    <img
      aria-hidden
      src={art.corner.src}
      alt=""
      width={art.corner.w}
      height={art.corner.h}
      loading="lazy"
      decoding="async"
      className={cn(base, size, extra)}
      style={style}
    />
  );
  return (
    <span className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      {which !== "bottom" && img("-top-2 -left-2")}
      {which !== "bottom" && img("-top-2 -right-2 -scale-x-100")}
      {which !== "top" && img("-bottom-2 -left-2 -scale-y-100")}
      {which !== "top" && img("-bottom-2 -right-2 rotate-180")}
    </span>
  );
}

/** A section divider: gold rules, diamonds and a hanging blossom sprig. */
export function BloomDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className="relative flex items-center justify-center py-14" aria-hidden>
      <span className="rule-gold w-16 sm:w-40" />
      <span className="mx-3 flex items-center gap-2">
        <span className="block h-1.5 w-1.5 rotate-45 bg-[image:var(--gradient-gold)]" />
        <img
          src={art.cluster.src}
          alt=""
          width={art.cluster.w}
          height={art.cluster.h}
          loading="lazy"
          decoding="async"
          className={cn("animate-drift w-24 sm:w-36", flip && "-scale-x-100")}
        />
        <span className="block h-1.5 w-1.5 rotate-45 bg-[image:var(--gradient-gold)]" />
      </span>
      <span className="rule-gold w-16 sm:w-40" />
    </div>
  );
}

/** Hanging birdcage lantern from the chinoiserie reference. */
export function HangingCage({
  className,
  width = "w-20 sm:w-28",
  delay = 0,
}: {
  className?: string;
  width?: string;
  delay?: number;
}) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute origin-top", className)}
      style={{ animationDelay: `-${delay}s` }}
    >
      <span className="animate-hang block" style={{ animationDelay: `-${delay}s` }}>
        <span className="mx-auto block h-10 w-px bg-[image:var(--gradient-gold)] sm:h-16" />
        <img
          src={art.cage.src}
          alt=""
          width={art.cage.w}
          height={art.cage.h}
          loading="lazy"
          decoding="async"
          className={cn("block", width)}
        />
      </span>
    </span>
  );
}

/** Soft cream wash used as a subtle section texture (no imagery). */
export function DamaskWash({ opacity = 0.16 }: { opacity?: number }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(80% 60% at 50% 40%, oklch(0.99 0.014 90 / 0.9), transparent 78%)",
        opacity,
      }}
    />
  );
}


/** A cusped-arch stationery panel: glass card, gilded edge, floral crown. */
export function ArchPanel({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Reveal variant="scale" className={cn("relative mx-auto w-full max-w-xl", className)}>
      <img
        aria-hidden
        src={art.cluster.src}
        alt=""
        width={art.cluster.w}
        height={art.cluster.h}
        loading="lazy"
        decoding="async"
        className="animate-drift pointer-events-none absolute -top-14 -left-10 w-40 sm:-top-20 sm:-left-24 sm:w-64"
      />
      <img
        aria-hidden
        src={art.cluster.src}
        alt=""
        width={art.cluster.w}
        height={art.cluster.h}
        loading="lazy"
        decoding="async"
        className="animate-drift pointer-events-none absolute -right-10 -bottom-14 w-36 -scale-x-100 sm:-right-24 sm:-bottom-20 sm:w-56"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className={cn(
          "arch-mask relative overflow-hidden px-7 pt-16 pb-12 text-center sm:px-12 sm:pt-24 sm:pb-16",
          tone === "dark" ? "glass-dark" : "glass",
        )}
      >
        <span
          aria-hidden
          className="arch-mask pointer-events-none absolute inset-2 border border-gold/45"
        />
        {children}
      </div>
    </Reveal>
  );
}
