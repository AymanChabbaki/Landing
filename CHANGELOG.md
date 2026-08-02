# Changelog

All notable changes to this project will be documented in this file.

## [2.0.1] - 2026-08-02T00:23:45+01:00

### Changed
- Configured VSL video in `src/components/VslSection.jsx` to remain strictly paused on initial load, triggering playback on hover (`onMouseEnter`) or click (`onClick`).

### Rationale & Architectural Decisions
- Prevents unprompted autoplay on page load and allows visitors to initiate video playback naturally by hovering or clicking.

## [2.0.0] - 2026-08-02T00:21:50+01:00

### Changed
- Updated VSL video player source in `src/components/VslSection.jsx` to `/vsl.mp4`.

### Rationale & Architectural Decisions
- Connects the official production VSL video presentation (`/vsl.mp4`) into the primary VSL section hero player.

## [1.9.2] - 2026-08-02T00:19:35+01:00

### Fixed
- Confirmed all 5 testimonial entries in `src/components/Testimonials.jsx` use male Moroccan client names (`Ahmed B.`, `Rachid T.`, `Karim M.`, `Youssef K.`, `Omar L.`) matching all client video testimonials.

### Rationale & Architectural Decisions
- Ensures 100% accurate name matching across all 5 male video testimonials.

## [1.9.1] - 2026-08-02T01:18:30+01:00

### Added
- Expanded `src/components/Testimonials.jsx` to feature all 5 testimonial video cards (`tem2.mp4`, `/WhatsApp Video 2026-08-02 at 01.09.49.mp4`, `WhatsApp Video 1`, `WhatsApp Video 2`, `tem3.mov`), placing the new video in 2nd position.

### Rationale & Architectural Decisions
- Displays all client video testimonials in a 5-column responsive grid while featuring the newest video upload in 2nd position.

## [1.9.0] - 2026-08-02T00:26:00+01:00

### Changed
- Expanded `src/components/Testimonials.jsx` to feature 4 video cards in a responsive grid (`WhatsApp Video 1`, `WhatsApp Video 2`, `tem2.mp4`, `tem3.mov`).
- Replaced harsh black text (`text-slate-900`) with Deep Midnight Navy (`text-[#002B49]`) across all main section headings (`VslSection`, `Process`, `Comparison`, `Testimonials`, `VipForm`).

### Rationale & Architectural Decisions
- Harmonizes header typography with brand colors (`#0159A3` blue and `#FFC90D` gold) while presenting all 4 client testimonial videos in a balanced layout.

## [1.8.1] - 2026-08-02T00:23:35+01:00

### Fixed
- Added `whitespace-nowrap` to `"Sans Pré-Validation"` header in `src/components/Comparison.jsx`.
- Added `whitespace-nowrap inline-block` to `"Pré-Validation"` and adjusted heading font scaling in `src/components/VipForm.jsx`.

### Rationale & Architectural Decisions
- Prevents `"Pré-Validation"` and `"Sans Pré-Validation"` from wrapping or splitting across multiple lines on small mobile screens.

## [1.8.0] - 2026-08-02T00:21:00+01:00

### Changed
- Replaced `tem1.mp4` with new video uploads `/WhatsApp Video 2026-08-02 at 00.01.26.mp4` and `/WhatsApp Video 2026-08-02 at 00.03.41.mp4` in `src/components/Testimonials.jsx`.
- Configured 1st testimonial video card to auto-play automatically (`autoPlay={i === 0}`) with sound ON by default (`playingMap: { 0: true }` and `unmutedMap: { 0: true }`).

### Rationale & Architectural Decisions
- Updates testimonial reel assets with latest client video testimonials and highlights primary testimonial video with immediate playback and audio.

## [1.7.0] - 2026-08-02T00:18:30+01:00

### Changed
- Updated footer background in `src/components/Footer.jsx` to official deep dark navy gradient (`from-[#07192D] via-[#051424] to-[#020B14]`) with top yellow accent border (`border-t-4 border-[#FFC90D]`).
- Adjusted `"d'import-export"` title font size (`text-[0.88em]`) and styling (`whitespace-nowrap inline-block`) in `src/components/VslSection.jsx` so the phrase stays cleanly on a single line across all viewports.

### Rationale & Architectural Decisions
- Matches official corporate footer design from branding reference screenshot and ensures clean, non-wrapping typography in the VSL section header.

## [1.6.2] - 2026-08-01T15:47:30+01:00

### Changed
- Refactored video playback in `src/components/Testimonials.jsx` to match the exact in-place play/pause pattern from `src/components/VslSection.jsx`.
- Removed modal video popup to prevent unwanted overlays when tapping video cards.
- Added native video controls upon play and central play button overlay when paused.

### Rationale & Architectural Decisions
- Provides a unified, intuitive video player experience across all sections of the landing page, eliminating unwanted popups on mobile and desktop.

## [1.6.1] - 2026-08-01T15:44:20+01:00

### Added
- Added interactive top-right audio toggle button (Speaker On / Off icon) to testimonial reel cards in `src/components/Testimonials.jsx`.
- Controlled video `muted` state dynamically per card via `unmutedMap` state.

### Rationale & Architectural Decisions
- Allows visitors to turn audio on/off directly while watching video reels on the landing page without requiring a full-screen modal trigger.

## [1.6.0] - 2026-08-01T15:43:00+01:00

### Added
- Connected `/tem1.mp4`, `/tem2.mp4`, and `/tem3.mov` to testimonial reel cards in `src/components/Testimonials.jsx`.
- Enabled silent background video preview looping (`autoPlay muted loop playsInline`) on reel cards.

### Rationale & Architectural Decisions
- Replaces static video placeholders with active, real testimonial video reels, enhancing social proof and engagement.

## [1.5.2] - 2026-08-01T15:32:00+01:00

### Changed
- Reduced vertical padding between `<li>` items in `src/components/Comparison.jsx` from `py-3 sm:py-5` to `py-2 sm:py-3.5`.
- Added vertical margin (`mb-8 sm:mb-14 lg:mb-0`) to the "Avec accompagnement Ultex" column wrapper in `src/components/Comparison.jsx` on mobile screens to match the spacing above the section.

### Rationale & Architectural Decisions
- Compacts comparison points vertically and creates consistent, equalized visual spacing between stacked comparison blocks on phone viewports.

## [1.5.1] - 2026-08-01T15:27:50+01:00

### Added
- Configured Google Apps Script Web App URL (`https://script.google.com/macros/s/AKfycbz5i1Ngwn1fx_Xx5PTGbWOhj4CIldXrlQs7-gB8AVkOCt85dGii-Eqyc-zWwYz6AU71sA/exec`) in `.env.local` and set default fallback URL in `src/components/VipForm.jsx`.

### Rationale & Architectural Decisions
- Provides instant out-of-the-box form submission logging directly into the user's Google Sheet across local and production builds.

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
