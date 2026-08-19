const PETALS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 6.4 + (i % 3) * 7) % 98,
  delay: (i % 9) * 1.9,
  duration: 15 + (i % 6) * 4,
  size: 9 + (i % 4) * 5,
  drift: `${((i % 5) - 2) * 9}vw`,
  tone: i % 4,
}));

const TONES = ["var(--bougain)", "var(--blossom)", "var(--gold)", "var(--gold-light)"];

export function Petals() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="animate-petal absolute top-0 block"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--drift" as string]: p.drift,
          }}
        >
          <span
            className="block rounded-[100%_0_100%_0]"
            style={{
              width: p.size,
              height: p.size * 0.7,
              background: TONES[p.tone],
              opacity: p.tone > 1 ? 0.45 : 0.55,
              boxShadow: "0 2px 6px oklch(0.36 0.1 12 / 0.12)",
            }}
          />
        </span>
      ))}
    </div>
  );
}
