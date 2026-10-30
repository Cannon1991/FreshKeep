# FreshKeep Lagos — Revised Scope

## Header and calculator
- [x] Show “FreshKeep - No Let Your Harvest Spoil” and subtitle “For Lagos Vegetable Farmers,” with a yellow header, Epe/Ikorodu/Badagry/Ojo location pills that only change the WhatsApp text and local mason list, and EN/PIDGIN/YORUBA controls that change only the Save/Spoil keywords (“Save,” “Keep Money,” “Da Owo Duro”; “Spoils,” “Don Spoil”).
- [x] Show “Wetin you harvest today?” and four large photo cards for Tomatoes, Atarodo, Ugwu, Efo; selected card has a green border and each shows normal/cooler freshness days: Tomatoes 2/5, Atarodo 3/7, Ugwu 1/4, Efo 1/3.
- [x] Show basket quantity slider 1–50, at-least-48px plus/minus controls, basket icons, optional mic quantity entry, and numeric-only price input with ₦3k/₦5k (default)/₦8k quick choices.
- [x] Update red/green results live using loss = baskets × price × 0.45, saved = loss × 0.9, season = saved × 8. Make the selected produce’s normal/cooler days drive its result cards and 0–7-day sun/moon bars.
- [x] Show the eight-harvest savings statement and cooler payback messaging; avoid claiming the ₦35,000 build is repaid until cumulative savings cover the cost.

## New v3: market price today
- [x] Put “Today for Mile 12 Market” immediately after the header and before the calculator. Show four compact cards with Tomatoes ₦6,000/basket, Atarodo ₦9,500/basket, Ugwu ₦4,000/bunch, and Efo ₦3,500/bunch; show each direction versus yesterday and “Updated today 7am. Prices from Mile 12.” Market values are manually edited in browser JavaScript; no API.
- [x] Tapping a market card selects its produce in the calculator and fills the matching price; show the correct basket/bunch units for each crop.
- [ ] Replace the sample yesterday comparisons with verified Mile 12 quotes before treating trend arrows as live; update the hard-coded market values in `MARKET_DATA` daily.

## Cooler trust and return-use features
- [x] Show “How much to build am? Na ₦35,000 Total” and cost lines: Clay blocks ₦8,000; Sand + Cement ₦7,000; Jute / Cover ₦3,000; Mason labour ₦12,000; Water tank / Bucket ₦5,000. Show this week’s savings and whether/when it covers the cost, plus “No light needed. No fuel needed. Just water 2x daily.”
- [x] Show “How e dey work? 3 steps” using real photos (not illustrations): “Build double clay wall, put sand for middle”; “Pour water 2x daily, sand go stay cool”; “Put baskets inside, cover with wet jute.” Caption: “Inside go stay 10-15°C cooler than outside.”
- [x] Show a Days Left Checker with the same four produce choices, days-ago slider 0–7, and output based on cooler freshness days minus days ago; show sell-by weekday, or red “Sell TODAY or e go spoil” when remaining days are zero or less. Its “Remind me tomorrow” action uses only local device storage/text and no backend.
- [x] Show trust line icons and one-line statements: “No light needed”; “Made with clay + sand + water”; “Built in 1 day by local mason.”

## New v3: mason and materials contacts
- [x] Add a hard-coded JavaScript contact array for Epe, Ikorodu, Badagry, and Ojo. Show only the selected LGA’s 1–2 records near the bottom before the final CTA. Epe’s supplied contact is Ekemini Enang — Materials — 08063353863; use the supplied number for Call and WhatsApp. Keep both actions inactive for entries without a supplied number. Auto-fill the contact-specific WhatsApp message: “Hi [name], I dey for [area], I wan build the N35k FreshKeep cooler, how much?” Convert Nigerian local numbers to international country-code format for wa.me links.
- [x] Show the local-provider note: “Na local mason, no be company. Call am direct.”
- [ ] Collect and add verified mason/materials names and phone numbers for Epe and the remaining Ikorodu, Badagry, and Ojo placeholders before presenting them as real providers.

## WhatsApp, sharing, offline, and constraints
- [x] Provide large green WhatsApp CTA “Get Building Guide on WhatsApp”; prefill a wa.me message with location, basket/bunch count, produce, and ₦35k cooler question. Do not invent a WhatsApp phone number if none is supplied.
- [x] Provide outlined “Share My Savings as Picture,” generating a canvas PNG containing the selected result.
- [x] Keep it one scrollable page with no tabs/menus, no login/backend/payments, browser-only JavaScript, no typing except numbers, localStorage only, offline after first load, and light assets for 3G.
- [x] Maintain minimum 18px text and minimum 48px buttons with high-contrast yellow/green/red colors.
