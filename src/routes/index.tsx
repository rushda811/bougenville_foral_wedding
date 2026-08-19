import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Music2, VolumeX, CalendarHeart, Sparkles, Mail, Phone } from "lucide-react";

import { invite, mapsUrl } from "@/lib/invite-data";
import { art } from "@/lib/art";
import { Gate } from "@/components/invite/Gate";
import { Countdown } from "@/components/invite/Countdown";
import { Petals } from "@/components/invite/Petals";
import { Reveal, GoldRule, Ornament } from "@/components/invite/Reveal";
import { Kinetic } from "@/components/invite/Kinetic";
import {
  ArchPanel,
  BloomDivider,
  DamaskWash,
  GildedCorners,
  HangingCage,
} from "@/components/invite/Ornaments";
import { useAmbience } from "@/components/invite/use-ambience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${invite.brideFirst} & ${invite.groomFirst} — Wedding Invitation` },
      {
        name: "description",
        content: `${invite.brideFirst} and ${invite.groomFirst} invite you to their wedding on ${invite.dateLine.month} ${invite.dateLine.number}, ${invite.dateLine.year} at ${invite.venue.name}.`,
      },
      {
        property: "og:title",
        content: `${invite.brideFirst} & ${invite.groomFirst} — Wedding Invitation`,
      },
      {
        property: "og:description",
        content: `A royal floral celebration at ${invite.venue.name}. Touch anywhere to open the invitation.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const STARS = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 11 + (i % 4) * 6) % 96,
  top: (i * 17 + (i % 5) * 9) % 92,
  delay: (i % 6) * 0.8,
  size: 2 + (i % 3),
}));

function ChapterTitle({
  eyebrow,
  title,
  script,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  script?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="text-center">
      <Reveal>
        <p
          className={
            tone === "dark"
              ? "text-[10px] tracking-royal text-gold-light uppercase"
              : "text-[10px] tracking-royal text-gold-deep uppercase"
          }
        >
          {eyebrow}
        </p>
      </Reveal>
      <Kinetic
        as="h2"
        text={title}
        delay={120}
        className={
          tone === "dark"
            ? "mt-4 block text-2xl tracking-[0.2em] text-gold-light uppercase sm:text-4xl"
            : "mt-4 block text-2xl tracking-[0.2em] text-ink uppercase sm:text-4xl"
        }
      />
      {script && (
        <Reveal delay={260}>
          <p className={tone === "dark" ? "mt-3 font-script text-2xl text-gold-light sm:text-3xl" : "mt-3 font-script text-2xl text-primary sm:text-3xl"}>{script}</p>
        </Reveal>
      )}
      <Reveal variant="line" delay={340} className="rule-gold mx-auto mt-6 w-28 sm:w-44" />
    </div>
  );
}

function Invitation() {
  const [opened, setOpened] = useState(false);
  const ambience = useAmbience();

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        /* floral wallpaper across the whole invitation, softened under a cream wash */
        backgroundImage: `radial-gradient(120% 90% at 50% 0%, oklch(0.99 0.012 90 / 0.58), oklch(0.975 0.02 88 / 0.66) 55%, oklch(0.955 0.03 82 / 0.72)), url(${art.paper.src})`,
        backgroundSize: "auto, cover",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundAttachment: "fixed, fixed",
      }}
    >


      <Gate
        onOpen={() => {
          setOpened(true);
          ambience.start();
        }}
      />

      {opened && (
        <>
          <Petals />

          <button
            type="button"
            onClick={ambience.toggle}
            aria-label={ambience.playing ? "Pause music" : "Play music"}
            className="fixed right-4 bottom-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-card/80 text-gold-deep backdrop-blur transition-transform hover:scale-105"
          >
            {ambience.playing ? <Music2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* fixed hanging strands framing the whole scroll */}
          <img
            aria-hidden
            src={art.strand.src}
            alt=""
            width={art.strand.w}
            height={art.strand.h}
            decoding="async"
            className="animate-sway-vine pointer-events-none fixed top-[-4%] left-[-14%] z-0 w-[42vw] max-w-[300px] origin-top opacity-45 sm:left-[-3%] sm:w-[18vw]"
          />
          <img
            aria-hidden
            src={art.strand.src}
            alt=""
            width={art.strand.w}
            height={art.strand.h}
            decoding="async"
            className="animate-sway-vine pointer-events-none fixed top-[-6%] right-[-14%] z-0 w-[42vw] max-w-[300px] origin-top -scale-x-100 opacity-45 sm:right-[-3%] sm:w-[18vw]"
            style={{ animationDelay: "-3s" }}
          />

          <main className="relative z-10 w-full pb-24">
            {/* ── I. HERO — the Mughal arch ── */}
            <section className="relative mx-auto w-full max-w-3xl px-5 pt-[12vh] pb-6 text-center sm:px-8">
              <img
                aria-hidden
                src={art.arch.src}
                alt=""
                width={art.arch.w}
                height={art.arch.h}
                decoding="async"
                className="pointer-events-none absolute -top-4 left-1/2 w-[122%] max-w-none -translate-x-1/2 opacity-95"
              />
<div className="relative pt-24 sm:pt-32">
  <Reveal delay={100}>
  <p className="mx-auto max-w-[20rem] rounded-full bg-card/70 px-5 py-3 text-sm leading-relaxed tracking-[0.18em] text-ink/80 uppercase backdrop-blur-sm sm:max-w-lg sm:text-base">
    {invite.invitationLine}
  </p>
</Reveal>


<h1 className="mt-24 leading-[0.92]">                  <Kinetic
                    text={invite.brideFirst.toUpperCase()}
                    className="text-gold block text-5xl sm:text-8xl"
                  />
                  <Reveal delay={420}>
                    <span className="font-script my-1 block text-3xl text-primary sm:text-5xl">
                      and
                    </span>
                  </Reveal>
                  <Kinetic
                    text={invite.groomFirst.toUpperCase()}
                    delay={520}
                    className="text-gold block text-5xl sm:text-8xl"
                  />
                </h1>

                <div className="mt-10">
                  <GoldRule label="are getting married" />
                </div>

                <Reveal delay={200} className="mt-10">
                  <div className="glass lux-shadow relative mx-auto flex max-w-md items-center justify-center gap-5 px-8 py-6">
                    <GildedCorners size="w-12 sm:w-20" />
                    <span className="text-[10px] tracking-royal text-muted-foreground uppercase">
                      {invite.dateLine.day}
                    </span>
                    <span className="font-display text-gold text-5xl">
                      {invite.dateLine.number}
                    </span>
                    <span className="text-left text-[10px] tracking-royal text-muted-foreground uppercase">
                      {invite.dateLine.month}
                      <br />
                      {invite.dateLine.year}
                    </span>
                  </div>
                </Reveal>
              </div>
            </section>

            <BloomDivider />

            {/* ── II. THE COUPLE — two arch panels ── */}
            <section className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
              <ChapterTitle eyebrow="the beloved" title="Bride & Groom" script="two houses, one garden" />
              <div className="mt-14 grid gap-16 sm:grid-cols-2 sm:gap-10">
                {invite.couple.map((p, i) => (
                  <ArchPanel key={p.name} tone={i === 0 ? "light" : "light"}>
                    <p className="text-[10px] tracking-royal text-gold-deep uppercase">{p.role}</p>
                    <Kinetic
                      as="h3"
                      text={p.name}
                      className="text-gold mt-4 block font-display text-4xl sm:text-5xl"
                    />
                    <Ornament className="mt-5" />
                    <p className="mt-5 text-sm tracking-[0.14em] text-ink uppercase">{p.line}</p>
                    <p className="mt-4 font-script text-xl text-primary sm:text-2xl">{p.note}</p>
                  </ArchPanel>
                ))}
              </div>
            </section>

            {/* ── III. THE VOW — dark chamber, chinoiserie ── */}
            <section className="rose-panel relative mt-28 overflow-hidden py-24 text-center sm:py-32">
              <DamaskWash opacity={0.2} />
              {STARS.map((s, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="animate-twinkle pointer-events-none absolute rounded-full bg-gold-light"
                  style={{
                    left: `${s.left}%`,
                    top: `${s.top}%`,
                    width: s.size,
                    height: s.size,
                    animationDelay: `${s.delay}s`,
                  }}
                />
              ))}
              <HangingCage className="top-0 left-[6%] sm:left-[14%]" delay={0.6} />
              <HangingCage className="top-0 right-[6%] sm:right-[14%]" delay={3.2} />

              <div className="relative mx-auto max-w-2xl px-6 pt-20 sm:pt-24">
                <Reveal>
                  <Sparkles className="mx-auto h-4 w-4 text-gold" />
                  <p className="mt-8 font-script text-3xl leading-snug text-gold-light sm:text-5xl">
                    “{invite.quote.text}”
                  </p>
                  <p className="mt-8 text-[10px] tracking-royal text-gold uppercase">
                    {invite.quote.source}
                  </p>
                </Reveal>
                <Ornament className="mt-12 opacity-80" />
              </div>
            </section>

            {/* ── IV. COUNTDOWN — the gilded reliquary ── */}
            <section className="relative mx-auto mt-32 w-full max-w-4xl px-4 sm:px-8">
              <ChapterTitle
                eyebrow="the hour draws near"
                title="Counting the moments"
                script="until we say forever"
              />
              <div className="mt-24">
                <Countdown date={invite.date} />
              </div>
              <Reveal delay={200}>
                <p className="mx-auto mt-8 max-w-sm text-center text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                  {invite.dateLine.day} · {invite.dateLine.number} {invite.dateLine.month}{" "}
                  {invite.dateLine.year}
                </p>
              </Reveal>
            </section>

            <BloomDivider flip />

            {/* ── V. STORY — the golden thread ── */}
            <section className="silk relative overflow-hidden py-20 sm:py-28">
              <DamaskWash opacity={0.1} />
              <div className="relative mx-auto w-full max-w-3xl px-5 sm:px-8">
                <ChapterTitle eyebrow="how it began" title="Our Story" script="a garden, then a lifetime" />
                <ol className="relative mt-16 space-y-14">
                  <span
                    aria-hidden
                    className="absolute top-0 bottom-0 left-[11px] w-px bg-[image:var(--gradient-gold)] opacity-70 sm:left-1/2"
                  />
                  {invite.story.map((s, i) => (
                    <li key={s.year} className="relative pl-12 sm:w-1/2 sm:pl-0">
                      <div className={i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:ml-[100%] sm:w-full sm:pl-12"}>
                        <Reveal delay={i * 120}>
                          <p className="font-display text-gold text-3xl sm:text-4xl">{s.year}</p>
                          <h3 className="mt-2 text-lg tracking-[0.18em] text-ink uppercase sm:text-xl">
                            {s.title}
                          </h3>
                          <p className="mt-3 font-script text-xl text-primary">{s.note}</p>
                        </Reveal>
                      </div>
                      <span
                        aria-hidden
                        className={`absolute top-4 left-[5px] h-3.5 w-3.5 rotate-45 border border-gold bg-card sm:left-auto ${
                          i % 2 === 0 ? "sm:right-[-7px]" : "sm:left-[calc(100%-7px)]"
                        }`}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* ── VI. EVENTS — stationery cards under cusped arches ── */}
            <section className="relative mx-auto mt-28 w-full max-w-5xl px-5 sm:px-8">
              <ChapterTitle eyebrow="the celebrations" title="Events" script="three days of gold" />
              <div className="mt-16 grid gap-10 sm:grid-cols-2">
                {invite.ceremony.map((e, i) => (
                  <Reveal key={e.title} variant="scale" delay={i * 110}>
                    <div className="glass lux-shadow arch-cusp relative px-6 pt-12 pb-10 text-center">
                      <span
                        aria-hidden
                        className="silk pointer-events-none absolute inset-0 opacity-50"
                      />

                      <img
                        aria-hidden
                        src={art.cluster.src}
                        alt=""
                        width={art.cluster.w}
                        height={art.cluster.h}
                        loading="lazy"
                        decoding="async"
                        className={`animate-drift pointer-events-none absolute -top-8 w-28 sm:w-36 ${
                          i % 2 === 0 ? "-left-6" : "-right-6 -scale-x-100"
                        }`}
                      />
                      <p className="relative font-display text-gold text-3xl">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="relative mt-3 text-xl tracking-[0.18em] text-ink uppercase">
                        {e.title}
                      </h3>
                      <div className="rule-gold relative mx-auto mt-4 w-20" />
                      <p className="relative mt-4 text-sm text-foreground">{e.time}</p>
                      <p className="relative mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                        {e.place}
                      </p>
                      <p className="relative mt-3 font-script text-xl text-primary">{e.note}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            <BloomDivider />

            {/* ── VII. FAMILIES — the houses ── */}
            <section className="relative mx-auto w-full max-w-4xl px-5 sm:px-8">
              <ChapterTitle eyebrow="with blessings from" title="Our Families" script="the two houses" />
              <div className="mt-14 grid gap-12 sm:grid-cols-2">
                {invite.families.map((f, i) => (
                  <Reveal key={f.house} delay={i * 140}>
                    <div className="paper relative border border-gold/40 px-7 py-10 text-center">
                      <GildedCorners size="w-14 sm:w-20" />
                      <h3 className="relative font-display text-gold text-3xl">{f.house}</h3>
                      <Ornament className="mt-5" />
                      <ul className="relative mt-6 space-y-3">
                        {f.names.map((n) => (
                          <li
                            key={n}
                            className="text-[11px] tracking-[0.2em] text-ink uppercase"
                          >
                            {n}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── VIII. GALLERY — arched vignettes ── */}
            <section className="rose-panel relative mt-28 overflow-hidden py-20 sm:py-28">
              <DamaskWash opacity={0.18} />
              <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
                <ChapterTitle
                  eyebrow="fragments of us"
                  title="The Gallery"
                  script="moments kept in gold"
                  tone="dark"
                />
                <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-7">
                  {invite.gallery.map((g, i) => (
                    <Reveal key={g.caption} variant="scale" delay={i * 120}>
                      <figure className="group relative">
                        <div className="arch-mask relative overflow-hidden border border-gold/40">
                          <img
                            src={i % 2 === 0 ? art.cluster.src : art.arch.src}
                            alt={g.caption}
                            width={900}
                            height={1100}
                            loading="lazy"
                            decoding="async"
                            className="h-44 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110 sm:h-64"
                          />
                        </div>
                        <figcaption className="mt-4 text-center text-[9px] tracking-[0.22em] text-gold-light uppercase">
                          {g.caption}
                        </figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* ── IX. VENUE — the palace gates ── */}
            <section className="relative mx-auto mt-28 w-full max-w-3xl px-5 text-center sm:px-8">
              <ArchPanel>
                <p className="text-[10px] tracking-royal text-gold-deep uppercase">
                  where it all happens
                </p>
                <Kinetic
                  as="h2"
                  text={invite.venue.name}
                  delay={120}
                  className="mt-6 block font-display text-3xl text-ink sm:text-5xl"
                />
                <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {invite.venue.address}
                </p>

                <Ornament className="mt-8" />

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="gold-glow mt-8 inline-flex items-center gap-3 border border-gold px-7 py-4 text-[11px] tracking-royal text-gold-deep uppercase transition-transform hover:scale-[1.03]"
                >
                  <MapPin className="h-4 w-4" />
                  Open in Google Maps
                </a>

                <div className="mt-6">
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      `${invite.brideFirst} & ${invite.groomFirst} Wedding`,
                    )}&dates=20270306T130000Z/20270306T180000Z&location=${encodeURIComponent(
                      invite.venue.address,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] tracking-royal text-muted-foreground uppercase hover:text-gold-deep"
                  >
                    <CalendarHeart className="h-4 w-4" />
                    Save to calendar
                  </a>
                </div>

                <p className="mt-10 text-[9px] tracking-[0.24em] text-muted-foreground uppercase">
                  {invite.dressCode}
                </p>
              </ArchPanel>
            </section>

            {/* ── X. RSVP ── */}
            <section className="relative z-20 mx-auto mt-28 w-full max-w-3xl px-5 sm:px-8">
              <ChapterTitle eyebrow="kindly respond" title="RSVP" script="we save a seat for you" />
              <Reveal delay={160} className="mt-14">
                <div className="glass lux-shadow relative px-7 py-12 text-center sm:px-12">
                  <GildedCorners size="w-16 sm:w-24" />
                  <p className="relative text-[10px] tracking-royal text-gold-deep uppercase">
                    {invite.rsvp.by}
                  </p>
                  <div className="relative mt-10 grid gap-8 sm:grid-cols-2">
                    {invite.rsvp.hosts.map((h) => (
                      <div key={h.name}>
                        <p className="font-display text-gold text-2xl">{h.name}</p>
                        <a
                          href={`tel:${h.phone.replace(/\s/g, "")}`}
                          className="mt-2 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] text-muted-foreground uppercase hover:text-gold-deep"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {h.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                  <Ornament className="relative mt-10" />
                  <a
                    href={`mailto:${invite.rsvp.email}`}
                    className="relative mt-8 inline-flex items-center gap-3 border border-gold px-7 py-4 text-[11px] tracking-royal text-gold-deep uppercase transition-transform hover:scale-[1.03]"
                  >
                    <Mail className="h-4 w-4" />
                    {invite.rsvp.email}
                  </a>
                </div>
              </Reveal>
            </section>

            {/* ── XI. BLESSING ── */}
            <section className="relative z-10 mt-28 overflow-hidden pt-8 pb-16 text-center">
              <div className="relative mx-auto max-w-2xl px-8">
                <img
                  aria-hidden
                  src={art.arch.src}
                  alt=""
                  width={art.arch.w}
                  height={art.arch.h}
                  loading="lazy"
                  decoding="async"
                  className="pointer-events-none absolute -bottom-4 left-1/2 -z-10 w-[70%] max-w-[360px] -translate-x-1/2 rotate-180 opacity-25"
                />
                <Reveal className="relative">
                  <p className="font-display text-gold text-6xl leading-none">“</p>
                  <p className="mt-2 text-2xl leading-relaxed text-ink sm:text-3xl">
                    {invite.blessing.text}
                  </p>
                  <p className="mt-6 text-[10px] tracking-royal text-muted-foreground uppercase">
                    {invite.blessing.source}
                  </p>
                </Reveal>
              </div>
            </section>

            {/* ── XII. MONOGRAM — the seal ── */}
            <section className="relative mt-40 text-center">
              <Reveal variant="scale">
                <div className="glass relative mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-gold/60 sm:h-40 sm:w-40">
                  <span
                    aria-hidden
                    className="animate-pulse-ring absolute inset-0 rounded-full border border-gold/40"
                  />
                  <span className="font-display text-gold text-4xl sm:text-5xl">
                    {invite.brideInitial}
                    <span className="font-script text-2xl text-primary"> &amp; </span>
                    {invite.groomInitial}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={180} className="mt-10">
                <p className="mx-auto max-w-md px-8 font-script text-3xl text-primary sm:text-4xl">
                  {invite.closing}
                </p>
              </Reveal>
              <Ornament className="mt-10" />
            </section>
          </main>
        </>
      )}
    </div>
  );
}
