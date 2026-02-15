# Portfolio Project – Technical Documentation

This document details the architectural and implementation decisions behind the portfolio project, with emphasis on styling strategy, theming architecture, component design, and the custom carousel engine.

---

## 1. Tech Stack

- **Framework:** React 19 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) + Native CSS Variables
- **Animations:** `@react-spring/web` + CSS Keyframes
- **Icons:** `react-icons`, `@icons-pack/react-simple-icons`

### Design Priorities

- Runtime performance
- Minimal abstraction overhead
- Predictable rendering behavior
- Strong type safety

---

## 2. Theming Architecture (Context-Free)

The theme system is implemented **without React Context** to eliminate unnecessary re-renders and avoid provider nesting complexity. Instead, it relies on:

- Native CSS custom properties
- Semantic token mapping
- Direct DOM class toggling

### Core Principles

- Zero React re-render dependency
- Instant theme switching
- Semantic color abstraction
- Clear separation between logic and styling

### 2.1 Global Theme Tokens

Defined in `src/App.css` using Tailwind v4’s `@theme` directive. Components never reference raw color values directly; all styling flows through semantic tokens.

```css
@theme {
  --color-background: oklch(95.629% 0.02245 87.151);
  --color-foreground: oklch(19.08% 0.02358 246.56);
}
```

### 2.2 Dark Mode Override Strategy

The `useTheme` hook:

1. Stores `"light"` | `"dark"` state.
2. Toggles the `dark` class directly on `<html>`.
3. Avoids React Context entirely.

```css
html.dark {
  body {
    background-color: var(--color-gray-600);
    color: var(--color-beige-200);
  }
}
```

When `html.dark` is applied:

- CSS variables cascade instantly.
- No component re-render occurs.
- Layout remains stable.

This ensures constant-time theme switching with minimal runtime overhead.

---

## 3. Tailwind CSS Architecture

Tailwind v4 is configured directly inside CSS using `@theme`.

### 3.1 Semantic Design Tokens

Instead of hardcoding utility colors, semantic tokens are mapped:

- `--color-primary`
- `--color-background`
- `--color-foreground`

This provides:

- Centralized color management.
- Predictable light/dark overrides.
- Cleaner JSX.

### 3.2 Layered Styling Strategy

#### `@layer utilities`

Low-level helpers:

- `.no-scrollbar`
- Micro-layout utilities

#### `@layer components`

Reusable abstractions:

- `.card`
- `.pill-container`
- `.rainbow-text`

**Benefits:**

- Cleaner TSX.
- Reduced utility clutter.
- Consistent visual language.

The structure balances utility-first ergonomics with component-level abstraction.

---

## 4. Animation Strategy

The animation system separates responsibilities between CSS and JavaScript.

### 4.1 CSS Keyframes

Used for continuous animations, gradient movement, and decorative effects. Defined in `App.css` and applied via Tailwind utilities (e.g., `animate-gradient`). This keeps animations GPU-accelerated and off the main JS thread.

```css
@keyframes gradient-move {
  /* ... */
}
```

### 4.2 React Spring

Used for stateful transitions, gesture-driven interactions, and physics-based animations.

**Primary use cases:**

- Indicator interpolation.
- Scroll-based animations.

`SpringValue` objects allow smooth interpolation of width, opacity, transform, and SVG path data. This hybrid model ensures performance where possible and flexibility where necessary.

---

## 5. Responsiveness Strategy

Responsiveness combines CSS variables for global layout shifts, Tailwind breakpoints for component scaling, and component-scoped overrides.

### 5.1 Fluid Global Variables

updated via media queries in `App.css` to adapt layout spacing dynamically (e.g., `--header-height`).

### 5.2 Component-Level Media Queries

Within `@layer components`, mobile overrides adjust padding, font sizes, border density, and layout stacking. This ensures visual consistency across device classes without excessive JSX conditionals.

---

## 6. Reusability & Architecture

The project adheres strictly to DRY principles.

### 6.1 Component Abstractions

**UI Components:**

- `Carousel`
- `Card`
- `Button`

**Logic Hooks:**

- `useCarouselControls`
- `useTheme`

Logic is fully decoupled from presentation.

### 6.2 Data-Driven Rendering

Content lives in `/src/data`. Components such as `ProjectsMap` iterate over structured data to render UI.

**Benefits:**

- Layout is content-agnostic.
- Adding projects requires no structural changes.
- Easy scalability.

---

## 7. Custom Carousel Implementation (TypeScript)

The carousel is built from scratch to support pointer-based dragging, snap-to-slide behavior, spring-based interpolation, and touch + mouse parity.

### 7.1 Architectural Separation

- **`Carousel.tsx`**: Purely presentational. Renders track and indicators, delegating logic to the hook.
- **`useCarouselControls`**: Core interaction engine. Manages pointer lifecycle, computes velocity, controls animation loop, and handles snapping logic.

### 7.2 Pointer Event System

Uses unified pointer events (`pointerdown`, `pointermove`, `pointerup`) to ensure cross-device compatibility, simplified event handling, and no duplication between mouse and touch logic.

### 7.3 Physics Model

- **Drag Phase**: Track delta movement, continuously compute velocity, update position via `requestAnimationFrame`.
- **Release Phase**: Determine if flick threshold is exceeded, calculate inertia projection, snap to nearest or next slide.

### 7.4 Snap & Spring Behavior

After release, a custom `animateValue` easing/spring function animates to target index. `pageProgress` (`SpringValue<number>`) tracks scroll position continuously.

### 7.5 Advanced Behaviors

- **Scrubbing**: Partial drag reveals adjacent slides.
- **Velocity-Based Snapping**: Flick gestures advance slides.
- **Rubber-Banding**: Resistance at boundaries.
- **Indicator Interpolation**: Width and opacity morph relative to `pageProgress`.

The result is a physically coherent, high-fidelity interaction model.

---

## Architectural Summary

This project emphasizes:

- Native platform primitives over abstraction-heavy patterns.
- Semantic design tokens over hardcoded styles.
- Physics-based interaction over static transitions.
- Data-driven rendering for scalability.
- Strict separation of logic and presentation.

The overall design prioritizes performance, clarity, and long-term maintainability while preserving a refined interactive experience.
