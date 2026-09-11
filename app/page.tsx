import Image from "next/image";
import { Field, Section, Tag } from "@/components/section";
import { CodeBlock, Figures } from "@/components/media";
import {
  applications,
  capabilities,
  cases,
  education,
  foundations,
  languages,
  links,
  profile,
  publicationNote,
  roles,
  selectedPublications,
  tools,
} from "@/content/profile";

export default function Home() {
  return (
    <div className="space-y-14">
      {/* ============================================================ Hero */}
      <section className="pb-2">
        <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
              {profile.role}
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-navy sm:text-[2.6rem]">
              {profile.headline}
            </h1>
          </div>

          {profile.portrait ? (
            <Image
              src={profile.portrait}
              alt={`Portrait of ${profile.fullName}`}
              width={176}
              height={176}
              priority
              className="h-28 w-28 shrink-0 rounded-lg border border-line object-cover sm:h-44 sm:w-44"
            />
          ) : null}
        </div>

        <p className="mt-5 max-w-2xl text-[0.975rem] leading-[1.7] text-ink/85">
          {profile.pitch}
        </p>

        <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1.5">
          <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
            Applied to
          </span>
          {applications.map((application) => (
            <Tag key={application}>{application}</Tag>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          <a
            href={`mailto:${profile.email}`}
            className="rounded bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
          >
            {profile.email}
          </a>
          <a
            href="#cases"
            className="px-2 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            See the work ↓
          </a>
        </div>

        <dl className="mt-8 grid gap-x-8 gap-y-3 border-t border-line pt-5 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
              Based in
            </dt>
            <dd className="mt-1 text-ink">{profile.location}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
              Currently
            </dt>
            <dd className="mt-1 text-ink">{profile.affiliation}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
              Availability
            </dt>
            <dd className="mt-1 text-ink">{profile.availability}</dd>
          </div>
        </dl>
      </section>

      {/* ==================================================== Capabilities */}
      <Section
        id="capabilities"
        index="01"
        title="What I do"
        lead="Three areas, and most problems worth solving sit across two of them."
      >
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          {capabilities.map((capability) => (
            <div key={capability.heading} className="bg-surface p-5">
              <h3 className="font-serif text-base font-semibold text-navy">
                {capability.heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {capability.line}
              </p>
              <ul className="mt-4 space-y-1">
                {capability.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[0.7rem] leading-5 text-ink/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* =========================================================== Cases */}
      <Section
        id="cases"
        index="02"
        title="Selected work"
        lead="Six problems, what I did about them, and what changed as a result."
      >
        <ol className="space-y-px overflow-hidden rounded-lg border border-line bg-line">
          {cases.map((item, index) => (
            <li key={item.id} className="bg-surface p-5 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="flex items-baseline gap-3 font-serif text-lg font-semibold leading-snug text-navy">
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </h3>
                <p className="font-mono text-[0.68rem] text-muted sm:ml-auto">
                  {item.context}
                </p>
              </div>

              <dl className="mt-5 space-y-3 sm:pl-8">
                <Field label="Problem">{item.problem}</Field>
                <Field label="Approach">{item.approach}</Field>
                <Field label="Result">{item.result}</Field>
              </dl>

              {item.figures?.length ? (
                <div className="mt-5 sm:pl-8">
                  <Figures figures={item.figures} />
                </div>
              ) : null}

              {item.snippet ? (
                <div className="mt-5 sm:pl-8">
                  <CodeBlock snippet={item.snippet} />
                </div>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:pl-8">
                {item.stack.map((tool) => (
                  <Tag key={tool}>{tool}</Tag>
                ))}
                {item.repo ? (
                  <a
                    href={item.repo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-1 font-mono text-[0.68rem] text-accent link-underline"
                  >
                    {item.repo.label} ↗
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ===================================================== Foundations */}
      <Section
        id="foundations"
        index="03"
        title="Foundations"
        lead="The theory behind the work above, each tied to where it was applied."
      >
        <dl className="divide-y divide-line border-y border-line">
          {foundations.map((row) => (
            <div
              key={row.area}
              className="grid gap-x-6 gap-y-1 py-3.5 md:grid-cols-[10rem_minmax(0,1fr)_12rem]"
            >
              <dt className="font-serif text-[0.95rem] font-semibold leading-snug text-navy">
                {row.area}
              </dt>
              <dd className="text-sm leading-relaxed text-ink/85">{row.work}</dd>
              <dd className="font-mono text-[0.68rem] leading-5 text-muted md:text-right">
                {row.evidence}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          <span className="font-mono text-[0.68rem] uppercase tracking-wider">
            Tools
          </span>{" "}
          {tools.join(", ")}
        </p>
      </Section>

      {/* ====================================================== Background */}
      <Section
        id="background"
        index="04"
        title="Background"
        lead="The short version — the full CV is available on request."
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h3 className="font-mono text-[0.68rem] uppercase tracking-wider text-accent">
                Experience
              </h3>
              <ul className="mt-3 space-y-3">
                {roles.map((role) => (
                  <li key={role.title} className="text-sm">
                    <p className="font-mono text-[0.7rem] text-muted">
                      {role.period}
                    </p>
                    <p className="mt-0.5 font-medium text-navy">{role.title}</p>
                    <p className="text-muted">{role.org}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[0.68rem] uppercase tracking-wider text-accent">
                Education
              </h3>
              <ul className="mt-3 space-y-3">
                {education.map((entry) => (
                  <li key={entry.title} className="text-sm">
                    <p className="font-mono text-[0.7rem] text-muted">
                      {entry.period}
                    </p>
                    <p className="mt-0.5 font-medium text-navy">{entry.title}</p>
                    <p className="text-muted">{entry.org}</p>
                    {entry.note ? (
                      <p className="mt-0.5 text-[0.8rem] leading-snug text-muted">
                        {entry.note}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[0.68rem] uppercase tracking-wider text-accent">
                Languages
              </h3>
              <ul className="mt-3 flex gap-6 text-sm">
                {languages.map((language) => (
                  <li key={language.name}>
                    <span className="text-navy">{language.name}</span>{" "}
                    <span className="text-muted">— {language.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[0.68rem] uppercase tracking-wider text-accent">
              Selected publications
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {publicationNote}
            </p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {selectedPublications.map((paper) => (
                <li key={paper.title} className="py-3">
                  <p className="text-sm leading-snug text-navy">{paper.title}</p>
                  <p className="mt-1 font-mono text-[0.68rem] text-muted">
                    {paper.venue} · {paper.year}
                    {paper.doi ? (
                      <>
                        {" · "}
                        <a
                          href={`https://doi.org/${paper.doi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="link-underline"
                        >
                          doi:{paper.doi}
                        </a>
                      </>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ========================================================= Contact */}
      <Section
        id="contact"
        index="05"
        title="Contact"
        lead="Open to simulation, structural analysis and manufacturing-automation roles, and to industrial R&D collaboration. CV available on request."
      >
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-surface p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
              Email
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-1.5 block break-words text-sm text-ink link-underline"
            >
              {profile.email}
            </a>
          </div>
          <div className="bg-surface p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
              Phone
            </p>
            <p className="mt-1.5 text-sm text-ink">{profile.phone}</p>
          </div>
          {links
            .filter((link) => link.label !== "Email")
            .map((link) => (
              <div key={link.label} className="bg-surface p-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
                  {link.label}
                </p>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 block break-words text-sm text-ink link-underline"
                >
                  {link.handle}
                </a>
              </div>
            ))}
          <div className="bg-surface p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
              Location
            </p>
            <p className="mt-1.5 text-sm text-ink">{profile.location}</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
