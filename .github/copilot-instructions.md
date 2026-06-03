# Copilot Instructions — Architecture Firm Website

## Stack
Next.js 14 App Router · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion · Resend

## Conventions
- All components: named exports, no default exports except pages
- File naming: PascalCase for components, camelCase for utils
- 'use client' only when using hooks, event handlers, or browser APIs
- Prefer Server Components for data fetching; use fetch with revalidate
- All Tailwind: utility classes in JSX, no inline styles, no CSS modules
- Images: always next/image with proper sizes attribute and alt text
- Forms: react-hook-form + zod; never uncontrolled inputs in production code
- Animations: Framer Motion only; respect useReducedMotion()
- Icons: lucide-react only; consistent 20px size, stroke-width 1.5
- Typography: font-display (Cormorant) for headings, font-sans (DM Sans) for body

## Design Tokens (memorize these)
- Brand bg: warm-50 (#FAFAF8)
- Dark sections: charcoal (#1C1C18)
- Accent: gold-400 (#B8892A)
- Body text: warm-800 (#2E2D24)
- Muted text: warm-500 (#888675)

## Patterns to reuse
- ScrollReveal wrapper: src/components/ui/ScrollReveal.tsx
- Section container: `<div className="max-site section-padding py-section">`
- Section title: font-display + italic + display-lg, always followed by GoldDivider
- CTA buttons: outlined variant uses "border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-charcoal"
- Dark card: "bg-charcoal text-warm-50 rounded-sm p-8"

## Google Drive
Resources page fetches live from Drive folder: src/lib/googleDrive.ts
Folder ID in env: GOOGLE_DRIVE_FOLDER_ID
Always cache Drive responses: export const revalidate = 3600

## Content management
- Projects: MDX files in src/content/projects/ with frontmatter
- Static data: JSON files in src/content/ (services, testimonials, faq)
- No CMS needed unless client requests it

## Do NOT
- Use CSS modules or styled-components
- Import from @/styles — everything is Tailwind
- Use any-typed variables — always define proper interfaces in src/types/
- Add console.log to production code
- Use useEffect for data fetching — use Server Components
