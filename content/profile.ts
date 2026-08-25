/**
 * Single source of truth for the site.
 * The whole portfolio is one page — edit here, the page follows.
 *
 * Run `npm run check:content` after editing. It enforces the house rules
 * described in the README (length bands, tag vocabulary, no hype words).
 */

export const profile = {
  name: "Gregório F. O. Ferreira",
  fullName: "Gregório Felipe Oliveira Ferreira, PhD",
  role: "Simulation & Automation Engineer",
  discipline: "Structural analysis · CAE · Process automation",
  location: "Limerick, Ireland",
  affiliation: "Bernal Institute, University of Limerick",
  email: "gregorio.ferreira@protonmail.com",
  phone: "+353 83 137 3213",
  cv: "/cv/Gregorio_Ferreira_CV.pdf",
  availability:
    "Irish Stamp 4 — full work rights, no sponsorship needed. Open to relocation within the EU.",

  /**
   * Portrait. Drop a square image at public/portrait.jpg (or .webp) and set
   * this to "/portrait.jpg". Leave as null and the hero renders full width.
   * Aim for 800×800 px or larger — it is displayed at 176 px.
   */
  portrait: "/portrait.webp" as string | null,

  /** One sentence. This is the whole positioning. */
  headline:
    "I turn structural problems into computational models, and those models into working manufacturing processes.",

  /**
   * Two or three sentences. Keep it concrete — no adjectives.
   * Lead with the everyday work, not the specialist end of it: a reader has
   * to see routine stress and composite analysis before they see solver
   * extensions, or the profile reads as too narrow to hire.
   */
  pitch:
    "Ten years working in structural analysis of composite and metallic structures — from laminate sizing, buckling and stability, and damage tolerance to correlation with test data. I automate repetitive analysis, extend commercial solvers when standard capabilities are not enough, and carry fibre-path and robot-programming work through to parts that are manufactured and tested in practice.",
} as const;

/**
 * Where the work has been applied. Shown as a row under the pitch, so a
 * reader holding a vacancy against this page sees the domain immediately
 * rather than inferring it from six case studies.
 */
export const applications = [
  "Aerospace structures",
  "Thermoplastic composites",
  "Pressure vessels",
  "Robotic manufacturing",
  "Simulation-driven design",
] as const;

export const links = [
  {
    label: "Email",
    href: "mailto:gregorio.ferreira@protonmail.com",
    handle: "gregorio.ferreira@protonmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gregorioferreira",
    handle: "/in/gregorioferreira",
  },
  // Add ORCID and Google Scholar here once you have the URLs, e.g.
  // { label: "ORCID", href: "https://orcid.org/0000-0000-0000-0000", handle: "0000-0000-0000-0000" },
] as const;

/* ================================================================
   TAG VOCABULARY

   Every tag on the page must come from this list. It is a TypeScript
   union, so a typo or a near-duplicate ("KRL" vs "KUKA KRL") fails the
   build instead of quietly making the page look sloppy.

   To add a tool, add it here first — that one-second friction is what
   keeps six cases speaking the same language.
   ================================================================ */

export const TAGS = [
  // Analysis
  "FEA",
  "Abaqus",
  "Abaqus UEL",
  "UMAT / VUMAT",
  "RVE homogenisation",
  "Impact analysis",
  "Porosity",
  "Topology optimisation",
  // Code
  "MATLAB",
  "Python",
  "FORTRAN",
  "KUKA KRL",
  // Method
  "Differential geometry",
  "Fibre steering",
  "Laser-assisted tape placement",
  "Off-line programming",
  "Robot calibration",
  "Frame composition",
  "Process diagnosis",
  // CAD
  "SolidWorks",
  "SolidWorks API",
  "FreeCAD scripting",
  // Test
  "Test correlation",
  "Image analysis",
  // Domain
  "CF/PEEK",
  "DFM",
  "ISO 9001",
] as const;

export type Tag = (typeof TAGS)[number];

/* ================================================================
   MEDIA TYPES
   ================================================================ */

export type Panel = {
  /** Path under public/, e.g. "/work/design-to-manufacture/path-planning.webp" */
  src: string;
  /** Describe what the panel shows, not that it is an image. Required. */
  alt: string;
  /**
   * Short label drawn above the panel by the site, not baked into the file.
   * Keep the exported images free of titles — the page sets the typography,
   * and a vector re-export then needs no editing.
   */
  label: string;
};

/**
 * One figure = one caption. Give it a single panel for a plain image, or
 * several to build a montage: they lay out as a grid on a wide screen and
 * stack to full width on a phone, where a baked-in montage would be
 * unreadable.
 */
export type Figure = {
  panels: readonly Panel[];
  /** Shown under the whole set. One line. */
  caption: string;
};

export type Snippet = {
  /** Shown in the header bar of the block, e.g. "export_KRL.m" */
  label: string;
  /** For the language chip only — no syntax highlighting is applied. */
  language: string;
  /** Keep it under ~20 lines. A snippet is an illustration, not a listing. */
  code: string;
};

/* ================================================================
   CASES — the core of the page. Problem / Approach / Result.

   House rules (enforced by npm run check:content):
     · title    ≤ 60 characters, names the problem not the technology
     · problem  25–60 words, states the cost of not solving it
     · approach 35–90 words, names the method, not just the tool
     · result   18–55 words, states what changed
     · stack    3–5 tags, all from TAGS
     · context  "Where · YYYY — YYYY" or "Where · YYYY — present"
   ================================================================ */

export type Case = {
  id: string;
  title: string;
  context: string;
  problem: string;
  approach: string;
  result: string;
  stack: readonly Tag[];
  /** Optional. Drop files in public/work/<id>/ and reference them here. */
  figures?: readonly Figure[];
  /** Optional. One short, illustrative snippet. */
  snippet?: Snippet;
  /** Optional. Link to a public repository or release. */
  repo?: { label: string; href: string };
};

export const cases: readonly Case[] = [
  {
    id: "design-to-manufacture",
    title: "Manufacturing a wing-box panel with an elliptical man-hole",
    context: "VariComp, University of Limerick · 2022 — 2025",
    problem:
      "A wing box requires access holes for inspection, but an elliptical man-hole interrupts the load path through the surrounding panel. Steering the fibres around the opening can preserve structural continuity, but only if the resulting layup remains within the manufacturing capabilities of the placement system.",
    approach:
      "Finite element buckling and strength models defined the fibre-angle distributions around the opening. Those angles fed a MATLAB-based manufacturing simulation pipeline covering differential-geometry trajectory generation, arc-length resampling, steering-feasibility screening, and automated generation of KUKA KRL source and data files, with bilinear speed ramps, process-trigger sequencing and an explicit tool-frame convention. Each program was then verified in a digital twin for robot reachability and collision clearance before physical manufacturing.",
    result:
      "A wing-box panel design becomes a machine-ready program without manual teaching, and trajectories regenerate automatically when the man-hole geometry or the layup changes — so manufacturability is settled at the design stage rather than on the tool. Published in Composites Part A (2024).",
    stack: [
      "MATLAB",
      "KUKA KRL",
      "Off-line programming",
      "Differential geometry",
      "Fibre steering",
    ],
    figures: [
      {
        panels: [
          {
            src: "/work/design-to-manufacture/path-planning.webp",
            alt: "Computed fibre paths around a central cut-out for four layer orientations — 0°, +45°, −45° and 90° — each drawn in a different colour",
            label: "Path planning — as designed",
          },
          {
            src: "/work/design-to-manufacture/virtual-manufacturing.webp",
            alt: "Off-line simulation showing a KUKA robot on a linear rail carrying the tape-placement head over the part",
            label: "Digital twin",
          },
          {
            src: "/work/design-to-manufacture/cell.webp",
            alt: "The tape-placement cell: a KUKA robot carrying the placement head over a flat tool table",
            label: "Physical cell",
          },
          {
            src: "/work/design-to-manufacture/manufactured-panel.webp",
            alt: "Deposited panel around a central cut-out, with close-up insets marking tow wrinkling, gaps and overlaps",
            label: "Manufactured as designed",
          },
        ],
        caption:
          "The pipeline end to end on the wing-box panel: paths steered around the elliptical man-hole become a robot program, verified off-line, run on the cell, and measured on the panel that comes off it.",
      },
    ],
  },
  {
    id: "as-manufactured",
    title: "Sizing to the as-manufactured part, not the ideal one",
    context: "VariComp, University of Limerick · 2022 — 2025",
    problem:
      "Laser-assisted tape placement consolidates thermoplastic tape in a single pass, in a fraction of a second under the roller, with no autoclave stage to follow. Voids trapped at that moment stay in the part, so sizing from ideal ply properties overstates the stiffness the panel actually has.",
    approach:
      "Built a multiscale model to price that porosity. Microscale representative volume elements were generated in MATLAB by random fibre packing at the target fibre volume fraction, then populated three ways: a void-free baseline, parametric voids swept across void contents, and real void geometry traced from polished-section micrographs by edge detection. A Python layer assembled the extracted contours and built each Abaqus model, so the whole sweep was meshed and homogenised under periodic boundary conditions without manual setup.",
    result:
      "Effective ply stiffness as a function of porosity, in a form that feeds laminate sizing, validated against tensile tests and a literature benchmark. Stiffness proved sensitive to void size and clustering, not only to void content. Published in the ICCS27 proceedings.",
    stack: [
      "Abaqus",
      "RVE homogenisation",
      "Porosity",
      "Python",
      "Image analysis",
    ],
    figures: [
      {
        panels: [
          {
            src: "/work/as-manufactured/section-micrograph.webp",
            alt: "Optical micrograph of a polished laminate section showing individual carbon fibres and dark resin-poor void regions, with two areas boxed for detail",
            label: "Polished section",
          },
          {
            src: "/work/as-manufactured/void-extraction.webp",
            alt: "Binary mask of the same section with the void regions isolated in black on a white background",
            label: "Voids extracted",
          },
          {
            src: "/work/as-manufactured/microscale-rve.webp",
            alt: "Microscale finite element representative volume with circular fibres and irregular void shapes taken from the measured section",
            label: "Microstructure in the FE model",
          },
        ],
        caption:
          "Measured, isolated, rebuilt: void geometry comes off a real polished section and into the representative volume element that carries the stiffness calculation.",
      },
    ],
  },
  {
    id: "process-robustness",
    title: "Making a deposition cell repeatable",
    context: "HyFloatComp, University of Limerick · 2025 — present",
    problem:
      "Early deposition trials produced defects that looked like material problems but were not. Tool-table tilt, singularities in the robot wrist and process trigger timing were all shifting the result from run to run.",
    approach:
      "Isolated each contribution instead of tuning empirically: fitted the tool surface normal field to correct table tilt spatially, reworked the frame composition to avoid the wrist singularity, defined a trigger convention with an on-table run-in so the process reaches steady state before the part, and added compensation for roller position. Fine-tuning variables were exposed in the robot program so operators can adjust at the pendant without editing code.",
    result:
      "Defects became traceable to a named cause rather than attributed to the material, and the process settings moved from operator knowledge into the program itself.",
    stack: [
      "KUKA KRL",
      "Laser-assisted tape placement",
      "Robot calibration",
      "Frame composition",
      "Process diagnosis",
    ],
    // Give this case its own figure when you have one — a close-up of two or
    // three defects, each labelled with the process cause you traced it to,
    // is the single most convincing image on this page.
    // figures: [
    //   {
    //     panels: [
    //       {
    //         src: "/work/process-robustness/defect-causes.webp",
    //         alt: "Close-up of tow wrinkling and a gap in a deposited panel",
    //         label: "Traced defects",
    //       },
    //     ],
    //     caption: "Each defect read back to the process cause behind it.",
    //   },
    // ],
  },
  {
    id: "vessel-sizing",
    title: "Fixing vessel geometry before committing to tooling",
    context: "HyFloatComp, University of Limerick · 2025 — present",
    problem:
      "A composite hydrogen pressure vessel commits you to expensive tooling early. Geometry and laminate have to be defended on analysis, before anything is machined, or the cost of being wrong lands after the mandrel exists.",
    approach:
      "Parametric structural analysis across two vessel families, super ellipsoidal and toroidal, coupled to computational fibre-path generation so that manufacturability is assessed at the same time as structural performance — a shape that sizes well but cannot be laid down is rejected in the same loop. Mandrel and fixturing concepts were generated by scripted CAD macros rather than modelled by hand.",
    result:
      "Geometry and laminate decisions carry simulation evidence and hand straight over to the robotic pipeline, with no redraw between design and manufacture.",
    stack: ["Abaqus", "MATLAB", "SolidWorks API", "FreeCAD scripting", "CF/PEEK"],
    figures: [
      {
        panels: [
          {
            src: "/work/vessel-sizing/vessel-geometry.webp",
            alt: "Dimensioned engineering drawing of the super ellipsoidal vessel, with isometric, front, side and top views, the polar boss diameter and the wall profile detail",
            label: "Geometry, dimensioned",
          },
          {
            src: "/work/vessel-sizing/fibre-paths.webp",
            alt: "Four-pass tape trajectory covering the super ellipsoidal vessel, each pass in its own colour, with the feed, normal and geodesic vectors drawn along one course and the polar boss marked",
            label: "Fibre paths on that surface",
          },
        ],
        caption:
          "Super ellipsoidal vessel: the geometry fixed on analysis and drawn to dimension, then fibre paths generated on that same surface to show it can actually be laid down. Trajectory figure from Ferreira et al., ACM7 (2026).",
      },
      {
        panels: [
          {
            src: "/work/vessel-sizing/tooling-concept.webp",
            alt: "CAD concept for the toroidal mandrel: the torus carried on geared supports above a base plate, with a ring guide running around it",
            label: "Mandrel and drive concept",
          },
          {
            src: "/work/vessel-sizing/tooling-in-cell.webp",
            alt: "The toroidal tooling placed in the robotic cell, mounted on its fixture in front of a robot carried on a linear rail",
            label: "Tooling in the cell",
          },
        ],
        caption:
          "Toroidal vessel, the second geometry in the project: a mandrel and drive concept built in CAD, then placed in the cell to check the robot reaches it — all before anything is machined.",
      },
    ],
  },
  {
    id: "weight-reduction",
    title: "Taking weight out of a production component",
    context: "HyCo, São Paulo · 2021 — 2022",
    problem:
      "A reinforced-thermoplastic and metal assembly had to lose significant weight without giving up structural performance, and had to stay manufacturable on an existing production line with existing suppliers.",
    approach:
      "Redesigned around structural analysis and topology optimisation rather than incremental thinning, so that material was removed where the load path allowed it instead of uniformly. Carried the result through prototyping, tooling, mechanical testing, dimensional inspection and supplier qualification inside an ISO 9001 environment, translating engineering requirements into something the line could actually produce.",
    result:
      "50% weight reduction with 15% improved structural performance, delivered from concept through to production, with the test and quality documentation needed to release it.",
    stack: ["SolidWorks", "FEA", "Topology optimisation", "DFM", "ISO 9001"],
    figures: [
      {
        panels: [
          {
            src: "/work/weight-reduction/manufactured-part.webp",
            alt: "The existing moulded long-fibre thermoplastic part, perforated with a honeycomb of holes, sitting on a bench scale",
            label: "Study case, as built",
          },
          {
            src: "/work/weight-reduction/load-case.webp",
            alt: "Design space for the component drawn over a loaded pallet, with the distributed vertical load and horizontal force marked on the top face",
            label: "Load case and design space",
          },
          {
            src: "/work/weight-reduction/optimised-topology.webp",
            alt: "Result of the topology optimisation: a branching truss of material left along the load paths, shaded by von Mises stress",
            label: "Optimised topology",
          },
          {
            src: "/work/weight-reduction/part-design.webp",
            alt: "CAD model of the redesigned part, with the surviving load paths turned into moulded ribs around a central web",
            label: "Redrawn for moulding",
          },
        ],
        caption:
          "Start from the part that exists: weigh it, let its load case define the design space, let optimisation take material out wherever the load path allows, then redraw what survives as ribs a mould can produce.",
      },
    ],
  },
  {
    id: "solver-extension",
    title: "Predicting internal impact damage by FEA",
    context: "University of São Paulo · 2014 — 2019",
    problem:
      "An impact on a composite wing panel can cause intralaminar damage and delamination that are barely visible at the surface, while residual strength is already reduced. Predicting that internal damage needs through-thickness stress, which shell elements do not resolve, without the cost of a full 3D model at every iteration.",
    approach:
      "Developed and implemented a higher-order unified finite element formulation as an Abaqus user element (UEL) in FORTRAN, coupled with a continuum damage model within a single implicit analysis. A separate explicit damage formulation was implemented as a VUMAT for transient impact simulations.",
    result:
      "Through-thickness stress and progressive damage available inside Abaqus, validated against bending, indentation, impact and modal test campaigns — so internal impact damage is predicted from the mechanics of the laminate rather than inferred from surface inspection. Published in Thin-Walled Structures.",
    stack: [
      "Abaqus UEL",
      "UMAT / VUMAT",
      "FORTRAN",
      "Impact analysis",
      "Test correlation",
    ],
    figures: [
      {
        panels: [
          {
            src: "/work/solver-extension/through-thickness-stress.webp",
            alt: "Through-thickness profile of transverse stress plotted against thickness, comparing the Abaqus user element with a shell element and a MATLAB reference solution",
            label: "Stress through the thickness",
          },
          {
            src: "/work/solver-extension/damage-depths.webp",
            alt: "Matrix and shear damage contour fields computed at three positions through the thickness of the laminate",
            label: "Damage at three depths",
          },
        ],
        caption:
          "What the element resolves that a shell cannot: the stress profile across the laminate, checked against a MATLAB reference, and the damage field at successive depths. Stress figure from Ferreira et al., Thin-Walled Structures (2020).",
      },
      {
        panels: [
          {
            src: "/work/solver-extension/impact-model.webp",
            alt: "Explicit impact model of a clamped circular plate, annotated with the element type chosen for the impactor, plate, clamping disks and screws, and with the contact and boundary conditions",
            label: "Impact model",
          },
          {
            src: "/work/solver-extension/impact-correlation.webp",
            alt: "Force against time during impact, comparing the measured response with finite element models run with and without the damage model",
            label: "Force history against test",
          },
          {
            src: "/work/solver-extension/dic-correlation.webp",
            alt: "Digital image correlation output showing the speckle pattern with reference and deformed correlation grids and a strain colour scale",
            label: "DIC strain measurement",
          },
        ],
        caption:
          "Predicted, then measured: an explicit impact model built element type by element type, its force history laid over the measured one with and without damage active, and full-field strain from digital image correlation. PhD work, University of São Paulo.",
      },
    ],
  },
];

/* ================================================================
   CAPABILITIES
   ================================================================ */

export const capabilities = [
  {
    heading: "Structural analysis",
    line: "Sizing and margin assessment for composite and metallic structures — linear and non-linear static strength, buckling and stability, damage tolerance, transient dynamics.",
    items: [
      "Linear & non-linear static",
      "Buckling & stability",
      "Impact & transient dynamics",
      "Progressive damage",
      "Laminate sizing",
      "Test correlation",
    ],
  },
  {
    heading: "Simulation & CAE",
    line: "Physics-based models built to be run hundreds of times, not once — parametric model generation, custom solver extensions, automated post-processing.",
    items: [
      "Abaqus implicit & explicit",
      "UEL / UMAT / VUMAT (FORTRAN)",
      "Python–Abaqus scripting",
      "Parametric studies & DoE",
      "Topology optimisation",
    ],
  },
  {
    heading: "Process automation",
    line: "The path from a CAD surface to a verified machine program — trajectory generation, off-line programming, robot code export, cell calibration.",
    items: [
      "KUKA off-line programming",
      "Automated KRL generation",
      "Trajectory & path planning",
      "Cell calibration",
      "Design-to-manufacture pipelines",
    ],
  },
] as const;

export const toolbox = [
  {
    group: "Analysis",
    items: ["Abaqus", "Linear & non-linear FEA", "Implicit & explicit", "Buckling", "Damage mechanics", "Modal analysis"],
  },
  {
    group: "Code",
    items: ["Python", "MATLAB", "FORTRAN", "KUKA KRL", "Git"],
  },
  {
    group: "CAD & robotics",
    items: ["SolidWorks", "FreeCAD", "RoboDK", "KUKA KRC2", "Off-line programming"],
  },
  {
    group: "Test & measurement",
    items: ["Mechanical testing", "DIC", "Optical microscopy", "Laser vibrometry", "Dimensional inspection"],
  },
] as const;

/* ================================================================
   CREDENTIALS — deliberately compact. The CV carries the detail.
   ================================================================ */

export const roles = [
  {
    period: "2022 — present",
    title: "Postdoctoral Researcher",
    org: "Bernal Institute, University of Limerick",
  },
  {
    period: "2021 — 2022",
    title: "R&D Mechanical Engineer",
    org: "HyCo — Hybrid Composites Technology, São Paulo",
  },
] as const;

export const education = [
  {
    period: "2014 — 2019",
    title: "PhD, Mechanical Engineering — Aeronautical Structures",
    org: "University of São Paulo",
  },
  {
    period: "2012 — 2014",
    title: "MSc, Mechanical Engineering — Aeronautical Structures",
    org: "University of São Paulo",
  },
] as const;

export type Publication = {
  title: string;
  venue: string;
  year: number;
  doi?: string;
};

export const selectedPublications: readonly Publication[] = [
  {
    title:
      "From virtual to actual assisted tape placement — application of the Frenet frame to robotic steering trajectories",
    venue: "Composites Part A",
    year: 2024,
    doi: "10.1016/j.compositesa.2024.108369",
  },
  {
    title:
      "A finite element unified formulation for composite laminates in bending considering progressive damage",
    venue: "Thin-Walled Structures",
    year: 2022,
    doi: "10.1016/j.tws.2021.108864",
  },
  {
    title:
      "Development of a finite element via Unified Formulation: implementation as a User Element subroutine",
    venue: "Thin-Walled Structures",
    year: 2020,
    doi: "10.1016/j.tws.2020.107107",
  },
];

export const publicationNote =
  "Five peer-reviewed journal papers and six international conference papers. Peer reviewer for Composite Structures (Elsevier).";

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Portuguese", level: "Native" },
] as const;

export const navigation = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#cases", label: "Work" },
  { href: "#toolbox", label: "Toolbox" },
  { href: "#background", label: "Background" },
  { href: "#contact", label: "Contact" },
] as const;
