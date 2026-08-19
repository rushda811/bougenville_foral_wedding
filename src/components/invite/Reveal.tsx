import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type RevealProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  variant?: "rise" | "scale" | "line" | "unfurl";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  variant = "rise",
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const variantClass =
    variant === "scale"
      ? "reveal-scale"
      : variant === "line"
        ? "reveal-line"
        : variant === "unfurl"
          ? "reveal-unfurl"
          : "reveal";

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(variantClass, className)}
    >
      {children}
    </Tag>
  );
}

export function GoldRule({ label, tone = "gold" }: { label?: string; tone?: "gold" | "light" }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Reveal variant="line" className="rule-gold w-16 origin-right sm:w-28" />
      <span
        className={cn(
          "text-[10px] tracking-royal uppercase whitespace-nowrap",
          tone === "gold" ? "text-gold-deep" : "text-gold-light",
        )}
      >
        {label ?? "❖"}
      </span>
      <Reveal variant="line" delay={120} className="rule-gold w-16 origin-left sm:w-28" />
    </div>
  );
}

/** Small ornamental gold diamond chain used between sections. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)} aria-hidden>
      <span className="rule-gold w-10 sm:w-20" />
      <span className="block h-1.5 w-1.5 rotate-45 bg-[image:var(--gradient-gold)]" />
      <span className="block h-2.5 w-2.5 rotate-45 bg-[image:var(--gradient-gold)]" />
      <span className="block h-1.5 w-1.5 rotate-45 bg-[image:var(--gradient-gold)]" />
      <span className="rule-gold w-10 sm:w-20" />
    </div>
  );
}
