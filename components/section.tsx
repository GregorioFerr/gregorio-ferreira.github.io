import type { ReactNode } from "react";

export function Section({
  id,
  index,
  title,
  lead,
  children,
}: {
  id: string;
  index: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-8">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-accent">{index}</span>
        <h2 className="font-serif text-xl font-semibold tracking-tight text-navy sm:text-2xl">
          {title}
        </h2>
      </div>
      {lead ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:pl-8">
          {lead}
        </p>
      ) : null}
      <div className="mt-6 sm:pl-8">{children}</div>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-line bg-surface px-2 py-0.5 font-mono text-[0.68rem] leading-5 tracking-tight text-muted">
      {children}
    </span>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[5.5rem_1fr] sm:gap-4">
      <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-accent sm:pt-[0.2rem]">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-ink/85">{children}</dd>
    </div>
  );
}
