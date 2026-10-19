# VIVODECOR calculators

These are the price and quantity calculators for [vivodecor.ro](https://www.vivodecor.ro), a Romanian store for WPC fencing, cladding, wall panels and decking. A customer enters their wall, fence or terrace dimensions and gets the number of boards, the accessories, a drawing to scale and a price. From there they can send the configuration as a quote request, by WhatsApp or as a PDF.

| Calculator | Page | File |
|---|---|---|
| WPC fence | [calculator-gard-wpc](https://www.vivodecor.ro/calculator-gard-wpc) | `vd-gard.js` |
| WPC cladding (riflaj) | [calculator-riflaj-wpc](https://www.vivodecor.ro/calculator-riflaj-wpc) | `vd-riflaj.js` + `vd-riflaj.css` |
| WPC wall panels (lambriu) | in testing | `vd-lambriu.js` + `vd-lambriu.css` |
| WPC decking | in testing | `vd-deck.js` + `vd-deck.css` |
| Homepage block | [vivodecor.ro](https://www.vivodecor.ro) | `homepage/` (stylesheet and images) |

## How it works

The store runs on Gomag, a hosted e-commerce platform. Gomag strips `<script>` tags from pages and silently cuts the site-wide JavaScript at about 64 KB. Because of that, the calculators live here and are served through [jsDelivr](https://www.jsdelivr.com/):

- Each page carries only HTML, CSS and a price table.
- A small loader in the store's global JavaScript checks for the calculator's anchor elements (`#vdPrices`, `#vdR`, `#vdL`, `#vdK`). It only fetches the engine when one is present.
- Prices are read from the page and synced from the live product pages, so a price change in the store reaches the calculator without a release.
- The fence drawing uses wood textures generated pixel by pixel on a canvas and matched to product photos. Rendering is anti-aliased so the grooved boards don't produce moiré.
- Each calculator uses its own ID prefix (`vd*`, `vdR*`, `vdL*`, `vdK*`), so several can share a page without clashing.

## Releases

Pages always load a tagged version, never `main`:

```
https://cdn.jsdelivr.net/gh/vivodecor/calculatoare@gard-v1.0.17/vd-gard.min.js
```

- Tags are per calculator: `gard-`, `riflaj-`, `lambriu-`, `deck-`, `homepage-`, `bf-` followed by `vMAJOR.MINOR.PATCH`. PATCH is a fix, MINOR a new feature, MAJOR a breaking change.
- The order is always **push the files → create the tag → update the link**. jsDelivr caches a tag forever, and a link to a tag made before its files are pushed returns 404.
- The old shared tags `v1.0.0`–`v1.0.18` stay in place, because pages that haven't been re-pasted yet still use them.

Each `*.js` file is the readable build and `*.min.js` is what the store loads. Both are generated from sources kept outside this repo. Before every release, the minified engine runs in jsdom and is checked against a reference implementation. For the fence calculator that means 88 configurations, on desktop and mobile, compared on totals, line items and the drawing.

---

Built and maintained by [Alexandru Ciornai](https://github.com/AlexandruCiornai) for VIVODECOR.
