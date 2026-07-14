# LazyDesign v0.8 Data Surface Foundation Design

**Status:** Approved direction for planning  
**Release target:** `v0.8.0`  
**Scope:** Table anatomy, sorting affordance, pagination, data toolbar, empty state, component tokens, automated tests, and LazyTeam.wtf workstream integration

## Purpose

LazyDesign v0.8 establishes the first data surface layer for dense SaaS interfaces. The release adds controlled table primitives and adjacent workflow components without becoming a heavy data grid.

The goal is to prove that LazyDesign can carry real operational data with the same Digital Industrialism principles as the rest of the system: flat surfaces, one-pixel border hierarchy, compact spacing, semantic color, accessible interaction, and developer-owned state. Data components should feel closer to Linear issue views, Vercel deployment lists, and IDE panels than to decorative dashboard cards.

## Product Principles

- Data surfaces are structural work areas, not decorated cards.
- Table hierarchy comes from typography, alignment, surface levels, row separators, and active indicators.
- LazyDesign owns rendering, tokens, density, keyboard-safe controls, and accessible labels.
- Application code owns data fetching, sorting state, filtering state, pagination state, and row actions.
- Components use component tokens first. CSS must not reach directly for primitive color values when a component token exists.
- The first release optimizes for predictable composition over feature count.
- The public API must stay small enough to support future DataGrid work without breaking consumers.

## Approaches Considered

### Approach A: Full DataGrid

This would ship column resize, virtualization, pinning, selection, sorting, filtering, and pagination as one large component.

Trade-off: it looks impressive quickly, but it would force LazyDesign to freeze complex behavior before the table token contract, density model, and accessibility policy are proven.

### Approach B: Visual Table Only

This would add CSS classes and simple table wrappers with no sorting, pagination, toolbar, or empty state.

Trade-off: it is small and easy to ship, but it does not prove real SaaS workflows and leaves every product team to re-create the same surrounding data controls.

### Approach C: Data Surface Foundation

This ships a controlled table anatomy plus the minimum adjacent components needed for production data views:

1. Table structure and cell alignment.
2. Sort affordance that exposes state without owning data sorting.
3. Pagination controls that expose navigation semantics without owning page state.
4. Toolbar and empty state components for common data view framing.
5. LazyTeam.wtf integration that replaces the current workstream list with a real controlled table.

Decision: v0.8 uses Approach C. It creates a durable foundation for dense interfaces while keeping advanced DataGrid behavior out of scope.

## Architecture

```txt
LazyProvider theme input
  -> resolveTheme()
  -> semantic color, density, radius, motion preference
  -> data surface component tokens
  -> Table / Pagination / Toolbar / EmptyState CSS

Application data state
  -> sort key and direction
  -> page and page size
  -> filtered row list
  -> LazyDesign controlled components
  -> accessible rendered data surface

Primitive layer
  -> Box / Stack / Surface / Text
  -> data components
  -> LazyTeam.wtf workstream view
```

The data surface system has four layers:

1. Token contract: table, row, cell, pagination, toolbar, and empty state variables.
2. Component anatomy: semantic table wrappers and controlled action components.
3. Behavior contract: ARIA state, focus visibility, disabled navigation, and user-owned data state.
4. Product pattern: LazyTeam.wtf workstream table with sorting, pagination, summary, and empty state.

## Component Scope

### Table

Table provides semantic structure and visual density. It does not manage rows, columns, sorting, pagination, selection, or loading.

```tsx
<Table density="compact" aria-label="Component workstream">
  <TableHeader>
    <TableRow>
      <TableCell as="th" scope="col">Issue</TableCell>
      <TableCell as="th" scope="col">
        <TableSortButton direction="descending" onClick={sortByUpdated}>
          Updated
        </TableSortButton>
      </TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {items.map((item) => (
      <TableRow key={item.id}>
        <TableCell tone="code">{item.id}</TableCell>
        <TableCell>{item.title}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

Public anatomy:

- `Table`
- `TableHeader`
- `TableBody`
- `TableFooter`
- `TableRow`
- `TableCell`
- `TableCaption`

`Table` props:

- `density?: "standard" | "compact"`
- `surface?: "flat" | "container"`
- `striped?: boolean`

`TableRow` props:

- `interactive?: boolean`
- `selected?: boolean`

`TableCell` props:

- `as?: "td" | "th"`
- `align?: "start" | "center" | "end"`
- `tone?: "default" | "muted" | "code"`
- `truncate?: boolean`

The default rendering should use native table elements. The API may accept standard table attributes through React prop extension.

### TableSortButton

TableSortButton is a controlled affordance for sortable column headers.

```tsx
<TableCell as="th" scope="col" aria-sort="descending">
  <TableSortButton direction="descending" onClick={() => setSort("updated")}>
    Updated
  </TableSortButton>
</TableCell>
```

Props:

- `direction?: "ascending" | "descending" | "none"`
- `active?: boolean`
- `children: React.ReactNode`

The component renders a button and a visual indicator. It does not set `aria-sort` on its own because `aria-sort` belongs on the column header cell. Documentation and tests must show the correct composition.

### Pagination

Pagination provides compact page navigation for controlled data sets.

```tsx
<Pagination
  page={page}
  pageCount={pageCount}
  onPageChange={setPage}
/>
```

Props:

- `page: number`
- `pageCount: number`
- `onPageChange: (page: number) => void`
- `boundaryCount?: number`
- `siblingCount?: number`
- `size?: "sm" | "md"`
- `ariaLabel?: string`

Pagination renders first, previous, numbered page, next, and last controls as needed. It disables invalid navigation and gives every control a clear accessible label.

### DataToolbar

DataToolbar frames a data view without becoming a filtering engine.

```tsx
<DataToolbar
  title="Component workstream"
  description="7 issues across runtime, motion, and data surfaces"
  actions={<Button size="sm">New issue</Button>}
/>
```

Props:

- `title?: React.ReactNode`
- `description?: React.ReactNode`
- `summary?: React.ReactNode`
- `actions?: React.ReactNode`
- `children?: React.ReactNode`

Toolbar layout must support search fields, segmented controls, filters, and actions as children, but v0.8 does not ship a filter state engine.

### EmptyState

EmptyState gives data views a consistent no-results surface.

```tsx
<EmptyState
  title="No work items"
  description="Adjust filters or create a new issue to continue."
  action={<Button size="sm">Create issue</Button>}
/>
```

Props:

- `title: React.ReactNode`
- `description?: React.ReactNode`
- `action?: React.ReactNode`
- `icon?: React.ReactNode`
- `size?: "sm" | "md"`

EmptyState uses quiet typography, a restrained border, and no illustrative decoration by default.

## Component Tokens

v0.8 adds data surface tokens to `lazyComponentTokenVars`, `lazyComponentTokens`, `LazyComponentTheme`, and `createComponentVars`.

```txt
--ld-component-table-background
--ld-component-table-foreground
--ld-component-table-border
--ld-component-table-header-background
--ld-component-table-header-foreground
--ld-component-table-row-background-hover
--ld-component-table-row-background-selected
--ld-component-table-row-border
--ld-component-table-cell-padding-x
--ld-component-table-cell-padding-y
--ld-component-table-cell-height
--ld-component-table-cell-muted
--ld-component-table-cell-code
--ld-component-table-sort-indicator
--ld-component-table-radius

--ld-component-pagination-background
--ld-component-pagination-foreground
--ld-component-pagination-border
--ld-component-pagination-background-hover
--ld-component-pagination-background-active
--ld-component-pagination-foreground-active
--ld-component-pagination-radius
--ld-component-pagination-item-size
--ld-component-pagination-gap

--ld-component-data-toolbar-background
--ld-component-data-toolbar-foreground
--ld-component-data-toolbar-border
--ld-component-data-toolbar-radius
--ld-component-data-toolbar-padding
--ld-component-data-toolbar-gap

--ld-component-empty-state-background
--ld-component-empty-state-foreground
--ld-component-empty-state-border
--ld-component-empty-state-radius
--ld-component-empty-state-padding
--ld-component-empty-state-icon
```

The default compact table row height should align with the current compact control system. Header and body cells should keep letter spacing at `0`.

## Visual Language

Tables use the same flat-first surface ladder as `Surface` and `Card`, but they should read as embedded work surfaces rather than floating panels.

Visual rules:

- One-pixel border on the outer table container when `surface="container"`.
- One-pixel row separators using the table row border token.
- Header background uses a subtle surface container level, not a gradient.
- Active sort uses a small primary-toned indicator, not a saturated full-cell fill.
- Hover and selected states use state layer tokens and must remain subtle in dark mode.
- Code-like issue IDs use the code typography token and table code color token.
- Empty states are quiet and compact, with no illustration requirement.

## Accessibility Contract

- Table uses native `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, and `caption` elements by default.
- Sortable column headers place `aria-sort` on the `th`.
- `TableSortButton` is keyboard reachable and exposes a visible focus ring.
- Pagination uses `nav` with a configurable `aria-label`.
- Pagination marks the current page with `aria-current="page"`.
- Pagination buttons have labels such as "Go to next page" and "Go to page 3".
- Disabled pagination controls use the disabled attribute and cannot fire `onPageChange`.
- EmptyState exposes title and description as normal readable content, not only as visual decoration.
- Toolbar actions remain keyboard reachable and preserve source order on small screens.
- The components must pass light mode, dark mode, compact density, and reduced motion rendering.

## LazyTeam.wtf Integration

The product example upgrades the existing `Component workstream` list into a controlled data surface.

Required behavior:

- Show issue, title, owner, state, priority, and updated columns.
- Sort by updated date and priority through `TableSortButton`.
- Paginate the workstream with `Pagination`.
- Show a `DataToolbar` summary above the table.
- Include an `EmptyState` branch that appears when filters produce no rows.
- Keep compact density and avoid horizontal overflow on mobile.
- Preserve the current LazyTeam.wtf cockpit identity: zinc surfaces, strict spacing, restrained dynamic color, and no landing-page treatment.

The example should demonstrate data state in application code:

```tsx
const [sort, setSort] = useState<{ key: "updated" | "priority"; direction: "ascending" | "descending" }>();
const [page, setPage] = useState(1);
```

LazyDesign components receive the resolved state but do not own it.

## Automated Testing

Required unit tests:

- Theme resolution emits table, pagination, data toolbar, and empty state token namespaces.
- Table renders semantic table anatomy and forwards table attributes.
- TableCell supports `th`, alignment, muted tone, code tone, and truncation attributes or classes.
- TableSortButton renders a button, exposes direction state, and fires `onClick`.
- Pagination disables invalid navigation, marks the current page, labels controls, and calls `onPageChange` with the correct page.
- DataToolbar renders title, description, summary, actions, and children.
- EmptyState renders title, description, action, and optional icon.

Required integration tests:

- LazyTeam.wtf renders the workstream as a table.
- Sorting by updated changes row order.
- Sorting by priority changes row order.
- Pagination changes the visible issue set.
- EmptyState branch can render from controlled filter state.
- Existing v0.7 overlay workflows still pass.

Tests should assert behavior, semantics, visible text, and focusable controls. They must not assert private class names except where class hooks are part of the public styling contract.

## Dependencies

No new production dependency is required for v0.8.

The implementation should use React, TypeScript, CSS variables, existing primitives, and existing component helpers. If future DataGrid work needs virtualization or table state libraries, those dependencies must be evaluated behind a separate spec.

## Release and Documentation

- Package version becomes `0.8.0` after implementation.
- README documents the Data Surface Foundation API and controlled-state pattern.
- `public/docs/lazydesign-spec.md` updates runtime status, token groups, and component API.
- `design/component-policy.md` gains data surface guidance.
- LazyTeam.wtf demonstrates the workstream table without becoming a generic component gallery.
- Every modification is committed and pushed after verification.

## Out of Scope

- DataGrid.
- Virtualization.
- Column resize.
- Column pinning.
- Row selection and batch actions.
- Inline cell editing.
- Tree tables.
- Server-side data fetching abstractions.
- Filter query builders.
- Navigation components, sidebar, menu, and command menu.
- New animation adapters or GSAP API exposure.

These remain later phases built on the v0.8 data surface foundation.
