# Gregório F. O. Ferreira — Portfolio

A single-page, industry-facing engineering portfolio. Built with **Next.js
(App Router)**, **React**, **TypeScript** and **Tailwind CSS v4**.

The page complements the CV rather than repeating it: the work is presented as
engineering cases in a **Problem → Approach → Result** format, with publications
reduced to a credential line.

## Running locally

```bash
npm install
npm run dev            # http://localhost:3000
npm run check:content  # enforce the house rules on the cases
npm run build          # production build
npm start              # serve the production build
```

## Editing the content

Everything on the page comes from one file:

```
content/profile.ts
```

| Export                 | Section on the page                                   |
| ---------------------- | ----------------------------------------------------- |
| `profile`              | Hero — headline, pitch, portrait, contact, availability |
| `TAGS`                 | The controlled vocabulary every case tag must use     |
| `capabilities`         | 01 What I do                                          |
| `cases`                | 02 Selected work — the core of the page               |
| `foundations`, `tools` | 03 Foundations — theory tied to cases and papers     |
| `roles`, `education`   | 04 Background                                         |
| `selectedPublications` | 04 Background — credential column                     |
| `links`                | Contact grid and footer                               |
| `navigation`           | Header anchors                                        |

---

## Adding a personal photo

1. Save a **square** image as `public/portrait.jpg` (or `.webp`). 800×800 px or
   larger — it renders at 176 px, and at 2× on a retina screen that is 352 px.
2. In `content/profile.ts`, change:

   ```ts
   portrait: null as string | null,
   // to
   portrait: "/portrait.jpg" as string | null,
   ```

Leave it as `null` and the hero simply renders full width. Nothing breaks.

A head-and-shoulders shot against a plain background works best — it is
displayed small and square, so anything busy turns to noise at that size.

## Adding figures to a case

Figures are what make the difference between a page someone skims and a page
someone reads. Put them in a folder named after the case `id`:

```
public/work/design-to-manufacture/trajectory.webp
public/work/as-manufactured/ct-slice.webp
```

Then reference them from the case:

```ts
{
  id: "design-to-manufacture",
  // …
  figures: [
    {
      src: "/work/design-to-manufacture/trajectory.webp",
      alt: "Computed fibre trajectories on a doubly curved surface, coloured by steering radius",
      caption: "Generated trajectories against the steering feasibility limit.",
    },
  ],
}
```

One figure fills the column; two or more lay out two-up. Images are *contained*,
never cropped, so plot axes stay readable.

Practical notes:

- **Format** — export to `.webp` at around 1600 px on the long edge. A MATLAB
  or Abaqus PNG export is typically 5–10× larger than it needs to be; converting
  to WebP is the single biggest thing you can do for page speed.
- **`alt` is required** — describe what the figure shows, not that it is a
  figure. It is read by screen readers and by search engines.
- **Check before you commit anything you cannot publish.** Figures from an
  unpublished manuscript, or from work under an industrial agreement, should
  wait for the paper.

## Adding a code snippet

```ts
snippet: {
  label: "export_KRL.m",
  language: "MATLAB",
  code: `for k = 1:numel(pass)
    p = resample_arclength(pass(k), ds);
    write_e6pos(fid, p.xyz, A, B, C);
end`,
},
```

Keep it under about 20 lines. A snippet on a portfolio is an illustration of how
you think, not a listing — if it needs scrolling, link the repository instead:

```ts
repo: { label: "github.com/…/latp-toolkit", href: "https://github.com/…" },
```

There is deliberately no syntax highlighter. If you want one later, add **Shiki**
at build time rather than a client-side highlighter, so the page keeps shipping
zero JavaScript.

---

## Keeping the cases consistent

Six cases only read as one body of work if they are written to the same shape.
Three mechanisms enforce that, in increasing order of strictness:

**1. The type.** `Case` requires `problem`, `approach` and `result`. You cannot
add a case that is just a description — TypeScript will not compile it.

**2. The tag vocabulary.** `stack` is typed as `Tag`, a union built from the
`TAGS` array. Writing `"KRL"` when the vocabulary says `"KUKA KRL"` fails the
build. To use a new tool, add it to `TAGS` first — that one second of friction is
what stops the tags drifting into twenty near-synonyms.

**3. The content checker.** `npm run check:content` enforces the house rules:

| Field     | Rule                                                       |
| --------- | ---------------------------------------------------------- |
| `title`   | ≤ 60 characters, names the problem not the technology      |
| `problem` | 25–60 words, states the cost of *not* solving it           |
| `approach`| 35–90 words, names the method, not just the tool           |
| `result`  | 18–55 words, states what changed                           |
| `stack`   | 3–5 tags, all from `TAGS`                                  |
| `context` | `Where · YYYY — YYYY` or `Where · YYYY — present`           |

It also rejects hype words (`cutting-edge`, `leverage`, `proven track
record`, …), checks that every referenced image file actually exists, and warns
about cases with no figure. Run it before you commit.

**The editorial rules the checker cannot enforce**, and which matter more:

- **Write the problem from the reader's side.** "Manual teaching is slow and
  cannot be checked before the cell is occupied" lands; "I developed a trajectory
  generation framework" does not. The problem paragraph should make someone in
  that industry wince in recognition.
- **The approach names the method, the tag names the tool.** Say
  "arc-length resampling and off-line reachability verification" in the prose,
  and leave `MATLAB` to the tag row. Anyone can list software.
- **The result states a change of state, not an activity.** "Defects became
  traceable to a named cause" is a result. "Performed extensive analysis" is not.
- **One claim per case that you could be cross-examined on.** Every number on
  this page is either in the CV or already published. Keep it that way — an
  interviewer who catches one soft number discounts the whole page.
- **Order by relevance to the reader, not chronology.** The most applied,
  most recent work is first; the PhD-era solver work is last.

---

## Structure

```
app/
  layout.tsx          root layout, fonts, metadata, header/footer
  globals.css         design tokens (light + dark) and Tailwind theme
  page.tsx            the entire site
  not-found.tsx       404
  about/  research/  publications/  contact/
                      redirects to the matching anchor on /
components/
  site-header.tsx     sticky anchor navigation
  site-footer.tsx     footer
  section.tsx         Section / Tag / Field primitives
  media.tsx           Figures and CodeBlock
content/
  profile.ts          all site content
scripts/
  check-content.mjs   the consistency checker
public/
  work/<case-id>/     case figures
  portrait.jpg        optional personal photo
```

The four sub-route folders exist only so older links keep working. Delete them
once nothing points at them.

## Design notes

- Navy headings with a deep green accent, matching the LaTeX CV template. Serif
  display face (Source Serif 4) for headings, Inter for body, JetBrains Mono for
  labels, dates and DOIs — the mono labels are what give the page its
  engineering-document feel.
- Light and dark themes are driven by CSS custom properties in `globals.css` and
  follow the operating-system preference. No toggle, no client-side state.
- Every route is statically prerendered and there are no client components.
- Fonts are fetched at build time by `next/font/google`, so the first build
  needs network access to `fonts.googleapis.com`.
