# LazyDesign Specification

Version: 0.1  
Status: Design language draft  
Scope: Interface Design Language, Design Tokens, Theme Engine, Components, Motion, Developer Architecture

LazyDesign 不是 UI component library。它是一套面向现代 SaaS、开发工具、数据产品和高密度工作台的 Interface Design Language。

它的假设是：高级感来自 typography、spacing、color、interaction，而不是 gradient、shadow、glass。

---

## Part 1. LazyDesign Design Philosophy

### Vision

LazyDesign 的目标是让团队构建一种新的现代软件界面：

- 像 Google Material You 一样具备动态主题和可访问性基础。
- 像 Vercel Geist 一样克制、精确、排版优先。
- 像 Linear 一样高密度、高效率、面向真实生产力。
- 像 HeroUI 一样拥有精致默认状态。
- 像 shadcn/ui 一样可组合、可拥有、可扩展。
- 像 GSAP 一样有生命力，但每个动效都有意义。

LazyDesign 的一句话定义：

> A flat-first adaptive interface language for focused software work.

### Design Principles

#### 1. Flat First

LazyDesign 默认是扁平的。

层级优先来自：

- 色彩角色
- 排版大小与字重
- 间距密度
- 边框层级
- 状态层
- 内容结构

只有在 overlay、popover、dialog 这类真实空间关系需要解释时，才使用克制阴影。

#### 2. Density With Dignity

LazyDesign 支持高信息密度，但不牺牲阅读。

规则：

- 表格、列表、导航允许 compact density。
- 表单、长文档、复杂决策界面使用 standard density。
- 重要动作永远不被密度压扁。
- 交互目标必须满足可点击面积要求。

#### 3. Dynamic, Not Decorative

Monet 动态色不是装饰工具，而是主题生成工具。

动态色必须映射为语义 token：

- Primary
- Secondary
- Tertiary
- Surface
- Background
- Outline
- Error
- On Color

组件禁止直接消费随机 hex 值。

#### 4. Motion With Purpose

动画只服务四件事：

- 反馈：用户行为是否被接收。
- 转换：状态如何变化。
- 空间：界面元素从哪里来，到哪里去。
- 注意力：用户现在应该看哪里。

LazyDesign 不做炫技动画。

#### 5. Composition Over Configuration

组件 API 应该像 shadcn/ui：

- 可组合
- 可拷贝
- 可重写
- 可拥有
- 与业务代码自然融合

组件不应该变成无法理解的巨大配置对象。

#### 6. Accessibility Is A Contract

可访问性不是 checklist，而是组件契约。

每个组件必须定义：

- keyboard behavior
- focus behavior
- ARIA contract
- contrast target
- reduced motion behavior
- screen reader semantics

### Visual Language

LazyDesign 的视觉语言由以下元素组成：

| Layer | Direction |
| --- | --- |
| Color | Semantic, dynamic, restrained |
| Type | High clarity, no negative tracking, product-grade rhythm |
| Space | 4px base unit, dense but breathable |
| Shape | 6-8px default radius, 12px for expressive containers |
| Surface | Tonal hierarchy before shadow |
| Border | Primary hierarchy tool for SaaS surfaces |
| Motion | Fast, short, contextual |

### Product Personality

LazyDesign 的性格：

- Calm
- Precise
- Fast
- Professional
- Slightly optimistic
- Never ornamental

它应该感觉像：

> Google 设计了现代 SaaS UI 系统，Vercel 负责审美，Linear 负责产品体验，shadcn 负责架构，GSAP 负责生命力。

### What LazyDesign Refuses To Do

LazyDesign 拒绝：

- 默认玻璃拟态。
- 大面积渐变背景。
- 夸张阴影。
- 无意义发光。
- 巨型 landing hero 作为产品界面。
- 只为截图好看的 Dribbble 风格装饰。
- 无法键盘操作的组件。
- 只能配置、不能组合的组件 API。
- 慢、弹、炫但无法解释界面变化的动画。

---

## Part 2. Design Token System

LazyDesign token 分三层：

1. Palette Tokens：由 Monet 生成的原始 tonal palette。
2. Semantic Tokens：组件消费的语义角色。
3. Component Tokens：组件内部状态和尺寸变量。

组件只能消费 Semantic Tokens 和 Component Tokens。

### Color Token Architecture

#### Core Semantic Tokens

| Token | Role |
| --- | --- |
| `--ld-color-primary` | 主操作、选中态、核心品牌表达 |
| `--ld-color-on-primary` | primary 上的文字和图标 |
| `--ld-color-primary-container` | 低强调 primary 背景 |
| `--ld-color-on-primary-container` | primary container 上的内容 |
| `--ld-color-secondary` | 次级操作、过滤器、辅助控件 |
| `--ld-color-on-secondary` | secondary 上的内容 |
| `--ld-color-secondary-container` | 次级选中背景 |
| `--ld-color-tertiary` | 元数据、上下文 accent、产品状态 |
| `--ld-color-background` | 应用 canvas |
| `--ld-color-on-background` | canvas 上文字 |
| `--ld-color-surface` | 默认组件表面 |
| `--ld-color-on-surface` | surface 主文字 |
| `--ld-color-surface-container-low` | 低层容器 |
| `--ld-color-surface-container` | 默认 panel/card/nav 容器 |
| `--ld-color-surface-container-high` | sticky、selected、raised flat surface |
| `--ld-color-surface-variant` | 次要控件背景、table header |
| `--ld-color-on-surface-variant` | 次要文字 |
| `--ld-color-outline` | 强边框 |
| `--ld-color-outline-variant` | 弱边框、分割线 |
| `--ld-color-error` | 错误、破坏性操作 |
| `--ld-color-on-error` | error 上内容 |

#### Light Mode Tone Mapping

| Role | Tone |
| --- | --- |
| Primary | 40 |
| On Primary | 100 |
| Primary Container | 90 |
| On Primary Container | 10 |
| Secondary | 40 |
| Tertiary | 40 |
| Background | 98 |
| Surface | 99 |
| Surface Container Low | 96 |
| Surface Container | 94 |
| Surface Container High | 90 |
| On Surface | 10 |
| On Surface Variant | 30 |
| Outline | 50 |
| Outline Variant | 80 |
| Error | 40 |

#### Dark Mode Tone Mapping

| Role | Tone |
| --- | --- |
| Primary | 80 |
| On Primary | 20 |
| Primary Container | 30 |
| On Primary Container | 90 |
| Secondary | 80 |
| Tertiary | 80 |
| Background | 6 |
| Surface | 10 |
| Surface Container Low | 10 |
| Surface Container | 14 |
| Surface Container High | 20 |
| On Surface | 90 |
| On Surface Variant | 80 |
| Outline | 60 |
| Outline Variant | 30 |
| Error | 80 |

### Typography System

LazyDesign 使用无衬线字体作为默认产品字体。推荐：

- Inter
- Geist Sans
- system-ui fallback

不使用负 letter spacing。

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
| --- | --- | --- | --- | --- | --- |
| `display` | 40px | 48px | 700 | 0 | 产品级标题 |
| `heading-xl` | 28px | 36px | 650 | 0 | 页面标题 |
| `heading-lg` | 22px | 30px | 650 | 0 | section 标题 |
| `heading-md` | 18px | 26px | 650 | 0 | panel 标题 |
| `body-lg` | 16px | 26px | 400 | 0 | 长文档、说明 |
| `body-md` | 14px | 22px | 400 | 0 | 默认 UI copy |
| `body-sm` | 13px | 20px | 400 | 0 | 表格、密集列表 |
| `label-md` | 12px | 16px | 650 | 0.02em | label、badge、table header |
| `code-md` | 13px | 20px | 500 | 0 | token、API、代码 |

### Spacing System

LazyDesign 使用 4px 基础单位。

| Token | Value | Usage |
| --- | --- | --- |
| `space-1` | 4px | 微间距 |
| `space-2` | 8px | 控件内部间距 |
| `space-3` | 12px | compact card / table rhythm |
| `space-4` | 16px | 默认 padding |
| `space-5` | 20px | 密集 section |
| `space-6` | 24px | panel group |
| `space-8` | 32px | page gutters |
| `space-12` | 48px | section separation |
| `space-16` | 64px | major page rhythm |

### Shape System

LazyDesign 融合 Material 3 Expressive 的柔和性和 Linear 的专业克制。

| Token | Value | Usage |
| --- | --- | --- |
| `radius-1` | 2px | table focus cell、small highlight |
| `radius-2` | 4px | dense input、menu item |
| `radius-3` | 6px | button、badge |
| `radius-4` | 8px | default card、popover |
| `radius-5` | 12px | dialog、drawer、expressive container |
| `radius-full` | 999px | pill、switch、avatar |

规则：

- 默认组件半径不超过 8px。
- 表格、工作台、数据密集界面优先使用 4-6px。
- 只有 dialog、drawer、empty state container 可以使用 12px。

### Elevation System

LazyDesign 不以阴影作为主要层级工具。

| Level | Name | Treatment | Usage |
| --- | --- | --- | --- |
| 0 | Canvas | no border, no shadow | page background |
| 1 | Surface | 1px subtle border | cards, fields, panels |
| 2 | Surface Container High | tonal fill + border | sticky nav, selected row |
| 3 | Overlay | border + tight shadow | menu, popover, dialog |

阴影规则：

- shadow 只用于 overlay。
- shadow blur 小，opacity 低。
- card 默认不使用 shadow。
- hover 默认改变 surface / border，不抬高卡片。

---

## Part 3. Theme Engine

LazyTheme 是 LazyDesign 的动态主题引擎。

### Input

LazyTheme 支持：

- Brand Color
- Image
- Light Mode
- Dark Mode
- High Contrast
- Density
- Radius Preference

```ts
type LazyThemeInput =
  | {
      brandColor: string;
      mode?: "light" | "dark";
      contrast?: "normal" | "high";
      density?: "standard" | "compact";
    }
  | {
      image: File;
      mode?: "light" | "dark";
      contrast?: "normal" | "high";
      density?: "standard" | "compact";
    };
```

### Generation Pipeline

1. Normalize input color or extract representative image source color.
2. Generate tonal palettes using Material Color Utilities.
3. Create primary, secondary, tertiary, neutral, neutral variant, error palettes.
4. Map tones into Lazy semantic roles.
5. Validate contrast for text and state layers.
6. Emit CSS variables.
7. Scope variables at `:root`, theme provider, or component boundary.

### Output

```ts
type LazyTheme = {
  mode: "light" | "dark";
  source: string;
  tokens: {
    color: Record<string, string>;
    spacing: Record<string, string>;
    radius: Record<string, string>;
    typography: Record<string, string>;
    motion: Record<string, string>;
  };
  cssText: string;
  apply(target: HTMLElement): void;
};
```

### Generated Roles

LazyTheme 自动生成：

- Primary
- Secondary
- Tertiary
- Surface
- Surface Container
- Background
- Text
- Border
- Error
- Focus Ring
- State Hover
- State Pressed
- State Selected

---

## Part 4. Component Architecture

组件设计原则：

- Behavior from Radix UI.
- Styling from Lazy tokens.
- Composition from shadcn/ui.
- Defaults inspired by HeroUI.
- Density inspired by Linear.

每个组件必须定义：

- API
- Variants
- Sizes
- States
- Accessibility
- Dark Mode behavior

### Base Components

| Component | API | Variants | Sizes | States | Accessibility | Dark Mode |
| --- | --- | --- | --- | --- | --- | --- |
| Button | `variant`, `size`, `tone`, `loading`, `disabled`, `asChild` | solid, soft, outline, ghost, link | xs, sm, md, lg | hover, pressed, focus, loading, disabled | native button/link, `aria-busy` | same hierarchy, adjusted tone |
| Input | `value`, `defaultValue`, `error`, `prefix`, `suffix` | text, search, password, textarea | sm, md, lg | focus, invalid, disabled, readonly | label, `aria-describedby`, error id | surface contrast preserved |
| Select | `value`, `items`, `placeholder`, `disabled` | single, multi, combobox | sm, md | open, highlighted, selected | Radix Select roles | menu uses overlay level |
| Checkbox | `checked`, `indeterminate`, `disabled` | default, card, table | sm, md | checked, mixed, focus | native input semantics | selected tone adapts |
| Switch | `checked`, `disabled` | default, compact | sm, md | on, off, focus | `role="switch"` | thumb contrast preserved |
| Radio | `value`, `group`, `disabled` | default, segmented | sm, md | checked, focus | roving tabindex | selected state uses primary |
| Badge | `tone`, `variant`, `icon` | solid, soft, outline | sm, md | neutral, success, warning, error | AA contrast | tone remapped by mode |

### Layout Components

| Component | API | Variants | States | Accessibility |
| --- | --- | --- | --- | --- |
| Card | `tone`, `padding`, `interactive` | surface, container, outline | hover, selected | article/section semantics |
| Container | `size`, `bleed`, `padding` | page, content, prose | responsive | landmark compatible |
| Stack | `gap`, `align`, `justify`, `direction` | vertical, horizontal | wrap, collapse | preserves DOM order |
| Grid | `columns`, `gap`, `minColumn` | auto, fixed, responsive | reflow | logical tab order |

### Navigation Components

| Component | API | Variants | States | Accessibility |
| --- | --- | --- | --- | --- |
| Navbar | `items`, `actions`, `collapsed` | product, docs, app | active, scrolled | `nav` landmark |
| Sidebar | `items`, `groups`, `collapsed` | rail, full, floating | active, hover | keyboard traversal |
| Tabs | `value`, `orientation`, `activationMode` | line, contained, segmented | active, focus | Radix Tabs roles |
| Breadcrumb | `items`, `maxItems` | default, compact | current, overflow | `aria-current="page"` |

### Feedback Components

| Component | API | Variants | States | Accessibility |
| --- | --- | --- | --- | --- |
| Dialog | `open`, `modal`, `title`, `description` | alert, form, command | enter, exit, focus trap | Radix Dialog contract |
| Drawer | `open`, `side`, `snapPoints` | side, bottom | drag, dismiss | focus return |
| Toast | `title`, `action`, `tone`, `duration` | info, success, warning, error | queued, dismissed | live region |
| Tooltip | `content`, `delay`, `side` | default, rich | open, close | `aria-describedby` |

### Data Components

| Component | API | Variants | States | Accessibility |
| --- | --- | --- | --- | --- |
| Table | `columns`, `rows`, `density`, `selection` | plain, bordered, interactive | hover, selected, sorted | table semantics |
| DataGrid | `columns`, `rows`, `virtualized`, `editable` | read, edit, tree | focus cell, resize, edit | grid roles |
| Pagination | `page`, `total`, `pageSize` | numbered, simple | current, disabled | `aria-current`, labels |

---

## Part 5. Motion System

LazyMotion 使用 GSAP + ScrollTrigger，但遵守 Google-style meaningful motion。

### Motion Principles

- Fast feedback.
- Clear origin and destination.
- No ornamental bounce.
- No infinite attention loop.
- Reduced motion is mandatory.
- Motion should be interruptible.

### Timing Scale

| Layer | Duration | Use |
| --- | --- | --- |
| Instant | 0-80ms | hover color, selected state |
| Fast | 80-160ms | button press, input focus |
| Standard | 160-260ms | menu, tooltip, popover |
| Emphasized | 260-520ms | drawer, dialog, page section |

### Easing

| Token | Value | Use |
| --- | --- | --- |
| `ease-standard` | `power2.out` | default UI transition |
| `ease-enter` | `power3.out` | menu/dialog enter |
| `ease-exit` | `power2.in` | menu/dialog exit |
| `ease-emphasized` | `power2.inOut` | page-level relation |

### Micro Interaction

Examples:

- Button hover: background state layer.
- Button press: 1px translate or state fill.
- Input focus: border color + focus ring.
- Menu item hover: tonal row fill.

Rules:

- No scale above 1.02 for normal controls.
- No bounce.
- No animation longer than 160ms for basic feedback.

### Component Animation

Examples:

- Dialog enters from trigger context through opacity + translate.
- Drawer enters from its side.
- Card expand animates height only when content relationship matters.
- Menu opens from trigger edge.

Rules:

- Animate transform and opacity.
- Avoid layout thrash.
- Restore focus on close.
- Respect `prefers-reduced-motion`.

### Page Animation

Examples:

- Hero or intro document reveal.
- Scroll reveal for long spec pages.
- Section transition showing continuity between document regions.

GSAP + ScrollTrigger usage:

```ts
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
```

---

## Part 6. Developer Architecture

Target stack:

- React
- TypeScript
- Tailwind CSS
- Radix UI
- CSS Variables
- GSAP

### Package Structure

```txt
@lazydesign/react
  /button
  /input
  /select
  /dialog
  /drawer
  /table
  /theme
  /motion

@lazydesign/tokens
  /json
  /css
  /tailwind

@lazydesign/motion
  /gsap
  /scroll-trigger
```

### React Component Pattern

```tsx
type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "solid" | "soft" | "outline" | "ghost" | "link";
  size?: "xs" | "sm" | "md" | "lg";
  tone?: "primary" | "secondary" | "neutral" | "danger";
  loading?: boolean;
  asChild?: boolean;
};
```

Rules:

- Components support `forwardRef`.
- Components expose `data-state`, `data-disabled`, `data-invalid`.
- Components use CSS variables for all color, radius, spacing, and motion.
- Components avoid hard-coded theme colors.
- Components can be copied into app code.

### Tailwind Integration

Tailwind consumes LazyDesign variables:

```ts
theme: {
  colors: {
    primary: "var(--ld-color-primary)",
    surface: "var(--ld-color-surface)",
    border: "var(--ld-color-outline-variant)",
  },
  borderRadius: {
    md: "var(--ld-radius-4)",
  },
}
```

### Theme Switching

Theme switching should work by changing CSS variables on a scoped root:

```tsx
<LazyThemeProvider source="#1f8a70" mode="dark">
  <App />
</LazyThemeProvider>
```

No component should need to know whether the app is light or dark unless behavior changes.

### Production Requirements

- Tree-shakeable component entrypoints.
- ESM-first package output.
- TypeScript declarations.
- SSR-safe theme initialization.
- No layout shift during theme hydration.
- Accessible Radix primitives for complex behavior.
- Visual regression tests for light, dark, and dynamic themes.
- Keyboard tests for all interactive components.
- Reduced motion tests for motion primitives.

---

## Final Definition

LazyDesign is:

- Material You for adaptive color.
- Geist for restraint.
- Linear for productivity.
- HeroUI for polished defaults.
- shadcn/ui for ownership and composition.
- GSAP for meaningful motion.

But LazyDesign is not a collage.

It is a unified interface language for people building serious software.
