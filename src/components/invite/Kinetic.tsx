import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

/**
 * Kinetic typography — every glyph unfurls on its own beat when the line
 * scrolls into view. Used for names, chapter titles and script accents.
 */
export function Kinetic({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}) {
  const { ref, visible } = useReveal<HTMLElement>("-8% 0px");
  const chars = Array.from(text);

  return (
    <Tag
      // @ts-expect-error polymorphic ref
      ref={ref}
      data-visible={visible}
      aria-label={text}
      style={{ ["--base" as string]: `${delay}ms` }}
      className={cn("kinetic", className)}
    >
      {chars.map((c, i) => (
        <span key={`${c}-${i}`} aria-hidden style={{ ["--i" as string]: i }}>
          {c}
        </span>
      ))}
    </Tag>
  );
}
