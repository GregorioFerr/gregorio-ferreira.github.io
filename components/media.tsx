import Image from "next/image";
import type { Figure, Snippet } from "@/content/profile";

/**
 * Figures for a case. Files live under public/work/<case-id>/.
 * Images are contained, never cropped — an engineering plot loses its
 * meaning when the axes are cut off.
 */
export function Figures({ figures }: { figures: readonly Figure[] }) {
  return (
    <div className="space-y-6">
      {figures.map((figure) => {
        const isMontage = figure.panels.length > 1;
        // Three panels read as a row; two and four fill a 2-up grid.
        const columns =
          figure.panels.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

        return (
          <figure key={figure.panels[0].src} className="min-w-0">
            <div
              className={`grid gap-x-4 gap-y-5 ${isMontage ? columns : ""}`}
            >
              {figure.panels.map((panel) => (
                <div key={panel.src} className="min-w-0">
                  {isMontage ? (
                    <p className="mb-1.5 font-mono text-[0.66rem] uppercase tracking-wider text-muted">
                      {panel.label}
                    </p>
                  ) : null}
                  <div className="relative aspect-[4/3] overflow-hidden rounded border border-line bg-surface-2">
                    <Image
                      src={panel.src}
                      alt={panel.alt}
                      fill
                      sizes={
                        !isMontage
                          ? "(max-width: 640px) 100vw, 85vw"
                          : figure.panels.length === 3
                            ? "(max-width: 640px) 100vw, 28vw"
                            : "(max-width: 640px) 100vw, 42vw"
                      }
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              ))}
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-muted">
              {figure.caption}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

/**
 * A short, illustrative code snippet. Deliberately unhighlighted — the
 * point is to show the shape of the work, not to be an IDE. If you ever
 * want highlighting, add Shiki at build time rather than a client-side
 * highlighter, so the page stays free of client JavaScript.
 */
export function CodeBlock({ snippet }: { snippet: Snippet }) {
  return (
    <div className="overflow-hidden rounded border border-line">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-3 py-1.5">
        <span className="truncate font-mono text-[0.68rem] text-ink/70">
          {snippet.label}
        </span>
        <span className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">
          {snippet.language}
        </span>
      </div>
      <pre className="overflow-x-auto bg-surface p-3 font-mono text-[0.72rem] leading-[1.6] text-ink/85">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
