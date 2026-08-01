# Changelog

All notable changes to this project will be documented in this file.

## [1.5.0] - 2026-08-01T15:18:45+01:00

### Added
- Added asynchronous POST submission handler to `src/components/VipForm.jsx` for sending form submissions (`nom`, `produit`, `pays`, `whatsapp`) to `VITE_GOOGLE_SHEETS_WEBHOOK_URL`.
- Added loading state indicator on the submit button (`submitting` spinner).

### Rationale & Architectural Decisions
- Automatically logs all VIP lead submissions into Google Sheets via Google Apps Script Web App without requiring third-party server infrastructure.

## [1.4.1] - 2026-08-01T15:17:35+01:00

### Fixed
- Added a `window._fbq_initialized` single-execution guard around Meta Pixel `fbq('init')` and `fbq('track', 'PageView')` in `index.html`.

### Rationale & Architectural Decisions
- Prevents duplicate PageView events caused by React HMR re-evaluations or double script mounting during local development and page re-renders.

## [1.4.0] - 2026-08-01T15:07:15+01:00

### Added
- Integrated Meta (Facebook) Pixel (ID: `1381885053982368`) into `index.html` head section for automatic `PageView` tracking.
- Added event tracking trigger `fbq('track', 'Lead')` on successful form submissions in `src/components/VipForm.jsx`.
- Stored Meta Access Token and Pixel ID in `.env.local` and updated `.gitignore` to protect API secrets.

### Rationale & Architectural Decisions
- Enables conversion tracking and analytics for Meta Ads campaigns while strictly securing access tokens in uncommitted environment variables.

## [1.3.1] - 2026-08-01T15:05:05+01:00

### Changed
- Reduced vertical gap between the last trust checkmark item ("Conformité PortNet & Douane B2B") and "Parlons de votre projet" header in `src/components/VipForm.jsx` on mobile/single-column layouts (changed grid gap from `gap-20 lg:gap-28` to `gap-8 sm:gap-12 lg:gap-28`).

### Rationale & Architectural Decisions
- Reduces vertical spacing on mobile screens from 80px to 32px, creating a tighter, seamless layout between the trust indicators and form input fields.

## [1.3.0] - 2026-08-01T15:04:00+01:00

### Changed
- Removed "Contacter directement via WhatsApp" link element from `src/components/VipForm.jsx`.
- Reduced section top padding (`pt-8 pb-16 sm:pt-24 sm:pb-32`) and adjusted anchor scroll margin (`scroll-mt-12`) in `src/components/VipForm.jsx` to shift the "Parlons de votre projet" header higher up on screen.

### Rationale & Architectural Decisions
- Directs user focus exclusively to the VIP qualification form submission and optimizes above-the-fold visibility of the form header.

## [1.2.0] - 2026-08-01T15:02:40+01:00

### Changed
- Removed 3-dot mobile step indicator element from `src/components/Process.jsx`.
- Reduced bottom section padding in `src/components/Process.jsx` (`pb-4 sm:py-32`) and top section padding in `src/components/Testimonials.jsx` (`pt-6 pb-16 sm:py-32`) to tighten vertical space above "Ils Nous Font Confiance" on mobile screens.

### Rationale & Architectural Decisions
- Streamlined mobile UI transition between Process steps and Testimonials, removing redundant step pagination dots on mobile.

## [1.1.1] - 2026-08-01T15:01:10+01:00

### Changed
- Reduced vertical spacing between top text block ("Se fait par la maîtrise...") and "Avec accompagnement Ultex" header section in `src/components/Comparison.jsx` (changed `mb-20` to `mb-8 sm:mb-14` and column `mt-6 lg:mt-0` to `mt-0`).

### Rationale & Architectural Decisions
- Eliminated redundant vertical whitespace between stat summary text and comparison columns on mobile and desktop screens for a tighter visual layout.

## [1.1.0] - 2026-08-01T14:59:15+01:00

### Changed
- Updated comparison header text from "Avec Ultex" to "Avec accompagnement Ultex" in `src/components/Comparison.jsx`.
- Reduced vertical spacing between section titles and list items on mobile screens (`mb-3 pb-2 sm:mb-8 sm:pb-4` for header containers and `py-3 sm:py-5` for `<li>` items) for both "Avec accompagnement Ultex" and "Sans Pré-Validation" sections.

### Rationale & Architectural Decisions
- Improved mobile UX and vertical compactness on smaller screens without compromising desktop layout and visual balance.
