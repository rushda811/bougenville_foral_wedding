import { useCallback, useEffect, useRef, useState } from "react";
import tere from "@/assets/tere.mp3";

export function useAmbience() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const start = useCallback(async () => {
    if (!audioRef.current) {
      const audio = new Audio(tere);
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    }

    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch (error) {
      console.error("Audio could not play:", error);
    }
  }, []);

  const stop = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      stop();
    } else {
      start();
    }
  }, [playing, start, stop]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return {
    playing,
    start,
    stop,
    toggle,
  };
}