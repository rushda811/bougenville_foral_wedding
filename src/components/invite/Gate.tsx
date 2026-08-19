import { useEffect, useMemo, useState } from "react";
import { art } from "@/lib/art";
import { invite } from "@/lib/invite-data";

/**
 * A living wall of hanging bougainvillea. Touching anywhere parts the strands
 * outward while the whole wall rushes past the viewer — walking through flowers.
 */
export function Gate({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);
  const [entered, setEntered] = useState(false);

  const strands = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: (i / 17) * 100,
        scale: 0.9 + ((i * 7) % 5) * 0.1,
        duration: 5.5 + ((i * 3) % 6) * 0.55,
        delay: ((i * 5) % 9) * 0.35,
        depth: (i % 3) - 1,
      })),
    [],
  );

  useEffect(() => {
    const id = window.setTimeout(() => setEntered(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    onOpen();
    window.setTimeout(() => setGone(true), 2800);
  };

  /** Transform/opacity-only entry classes — never affects layout. */
  const stagger = (_i = 0) =>
    `transition-[opacity,transform] duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
      entered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
    }`;
  const delay = (ms: number) => ({ transitionDelay: open ? "0ms" : `${ms}ms` });

  if (gone) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Touch anywhere to walk through the flowers"
      onClick={handleOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
      data-open={open}
      className="veil fixed inset-0 z-[70] cursor-pointer overflow-hidden select-none transition-opacity duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] data-[open=true]:pointer-events-none data-[open=true]:opacity-0"
      style={{ transitionDelay: open ? "1300ms" : "0ms", perspective: "1200px" }}
    >
      {/* floral wallpaper behind the hanging flowers (opening section only) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-out data-[in=true]:opacity-90"
        data-in={entered}
        style={{
          backgroundImage: `url(${art.paper.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />



      {/* hanging, swinging strands */}
<div
  data-open={open}
  className="
    absolute
    top-0
    left-1/2
    h-full
    w-[1000px]
    -translate-x-1/2
    transition-transform
    duration-[2400ms]
    ease-[cubic-bezier(0.65,0,0.35,1)]
    data-[open=true]:scale-[2.6]
  "
>
        {strands.map((s) => {
          const dir = s.left < 50 ? -1 : 1;
          return (
            <div
              key={s.id}
              data-open={open}
              data-in={entered}
              className="absolute -top-8 opacity-0 transition-[transform,opacity] duration-[2400ms] ease-[cubic-bezier(0.65,0,0.35,1)] data-[in=true]:opacity-100"
              style={{
                left: `${s.left}%`,
                transform: open
                  ? `translateX(${dir * (60 + Math.abs(50 - s.left) * 2.4)}vw) rotate(${dir * 22}deg)`
                  : entered
                    ? "translateY(0) rotate(0deg)"
                    : `translateY(-14%) rotate(${dir * 4}deg)`,
                transformOrigin: "top center",
                transitionDuration: open ? "2400ms" : "1500ms",
                transitionDelay: open
                  ? "0ms"
                  : `${Math.round(Math.abs(50 - s.left) * 8 + (s.id % 3) * 60)}ms`,
              }}
            >
              <img
                src={art.strand.src}
                alt=""
                width={art.strand.w}
                height={art.strand.h}
                decoding="async"
                fetchPriority="high"
                className="animate-sway-vine h-[96vh] w-auto max-w-none"
                style={{
                  translate: "-50% 0",
                  scale: `${s.scale}`,
                  animationDuration: `${s.duration}s`,
                  animationDelay: `-${s.delay}s`,
                  opacity: s.depth === 0 ? 1 : 0.75,
                  filter:
                    s.depth === -1
                      ? "blur(2px) saturate(0.9)"
                      : "drop-shadow(0 10px 24px oklch(0.36 0.1 12 / 0.18))",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* soft scrim keeping the monogram legible against the dense wall */}
      <span
        aria-hidden
        data-open={open}
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-700 data-[open=true]:opacity-0"
        style={{
          background:
            "radial-gradient(40% 27% at 50% 47%, oklch(0.985 0.014 90 / 0.94), oklch(0.985 0.014 90 / 0.45) 55%, transparent 78%)",
        }}
      />

      {/* golden dawn wash as the wall parts */}
      <span
        aria-hidden
        data-open={open}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-[1600ms] data-[open=true]:opacity-100"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, oklch(0.94 0.055 92 / 0.94), transparent 70%)",
        }}
      />

      {/* centre monogram */}
      <div
        data-open={open}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 text-center transition-all duration-[1100ms] ease-[cubic-bezier(0.19,1,0.22,1)] data-[open=true]:scale-[1.35] data-[open=true]:opacity-0"
      >
<p className={`gold-caps text-lg sm:text-xl ${stagger(0)}`} style={delay(500)}>
  An invitation awaits
</p>
        <span
          className={`relative mt-8 flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44 ${stagger(0)}`}
          style={delay(760)}
        >
          <span className="absolute inset-0 rounded-full border border-gold/70" />
          <span className="animate-pulse-ring absolute inset-0 rounded-full border border-gold/50" />
          <span
            className="animate-pulse-ring absolute inset-0 rounded-full border border-gold/40"
            style={{ animationDelay: "1.2s" }}
          />
          <span className="glass gold-glow absolute inset-3 rounded-full" />
          <span className="font-display text-gold relative text-4xl tracking-widest sm:text-5xl">
            {invite.brideInitial}
            <span className="font-script mx-1 text-2xl text-primary sm:text-3xl">&</span>
            {invite.groomInitial}
          </span>
        </span>

        <p
          className={`mt-9 text-sm font-semibold tracking-royal text-ink uppercase ${stagger(0)}`}
          style={delay(1080)}
        >
          Touch anywhere to enter
        </p>
        <span className={`rule-gold mt-5 w-24 ${stagger(0)}`} style={delay(1240)} />
        <span
          className={`mt-6 block h-12 w-px animate-pulse bg-gold ${stagger(0)}`}
          style={delay(1400)}
        />
      </div>
    </div>
  );
}
