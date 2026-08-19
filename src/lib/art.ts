import arch from "@/assets/arch.webp";
import strand from "@/assets/strand-vine.webp";
import cluster from "@/assets/cluster-spray.webp";
import paper from "@/assets/gate-paper.jpg";
import cage from "@/assets/cage.webp";
import corner from "@/assets/corner.webp";

/** Central registry of the reference-derived artwork used across the invite. */
export const art = {
  arch: { src: arch, w: 1400, h: 1400 },
  strand: { src: strand, w: 640, h: 1600 },
  cluster: { src: cluster, w: 1280, h: 1024 },
  /** Floral wallpaper used ONLY behind the opening gate. */
  paper: { src: paper, w: 676, h: 1200 },
  cage: { src: cage, w: 700, h: 1166 },
  corner: { src: corner, w: 900, h: 900 },
} as const;
