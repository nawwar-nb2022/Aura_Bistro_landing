# Dashboard Design System

## 1. Visual Direction

Selected direction: Clean and Minimal.

The dashboard should feel professional, calm, readable, and functional.

Avoid excessive gradients, decorative animations, heavy shadows, unnecessary colors, and overly rounded components.

## 2. Color Palette

| Token | Value |
|---|---|
| Primary | #2563EB |
| Main background | #F8FAFC |
| Surface | #FFFFFF |
| Primary text | #111827 |
| Secondary text | #6B7280 |
| Border | #E5E7EB |
| Success | #15803D |
| Warning | #D97706 |
| Danger | #DC2626 |

Use lighter background shades for badges, hover states, and selected states.

## 3. Typography

Font family: Inter.

Use one font family throughout.

| Usage | Size |
|---|---|
| Small text | 13px |
| Body text | 14px |
| Section heading | 18px |
| Page heading | 24px |

Establish hierarchy through font weight, size, and spacing.

## 4. Border Radius

Base radius: 8px.

Apply consistently to buttons, inputs, cards, modals, and dropdowns.

## 5. Spacing Scale

Use a 4px spacing scale:

- 4px: very small gaps.
- 8px: compact spacing.
- 12px: related elements.
- 16px: standard component padding.
- 24px: section spacing.
- 32px: major page separation.

## 6. Layout

- Desktop sidebar width: approximately 240px.
- Desktop page padding: 32px.
- Mobile page padding: 16px.
- Main background: #F8FAFC.
- Cards and tables: white surfaces.

## 7. Buttons

### Primary

Blue background, white text.

### Secondary

White background, gray border.

### Danger

Red background or text.

### Ghost

Transparent background.

Initial dimensions:

- Height: 40px.
- Radius: 8px.
- Horizontal padding: 16px.

## 8. Form Fields

- Standard input height: 40px.
- Textarea minimum height: 100px.
- White background.
- Gray border.
- 8px radius.
- Blue focus border and subtle focus ring.
- Red border and inline error when invalid.
- Labels above fields.

## 9. Tables

- White table container.
- Header background: #F9FAFB.
- Header text: 12–13px, medium weight.
- Body text: 14px.
- Row height: approximately 56px.
- Subtle horizontal dividers.
- Avoid unnecessary vertical borders.
- Actions aligned consistently on the right.

## 10. Status Indicators

| Status | Appearance |
|---|---|
| Published | Light green background, dark green text |
| Draft | Light gray background, dark gray text |
| Error | Light red background, dark red text |
| Warning | Light amber background, dark amber text |

## 11. Shadows and Icons

- Prefer borders over shadows.
- Use subtle shadows for dropdowns and modals.
- Use Lucide icons consistently.
- Standard icon size: 18–20px.
- Transitions: approximately 150ms.
- Preserve visible keyboard focus indicators.

## 12. Responsive Design

| Element | Desktop | Mobile |
|---|---|---|
| Sidebar | 240px persistent | Overlay |
| Page padding | 32px | 16px |
| Content cards | 2 columns | 1 column |
| Tables | Full width | Horizontal scroll |
| Modals | Centered, constrained width | Nearly full width |

## 13. Consistency Rules

- Reuse the same button styles across pages.
- Reuse the same form field styles.
- Reuse the same modal structure.
- Reuse the same table patterns.
- Reuse the same status badge styles.
- Keep action placement consistent.
- Do not introduce a new visual language for individual pages.

The design system is the source of truth for dashboard styling.