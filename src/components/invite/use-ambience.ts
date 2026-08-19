import { useCallback, useEffect, useRef, useState } from "react";

type Ctx = { ac: AudioContext; master: GainNode; timer: number | null };

/** Soft harp / celesta arpeggio ambience, synthesised in the browser (no asset). */
export function useAmbience() {
  const ref = useRef<Ctx | null>(null);
  const [playing, setPlaying] = useState(false);

  const stop = useCallback(() => {
    const ctx = ref.current;
    if (!ctx) return;
    if (ctx.timer) window.clearInterval(ctx.timer);
    ctx.timer = null;
    ctx.master.gain.cancelScheduledValues(ctx.ac.currentTime);
    ctx.master.gain.linearRampToValueAtTime(0, ctx.ac.currentTime + 0.8);
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    const AC: typeof AudioContext =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;

    if (!ref.current) {
      const ac = new AC();
      const master = ac.createGain();
      master.gain.value = 0;
      const verb = ac.createConvolver();
      const len = ac.sampleRate * 2.6;
      const buf = ac.createBuffer(2, len, ac.sampleRate);
      for (let c = 0; c < 2; c++) {
        const data = buf.getChannelData(c);
        for (let i = 0; i < len; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
        }
      }
      verb.buffer = buf;
      const wet = ac.createGain();
      wet.gain.value = 0.45;
      master.connect(ac.destination);
      master.connect(verb);
      verb.connect(wet);
      wet.connect(ac.destination);
      ref.current = { ac, master, timer: null };
    }

    const ctx = ref.current;
    void ctx.ac.resume();
    ctx.master.gain.cancelScheduledValues(ctx.ac.currentTime);
    ctx.master.gain.linearRampToValueAtTime(0.26, ctx.ac.currentTime + 1.4);

    const scale = [
      329.63, 392.0, 440.0, 493.88, 587.33, 659.25, 783.99, 880.0, 987.77, 1174.66,
    ];
    let step = 0;

    const pluck = (freq: number, at: number, gain: number) => {
      const { ac, master } = ctx;
      const osc = ac.createOscillator();
      const sub = ac.createOscillator();
      const g = ac.createGain();
      osc.type = "triangle";
      sub.type = "sine";
      osc.frequency.value = freq;
      sub.frequency.value = freq * 2.01;
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(gain, at + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 2.6);
      osc.connect(g);
      sub.connect(g);
      g.connect(master);
      osc.start(at);
      sub.start(at);
      osc.stop(at + 2.7);
      sub.stop(at + 2.7);
    };

    const bar = () => {
      const { ac } = ctx;
      const t0 = ac.currentTime + 0.05;
      for (let i = 0; i < 6; i++) {
        const note = scale[(step + i * 2) % scale.length]!;
        pluck(note, t0 + i * 0.42, 0.09 - i * 0.008);
      }
      pluck(scale[step % 4]! / 2, t0, 0.06);
      step = (step + 3) % scale.length;
    };

    bar();
    if (ctx.timer) window.clearInterval(ctx.timer);
    ctx.timer = window.setInterval(bar, 2600);
    setPlaying(true);
  }, []);

  const toggle = useCallback(() => (playing ? stop() : start()), [playing, start, stop]);

  useEffect(() => () => stop(), [stop]);

  return { playing, start, stop, toggle };
}
