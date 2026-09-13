# Engagement implementation

The homepage now connects life-stage selection, a five-step needs finder, a personalized discussion summary, product discovery, plan comparison, and WhatsApp. `/cek-kebutuhan/` also includes the calculator so quiz context remains in memory through the handoff. `/cek-premi/` supports visitors who already know what to explore.

## Interaction rules

- The quiz chooses a discussion category from the stated priority. If skipped, retirement stage takes priority, then dependents, then health. It gives reasons; it does not invent a numeric readiness or risk score.
- Back and skip are supported. Editing answers requires completing the quiz again before updating the calculator. Selecting a new life stage starts a fresh quiz.
- The calculator uses the existing rate table. It computes age at the last birthday, validates the product age range, and excludes pension plans whose payout age has been reached.
- All available tiers appear together. The budget slider highlights affordability against monthly installments; it never interpolates premiums or changes benefits.
- Annual and monthly views use the existing formula. Sources/approval dates are still absent from the supplied rate table, so no official price or discount claim was added.
- Date of birth stays in browser memory. Shared messages include calculated age, selected plan, budget, and optional quiz summary. Refresh resets the state. Downloads are plain text.
- WhatsApp messages are reviewed and sent by the visitor. Contact time is a requested preference, not a calendar booking. Desktop QR codes are generated locally on request, including the selected result.

## Pages

Static exports include the homepage, quiz, calculator, four product-category pages, claims guide, about page, privacy page, article index, and two educational articles. The sitemap contains all routes. GitHub Pages base-path support is retained.

## Analytics integration

`track()` emits the browser event `cekpreminya:analytics` with a `detail` object. It does not transmit or store events. Connect an approved analytics provider here when an account is available; update privacy copy at that time.

Events: `hero_cta`, `life_stage_selected`, `quiz_started`, `quiz_step_completed`, `quiz_completed`, `result_to_calculator`, `result_saved`, `result_shared`, `product_selected`, `product_expanded`, `calculator_completed`, `plan_selected`, `comparison_opened`, `plan_shared`, `scenario_adjusted`, `myth_opened`, `faq_opened`, `whatsapp_clicked`.

Use quiz-start/completion and plan-to-WhatsApp ratios for the first baseline. Abandonment can be derived from starts without completions by the eventual provider. Do not attach quiz answers, DOB, budgets, financial inputs, phone numbers, or message contents to analytics.

## Verification

`npm run lint`

`npm run test:e2e` builds the GitHub Pages export and exercises desktop/mobile journeys in headless Google Chrome. Install Chrome locally or with `npx playwright install chrome` in CI. The test server serves `out/` at `http://127.0.0.1:4173/cekpreminya/`; it is a local preview helper, not a production server.

`npm run build:gh` followed by `npm run preview` opens the same export for manual review.

## Owner inputs for a later content release

- Approved rates, actual payment frequencies, product documents, and reviewed benefit/eligibility rules.
- Real portrait/video, permissioned testimonials and claim stories, credential details, availability, and any response-time promise. Unverified testimonials and stock agent portrait have been removed rather than represented as customer evidence.
- Analytics account for live measurements. Optimization and A/B tests need traffic before conclusions can be drawn.
- A booking or lead-storage provider only if the WhatsApp workflow needs it.

The original IDEATION.md is historical; this document describes the implemented experience.
