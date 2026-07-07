import {
  Accessibility,
  BookOpenText,
  Boxes,
  Braces,
  CheckCircle2,
  Code2,
  Component,
  Layers3,
  Moon,
  Palette,
  PanelLeft,
  Route,
  ScrollText,
  Search,
  Sparkles,
  Sun,
  Upload,
  WandSparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { createLazyVars, normalizeHex, rgbToHex, type LazyMode } from "./color";

gsap.registerPlugin(ScrollTrigger);

type Density = "standard" | "compact";

const navItems = [
  { id: "philosophy", label: "Philosophy", icon: BookOpenText },
  { id: "tokens", label: "Tokens", icon: Layers3 },
  { id: "theme", label: "Theme Engine", icon: Palette },
  { id: "components", label: "Components", icon: Component },
  { id: "motion", label: "Motion", icon: ScrollText },
  { id: "architecture", label: "Architecture", icon: Braces },
];

const principles = [
  {
    title: "Flat First",
    body: "Hierarchy is created through color roles, type scale, spacing, borders, and state layers before shadows or effects.",
  },
  {
    title: "Density With Dignity",
    body: "Interfaces should scan like Linear: compact enough for work, calm enough for sustained focus, and explicit about priority.",
  },
  {
    title: "Dynamic, Not Decorative",
    body: "Monet color is used to produce semantic palettes and adaptive surfaces, not to paint gradients everywhere.",
  },
  {
    title: "Motion With Purpose",
    body: "Motion explains change, confirms input, and preserves spatial memory. It is short, reversible, and interruptible.",
  },
  {
    title: "Composable Core",
    body: "Components expose headless contracts, CSS variables, and Radix-powered behavior before visual opinion.",
  },
  {
    title: "Accessible By Default",
    body: "Contrast, focus, keyboard navigation, reduced motion, and screen-reader semantics are part of the component contract.",
  },
];

const refusals = [
  "No decorative glass layers as a default surface language.",
  "No oversized shadows to fake hierarchy.",
  "No Dribbble-only ornamental layout patterns.",
  "No animation that cannot explain a state or spatial change.",
  "No component API that blocks composition or semantic HTML.",
];

const colorTokens = [
  ["--ld-color-primary", "Main action, active navigation, key affordance", "Monet primary tone 40", "Monet primary tone 80"],
  ["--ld-color-on-primary", "Text/icon on primary", "tone 100", "tone 20"],
  ["--ld-color-secondary", "Supporting actions and filters", "secondary tone 40", "secondary tone 80"],
  ["--ld-color-tertiary", "Contextual accent and product metadata", "tertiary tone 40", "tertiary tone 80"],
  ["--ld-color-background", "Application canvas", "neutral tone 98", "neutral tone 6"],
  ["--ld-color-surface", "Base component surface", "neutral tone 99", "neutral tone 10"],
  ["--ld-color-surface-container", "Panels, nav, grouped controls", "neutral tone 94", "neutral tone 16"],
  ["--ld-color-surface-container-high", "Raised but flat surfaces", "neutral tone 90", "neutral tone 22"],
  ["--ld-color-outline", "Primary border and divider", "neutral-variant tone 50", "neutral-variant tone 60"],
  ["--ld-color-outline-variant", "Subtle border and table rules", "neutral-variant tone 80", "neutral-variant tone 30"],
  ["--ld-color-error", "Destructive action and validation", "error tone 40", "error tone 80"],
  ["--ld-color-on-surface", "Primary text", "neutral tone 10", "neutral tone 90"],
];

const typographyTokens = [
  ["Display", "40 / 48", "700", "0", "Product-level page titles only"],
  ["Heading XL", "28 / 36", "650", "0", "Spec section title"],
  ["Heading LG", "22 / 30", "650", "0", "Panel and major group title"],
  ["Body LG", "16 / 26", "400", "0", "Long-form guidance"],
  ["Body MD", "14 / 22", "400", "0", "Default UI copy"],
  ["Label", "12 / 16", "650", "0.02em", "Badges, table headers, compact controls"],
  ["Code", "13 / 20", "500", "0", "Token names and API contracts"],
];

const spacingTokens = [
  ["2XS", "4px", "Hairline gaps, icon/text optical adjustment"],
  ["XS", "8px", "Control internals and dense lists"],
  ["SM", "12px", "Compact card and table rhythm"],
  ["MD", "16px", "Default component padding"],
  ["LG", "24px", "Section groups and panel spacing"],
  ["XL", "32px", "Page grid gutters"],
  ["2XL", "48px", "Document section separation"],
  ["3XL", "64px", "Large system transitions"],
];

const shapeTokens = [
  ["--ld-shape-corner-extra-small", "4px", "Inputs in dense data surfaces"],
  ["--ld-shape-corner-small", "6px", "Buttons, badges, compact controls"],
  ["--ld-shape-corner-medium", "8px", "Default card and menu radius"],
  ["--ld-shape-corner-large", "12px", "Dialogs, drawers, expressive containers"],
  ["--ld-shape-corner-full", "999px", "Pills, switches, avatars"],
];

const elevationTokens = [
  ["Level 0", "Canvas", "No shadow, no border", "Background"],
  ["Level 1", "Surface", "Subtle border", "Cards, fields, nav"],
  ["Level 2", "Container High", "Border + tonal fill", "Sticky panels, selected rows"],
  ["Level 3", "Overlay", "Border + tight shadow", "Menus, popovers, dialogs"],
];

const themePipeline = [
  "Normalize brand color or sample image source pixels.",
  "Generate tonal palettes with Material Color Utilities.",
  "Map palette tones into Lazy semantic roles.",
  "Resolve mode, contrast, density, and user overrides.",
  "Emit CSS variables at :root or scoped theme boundary.",
  "Let components consume only semantic tokens.",
];

const componentGroups = [
  {
    group: "Foundation",
    items: [
      ["Button", "variant, size, tone, loading, disabled, asChild", "solid, soft, outline, ghost, link", "xs, sm, md, lg", "hover, press, focus, loading", "button/link semantics, aria-busy"],
      ["Input", "value, defaultValue, error, prefix, suffix", "text, search, password, textarea", "sm, md, lg", "focus, invalid, disabled", "label, describedby, error id"],
      ["Select", "value, items, placeholder, disabled", "single, multi, combobox", "sm, md", "open, selected, highlighted", "Radix Select roles"],
      ["Checkbox", "checked, indeterminate, disabled", "default, card, table", "sm, md", "checked, mixed, focus", "native input semantics"],
      ["Switch", "checked, disabled", "default, compact", "sm, md", "on, off, focus", "role switch, labelledby"],
      ["Radio", "value, group, disabled", "default, segmented", "sm, md", "checked, focus", "roving tabindex"],
      ["Badge", "tone, variant, icon", "solid, soft, outline", "sm, md", "neutral, success, warning, error", "text contrast AA"],
    ],
  },
  {
    group: "Layout",
    items: [
      ["Card", "tone, padding, interactive", "surface, container, outline", "sm, md, lg", "hover, selected", "semantic section/article"],
      ["Container", "size, bleed, padding", "page, content, prose", "sm, md, lg, xl", "responsive", "landmark compatible"],
      ["Stack", "gap, align, justify, direction", "vertical, horizontal", "all spacing tokens", "wrap, collapse", "preserves DOM order"],
      ["Grid", "columns, gap, minColumn", "auto, fixed, responsive", "all spacing tokens", "reflow", "logical tab order"],
    ],
  },
  {
    group: "Navigation",
    items: [
      ["Navbar", "items, actions, collapsed", "product, docs, app", "desktop, mobile", "active, scrolled", "nav landmark"],
      ["Sidebar", "items, groups, collapsed", "rail, full, floating", "compact, standard", "active, hover", "keyboard traversal"],
      ["Tabs", "value, orientation, activationMode", "line, contained, segmented", "sm, md", "active, focus", "Radix Tabs roles"],
      ["Breadcrumb", "items, maxItems", "default, compact", "sm, md", "current, overflow", "aria-current page"],
    ],
  },
  {
    group: "Feedback",
    items: [
      ["Dialog", "open, modal, title, description", "alert, form, command", "sm, md, lg", "enter, exit, focus trap", "Radix Dialog contract"],
      ["Drawer", "open, side, snapPoints", "side, bottom", "sm, md, lg", "drag, dismiss", "focus return"],
      ["Toast", "title, action, tone, duration", "info, success, warning, error", "sm, md", "queued, dismissed", "live region"],
      ["Tooltip", "content, delay, side", "default, rich", "sm", "open, close", "aria-describedby"],
    ],
  },
  {
    group: "Data",
    items: [
      ["Table", "columns, rows, density, selection", "plain, bordered, interactive", "compact, standard", "hover, selected, sorted", "table semantics"],
      ["DataGrid", "columns, rows, virtualized, editable", "read, edit, tree", "compact, standard", "focus cell, resize", "grid roles"],
      ["Pagination", "page, total, pageSize", "numbered, simple", "sm, md", "current, disabled", "aria-current, labels"],
    ],
  },
];

const motionRows = [
  ["Micro", "Button hover, input focus, row select", "80-160ms", "power2.out", "Confirms input without stealing attention"],
  ["Component", "Dialog, drawer, menu, card expand", "160-260ms", "power3.out", "Shows origin, destination, and hierarchy"],
  ["Page", "Section reveal, route transition, scroll relation", "260-520ms", "power2.inOut", "Preserves spatial memory between states"],
  ["Reduced", "All motion-sensitive surfaces", "0-80ms", "linear", "Uses opacity/color only when reduced motion is requested"],
];

const architectureRows = [
  ["React + TypeScript", "Strict props, polymorphic asChild support, typed variants, controlled/uncontrolled patterns."],
  ["Tailwind CSS", "Utility layer consumes Lazy tokens; no hard-coded product color in components."],
  ["Radix UI", "Behavior primitives for dialog, select, tabs, tooltip, popover, radio, and focus management."],
  ["CSS Variables", "Runtime theme switching through scoped variables with zero component re-render requirement."],
  ["Tree Shaking", "One component per entry, side-effect-light style imports, explicit icon usage."],
  ["Accessibility", "AA contrast targets, focus-visible rings, reduced motion, keyboard and screen-reader tests."],
];

const presets = [
  { name: "SaaS Jade", value: "#1f8a70" },
  { name: "Geist Black", value: "#111111" },
  { name: "Linear Blue", value: "#3b5bdb" },
  { name: "Coral Ops", value: "#d94f30" },
  { name: "Product Violet", value: "#7651a8" },
];

export function App() {
  const [source, setSource] = useState("#1f8a70");
  const [mode, setMode] = useState<LazyMode>("light");
  const [density, setDensity] = useState<Density>("standard");
  const [activeSection, setActiveSection] = useState("philosophy");
  const rootRef = useRef<HTMLDivElement>(null);

  const themeVars = useMemo(() => {
    return {
      ...createLazyVars(normalizeHex(source), mode),
      "--ld-density": density === "compact" ? "0.86" : "1",
    } as CSSProperties;
  }, [density, mode, source]);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".spec-section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.4, y: 28 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "top 52%",
              scrub: 0.4,
            },
          },
        );
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-18% 0px -64% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    document.querySelectorAll(".spec-section").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  async function handleImageSource(file?: File) {
    if (!file) return;
    const image = new Image();
    image.src = URL.createObjectURL(file);
    await image.decode();

    const canvas = document.createElement("canvas");
    const size = 64;
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(image, 0, 0, size, size);
    const pixels = context.getImageData(0, 0, size, size).data;
    let red = 0;
    let green = 0;
    let blue = 0;
    let weightTotal = 0;

    for (let index = 0; index < pixels.length; index += 16) {
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const alpha = pixels[index + 3] / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const saturation = max === 0 ? 0 : (max - min) / max;
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      const weight = alpha * (0.35 + saturation) * (1 - Math.abs(luminance - 0.56));
      red += r * weight;
      green += g * weight;
      blue += b * weight;
      weightTotal += weight;
    }

    URL.revokeObjectURL(image.src);
    if (weightTotal > 0) {
      setSource(
        rgbToHex(
          Math.round(red / weightTotal),
          Math.round(green / weightTotal),
          Math.round(blue / weightTotal),
        ),
      );
    }
  }

  return (
    <div className="app" data-density={density} data-mode={mode} ref={rootRef} style={themeVars}>
      <aside className="sidebar" aria-label="LazyDesign sections">
        <a className="brand" href="#philosophy">
          <span className="brand-mark">
            <Sparkles size={18} />
          </span>
          <span>
            <strong>LazyDesign</strong>
            <small>Interface Design Language</small>
          </span>
        </a>

        <nav className="section-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                className={activeSection === item.id ? "nav-link active" : "nav-link"}
                href={`#${item.id}`}
                key={item.id}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="sidebar-note">
          <CheckCircle2 size={16} />
          <span>Flat-first, token-driven, production-oriented.</span>
        </div>
      </aside>

      <main className="spec-shell">
        <header className="spec-toolbar">
          <div className="search-field">
            <Search size={16} />
            <span>LazyDesign Specification v0.2.2</span>
          </div>
          <div className="toolbar-actions">
            <button className="icon-button" onClick={() => setMode(mode === "light" ? "dark" : "light")} type="button">
              {mode === "light" ? <Moon size={16} /> : <Sun size={16} />}
              <span>{mode}</span>
            </button>
            <button
              className={density === "compact" ? "text-button selected" : "text-button"}
              onClick={() => setDensity(density === "compact" ? "standard" : "compact")}
              type="button"
            >
              <PanelLeft size={16} />
              {density}
            </button>
          </div>
        </header>

        <div className="spec-layout">
          <article className="spec-document">
            <section className="spec-section intro-section" id="philosophy">
              <p className="kicker">Part 1 / Design Philosophy</p>
              <h1>LazyDesign is a complete interface language for modern software work.</h1>
              <p className="lead">
                It treats Material You as the color science, Geist as the restraint, Linear as the productivity
                benchmark, HeroUI as the component polish, shadcn as the composition model, and GSAP as the motion
                runtime. The result is one calm system, not a collage.
              </p>

              <div className="definition-grid">
                <div className="definition-panel">
                  <h2>Vision</h2>
                  <p>
                    Help teams build adaptive SaaS interfaces that feel fast, precise, and humane while staying
                    flat, accessible, and easy to compose.
                  </p>
                </div>
                <div className="definition-panel">
                  <h2>Product Personality</h2>
                  <p>
                    Quietly intelligent, operationally sharp, visually restrained, optimistic through interaction
                    quality rather than decoration.
                  </p>
                </div>
                <div className="definition-panel">
                  <h2>Visual Language</h2>
                  <p>
                    Neutral surfaces, semantic color, high-quality type rhythm, compact density, minimal borders,
                    and state layers that make every interaction legible.
                  </p>
                </div>
              </div>

              <div className="principle-grid">
                {principles.map((principle) => (
                  <section className="principle-card" key={principle.title}>
                    <h3>{principle.title}</h3>
                    <p>{principle.body}</p>
                  </section>
                ))}
              </div>

              <div className="refusal-block">
                <h2>What LazyDesign refuses to do</h2>
                <ul>
                  {refusals.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="spec-section" id="tokens">
              <p className="kicker">Part 2 / Design Token System</p>
              <h2>Tokens are the contract between brand, product density, accessibility, and implementation.</h2>
              <p>
                LazyDesign uses semantic tokens over raw palette values. Components never consume hex colors
                directly; they consume roles that adapt to light mode, dark mode, and dynamic source color.
              </p>

              <SpecTable
                columns={["Color Token", "Role", "Light Mode", "Dark Mode"]}
                rows={colorTokens}
                title="Color Tokens"
              />
              <SpecTable
                columns={["Type Token", "Size / Line", "Weight", "Tracking", "Use"]}
                rows={typographyTokens}
                title="Typography"
              />
              <SpecTable columns={["Spacing", "Value", "Use"]} rows={spacingTokens} title="Spacing / 4px base" />
              <SpecTable columns={["Shape Token", "Value", "Use"]} rows={shapeTokens} title="Shape" />
              <SpecTable columns={["Elevation", "Meaning", "Treatment", "Use"]} rows={elevationTokens} title="Elevation" />
            </section>

            <section className="spec-section" id="theme">
              <p className="kicker">Part 3 / LazyTheme Engine</p>
              <h2>LazyTheme turns brand color or imagery into a full semantic UI palette.</h2>
              <p>
                The engine follows Monet's tonal palette model, then narrows the output into SaaS-safe roles:
                primary, secondary, tertiary, surfaces, background, text, border, error, and state layers.
              </p>

              <div className="pipeline">
                {themePipeline.map((step, index) => (
                  <div className="pipeline-step" key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>

              <pre className="code-block">
                <code>{`const theme = resolveTheme({
  source: "#6750A4",
  mode: "dark",
  contrast: "normal",
  density: "standard",
  style: "linear",
});

theme.apply(document.documentElement);`}</code>
              </pre>
            </section>

            <section className="spec-section" id="components">
              <p className="kicker">Part 4 / Component Architecture</p>
              <h2>Components are polished by default, but architected as composable primitives.</h2>
              <p>
                Every Lazy component has a visual shell, a headless behavior contract, semantic tokens, keyboard
                behavior, dark-mode parity, and explicit density rules.
              </p>

              {componentGroups.map((group) => (
                <SpecTable
                  columns={["Component", "API", "Variants", "Sizes", "States", "Accessibility"]}
                  key={group.group}
                  rows={group.items}
                  title={group.group}
                />
              ))}
            </section>

            <section className="spec-section" id="motion">
              <p className="kicker">Part 5 / LazyMotion</p>
              <h2>Motion exists to preserve meaning across state changes.</h2>
              <p>
                LazyMotion uses GSAP and ScrollTrigger for reliable orchestration, but follows Google-style motion:
                fast feedback, clear spatial continuity, reduced-motion support, and no ornamental bounce.
              </p>
              <SpecTable columns={["Layer", "Examples", "Duration", "Ease", "Purpose"]} rows={motionRows} title="Motion Scale" />
              <div className="motion-rule-grid">
                <div>
                  <h3>Micro interaction</h3>
                  <p>Use color fill, border tone, 1px translate, and focus ring. Keep under 160ms.</p>
                </div>
                <div>
                  <h3>Component animation</h3>
                  <p>Animate opacity and transform from the triggering edge or control. Preserve focus return.</p>
                </div>
                <div>
                  <h3>Page animation</h3>
                  <p>Use ScrollTrigger for section relationships, progress, and reveal only when it helps orientation.</p>
                </div>
              </div>
            </section>

            <section className="spec-section" id="architecture">
              <p className="kicker">Part 6 / Developer Architecture</p>
              <h2>Production implementation is token-first, accessible, tree-shakeable, and framework-friendly.</h2>
              <SpecTable columns={["Layer", "Requirement"]} rows={architectureRows} title="Implementation Stack" />
              <pre className="code-block">
                <code>{`@lazydesign/react
  /button
  /input
  /dialog
  /theme
  /motion

@lazydesign/tokens
  /css
  /tailwind
  /json

@lazydesign/motion
  /gsap
  /scroll-trigger`}</code>
              </pre>
            </section>
          </article>

          <aside className="inspector" aria-label="LazyTheme inspector">
            <section className="inspector-panel">
              <div className="panel-title">
                <WandSparkles size={16} />
                <span>LazyTheme</span>
              </div>
              <label className="source-control">
                <span>Source color</span>
                <input
                  aria-label="Source color"
                  onChange={(event) => setSource(event.target.value)}
                  type="color"
                  value={source}
                />
                <strong>{source.toUpperCase()}</strong>
              </label>
              <label className="upload-control">
                <Upload size={15} />
                Generate from image
                <input
                  accept="image/*"
                  onChange={(event) => void handleImageSource(event.target.files?.[0])}
                  type="file"
                />
              </label>
              <div className="preset-list">
                {presets.map((preset) => (
                  <button key={preset.value} onClick={() => setSource(preset.value)} type="button">
                    <span style={{ background: preset.value }} />
                    {preset.name}
                  </button>
                ))}
              </div>
            </section>

            <section className="inspector-panel">
              <div className="panel-title">
                <Boxes size={16} />
                <span>Resolved roles</span>
              </div>
              <div className="role-list">
                {[
                  ["Primary", "var(--ld-color-primary)", "var(--ld-color-on-primary)"],
                  ["Secondary", "var(--ld-color-secondary)", "var(--ld-color-on-secondary)"],
                  ["Tertiary", "var(--ld-color-tertiary)", "var(--ld-color-on-tertiary)"],
                  ["Surface", "var(--ld-color-surface-container)", "var(--ld-color-on-surface)"],
                  ["Outline", "var(--ld-color-outline-variant)", "var(--ld-color-on-surface)"],
                ].map(([label, background, color]) => (
                  <div className="role-chip" key={label} style={{ background, color }}>
                    <span>{label}</span>
                    <code>{background.replace("var(--ld-", "").replace(")", "")}</code>
                  </div>
                ))}
              </div>
            </section>

            <section className="inspector-panel checklist">
              <div className="panel-title">
                <Accessibility size={16} />
                <span>Non-negotiables</span>
              </div>
              {["AA contrast", "Keyboard first", "Reduced motion", "Scoped CSS vars", "No decorative effects"].map(
                (item) => (
                  <div className="check-row" key={item}>
                    <CheckCircle2 size={15} />
                    <span>{item}</span>
                  </div>
                ),
              )}
            </section>

            <section className="inspector-panel">
              <div className="panel-title">
                <Route size={16} />
                <span>Spec files</span>
              </div>
              <a className="file-link" href="/docs/lazydesign-spec.md">
                <Code2 size={15} />
                docs/lazydesign-spec.md
              </a>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

function SpecTable({
  columns,
  rows,
  title,
}: {
  columns: string[];
  rows: string[][];
  title: string;
}) {
  return (
    <section className="table-section">
      <h3>{title}</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join("-")}>
                {row.map((cell, index) => (
                  <td key={`${cell}-${index}`}>{index === 0 && cell.startsWith("--") ? <code>{cell}</code> : cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
