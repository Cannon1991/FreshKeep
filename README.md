# FreshKeep Lagos

**FreshKeep — No Let Your Harvest Spoil** is a mobile-first, browser-only tool for Lagos vegetable farmers. It estimates harvest value at risk and potential savings from a locally built clay cooler. The app has no login, backend, database, or payment flow.

## What it does

- Estimates loss, savings, and eight-harvest savings for Tomatoes, Atarodo, Ugwu, and Efo. Crop freshness-day estimates are built into the app.
- Provides hard-coded Mile 12 market-price cards that can fill the calculator’s produce and price fields.
- Shows a ₦35,000 cooler cost breakdown, a seven-day freshness comparison, and a days-left checker.
- Links to WhatsApp with a prefilled message, offers local contact cards, and creates a savings image in the browser.
- Supports EN, Pidgin, and Yoruba keyword labels; remembers selections and the local reminder state in browser `localStorage`.
- Caches the app shell with a service worker so it can work offline after a successful first load.

## Important data limitations

Market quotes, yesterday comparisons, crop freshness durations, and cooler costs are hard-coded examples—not live feeds or guarantees. In particular, the trend arrows use sample previous-day quotes. Update `MARKET_DATA` in `app.js` only with current, verified market information.

Local provider records are also maintained in `LOCAL_CONTACTS` in `app.js`. Contact buttons are disabled when a phone number is absent; Nigerian local-format numbers are converted for WhatsApp links. The `verified: true` field controls the verified badge. Confirm provider details before relying on a listing.

## Run locally

Serve the repository root over localhost (service workers require HTTPS or a secure localhost context):

```sh
python3 -m http.server 3000
```

Then open <http://localhost:3000>. No package installation is required.

## Build the static site

The configured Webdev build copies the client app and its assets into `dist/`:

```sh
mkdir -p dist/assets && cp index.html styles.css app.js sw.js manifest.webmanifest manus-routes.json dist/ && cp assets/* dist/assets/
```

Serve or deploy the contents of `dist/` as a static site. Keep `manus-routes.json` synchronized if page routes change.

## Project structure

| File or directory | Purpose |
| --- | --- |
| `index.html` | Single-page app structure, controls, calculator, results, and contact sections |
| `styles.css` | Responsive, mobile-first styling |
| `app.js` | Calculator logic, sample data, local contacts, WhatsApp links, reminders, and image sharing |
| `sw.js` | Service-worker app-shell cache and offline navigation fallback |
| `manifest.webmanifest` | Installable-app metadata |
| `manus-routes.json` | Static route declaration for Webdev |
| `assets/` | Produce and cooler-step images plus the app mark; see `assets/PHOTO-SOURCES.md` for source notes |
| `TODO.md` | Current implementation notes and outstanding market/contact data needs |

## Privacy and browser support

The calculator and savings-image generation run in the browser. The app does not submit calculator data to a FreshKeep backend. Saved choices and reminder state use local storage; WhatsApp and telephone actions leave the browser only when the user taps them. Offline support requires the app shell to have loaded once while online and a browser that supports service workers.
