# FreshKeep Lagos — To Do

## Header, location, and language controls
- [x] Show the header text “FreshKeep - No Let Your Harvest Spoil.”
- [x] Show the Epe, Ikorodu, Badagry, and Ojo location pills; tapping a pill changes only the location included in the prefilled WhatsApp text, with no other location logic.
- [x] Show a compact EN / PIDGIN / YORUBA language switcher.

## Harvest and price calculator controls
- [x] Ask “Wetin you harvest today?” and show four large image cards for Tomatoes, Atarodo, Ugwu, and Efo; indicate the selected produce with a green border.
- [x] Ask “How many baskets?” and provide a slider from 1 to 50, plus and minus buttons at least 48px tall, a basket-icon visualization, and an optional microphone control for speaking the quantity where browser speech recognition is available.
- [x] Ask “Price per basket?” with a numeric-only input defaulting to ₦5,000 and quick-select options ₦3k, ₦5k, and ₦8k.

## Live savings results and visual timer
- [x] Update results live: red card “Without Cooler: Spoils in [2] days. You go lose ~₦X (45%).” and green card “With N35k Clay Cooler: Fresh for [5] days. You save ~₦Y”.
- [x] Calculate loss = baskets × price × 0.45, saved = loss × 0.9, and season = saved × 8; show “For 8 harvests, na ₦Z you save. Cooler pays for itself in 1 week.”
- [x] Show a seven-day visual comparison timer with sun/moon cues and two progress bars: without cooler stops at day 2 in red; clay cooler reaches day 5–7 in green.

## Trust, cooler illustration, and calls to action
- [x] Show three icon-led trust statements: “No light needed,” “Made with clay + sand + water,” and “Built in 1 day by a local mason.” Include a small front-view clay-cooler illustration.
- [x] Provide a primary WhatsApp button with WhatsApp icon and “Get Building Guide on WhatsApp”; open a wa.me link with auto-filled text containing the selected location and calculator summary.
- [x] Provide an outlined “Share My Savings as Picture” button that renders the savings summary to an in-browser canvas and downloads or shares it as a PNG.

## Offline, accessibility, and persistence
- [x] Deliver a single-page, mobile-first browser-only app with no login, backend, or payments; keep it light for 3G and working offline after the first load using cached app assets.
- [x] Use high-contrast yellow/green styling, minimum 18px text, minimum 48px buttons, and no text entry except numeric values.
- [x] Use local Storage only to remember the last selection.
