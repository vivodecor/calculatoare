/* ============================================================
   VIVODECOR - Calculator Deck WPC terasa (motor)
   Fisier extern, incarcat de incarcatorul din Design -> JS
   numai pe pagina /calculator-deck-wpc (#vdK).
   Setarile (LEAD_URL, LEAD_TOKEN, JSPDF_SRC, TOP_ADJUST) se citesc
   din window.VD_CONFIG, deja existent pentru calculatorul de gard.
   Construit dupa motorul lambriu (vd-lambriu.src.js); prefix ID-uri vdK
   ("decK"; vdD ar fi semanat cu #vdDraw / #vdDock ale gardului).
   Doua desene: vedere de ansamblu (perspectiva, cu un om de 1,75 m)
   si vedere de sus (plan cu cote).
   ============================================================ */
(function () {
  "use strict";
  if (window.__vdDeckLoaded) return;
  window.__vdDeckLoaded = true;

  var CFG = window.VD_CONFIG || {};
  var KC = window.VD_DECK || {};
  var LEAD_URL = CFG.LEAD_URL || "";
  var LEAD_TOKEN = CFG.LEAD_TOKEN || "";
  var JSPDF_SRC = CFG.JSPDF_SRC || "";
  var TOP_ADJ = parseFloat(CFG.TOP_ADJUST) || 0;
  var CAT_URL = KC.CATEGORY_URL || "";
  var LDJSON = {"@context": "https://schema.org", "@graph": [{"@type": "WebApplication", "@id": "https://www.vivodecor.ro/calculator-deck-wpc#app", "name": "Calculator deck WPC teras\u0103 \u2014 pl\u0103ci, grinzi, cleme \u0219i pre\u021b", "url": "https://www.vivodecor.ro/calculator-deck-wpc", "applicationCategory": "BusinessApplication", "operatingSystem": "Web", "inLanguage": "ro-RO", "description": "Calculeaz\u0103 c\u00e2\u021bi metri liniari de plac\u0103 deck WPC (7 ml pe m\u00b2), c\u00e2te grinzi de montaj, cleme \u0219i startere sunt necesare pentru o teras\u0103, cu pre\u021buri cu TVA, vedere de ansamblu \u0219i plan cu cote.", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "RON"}, "publisher": {"@type": "Organization", "name": "VIVODECOR", "url": "https://www.vivodecor.ro"}}, {"@type": "FAQPage", "inLanguage": "ro-RO", "mainEntity": [{"@type": "Question", "name": "C\u00e2\u021bi metri de deck WPC intr\u0103 pe un metru p\u0103trat?", "acceptedAnswer": {"@type": "Answer", "text": "7 metri liniari de plac\u0103 146 \u00d7 25 mm pe m\u00b2. Pentru 10 m\u00b2 sunt necesari 70 ml, pentru 20 m\u00b2 140 ml, pentru 30 m\u00b2 210 ml. Pl\u0103cile sunt de 2 m \u0219i 4 m, a\u0219a c\u0103 necesarul se rotunje\u0219te \u00een sus la un multiplu de 2 m."}}, {"@type": "Question", "name": "C\u00e2t cost\u0103 deckul WPC pe m\u00b2 cu tot cu accesoriile?", "acceptedAnswer": {"@type": "Answer", "text": "La pre\u021burile din 5 octombrie 2026, pl\u0103cile cost\u0103 230,30 RON/m\u00b2 cu TVA, iar clemele \u0219i starterele \u00eenc\u0103 40,56 RON/m\u00b2. O teras\u0103 de 5 \u00d7 3 m (15 m\u00b2) cu 106 ml de plac\u0103, 19 grinzi, 300 de cleme \u0219i 60 de startere cost\u0103 4.897,48 RON, adic\u0103 326,50 RON/m\u00b2. Transportul se adaug\u0103 separat."}}, {"@type": "Question", "name": "Ce lungime au pl\u0103cile de deck \u0219i cum le comand?", "acceptedAnswer": {"@type": "Answer", "text": "Pl\u0103cile de deck VIVODECOR sunt de 2 m \u0219i 4 m. \u00cen co\u0219 pui totalul de metri liniari (minimum 4 m pentru livrarea prin curier), iar la \u201eObserva\u021bii\u201d scrii lungimea dorit\u0103 a pl\u0103cilor. Calculatorul rotunje\u0219te necesarul la un multiplu de 2 m."}}, {"@type": "Question", "name": "La ce distan\u021b\u0103 se monteaz\u0103 grinzile pentru deck WPC?", "acceptedAnswer": {"@type": "Answer", "text": "La aproximativ 300 mm una de alta, f\u0103r\u0103 a dep\u0103\u0219i 400 mm, perpendicular pe pl\u0103ci. La 300 mm consumul e de aproximativ 3,5 metri liniari de grind\u0103 WPC 40 \u00d7 30 mm pe m\u00b2 de teras\u0103; fi\u0219a produsului d\u0103 4 ml/m\u00b2."}}, {"@type": "Question", "name": "C\u00e2te cleme \u0219i startere \u00eemi trebuie pentru deck?", "acceptedAnswer": {"@type": "Answer", "text": "20 de cleme de \u00eembinare \u0219i 4 startere pe m\u00b2. Starterele se fixeaz\u0103 la cap\u0103tul grinzilor \u0219i \u021bin prima plac\u0103; clemele prind fiecare plac\u0103 de fiecare grind\u0103, ascuns, \u00een canalul din cantul pl\u0103cii."}}, {"@type": "Question", "name": "Se poate lipi deckul WPC?", "acceptedAnswer": {"@type": "Answer", "text": "Nu, lipirea nu este recomandat\u0103. Deckul WPC se monteaz\u0103 pe grinzi din WPC 40 \u00d7 30 mm, cu sistemul de prindere ascuns din cleme \u0219i startere, care permite dilatarea materialului \u0219i \u00eenlocuirea u\u0219oar\u0103 a unei pl\u0103ci."}}, {"@type": "Question", "name": "Am nevoie de supor\u021bi reglabili sub deck?", "acceptedAnswer": {"@type": "Answer", "text": "Doar dac\u0103 vrei s\u0103 aliniezi terasa pe \u00een\u0103l\u021bime, f\u0103r\u0103 beton. Supor\u021bii reglabili din plastic au 44\u201370 mm sau 85\u2013135 mm \u0219i se pun sub grinzi, aproximativ 9 buc\u0103\u021bi pe m\u00b2. Pe o suprafa\u021b\u0103 plan\u0103 \u0219i stabil\u0103 grinzile pot sta direct pe ea."}}, {"@type": "Question", "name": "Exist\u0103 reduceri de cantitate la deck?", "acceptedAnswer": {"@type": "Answer", "text": "Da, la pl\u0103cile Gri Antracit, Maro Lemn \u0219i Gri: de la 86 ml \u22123%, de la 150 ml \u22125% \u0219i de la 250 ml \u22127%. Calculatorul le aplic\u0103 automat. Lemn Natur nu are reduceri de cantitate afi\u0219ate."}}, {"@type": "Question", "name": "Pre\u021bul din calculator include TVA \u0219i accesoriile?", "acceptedAnswer": {"@type": "Answer", "text": "Da, toate pre\u021burile sunt cu TVA. Totalul include pl\u0103cile, clemele \u0219i starterele \u0219i, dac\u0103 le alegi, grinzile de montaj, plinta de termina\u021bie \u0219i supor\u021bii reglabili. Profilele L de col\u021b \u0219i transportul nu sunt incluse. Pre\u021bul din pagina fiec\u0103rui produs r\u0103m\u00e2ne cel oficial."}}, {"@type": "Question", "name": "Pot vedea deckul WPC \u00eenainte de a comanda?", "acceptedAnswer": {"@type": "Answer", "text": "Da. Po\u021bi comanda mostre de decking de pe site sau po\u021bi vedea pl\u0103cile \u00een showroomul VIVODECOR din Cluj-Napoca ori la punctul de lucru din Bucure\u0219ti. Placa are dou\u0103 fe\u021be, textur\u0103 lemn \u0219i linii periate; mostrele te ajut\u0103 s\u0103 alegi culoarea \u0219i fa\u021ba potrivit\u0103."}}]}, {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Acas\u0103", "item": "https://www.vivodecor.ro/"}, {"@type": "ListItem", "position": 2, "name": "Decking WPC", "item": "https://www.vivodecor.ro/decking"}, {"@type": "ListItem", "position": 3, "name": "Calculator deck WPC", "item": "https://www.vivodecor.ro/calculator-deck-wpc"}]}]};

  var KERF = 5, BAT_ID = "grinda", CLIP_ID = "clema", START_ID = "starter";
  /* Consum: 7 ml de placa pe m2 (fisa produsului). Placile sunt de 2 m si 4 m,
     deci comanda se rotunjeste in sus la multiplu de 2 ml; minimum 4 ml (curier). */
  var PER_M2 = 7, STEP_ML = 2, MIN_ML = 4;
  /* geometria placii, doar pentru desen: 146 mm + ~6 mm rost de clema */
  var BW = 146, PITCH = 152, BL4 = 4000;
  var ARROW = "→";

  function $(id) { return document.getElementById(id); }
  function each(list, fn) { for (var i = 0; i < list.length; i++) fn(list[i], i); }
  function map(list, fn) { var o = []; each(list, function (x, i) { o.push(fn(x, i)); }); return o; }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function money(v) { return v.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function num(v, d) { d = d === undefined ? 0 : d; return v.toLocaleString("ro-RO", { minimumFractionDigits: d, maximumFractionDigits: d }); }
  var AMP = String.fromCharCode(38), QUO = String.fromCharCode(34);
  function esc(s) {
    return String(s).split(AMP).join(AMP + "amp;").split("<").join(AMP + "lt;")
      .split(">").join(AMP + "gt;").split(QUO).join(AMP + "quot;");
  }

  /* ---------------- culori ---------------- */
  function lighten(hex, k) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex); if (!m) return hex;
    var n = parseInt(m[1], 16), out = "#";
    each([16, 8, 0], function (sh) {
      var c = (n >> sh) & 255; c = Math.round(c + (255 - c) * k);
      out += ("0" + c.toString(16)).slice(-2);
    });
    return out;
  }
  function shade(hex, k) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex); if (!m) return hex;
    var n = parseInt(m[1], 16), out = "#";
    each([16, 8, 0], function (sh) { var c = Math.round(((n >> sh) & 255) * (1 - k)); out += ("0" + c.toString(16)).slice(-2); });
    return out;
  }
  function tint(hex, t) { return t >= 0 ? lighten(hex, t) : shade(hex, -t); }
  function rng(seed) { var x = seed % 2147483647; if (x <= 0) x += 2147483646; return function () { x = x * 16807 % 2147483647; return (x - 1) / 2147483646; }; }

  /* ---------------- date din tabelul de preturi ---------------- */
  function parseTiers(s) {
    if (!s) return [];
    var out = [];
    each(String(s).split(","), function (p) {
      var a = p.split(":");
      var m = parseFloat(a[0]), pc = parseFloat(a[1]);
      if (!isNaN(m) && !isNaN(pc)) out.push({ min: m, pct: pc });
    });
    return out.sort(function (x, y) { return y.min - x.min; });
  }
  var ROWS = [], BY = {};
  function readRows() {
    ROWS = [];
    each(document.querySelectorAll("#vdKPrices tr[data-id]"), function (r) {
      var d = r.dataset, a = r.querySelector("a[href]"), th = r.querySelector("th");
      var full = d.full || (th ? th.textContent.replace(/\s+/g, " ").trim() : d.name);
      var kind = d.kind, hex = d.hex || "#8A7A6A";
      var o = {
        id: d.id, kind: kind, name: d.name || full, full: full,
        price: parseFloat(d.price), url: d.url || (a ? a.href : ""),
        hex: hex, hex2: d.hex2 || lighten(hex, 0.1), trim: d.trim || "",
        len: parseFloat(d.len) || 2900, per: parseFloat(d.per) || 0,
        dims: d.dims || "", tiers: parseTiers(d.tiers), kg: d.kg ? parseFloat(d.kg) : NaN,
        pu: d.pu || "buc", nosync: d.nosync === "1", row: r
      };
      if (!isNaN(o.price) && o.price > 0) { ROWS.push(o); BY[o.id] = o; }
    });
  }
  function rowsWhere(fn) { var o = []; each(ROWS, function (r) { if (fn(r)) o.push(r); }); return o; }
  function tierPct(item, q) {
    for (var i = 0; i < item.tiers.length; i++) if (q >= item.tiers[i].min) return item.tiers[i].pct;
    return 0;
  }

  /* ---------------- stare ---------------- */
  /* l = lungimea de-a lungul casei, d = adancimea (de la casa spre curte)
     o: "p" placi paralele cu casa, "x" perpendiculare pe casa
     pl: plinta 0 / 1 (fata) / 3 (fara latura casei) / 4 (perimetru)
     su: suporti 0 / 1 (44-70 mm) / 2 (85-135 mm) */
  var S = { c: "", l: 5000, d: 3000, o: "p", bt: 1, sp: 300, pl: 0, su: 0 };
  var LIM = { l: [500, 30000], d: [500, 20000] };
  var SP_OPTS = [300, 400], PL_OPTS = [0, 1, 3, 4], SU_OPTS = [0, 1, 2];
  var SU_ID = ["", "sup-s", "sup-m"], SU_H = [0, 57, 110];

  function boards() { return rowsWhere(function (r) { return r.kind === "board"; }); }
  function curBoard() {
    var list = boards();
    for (var i = 0; i < list.length; i++) if (list[i].id === S.c) return list[i];
    S.c = list[0].id; return list[0];
  }
  function trimFor(b) {
    var t = BY[b.trim];
    if (t) return t;
    var all = rowsWhere(function (r) { return r.kind === "trim"; });
    return all[0] || null;
  }

  /* ---------------- calcul ---------------- */
  /* debitare: primul-potrivit descrescator, cu 5 mm pierdere la fiecare taietura */
  function pack(pieces, bar) {
    var bins = [], list = pieces.slice().sort(function (x, y) { return y - x; });
    each(list, function (p) {
      var need = p + KERF;
      for (var i = 0; i < bins.length; i++) if (bins[i] >= need) { bins[i] -= need; return; }
      bins.push(bar + KERF - need);
    });
    return bins.length;
  }
  function cut(lengths, bar) {
    var out = [];
    each(lengths, function (len) { var rest = len; while (rest > bar) { out.push(bar); rest -= bar; } out.push(rest); });
    return out;
  }
  function item(r, q) {
    var pct = tierPct(r, q), gross = q * r.price;
    return { r: r, q: q, pct: pct, gross: gross, net: gross * (1 - pct / 100) };
  }
  /* Grinzile stau perpendicular pe placi. Placi paralele cu casa (de-a lungul
     lui l): grinzile merg de la casa spre curte (lungime d) si se repeta pe l. */
  function geom() {
    var par = S.o === "p";
    var run = par ? S.l : S.d, cross = par ? S.d : S.l;
    var nB = Math.ceil(run / S.sp) + 1, reg = [];
    for (var k = 0; k < nB; k++) reg.push(k === nB - 1 ? run : k * S.sp);
    return { par: par, run: run, cross: cross, nB: nB, reg: reg };
  }
  function trimEdges() {
    if (S.pl === 1) return [S.l];
    if (S.pl === 3) return [S.l, S.d, S.d];
    if (S.pl === 4) return [S.l, S.l, S.d, S.d];
    return [];
  }
  function compute() {
    var board = curBoard(), G = geom(), bat = BY[BAT_ID];
    var area = S.l * S.d / 1e6;
    var ml = Math.max(MIN_ML, STEP_ML * Math.ceil(area * PER_M2 / STEP_ML - 1e-9));
    var useBat = !!(S.bt && bat);
    var batBars = useBat ? pack(cut(map(G.reg, function () { return G.cross; }), bat.len), bat.len) : 0;
    var clips = Math.ceil(area * (BY[CLIP_ID] ? BY[CLIP_ID].per || 20 : 20) - 1e-9);
    var starters = Math.ceil(area * (BY[START_ID] ? BY[START_ID].per || 4 : 4) - 1e-9);
    var trim = S.pl ? trimFor(board) : null, edges = trimEdges();
    var trimBars = trim ? pack(cut(edges, trim.len), trim.len) : 0;
    var sup = S.su ? BY[SU_ID[S.su]] : null;
    var supN = sup ? Math.ceil(area * (sup.per || 9) - 1e-9) : 0;
    var rows = Math.ceil(G.cross / PITCH - 1e-9);
    var items = [item(board, ml)];
    if (useBat) items.push(item(bat, batBars));
    if (BY[CLIP_ID]) items.push(item(BY[CLIP_ID], clips));
    if (BY[START_ID]) items.push(item(BY[START_ID], starters));
    if (trim && trimBars) items.push(item(trim, trimBars));
    if (sup && supN) items.push(item(sup, supN));
    var total = 0, grossP = 0;
    each(items, function (it) { total += it.net; grossP += it.gross; });
    return {
      board: board, G: G, area: area, ml: ml, rows: rows,
      useBat: useBat, batBars: batBars, batMl: G.nB * G.cross / 1000,
      clips: clips, starters: starters,
      trim: trim, trimBars: trimBars, trimMl: edges.reduce(function (a, b) { return a + b; }, 0) / 1000,
      sup: sup, supN: supN, height: 25 + 30 + SU_H[S.su],
      items: items, total: total, gross: grossP, saved: grossP - total,
      perM2: area > 0 ? total / area : 0,
      weight: isNaN(board.kg) ? NaN : ml * board.kg
    };
  }

  /* ---------------- SVG: comun ---------------- */
  var SVGNS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, text) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function isMobile() { return window.innerWidth <= 900; }
  var MONO = "'IBM Plex Mono',monospace", TECH = "#5B7183";
  function f1(v) { return Math.round(v * 10) / 10; }
  function pts(list) { return map(list, function (p) { return f1(p[0]) + "," + f1(p[1]); }).join(" "); }
  function clearSvg(svg) {
    each(Array.prototype.slice.call(svg.childNodes), function (n) {
      var t = n.tagName ? String(n.tagName).toLowerCase() : "";
      if (t !== "title" && t !== "desc") svg.removeChild(n);
    });
  }
  function grad(defs, id, x1, y1, x2, y2, stops, user) {
    var g = el("linearGradient", user ? { id: id, gradientUnits: "userSpaceOnUse", x1: f1(x1), y1: f1(y1), x2: f1(x2), y2: f1(y2) } : { id: id, x1: x1, y1: y1, x2: x2, y2: y2 });
    each(stops, function (s) { g.appendChild(el("stop", { offset: s[0], "stop-color": s[1], "stop-opacity": s[2] === undefined ? 1 : s[2] })); });
    defs.appendChild(g);
  }
  /* Incadrare fixa (nu sare cand se schimba dimensiunile terasei): 16:10, iar pe
     desktop exact cat cadrul ramas dupa max-height din CSS, ca sa nu apara
     margini goale in laterale. Formula e aceeasi ca in CSS (.vd-view svg). */
  var ASPECT = 1.6, lastAsp = 0;
  function frameAspect(svg) {
    if (isMobile() || !svg || !svg.parentNode) return ASPECT;
    var w = svg.parentNode.clientWidth;
    var hr = parseFloat(document.documentElement.style.getPropertyValue("--vd-headroom")) || 16;
    var avail = Math.max(170, (window.innerHeight - hr - 236) / 2);
    if (!w || !avail) return ASPECT;
    return clamp(w / avail, ASPECT, 2.6);
  }
  function fitBox(b, padK, asp) {
    var w = b[2] - b[0], h = b[3] - b[1], p = Math.max(w, h) * padK;
    var x = b[0] - p, y = b[1] - p; w += 2 * p; h += 2 * p;
    if (w / h > asp) { var nh = w / asp; y -= (nh - h) / 2; h = nh; }
    else { var nw = h * asp; x -= (nw - w) / 2; w = nw; }
    return { x: x, y: y, w: w, h: h };
  }
  function bbox(list) {
    var b = [Infinity, Infinity, -Infinity, -Infinity];
    each(list, function (p) { b[0] = Math.min(b[0], p[0]); b[1] = Math.min(b[1], p[1]); b[2] = Math.max(b[2], p[0]); b[3] = Math.max(b[3], p[1]); });
    return b;
  }
  /* randurile de placi: a..b pe latime (de la casa / de la stanga), imbinarile
     capetelor (placi de 4 m) decalate de la un rand la altul, cu seed fix */
  function layout(G) {
    var n = Math.ceil(G.cross / PITCH - 1e-9), R = rng(9173), prev = 0, out = [];
    for (var i = 0; i < n; i++) {
      var a = i * PITCH, b = Math.min(a + BW, G.cross);
      if (b - a < 6) break;
      var off = (prev + 1000 + Math.floor(R() * 2000)) % BL4; prev = off;
      var j = [];
      if (G.run > BL4) for (var x = off || BL4; x < G.run - 150; x += BL4) if (x > 150) j.push(x);
      out.push({ a: a, b: b, j: j, t: (R() - 0.5) * 0.11 });
    }
    return out;
  }
  /* ---------------- mascota VIVODECOR (aceeasi ca in video-ul de montaj gard) ----------------
     Culorile si proportiile din Gard WPC/video/sursa/render.js (drawWorker + drawHead,
     casca stil C): casca verde #7ab648 cu sigla (patrat galben cu frunza), geaca verde cu
     benzi reflectorizante, pantaloni si bocanci inchisi. In vederea de ansamblu e construita
     in volum (man3d, in drawPersp), in plan e vazuta de sus (drawPlan). */
  var HELMET = "#7ab648", JACKET = "#0d4a1c";
  function logoMark(g, cx, cy, s) {
    var q = s / 2, k = s / 24, o = el("g", { transform: "translate(" + f1(cx - q) + "," + f1(cy - q) + ") scale(" + (Math.round(k * 1e4) / 1e4) + ")" });
    o.appendChild(el("rect", { x: 0, y: 0, width: 24, height: 24, rx: 2.6, fill: "#F2DC5D", stroke: JACKET, "stroke-width": 1.6 }));
    o.appendChild(el("path", { d: "M5.2 18.8 C3.4 10.4 8.4 4.6 19.2 4.2 C20 13.6 14.6 19.2 6.4 19 Z", fill: JACKET }));
    o.appendChild(el("path", { d: "M5.6 19 C9.6 14.6 12.8 10.6 16.8 6.6", fill: "none", stroke: "#F2DC5D", "stroke-width": 1.3, "stroke-linecap": "round" }));
    o.appendChild(el("path", { d: "M5.6 19 L4 21", stroke: JACKET, "stroke-width": 1.4, "stroke-linecap": "round" }));
    g.appendChild(o);
  }
  /* ---------------- plante (aceleasi pozitii in ambele desene) ---------------- */
  /* x, z in mm (z = 0 la casa); r = raza; t = tufa | iarba (ornamentala) | flori | ghiveci (pe deck) */
  function plants(L, D) {
    var o = [], R = rng(5813);
    o.push({ t: "tufa", x: -760, z: 520, r: 560 });
    o.push({ t: "tufa", x: -1850, z: 430, r: 640 });
    o.push({ t: "iarba", x: -560, z: Math.max(1300, D * 0.62), r: 420 });
    o.push({ t: "flori", x: -720, z: D + 520, r: 400 });
    o.push({ t: "tufa", x: L + 780, z: 560, r: 600 });
    o.push({ t: "iarba", x: L + 620, z: Math.max(1500, D * 0.7), r: 440 });
    o.push({ t: "flori", x: L + 900, z: D + 420, r: 380 });
    o.push({ t: "iarba", x: L * 0.42, z: D + 750, r: 300 });
    if (L >= 2200 && D >= 1700) o.push({ t: "ghiveci", x: 380, z: 360, r: 240 });
    each(o, function (p) { p.s = R(); });
    return o;
  }
  var GR = { d: "#3F6B30", m: "#5E8C42", l: "#86B35C", h: "#A9CF7C" };

  /* ---------------- desen 1: vedere de ansamblu (perspectiva) ---------------- */
  function camera(L, D, az, elv) {
    var span = Math.max(L, D, 2600);
    var tx = L / 2, ty = 300, tz = D / 2, dist = span * 1.25 + 4200;
    var C = [tx + dist * Math.cos(elv) * Math.sin(az), ty + dist * Math.sin(elv), tz + dist * Math.cos(elv) * Math.cos(az)];
    function nrm(v) { var l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]); return [v[0] / l, v[1] / l, v[2] / l]; }
    function crs(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
    var f = nrm([tx - C[0], ty - C[1], tz - C[2]]), r = nrm(crs(f, [0, 1, 0])), u = crs(r, f);
    function P(x, y, z) {
      var v = [x - C[0], y - C[1], z - C[2]], zc = Math.max(dot(v, f), 1);
      return [1000 * dot(v, r) / zc, -1000 * dot(v, u) / zc];
    }
    return { P: P, C: C, span: span };
  }
  function lineAt(a, b) { var k = (b[1] - a[1]) / (b[0] - a[0] || 1e-6); return function (x) { return a[1] + k * (x - a[0]); }; }
  function polyArea(p) { var s = 0; for (var i = 0; i < p.length; i++) { var a = p[i], b = p[(i + 1) % p.length]; s += a[0] * b[1] - b[0] * a[1]; } return Math.abs(s / 2); }

  function drawPersp(res) {
    var svg = $("vdKPersp"); if (!svg) return;
    clearSvg(svg);
    var L = S.l, D = S.d, H = res.height, mob = isMobile(), b = res.board, G = res.G, WH = 2600;
    var onDeck = L >= 1400 && D >= 1400;
    var px = onDeck ? L * 0.64 : L + 650, pz = onDeck ? D * 0.58 : D * 0.55, py = onDeck ? H : 0;
    var off0 = Math.max(Math.max(L, D) * 0.045, 260);
    /* camera: dintre cateva unghiuri naturale, cel la care deckul umple cel mai mult cadrul */
    var cam = null, best = -1;
    each([0.22, 0.38, 0.54], function (az) {
      each([0.5, 0.6, 0.7], function (elv) {
        var c = camera(L, D, az, elv), P = c.P, top = [P(0, H, 0), P(L, H, 0), P(L, H, D), P(0, H, D)];
        var V = fitBox(bbox(top.concat([P(0, 0, D), P(L, 0, D), P(px, py + 1800, pz), P(L / 2, 0, D + off0 * 2)])), 0.03, lastAsp);
        var sc = polyArea(top) / (V.w * V.h) - 0.3 * (elv - 0.5) - 0.05 * Math.abs(az - 0.38);
        if (sc > best) { best = sc; cam = c; }
      });
    });
    var P = cam.P, span = cam.span;
    var showR = cam.C[0] > L, showL = cam.C[0] < 0;
    var labA = P(L / 2, 0, D + off0 * 1.9), labB = P(L + off0 * 2.1, 0, D / 2);
    var keys = [P(0, H, 0), P(L, H, 0), P(0, 0, D), P(L, 0, D), P(L, 0, 0), P(0, 0, 0), P(px, py + 1800, pz), labA, labB];
    var FSK = mob ? 26 : 38, V = fitBox(bbox(keys), 0.03, lastAsp);
    for (var pass = 0; pass < 2; pass++) {
      var tw0 = V.w / FSK * 0.62 * 4.4, th0 = V.w / FSK * 0.9;
      var ext = [[labA[0] - tw0, labA[1] + th0], [labA[0] + tw0, labA[1] - th0]];
      ext.push([labB[0] - tw0, labB[1] + th0], [labB[0] + tw0, labB[1] - th0]);
      V = fitBox(bbox(keys.concat(ext)), 0.025, lastAsp);
    }
    var x0 = V.x, x1 = V.x + V.w, y0 = V.y, y1 = V.y + V.h;
    svg.setAttribute("viewBox", f1(V.x) + " " + f1(V.y) + " " + f1(V.w) + " " + f1(V.h));
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    var fs = V.w / FSK, sw = V.w / 900, pxu = 640 / V.w;
    var defs = el("defs"); svg.appendChild(defs);
    var g = el("g"); svg.appendChild(g);
    function kAt(x, y, z) { return Math.abs(P(x, y, z)[1] - P(x, y + 100, z)[1]) / 100; } /* unitati de ecran pe mm, pe verticala */
    function inView(p, m) { return p[0] > x0 - m && p[0] < x1 + m && p[1] > y0 - m && p[1] < y1 + m; }

    /* fundal: peretele casei (z = 0) prelungit pe toata latimea, apoi gazonul */
    var top = lineAt(P(0, WH, 0), P(L, WH, 0)), eave = lineAt(P(0, WH + 190, 0), P(L, WH + 190, 0));
    var bot = lineAt(P(0, 0, 0), P(L, 0, 0)), soc = lineAt(P(0, 380, 0), P(L, 380, 0));
    g.appendChild(el("rect", { x: f1(x0), y: f1(y0), width: f1(V.w), height: f1(V.h), fill: "#E6EDEF" }));
    g.appendChild(el("polygon", { points: pts([[x0, eave(x0)], [x1, eave(x1)], [x1, top(x1)], [x0, top(x0)]]), fill: "#5E625F" }));
    grad(defs, "vdKPwall", x0, top(x0), x0, bot(x0), [["0", "#EAE5DB"], ["1", "#F3EFE7"]], true);
    g.appendChild(el("polygon", { points: pts([[x0, top(x0)], [x1, top(x1)], [x1, bot(x1)], [x0, bot(x0)]]), fill: "url(#vdKPwall)" }));
    g.appendChild(el("polygon", { points: pts([[x0, soc(x0)], [x1, soc(x1)], [x1, bot(x1)], [x0, bot(x0)]]), fill: "#CFC7BA" }));
    function quad(xa, xb, ya, yb, z) { return [P(xa, ya, z), P(xb, ya, z), P(xb, yb, z), P(xa, yb, z)]; }
    grad(defs, "vdKPglass", 0, 0, 1, 1, [["0", "#8DA0A8"], [".45", "#5A6B72"], ["1", "#3F4C52"]]);
    function opening(xa, w, ya, h) {
      g.appendChild(el("polygon", { points: pts(quad(xa - 60, xa + w + 60, ya - 60, ya + h + 60, 0)), fill: "#F8F6F1", stroke: "rgba(0,0,0,.12)", "stroke-width": f1(sw * 0.6) }));
      g.appendChild(el("polygon", { points: pts(quad(xa, xa + w, ya, ya + h, 0)), fill: "url(#vdKPglass)" }));
    }
    if (L >= 1800) opening(Math.max(250, L * 0.2), 900, 0, 2150);
    for (var ox = Math.max(L * 0.2 + 1700, L * 0.52); ox + 1300 < L + 2400; ox += 3400) opening(ox, 1300, 950, 1250);
    opening(-2300, 1200, 950, 1250);
    /* gazon: gradient (mai deschis in departare) + fire de iarba desenate in perspectiva */
    grad(defs, "vdKPgnd", 0, bot(L / 2), 0, y1, [["0", "#9DBF74"], [".5", "#83AA5C"], ["1", "#6C944A"]], true);
    g.appendChild(el("polygon", { points: pts([[x0, bot(x0)], [x1, bot(x1)], [x1, y1 + 1], [x0, y1 + 1]]), fill: "url(#vdKPgnd)" }));
    /* banda de umbra la baza peretelui */
    var wb0 = lineAt(P(0, 0, 260), P(L, 0, 260));
    grad(defs, "vdKPao", 0, bot(L / 2), 0, wb0(L / 2), [["0", "#000", ".22"], ["1", "#000", "0"]], true);
    g.appendChild(el("polygon", { points: pts([[x0, bot(x0)], [x1, bot(x1)], [x1, wb0(x1)], [x0, wb0(x0)]]), fill: "url(#vdKPao)" }));
    var TR = rng(77), dkP = "", ltP = "", ext2 = span * 0.6, nT = mob ? 260 : 420;
    function tuft(x, z, kk, big) {
      var p = P(x, 0, z), k = kAt(x, 0, z) * (big ? 1.5 : 1) * (0.75 + TR() * 0.5);
      if (!inView(p, 80 * k)) return;
      var hh = 95 * k, ww = 34 * k, s = "";
      for (var n = 0; n < 3; n++) {
        var bx = p[0] + (n - 1) * ww * 0.5 + (TR() - 0.5) * ww * 0.3, lean = (TR() - 0.5) * ww * 1.4;
        s += "M" + f1(bx - ww * 0.12) + " " + f1(p[1]) + " Q" + f1(bx + lean * 0.3) + " " + f1(p[1] - hh * 0.6) + " " + f1(bx + lean) + " " + f1(p[1] - hh * (0.7 + TR() * 0.5)) +
          " Q" + f1(bx + lean * 0.3 + ww * 0.15) + " " + f1(p[1] - hh * 0.5) + " " + f1(bx + ww * 0.14) + " " + f1(p[1]) + "Z";
      }
      if (kk) dkP += s; else ltP += s;
    }
    for (var ti = 0; ti < nT; ti++) {
      var tx = -ext2 + TR() * (L + 2 * ext2), tz = 120 + TR() * (D + ext2);
      if (tx > -60 && tx < L + 60 && tz < D + 60) continue;
      tuft(tx, tz, TR() < 0.55, false);
    }
    g.appendChild(el("path", { d: dkP, fill: GR.m, opacity: ".55" }));
    g.appendChild(el("path", { d: ltP, fill: GR.h, opacity: ".5" }));
    dkP = ""; ltP = "";

    /* plante: cele din spatele deckului inainte de el, cele din fata dupa */
    var PL = plants(L, D);
    function front(p) { return p.t === "ghiveci" || p.z > D || (p.x > L && showR) || (p.x < 0 && showL); }
    function gEll(x, y, z, rx, rz, op, dx, dz) {
      var c = P(x + (dx || 0), y, z + (dz || 0)), a = P(x + rx, y, z), bb = P(x - rx, y, z), c2 = P(x, y, z + rz), d2 = P(x, y, z - rz);
      g.appendChild(el("ellipse", { cx: f1(c[0]), cy: f1(c[1]), rx: f1(Math.max(Math.abs(a[0] - bb[0]), Math.abs(c2[0] - d2[0])) / 2), ry: f1(Math.max(Math.abs(c2[1] - d2[1]), Math.abs(a[1] - bb[1])) / 2), fill: "rgba(25,40,20," + op + ")", filter: "url(#vdKPblur)" }));
    }
    var flt = el("filter", { id: "vdKPblur", x: "-30%", y: "-30%", width: "160%", height: "160%" });
    flt.appendChild(el("feGaussianBlur", { stdDeviation: f1(sw * 5) }));
    defs.appendChild(flt);
    /* volume 3D, vazute cu aceeasi camera ca deckul: sfere (tufe), fire (ierburi), cilindru (ghiveci) */
    function dep(p) { var dx = p[0] - cam.C[0], dy = p[1] - cam.C[1], dz = p[2] - cam.C[2]; return Math.sqrt(dx * dx + dy * dy + dz * dz); }
    function toCam(p) { var v = [cam.C[0] - p[0], cam.C[1] - p[1], cam.C[2] - p[2]], l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]); return [v[0] / l, v[1] / l, v[2] / l]; }
    function rgrad(id, c0, c1, c2) {
      var r = el("radialGradient", { id: id, cx: ".42", cy: ".38", r: ".62", fx: ".34", fy: ".26" });
      each([["0", c0], [".55", c1], ["1", c2]], function (s) { r.appendChild(el("stop", { offset: s[0], "stop-color": s[1] })); });
      defs.appendChild(r);
    }
    rgrad("vdKPs1", "#5E8C42", "#3F6B30", "#2A4C22");
    rgrad("vdKPs2", "#86B35C", "#5E8C42", "#3D6630");
    rgrad("vdKPs3", "#A9CF7C", "#7FAE57", "#557F3C");
    rgrad("vdKPskin", "#E8BE9C", "#D9A982", "#B98A66");
    rgrad("vdKPhel", lighten(HELMET, 0.35), HELMET, shade(HELMET, 0.25));
    /* tufa = grupuri de sfere asezate in jurul bazei, nu o silueta plata */
    var BUSH = [[0, 0.5, 0, 0.6, 1], [-0.5, 0.38, 0.12, 0.46, 1], [0.5, 0.4, -0.08, 0.48, 1], [0.08, 0.42, 0.5, 0.44, 2], [-0.1, 0.42, -0.5, 0.44, 1],
      [0.02, 0.92, 0.02, 0.44, 2], [0.32, 0.8, 0.28, 0.34, 3], [-0.34, 0.8, -0.18, 0.32, 2], [-0.26, 0.72, 0.36, 0.3, 3], [0.36, 0.74, -0.32, 0.3, 2], [0.06, 1.2, 0.1, 0.26, 3]];
    function plant3d(p, out) {
      var y0 = p.t === "ghiveci" ? H : 0, R = rng(Math.floor(p.s * 1e6) + 3), base = P(p.x, y0, p.z);
      if (!inView(base, p.r * kAt(p.x, y0, p.z) * 4)) return;
      out.push({ d: dep([p.x, y0, p.z]) + p.r * 2, f: function () { gEll(p.x, y0, p.z, p.r * 1.05, p.r * 0.9, ".35", p.r * 0.45, p.r * 0.35); } });
      if (p.t === "tufa" || p.t === "flori") {
        var sq = p.t === "flori" ? 0.78 : 1;
        each(BUSH, function (c) {
          var w = [p.x + (c[0] + (R() - 0.5) * 0.1) * p.r, y0 + c[1] * p.r * sq, p.z + (c[2] + (R() - 0.5) * 0.1) * p.r], rr = c[3] * p.r, seed = R();
          out.push({ d: dep(w), f: function () {
            var q = P(w[0], w[1], w[2]), rs = rr * kAt(w[0], w[1], w[2]), T = rng(Math.floor(seed * 1e6) + 7), tc = toCam(w);
            g.appendChild(el("circle", { cx: f1(q[0]), cy: f1(q[1]), r: f1(rs), fill: "url(#vdKPs" + c[4] + ")" }));
            /* frunzis: puncte pe partea de sus a sferei, doar cele vazute de camera */
            for (var i = 0; i < 9; i++) {
              var a = T() * Math.PI * 2, e = 0.15 + T() * 1.2, n = [Math.cos(a) * Math.cos(e), Math.sin(e), Math.sin(a) * Math.cos(e)];
              if (n[0] * tc[0] + n[1] * tc[1] + n[2] * tc[2] < 0.2) continue;
              var s2 = P(w[0] + n[0] * rr, w[1] + n[1] * rr, w[2] + n[2] * rr);
              g.appendChild(el("circle", { cx: f1(s2[0]), cy: f1(s2[1]), r: f1(rs * (0.07 + T() * 0.06)), fill: i % 3 ? GR.h : GR.d, opacity: i % 3 ? ".55" : ".35" }));
            }
            if (p.t === "flori") for (var fi = 0; fi < 6; fi++) {
              var fa = T() * Math.PI * 2, fe = 0.3 + T() * 1.1, fn = [Math.cos(fa) * Math.cos(fe), Math.sin(fe), Math.sin(fa) * Math.cos(fe)];
              if (fn[0] * tc[0] + fn[1] * tc[1] + fn[2] * tc[2] < 0.25) continue;
              var fp = P(w[0] + fn[0] * rr, w[1] + fn[1] * rr, w[2] + fn[2] * rr);
              g.appendChild(el("circle", { cx: f1(fp[0]), cy: f1(fp[1]), r: f1(rs * 0.13), fill: ["#E8789A", "#F7EEF2", "#F2C94C"][fi % 3] }));
            }
          } });
        });
      } else {
        var oy = y0, cols = [GR.m, GR.l, "#B9B06A", GR.d], n = 24, Hh = 900, wb = 22;
        if (p.t === "ghiveci") {
          var rT = 200, rB = 160, hP = 430;
          oy = y0 + hP - 30; cols = [GR.d, GR.m, "#2F5A28", GR.l]; n = 18; Hh = 760; wb = 34;
          out.push({ d: dep([p.x, y0 + hP / 2, p.z]) + 1, f: function () {
            /* ghiveciul: cilindru usor conic, cu marginea si pamantul vazute de sus */
            var b0 = P(p.x, y0, p.z), t0 = P(p.x, y0 + hP, p.z), kb = kAt(p.x, y0, p.z), kt = kAt(p.x, y0 + hP, p.z);
            function ry(yy, r0) { var a = P(p.x, yy, p.z - r0), c = P(p.x, yy, p.z + r0); return Math.abs(c[1] - a[1]) / 2; }
            var bx = rB * kb, by = ry(y0, rB), tx = rT * kt, ty = ry(y0 + hP, rT);
            grad(defs, "vdKPpot", t0[0] - tx, 0, t0[0] + tx, 0, [["0", "#5D6164"], [".35", "#44484B"], ["1", "#2A2D2F"]], true);
            g.appendChild(el("path", { d: "M" + f1(t0[0] - tx) + " " + f1(t0[1]) + " L" + f1(b0[0] - bx) + " " + f1(b0[1]) + " A" + f1(bx) + " " + f1(by) + " 0 0 0 " + f1(b0[0] + bx) + " " + f1(b0[1]) +
              " L" + f1(t0[0] + tx) + " " + f1(t0[1]) + " Z", fill: "url(#vdKPpot)" }));
            g.appendChild(el("ellipse", { cx: f1(t0[0]), cy: f1(t0[1]), rx: f1(tx), ry: f1(ty), fill: "#55595C" }));
            g.appendChild(el("ellipse", { cx: f1(t0[0]), cy: f1(t0[1] + ty * 0.08), rx: f1(tx * 0.84), ry: f1(ty * 0.8), fill: "#4B3B2C" }));
          } });
        }
        /* fire / frunze: pornesc din baza in toate directiile, cu varful aplecat */
        for (var bi = 0; bi < n; bi++) {
          (function (bi) {
            var phi = bi / n * Math.PI * 2 + (R() - 0.5) * 0.5, lean = 0.25 + R() * 0.45, len = Hh * (0.6 + R() * 0.4), hi = 0.75 + R() * 0.25;
            var cx = Math.cos(phi), cz = Math.sin(phi), sx = -cz, sz = cx, col = cols[bi % cols.length];
            var tip = [p.x + cx * len * lean, oy + len * hi, p.z + cz * len * lean], mid = [p.x + cx * len * lean * 0.3, oy + len * 0.62, p.z + cz * len * lean * 0.3];
            out.push({ d: dep(tip) - 0.5, f: function () {
              var a = P(p.x + sx * wb, oy, p.z + sz * wb), c = P(p.x - sx * wb, oy, p.z - sz * wb), m = P(mid[0], mid[1], mid[2]), t = P(tip[0], tip[1], tip[2]);
              g.appendChild(el("path", { d: "M" + f1(a[0]) + " " + f1(a[1]) + " Q" + f1(m[0]) + " " + f1(m[1]) + " " + f1(t[0]) + " " + f1(t[1]) + " Q" + f1(m[0]) + " " + f1(m[1]) + " " + f1(c[0]) + " " + f1(c[1]) + "Z", fill: col }));
            } });
          })(bi);
        }
      }
    }
    function paint(list) { list.sort(function (a, b2) { return b2.d - a.d; }); each(list, function (it) { it.f(); }); }

    /* mascota VIVODECOR in volum (aceleasi culori si proportii ca in video-ul de montaj gard,
       1 unitate video = 1750 / 610 mm), privita de camera: picioare, trunchi cu benzi
       reflectorizante, brate, cap cu fata, casca vazuta de sus cu cozoroc si sigla */
    function man3d(out, mx, my, mz) {
      var tcH = [cam.C[0] - mx, 0, cam.C[2] - mz], tl = Math.sqrt(tcH[0] * tcH[0] + tcH[2] * tcH[2]) || 1;
      var th = Math.atan2(tcH[0] / tl, tcH[2] / tl) - 0.6;   /* fata spre camera, in trei sferturi */
      var F = [Math.sin(th), 0, Math.cos(th)], Rt = [Math.cos(th), 0, -Math.sin(th)];
      function W3(f, r, y) { return [mx + F[0] * f + Rt[0] * r, my + y, mz + F[2] * f + Rt[2] * r]; }
      function pr(p) { return P(p[0], p[1], p[2]); }
      var s = kAt(mx, my + 900, mz);
      function cap(pts3, w, col, extra) {
        var o = { points: pts(map(pts3, pr)), fill: "none", stroke: col, "stroke-width": f1(w * s), "stroke-linecap": "round", "stroke-linejoin": "round" };
        if (extra) for (var k in extra) o[k] = extra[k];
        g.appendChild(el("polyline", o));
      }
      out.push({ d: dep([mx, my, mz]) + 400, f: function () { gEll(mx, my, mz, 300, 220, ".32", 170, 140); } });
      each([-1, 1], function (sg) {
        var hip = W3(0, sg * 82, 900), knee = W3(18, sg * 94, 480), ank = W3(0, sg * 104, 70);
        out.push({ d: dep(knee), f: function () {
          var far = dep(knee) > dep([mx, my + 480, mz]);
          cap([hip, knee, ank], 116, far ? "#1a1d1c" : "#2a2e2d");
          cap([W3(-45, sg * 106, 32), W3(105, sg * 112, 32)], 64, far ? "#0a0b0b" : "#111312");
        } });
        var sh = W3(0, sg * 104, 1380), el2 = W3(26, sg * 120, 1095), hd = W3(46, sg * 116, 820);
        out.push({ d: dep(el2), f: function () {
          var far = dep(el2) > dep([mx, my + 1090, mz]);
          cap([sh, el2, hd], 76, far ? "#0a3614" : "#0f5220");
          var hp = pr(hd); g.appendChild(el("circle", { cx: f1(hp[0]), cy: f1(hp[1]), r: f1(44 * s), fill: "#1b1b1b" }));
        } });
      });
      out.push({ d: dep([mx, my + 1150, mz]), f: function () {
        cap([W3(0, 0, 930), W3(0, 0, 1380)], 200, JACKET);
        cap([W3(0, -20, 960), W3(0, -20, 1320)], 70, "rgba(255,255,255,.05)");
        /* benzile si centura: doar jumatatea de inel vazuta de camera */
        var tc = toCam([mx, my + 1100, mz]);
        function ring(y, col, w) {
          /* jumatatea de inel dinspre camera: de la -90 la +90 de grade fata de directia camerei */
          var p = [], ac = Math.atan2(tc[0] * F[0] + tc[2] * F[2], tc[0] * Rt[0] + tc[2] * Rt[2]);
          for (var a = 0; a <= 24; a++) {
            var an = ac - Math.PI / 2 + a / 24 * Math.PI, n = [Rt[0] * Math.cos(an) + F[0] * Math.sin(an), 0, Rt[2] * Math.cos(an) + F[2] * Math.sin(an)];
            p.push(pr([mx + n[0] * 101, my + y, mz + n[2] * 101]));
          }
          if (p.length > 1) g.appendChild(el("polyline", { points: pts(p), fill: "none", stroke: col, "stroke-width": f1(w * s) }));
        }
        ring(890, "#242827", 44); ring(1030, HELMET, 26); ring(1140, HELMET, 26);
      } });
      out.push({ d: dep([mx, my + 1600, mz]) - 300, f: function () {
        var hc = [mx, my + 1585, mz], hq = pr(hc), hr = 98 * s, tc = toCam(hc);
        g.appendChild(el("circle", { cx: f1(hq[0]), cy: f1(hq[1]), r: f1(hr), fill: "url(#vdKPskin)" }));
        /* fata: puncte pe sfera capului, doar cele intoarse spre camera */
        function sp(a, b, rr) {
          var n = [F[0] * Math.cos(b) * Math.cos(a) + Rt[0] * Math.cos(b) * Math.sin(a), Math.sin(b), F[2] * Math.cos(b) * Math.cos(a) + Rt[2] * Math.cos(b) * Math.sin(a)];
          return { v: n[0] * tc[0] + n[1] * tc[1] + n[2] * tc[2], p: pr([hc[0] + n[0] * (rr || 98), hc[1] + n[1] * (rr || 98), hc[2] + n[2] * (rr || 98)]) };
        }
        each([-1, 1], function (sg) {
          var bl = sp(sg * 0.6, -0.32); if (bl.v > 0.15) g.appendChild(el("circle", { cx: f1(bl.p[0]), cy: f1(bl.p[1]), r: f1(18 * s), fill: "rgba(232,130,100,.3)" }));
          var ey = sp(sg * 0.38, -0.06); if (ey.v > 0.15) g.appendChild(el("circle", { cx: f1(ey.p[0]), cy: f1(ey.p[1]), r: f1(10 * s), fill: "#111" }));
          var b1 = sp(sg * 0.24, 0.14), b2 = sp(sg * 0.52, 0.11);
          if (b1.v > 0.15 && b2.v > 0.15) g.appendChild(el("line", { x1: f1(b1.p[0]), y1: f1(b1.p[1]), x2: f1(b2.p[0]), y2: f1(b2.p[1]), stroke: "#5a3a24", "stroke-width": f1(7 * s), "stroke-linecap": "round" }));
        });
        var no = sp(0.02, -0.2, 108); if (no.v > 0.1) g.appendChild(el("circle", { cx: f1(no.p[0]), cy: f1(no.p[1]), r: f1(17 * s), fill: "#CF9B76" }));
        var sm = [];
        for (var a = -0.3; a <= 0.301; a += 0.1) { var q = sp(a, -0.44 - 0.09 * Math.cos(a / 0.3 * Math.PI / 2)); if (q.v > 0.15) sm.push(q.p); }
        if (sm.length > 1) g.appendChild(el("polyline", { points: pts(sm), fill: "none", stroke: "#8a4a32", "stroke-width": f1(6 * s), "stroke-linecap": "round" }));
        /* casca: calota vazuta de sus, apoi cozorocul scurt din fata (ca la casca de protectie) */
        var hb = [mx, my + 1628, mz], HR = 106;
        var pc = pr(hb), rs = HR * s, h = [tcH[0] / tl, tcH[2] / tl];
        var ea = P(hb[0] + h[0] * HR, hb[1], hb[2] + h[1] * HR), eb = P(hb[0] - h[0] * HR, hb[1], hb[2] - h[1] * HR), ryy = Math.max(Math.abs(ea[1] - eb[1]) / 2, rs * 0.2);
        var dome = "M" + f1(pc[0] - rs) + " " + f1(pc[1]) + " A" + f1(rs) + " " + f1(rs) + " 0 0 1 " + f1(pc[0] + rs) + " " + f1(pc[1]) +
          " A" + f1(rs) + " " + f1(ryy) + " 0 0 1 " + f1(pc[0] - rs) + " " + f1(pc[1]) + " Z";
        g.appendChild(el("path", { d: dome, fill: "url(#vdKPhel)", stroke: shade(HELMET, 0.32), "stroke-width": f1(3.5 * s) }));
        g.appendChild(el("path", { d: "M" + f1(pc[0] - rs) + " " + f1(pc[1]) + " A" + f1(rs) + " " + f1(ryy) + " 0 0 0 " + f1(pc[0] + rs) + " " + f1(pc[1]), fill: "none", stroke: shade(HELMET, 0.12), "stroke-width": f1(12 * s) }));
        g.appendChild(el("path", { d: "M" + f1(pc[0] - rs * 0.72) + " " + f1(pc[1] - rs * 0.42) + " Q" + f1(pc[0] - rs * 0.55) + " " + f1(pc[1] - rs * 0.82) + " " + f1(pc[0] - rs * 0.12) + " " + f1(pc[1] - rs * 0.9),
          fill: "none", stroke: "rgba(255,255,255,.5)", "stroke-width": f1(9 * s), "stroke-linecap": "round" }));
        var vis = [], vin = [];
        for (var i = 0; i <= 16; i++) {
          var an = (0.12 + 0.76 * i / 16) * Math.PI, d2 = [Rt[0] * Math.cos(an) + F[0] * Math.sin(an), Rt[2] * Math.cos(an) + F[2] * Math.sin(an)];
          var rad = HR + 34 * Math.pow(Math.sin(an), 2);
          vis.push(P(hb[0] + d2[0] * rad, hb[1] - 4, hb[2] + d2[1] * rad));
          vin.unshift(P(hb[0] + d2[0] * (HR - 6), hb[1], hb[2] + d2[1] * (HR - 6)));
        }
        g.appendChild(el("polygon", { points: pts(vis.concat(vin)), fill: shade(HELMET, 0.16), stroke: shade(HELMET, 0.36), "stroke-width": f1(3 * s), "stroke-linejoin": "round" }));
        /* sigla pe lateralul castii intors spre camera, putin turtita dupa unghi */
        var side = (Rt[0] * h[0] + Rt[2] * h[1]) >= 0 ? 1 : -1, sd = [Rt[0] * side, Rt[2] * side];
        var lp = P(hb[0] + (sd[0] * 0.78 + F[0] * 0.2) * HR, hb[1] + 0.55 * HR, hb[2] + (sd[1] * 0.78 + F[2] * 0.2) * HR);
        var sqz = Math.max(0.45, Math.abs(sd[0] * h[0] + sd[1] * h[1])), lg = el("g", { transform: "translate(" + f1(lp[0]) + "," + f1(lp[1]) + ") scale(" + sqz.toFixed(2) + ",1) translate(" + f1(-lp[0]) + "," + f1(-lp[1]) + ")" });
        logoMark(lg, lp[0], lp[1], 70 * s);
        g.appendChild(lg);
      } });
    }
    var back = [];
    each(PL, function (p) { if (!front(p)) plant3d(p, back); });
    paint(back);

    /* umbra deckului pe gazon */
    g.appendChild(el("polygon", { points: pts([P(-30, 0, 0), P(L + 180, 0, 0), P(L + 180, 0, D + 160), P(-30, 0, D + 160)]), fill: "rgba(20,35,15,.4)", filter: "url(#vdKPblur)" }));

    /* laturile deckului: fata si dreapta (sau stanga), cu plinta daca e aleasa */
    var dark = shade(b.hex, 0.55), tr = res.trim, tH = Math.min(70, H);
    function side(face, plinth) {
      var q = face === "f" ? [P(0, 0, D), P(L, 0, D), P(L, H, D), P(0, H, D)]
        : face === "r" ? [P(L, 0, D), P(L, 0, 0), P(L, H, 0), P(L, H, D)]
          : [P(0, 0, 0), P(0, 0, D), P(0, H, D), P(0, H, 0)];
      g.appendChild(el("polygon", { points: pts(q), fill: dark }));
      if (plinth && tr) {
        var yb = H - tH, p = face === "f" ? [P(0, yb, D + 11), P(L, yb, D + 11), P(L, H, D + 11), P(0, H, D + 11)]
          : face === "r" ? [P(L + 11, yb, D), P(L + 11, yb, 0), P(L + 11, H, 0), P(L + 11, H, D)]
            : [P(-11, yb, 0), P(-11, yb, D), P(-11, H, D), P(-11, H, 0)];
        g.appendChild(el("polygon", { points: pts(p), fill: face === "f" ? tr.hex : shade(tr.hex, 0.14) }));
      }
    }
    if (showR) side("r", S.pl >= 3);
    if (showL) side("l", S.pl >= 3);
    side("f", S.pl >= 1);

    /* fata de sus: rosturile, placile (nuanta, fibra, linii periate, imbinari) */
    var gap = shade(b.hex, 0.62);
    g.appendChild(el("polygon", { points: pts([P(0, H, 0), P(L, H, 0), P(L, H, D), P(0, H, D)]), fill: gap }));
    function W(u, v) { return G.par ? P(u, H, v) : P(v, H, u); }
    var rows = layout(G), dk = "rgba(0,0,0,.2)", lt = "rgba(255,255,255,.1)", SR = rng(311);
    each(rows, function (rw) {
      g.appendChild(el("polygon", { points: pts([W(0, rw.a), W(G.run, rw.a), W(G.run, rw.b), W(0, rw.b)]), fill: tint(b.hex, rw.t) }));
      var pa = W(G.run / 2, rw.a), pb = W(G.run / 2, rw.b);
      var wpx = Math.sqrt((pa[0] - pb[0]) * (pa[0] - pb[0]) + (pa[1] - pb[1]) * (pa[1] - pb[1])) * pxu;
      if (wpx > 2.5) {
        /* fibra: cateva dungi lungi, mai deschise / mai inchise */
        var ns = Math.max(2, Math.round(G.run / 1600));
        for (var si = 0; si < ns; si++) {
          var u0 = SR() * G.run, u1 = Math.min(G.run, u0 + 500 + SR() * 1500), v = rw.a + (rw.b - rw.a) * (0.2 + SR() * 0.6), s0 = W(u0, v), s1 = W(u1, v);
          g.appendChild(el("line", { x1: f1(s0[0]), y1: f1(s0[1]), x2: f1(s1[0]), y2: f1(s1[1]), stroke: SR() < 0.5 ? "rgba(255,255,255,.13)" : "rgba(0,0,0,.12)", "stroke-width": f1(wpx / pxu * 0.28), "stroke-linecap": "round" }));
        }
      }
      if (wpx > 4) {
        var nL = wpx > 10 ? 4 : 2;
        for (var k = 1; k <= nL; k++) {
          var vv = rw.a + (rw.b - rw.a) * k / (nL + 1), q0 = W(0, vv), q1 = W(G.run, vv);
          g.appendChild(el("line", { x1: f1(q0[0]), y1: f1(q0[1]), x2: f1(q1[0]), y2: f1(q1[1]), stroke: k % 2 ? dk : lt, "stroke-width": f1(sw * 0.45) }));
        }
      }
      each(rw.j, function (u) {
        var j0 = W(u, rw.a), j1 = W(u, rw.b);
        g.appendChild(el("line", { x1: f1(j0[0]), y1: f1(j0[1]), x2: f1(j1[0]), y2: f1(j1[1]), stroke: gap, "stroke-width": f1(sw * 1.1) }));
      });
    });
    /* lumina de zi + umbra moale langa perete */
    var la = P(0, H, 0), lb = P(L, H, D);
    grad(defs, "vdKPlight", la[0], la[1], lb[0], lb[1], [["0", "#fff", ".18"], [".55", "#fff", "0"], ["1", "#000", ".12"]], true);
    g.appendChild(el("polygon", { points: pts([P(0, H, 0), P(L, H, 0), P(L, H, D), P(0, H, D)]), fill: "url(#vdKPlight)" }));
    var ao0 = P(L / 2, H, 0), ao1 = P(L / 2, H, Math.min(D, 420));
    grad(defs, "vdKPaod", 0, ao0[1], 0, ao1[1], [["0", "#000", ".28"], ["1", "#000", "0"]], true);
    g.appendChild(el("polygon", { points: pts([P(0, H, 0), P(L, H, 0), P(L, H, Math.min(D, 420)), P(0, H, Math.min(D, 420))]), fill: "url(#vdKPaod)" }));
    var e0 = P(0, H, D), e1 = P(L, H, D), e2 = P(L, H, 0);
    g.appendChild(el("polyline", { points: pts(showR ? [e0, e1, e2] : [e0, e1]), fill: "none", stroke: "rgba(255,255,255,.4)", "stroke-width": f1(sw * 0.8) }));
    /* iarba care trece peste marginea deckului */
    var eTR = rng(901);
    for (var ex2 = 40; ex2 < L; ex2 += 120 + eTR() * 140) tuft(ex2, D + 40 + eTR() * 90, eTR() < 0.5, true);
    if (showR) for (var ez = 40; ez < D; ez += 120 + eTR() * 140) tuft(L + 40 + eTR() * 90, ez, eTR() < 0.5, true);
    g.appendChild(el("path", { d: dkP, fill: GR.m }));
    g.appendChild(el("path", { d: ltP, fill: GR.l }));

    /* in fata deckului: plantele apropiate de camera si mascota, in ordinea adancimii */
    var fr = [];
    each(PL, function (p) { if (front(p)) plant3d(p, fr); });
    man3d(fr, px, py, pz);
    paint(fr);

    /* cote pe gazon, cu etichete albe */
    function pill(lp, lab) {
      var w = lab.length * fs * 0.62 + fs * 0.9, h = fs * 1.45;
      g.appendChild(el("rect", { x: f1(lp[0] - w / 2), y: f1(lp[1] - h / 2), width: f1(w), height: f1(h), rx: f1(h / 2), fill: "rgba(255,255,255,.92)", stroke: "rgba(0,0,0,.12)", "stroke-width": f1(sw * 0.5) }));
      g.appendChild(el("text", { x: f1(lp[0]), y: f1(lp[1] + fs * 0.35), "font-size": f1(fs), "text-anchor": "middle", fill: "#22332B", "font-family": MONO, "font-weight": "600" }, lab));
    }
    function dimLine(a0, a1, t0, t1) {
      var st = { stroke: "rgba(255,255,255,.9)", "stroke-width": f1(sw * 1.3), "stroke-linecap": "round" };
      function ln(p, q) { var o = { x1: f1(p[0]), y1: f1(p[1]), x2: f1(q[0]), y2: f1(q[1]) }; for (var k2 in st) o[k2] = st[k2]; g.appendChild(el("line", o)); }
      ln(a0, a1); ln(t0[0], t0[1]); ln(t1[0], t1[1]);
    }
    var o1 = off0, o2 = off0 * 0.45, o3 = off0 * 1.55;
    dimLine(P(0, 0, D + o1), P(L, 0, D + o1), [P(0, 0, D + o2), P(0, 0, D + o3)], [P(L, 0, D + o2), P(L, 0, D + o3)]);
    pill(labA, num(L) + " mm");
    dimLine(P(L + o1, 0, D), P(L + o1, 0, 0), [P(L + o2, 0, D), P(L + o3, 0, D)], [P(L + o2, 0, 0), P(L + o3, 0, 0)]);
    pill(labB, num(D) + " mm");
    /* vigneta discreta: atentia ramane pe deck */
    var vg = el("radialGradient", { id: "vdKPvig", cx: "50%", cy: "55%", r: "75%" });
    vg.appendChild(el("stop", { offset: ".6", "stop-color": "#000", "stop-opacity": "0" }));
    vg.appendChild(el("stop", { offset: "1", "stop-color": "#000", "stop-opacity": ".22" }));
    defs.appendChild(vg);
    g.appendChild(el("rect", { x: f1(x0), y: f1(y0), width: f1(V.w), height: f1(V.h), fill: "url(#vdKPvig)" }));

    var desc = $("vdKPerspDesc");
    if (desc) desc.textContent = "Terasă de " + num(L) + " × " + num(D) + " mm cu deck WPC " + b.name + ", plăci " +
      (G.par ? "paralele cu casa" : "perpendiculare pe casă") + (S.pl ? ", cu plintă de terminație" : "") + ", în grădină, cu mascota VIVODECOR de 1,75 m pentru scară.";
  }

  /* ---------------- desen 2: vedere de sus (plan cu cote) ---------------- */
  function drawPlan(res) {
    var svg = $("vdKPlan"); if (!svg) return;
    clearSvg(svg);
    var L = S.l, D = S.d, mob = isMobile(), b = res.board, G = res.G;
    var base = Math.max(L, D * lastAsp, 2600);
    var fs = Math.max(base / (mob ? 22 : 33), 60), sw = base / (mob ? 320 : 520);
    var hb = Math.max(fs * 1.6, 300), dOff = fs * 1.5;
    var V = fitBox([-dOff - fs * 0.9, -hb, L + fs * 0.4, D + dOff + fs * 0.9], 0.02, lastAsp);
    /* spatiul in plus (terase lungi si inguste) merge la gazonul de jos, nu la acoperis */
    if (V.y < -hb * 1.4) V.y = -hb * 1.4;
    var X0 = V.x, X1 = V.x + V.w, Y1 = V.y + V.h;
    svg.setAttribute("viewBox", f1(V.x) + " " + f1(V.y) + " " + f1(V.w) + " " + f1(V.h));
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    var defs = el("defs"); svg.appendChild(defs);
    var g = el("g"); svg.appendChild(g);
    /* gazon vazut de sus: culoare + model de fire scurte */
    var pw = Math.max(260, base / 26), gp = el("pattern", { id: "vdKQgrass", patternUnits: "userSpaceOnUse", width: f1(pw), height: f1(pw) }), GRn = rng(4421), gd = "", gl = "";
    gp.appendChild(el("rect", { x: 0, y: 0, width: f1(pw), height: f1(pw), fill: "#86AD5F" }));
    for (var gi = 0; gi < 46; gi++) {
      var gx = GRn() * pw, gy = GRn() * pw, a = (GRn() - 0.5) * 1.6, gln = pw * (0.05 + GRn() * 0.05);
      var seg = "M" + f1(gx) + " " + f1(gy) + " l" + f1(Math.sin(a) * gln) + " " + f1(-Math.cos(a) * gln);
      if (gi % 2) gd += seg; else gl += seg;
    }
    gp.appendChild(el("path", { d: gd, stroke: "#6A9447", "stroke-width": f1(pw * 0.012), "stroke-linecap": "round" }));
    gp.appendChild(el("path", { d: gl, stroke: "#A6CB7D", "stroke-width": f1(pw * 0.012), "stroke-linecap": "round" }));
    defs.appendChild(gp);
    g.appendChild(el("rect", { x: f1(X0), y: f1(V.y), width: f1(V.w), height: f1(V.h), fill: "url(#vdKQgrass)" }));
    /* casa: acoperisul vazut de sus, cu umbra pe gazon si pe deck */
    grad(defs, "vdKQsh", 0, 0, 0, 1, [["0", "#000", ".3"], ["1", "#000", "0"]]);
    g.appendChild(el("rect", { x: f1(X0), y: 0, width: f1(V.w), height: f1(Math.min(D, hb * 1.1)), fill: "url(#vdKQsh)" }));
    var rf = el("pattern", { id: "vdKQroof", patternUnits: "userSpaceOnUse", width: f1(hb * 0.5), height: f1(hb * 0.32) });
    rf.appendChild(el("rect", { x: 0, y: 0, width: f1(hb * 0.5), height: f1(hb * 0.32), fill: "#6E7275" }));
    rf.appendChild(el("line", { x1: 0, y1: f1(hb * 0.31), x2: f1(hb * 0.5), y2: f1(hb * 0.31), stroke: "#585C5F", "stroke-width": f1(hb * 0.03) }));
    rf.appendChild(el("line", { x1: f1(hb * 0.25), y1: 0, x2: f1(hb * 0.25), y2: f1(hb * 0.31), stroke: "#606467", "stroke-width": f1(hb * 0.02) }));
    defs.appendChild(rf);
    g.appendChild(el("rect", { x: f1(X0), y: f1(V.y), width: f1(V.w), height: f1(-V.y), fill: "url(#vdKQroof)" }));
    g.appendChild(el("rect", { x: f1(X0), y: f1(-hb * 0.12), width: f1(V.w), height: f1(hb * 0.12), fill: "#4D5153" }));
    g.appendChild(el("text", { x: f1(L / 2), y: f1(-hb * 0.5 + fs * 0.32), "font-size": f1(fs * 0.85), "text-anchor": "middle", fill: "rgba(255,255,255,.85)", "font-family": MONO, "font-weight": "600", "letter-spacing": f1(fs * 0.25) }, "CASĂ"));
    /* plantele, vazute de sus */
    var flt = el("filter", { id: "vdKQblur", x: "-30%", y: "-30%", width: "160%", height: "160%" });
    flt.appendChild(el("feGaussianBlur", { stdDeviation: f1(sw * 3) }));
    defs.appendChild(flt);
    function plantTop(p) {
      var R = rng(Math.floor(p.s * 1e6) + 3), r = p.r, x = p.x, y = p.z;
      if (x + r * 1.5 < X0 || x - r * 1.5 > X1 || y - r * 1.5 > Y1) return;
      g.appendChild(el("circle", { cx: f1(x + r * 0.3), cy: f1(y + r * 0.25), r: f1(r * 1.02), fill: "rgba(20,35,15,.35)", filter: "url(#vdKQblur)" }));
      if (p.t === "tufa" || p.t === "flori") {
        each([[0, 0, 1, GR.d], [-0.3, -0.25, 0.62, GR.m], [0.32, -0.15, 0.58, GR.m], [0.05, 0.3, 0.55, GR.m], [-0.18, -0.35, 0.36, GR.l], [0.28, -0.3, 0.3, GR.l], [-0.05, 0.05, 0.3, GR.h]], function (c) {
          g.appendChild(el("circle", { cx: f1(x + c[0] * r), cy: f1(y + c[1] * r), r: f1(c[2] * r), fill: c[3] }));
        });
        if (p.t === "flori") for (var fi = 0; fi < 14; fi++) g.appendChild(el("circle", { cx: f1(x + (R() - 0.5) * r * 1.5), cy: f1(y + (R() - 0.5) * r * 1.5), r: f1(r * 0.08), fill: ["#E8789A", "#F7EEF2", "#F2C94C"][fi % 3] }));
      } else {
        if (p.t === "ghiveci") { g.appendChild(el("circle", { cx: f1(x), cy: f1(y), r: f1(r * 0.85), fill: "#3E4245" })); g.appendChild(el("circle", { cx: f1(x), cy: f1(y), r: f1(r * 0.7), fill: "#4B3B2C" })); }
        var n = 16, d = "";
        for (var i = 0; i < n; i++) {
          var a = i / n * Math.PI * 2 + R() * 0.3, l = r * (p.t === "ghiveci" ? 1.5 : 1.1) * (0.7 + R() * 0.4), w = r * 0.12;
          d += "M" + f1(x - Math.cos(a) * w) + " " + f1(y - Math.sin(a) * w) + " Q" + f1(x + Math.sin(a) * l * 0.6) + " " + f1(y - Math.cos(a) * l * 0.6) + " " + f1(x + Math.sin(a) * l) + " " + f1(y - Math.cos(a) * l) +
            " Q" + f1(x + Math.sin(a) * l * 0.5) + " " + f1(y - Math.cos(a) * l * 0.5) + " " + f1(x + Math.cos(a) * w) + " " + f1(y + Math.sin(a) * w) + "Z";
        }
        g.appendChild(el("path", { d: d, fill: p.t === "ghiveci" ? GR.m : GR.l }));
      }
    }
    var PL = plants(L, D);
    each(PL, function (p) { if (p.t !== "ghiveci") plantTop(p); });
    /* placile */
    g.appendChild(el("rect", { x: f1(sw * 2), y: f1(sw * 2), width: L, height: D, fill: "rgba(20,35,15,.45)", filter: "url(#vdKQblur)" }));
    var gap = shade(b.hex, 0.62);
    g.appendChild(el("rect", { x: 0, y: 0, width: L, height: D, fill: gap }));
    var rows = layout(G), pxu = 640 / V.w, groove = BW * pxu > 5 && rows.length <= 160, SR = rng(311);
    function R(u0, u1, v0, v1) { return G.par ? { x: u0, y: v0, width: u1 - u0, height: v1 - v0 } : { x: v0, y: u0, width: v1 - v0, height: u1 - u0 }; }
    function Ln(u0, v0, u1, v1, a) { if (G.par) { a.x1 = u0; a.y1 = v0; a.x2 = u1; a.y2 = v1; } else { a.x1 = v0; a.y1 = u0; a.x2 = v1; a.y2 = u1; } return el("line", a); }
    each(rows, function (rw) {
      var r = R(0, G.run, rw.a, rw.b); r.fill = tint(b.hex, rw.t);
      g.appendChild(el("rect", r));
      if (BW * pxu > 3) {
        var ns = Math.max(2, Math.round(G.run / 1600));
        for (var si = 0; si < ns; si++) {
          var u0 = SR() * G.run, u1 = Math.min(G.run, u0 + 500 + SR() * 1500), v = f1(rw.a + (rw.b - rw.a) * (0.2 + SR() * 0.6));
          g.appendChild(Ln(f1(u0), v, f1(u1), v, { stroke: SR() < 0.5 ? "rgba(255,255,255,.13)" : "rgba(0,0,0,.12)", "stroke-width": f1((rw.b - rw.a) * 0.26), "stroke-linecap": "round" }));
        }
      }
      if (groove) for (var k = 1; k <= 3; k++) {
        var vv = f1(rw.a + (rw.b - rw.a) * k / 4);
        g.appendChild(Ln(0, vv, G.run, vv, { stroke: k === 2 ? "rgba(255,255,255,.10)" : "rgba(0,0,0,.18)", "stroke-width": f1(sw * 0.35) }));
      }
      each(rw.j, function (u) { g.appendChild(Ln(u, rw.a, u, rw.b, { stroke: gap, "stroke-width": f1(sw * 0.9) })); });
    });
    /* grinzile (sub placi): linie dubla, vizibila pe orice culoare */
    var dash = f1(sw * 5) + " " + f1(sw * 3.5);
    function joist(a) {
      g.appendChild(Ln(a[0], a[1], a[2], a[3], { stroke: "rgba(0,0,0,.45)", "stroke-width": f1(sw * 2.4), "stroke-dasharray": dash }));
      g.appendChild(Ln(a[0], a[1], a[2], a[3], { stroke: "#EEF5F0", "stroke-width": f1(sw * 1), "stroke-dasharray": dash }));
    }
    if (res.useBat) each(G.reg, function (pos) { joist([pos, 0, pos, G.cross]); });
    g.appendChild(el("rect", { x: 0, y: 0, width: L, height: D, fill: "none", stroke: "rgba(0,0,0,.35)", "stroke-width": f1(sw * 0.8) }));
    var tw = Math.max(sw * 3.6, 45);
    function trimLine(xa, ya, xb, yb) {
      g.appendChild(el("line", { x1: xa, y1: ya, x2: xb, y2: yb, stroke: "rgba(0,0,0,.5)", "stroke-width": f1(tw + sw * 1.6), "stroke-linecap": "square" }));
      g.appendChild(el("line", { x1: xa, y1: ya, x2: xb, y2: yb, stroke: lighten(res.trim.hex, 0.12), "stroke-width": f1(tw), "stroke-linecap": "square" }));
    }
    if (res.trim) {
      if (S.pl >= 1) trimLine(0, D, L, D);
      if (S.pl >= 3) { trimLine(0, 0, 0, D); trimLine(L, 0, L, D); }
      if (S.pl === 4) trimLine(0, 0, L, 0);
    }
    each(PL, function (p) { if (p.t === "ghiveci") plantTop(p); });
    /* mascota vazuta de sus: umeri, brate, casca cu sigla */
    var onDeck = L >= 1400 && D >= 1400, mx = onDeck ? L * 0.64 : L + 650, my = onDeck ? D * 0.58 : D * 0.55;
    g.appendChild(el("ellipse", { cx: f1(mx + 140), cy: f1(my + 120), rx: 270, ry: 180, fill: "rgba(20,35,15,.35)", filter: "url(#vdKQblur)" }));
    g.appendChild(el("ellipse", { cx: f1(mx - 205), cy: f1(my + 10), rx: 62, ry: 110, fill: "#0a3614" }));
    g.appendChild(el("ellipse", { cx: f1(mx + 205), cy: f1(my + 10), rx: 62, ry: 110, fill: "#0f5220" }));
    g.appendChild(el("ellipse", { cx: f1(mx), cy: f1(my), rx: 215, ry: 125, fill: JACKET }));
    g.appendChild(el("rect", { x: f1(mx - 215), y: f1(my - 14), width: 430, height: 28, fill: HELMET, opacity: ".9" }));
    grad(defs, "vdKQhel", 0.2, 0.1, 0.8, 0.9, [["0", lighten(HELMET, 0.25)], ["1", shade(HELMET, 0.15)]]);
    g.appendChild(el("ellipse", { cx: f1(mx - 30), cy: f1(my), rx: 190, ry: 150, fill: shade(HELMET, 0.16) }));
    g.appendChild(el("circle", { cx: f1(mx), cy: f1(my), r: 135, fill: "url(#vdKQhel)", stroke: shade(HELMET, 0.32), "stroke-width": 8 }));
    logoMark(g, mx, my, 92);
    /* cote, cu etichete albe */
    function pill(cx, cy, lab, rot) {
      var w = lab.length * fs * 0.62 + fs * 0.9, h = fs * 1.45, gg = el("g", rot ? { transform: "rotate(-90 " + f1(cx) + " " + f1(cy) + ")" } : {});
      gg.appendChild(el("rect", { x: f1(cx - w / 2), y: f1(cy - h / 2), width: f1(w), height: f1(h), rx: f1(h / 2), fill: "rgba(255,255,255,.93)", stroke: "rgba(0,0,0,.12)", "stroke-width": f1(sw * 0.5) }));
      gg.appendChild(el("text", { x: f1(cx), y: f1(cy + fs * 0.35), "font-size": f1(fs), "text-anchor": "middle", fill: "#22332B", "font-family": MONO, "font-weight": "600" }, lab));
      g.appendChild(gg);
    }
    var st = { stroke: "rgba(255,255,255,.92)", "stroke-width": f1(sw * 1.2), "stroke-linecap": "round" };
    function ln(xa, ya, xb, yb) { var o = { x1: f1(xa), y1: f1(ya), x2: f1(xb), y2: f1(yb) }; for (var k2 in st) o[k2] = st[k2]; g.appendChild(el("line", o)); }
    var yd = D + dOff * 0.75, xd = -dOff * 0.75;
    ln(0, yd, L, yd); ln(0, D + dOff * 0.3, 0, D + dOff * 1.1); ln(L, D + dOff * 0.3, L, D + dOff * 1.1);
    ln(xd, 0, xd, D); ln(-dOff * 0.3, 0, -dOff * 1.1, 0); ln(-dOff * 0.3, D, -dOff * 1.1, D);
    pill(L / 2, yd, num(L) + " mm");
    pill(xd, D / 2, num(D) + " mm", true);
    /* legenda sta sub desen, in HTML */
    var leg = $("vdKPlanLeg");
    if (leg) {
      var t = [];
      if (res.useBat) t.push('<span><i class="vd-lg-j"></i>grinzi de montaj (sub plăci), la ' + S.sp + " mm</span>");
      if (res.trim) t.push('<span><i class="vd-lg-t" style="background:' + lighten(res.trim.hex, 0.12) + '"></i>plintă ' + esc(res.trim.name.replace(/^.*70 × 11 mm /, "")) + "</span>");
      t.push("<span>plăci " + (G.par ? "paralele cu casa" : "perpendiculare pe casă") + " · " + res.rows + " rânduri</span>");
      leg.innerHTML = t.join("");
    }
    var desc = $("vdKPlanDesc");
    if (desc) desc.textContent = "Plan: terasă de " + num(L) + " mm de-a lungul casei și " + num(D) + " mm adâncime, " + res.rows + " rânduri de placă " +
      (G.par ? "paralele cu casa" : "perpendiculare pe casă") + (res.useBat ? ", grinzi la " + S.sp + " mm" : "") + ", înconjurată de gazon și plante.";
  }
  function draw(res) { lastAsp = frameAspect($("vdKPersp")); drawPersp(res); drawPlan(res); }
  function redrawIfFrameChanged() { if (Math.abs(frameAspect($("vdKPersp")) - lastAsp) > 0.03) draw(compute()); }

  /* ---------------- controale ---------------- */
  function seg(id, values, label, isOn, pick) {
    var box = $(id); if (!box) return;
    box.innerHTML = "";
    each(values, function (v) {
      var bt = document.createElement("button");
      bt.type = "button";
      bt.innerHTML = label(v);
      bt.setAttribute("aria-pressed", isOn(v) ? "true" : "false");
      bt.addEventListener("click", function () { pick(v); dirty(); renderControls(); update(); });
      box.appendChild(bt);
    });
  }
  function swatches(id, list, cur, pick) {
    var box = $(id); if (!box) return;
    box.innerHTML = "";
    each(list, function (r) {
      var bt = document.createElement("button");
      bt.type = "button"; bt.className = "vd-sw";
      bt.setAttribute("aria-pressed", r.id === cur ? "true" : "false");
      var bg = "repeating-linear-gradient(180deg,transparent 0 13px,rgba(0,0,0,.4) 13px 15px)," +
        "repeating-linear-gradient(180deg,transparent 0 3px,rgba(0,0,0,.1) 3px 4px)," +
        "linear-gradient(160deg," + r.hex2 + "," + r.hex + " 62%," + r.hex2 + ")";
      bt.innerHTML = '<span class="vd-swcolor" style="background:' + bg + '"></span>' +
        '<span class="vd-swname">' + esc(r.name) + '<span class="vd-swprice">' + money(r.price) + " RON/ml</span></span>";
      bt.addEventListener("click", function () { pick(r); dirty(); renderControls(); update(); });
      box.appendChild(bt);
    });
  }
  function renderControls() {
    var board = curBoard();
    swatches("vdKSwA", boards(), board.id, function (r) { S.c = r.id; });
    seg("vdKOrient", ["p", "x"], function (o) { return o === "p" ? "Paralel cu casa<small>ca în ghidul de montaj</small>" : "Perpendicular pe casă<small>plăcile pleacă de la casă</small>"; },
      function (o) { return S.o === o; }, function (o) { S.o = o; });
    seg("vdKBat", [1, 0], function (b) { return b ? "Cu grinzi de montaj<small>incluse în calcul</small>" : "Fără grinzi<small>am deja structura</small>"; },
      function (b) { return S.bt === b; }, function (b) { S.bt = b; });
    seg("vdKSpace", SP_OPTS, function (s) { return s + " mm" + (s === 300 ? " (recomandat)" : " (maxim)"); },
      function (s) { return S.sp === s; }, function (s) { S.sp = s; });
    seg("vdKTrim", PL_OPTS, function (p) {
      return p === 0 ? "Fără plintă" : p === 1 ? "Doar în față<small>1 latură</small>" : p === 3 ? "3 laturi<small>fără cea de lângă casă</small>" : "Tot perimetrul<small>4 laturi</small>";
    }, function (p) { return S.pl === p; }, function (p) { S.pl = p; });
    seg("vdKSup", SU_OPTS, function (u) {
      var r = BY[SU_ID[u]];
      return u === 0 ? "Fără suporți<small>pe suprafață plană</small>" : esc(r ? r.dims : "") + "<small>" + (r ? money(r.price) + " RON/buc" : "") + "</small>";
    }, function (u) { return S.su === u; }, function (u) { S.su = u; });
    var sl = $("vdKSpaceLbl");
    if (sl) sl.textContent = S.bt ? "Distanța dintre grinzile de montaj (pe ax)" : "Distanța dintre grinzile structurii existente (pe ax)";
  }
  function bindNum(inputId, fieldId, get, set, min, max) {
    var inp = $(inputId), fld = fieldId ? $(fieldId) : null;
    if (!inp) return;
    function apply(final) {
      var v = parseInt(String(inp.value).replace(/[^\d]/g, ""), 10);
      if (isNaN(v)) { if (final) v = get(); else return; }
      var bad = v < min || v > max;
      if (fld) fld.classList.toggle("is-err", bad && !final);
      if (final) { v = clamp(v, min, max); inp.value = v; if (fld) fld.classList.remove("is-err"); }
      set(clamp(v, min, max));
      dirty(); update();
    }
    inp.addEventListener("input", function () { apply(false); });
    inp.addEventListener("blur", function () { apply(true); });
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") inp.blur(); });
  }
  function fillInputs() { $("vdKL").value = S.l; $("vdKD").value = S.d; }

  /* ---------------- rezultat ---------------- */
  var PL_TXT = { 1: "în față", 3: "pe 3 laturi", 4: "pe tot perimetrul" };
  function linesA(r) {
    var l = [], b = r.board;
    l.push(["Placă deck", b.name + " · " + b.dims, true]);
    l.push(["Suprafață terasă", num(r.area, 2) + " m²", false]);
    l.push(["Montaj", (r.G.par ? "paralel cu casa" : "perpendicular pe casă") + " · " + r.rows + " rânduri de placă", false]);
    l.push(["Placă deck de comandat", num(r.ml) + " ml (7 ml/m², plăci de 2 m și 4 m)", true]);
    if (r.useBat) l.push(["Grinzi de montaj " + num(BY[BAT_ID].len / 1000, 1) + " m", r.batBars + " buc · " + num(r.batMl, 1) + " ml, " + r.G.nB + " rânduri la " + S.sp + " mm", true]);
    else l.push(["Grinzi de montaj", "nu sunt incluse", false]);
    l.push(["Cleme de îmbinare", r.clips + " buc (20/m²)", false]);
    l.push(["Startere", r.starters + " buc (4/m²)", false]);
    if (r.trim) l.push(["Plintă de terminație 2,9 m", r.trimBars + " buc · " + num(r.trimMl, 1) + " ml " + PL_TXT[S.pl], false]);
    if (r.sup) l.push(["Suporți reglabili " + r.sup.dims, r.supN + " buc (9/m²)", false]);
    if (!isNaN(r.weight)) l.push(["Greutate plăci", num(r.weight) + " kg", false]);
    l.push(["Preț pe m² de terasă", money(r.perM2) + " RON", true]);
    return l;
  }
  function qty(it) { return it.q + (it.r.kind === "board" ? " ml" : " ×"); }
  function itemsHtml(r) {
    return map(r.items, function (it) {
      return '<li><a href="' + esc(it.r.url) + '"><span>' + qty(it) + " " + esc(it.r.full) + (it.pct ? ' <em>−' + it.pct + "%</em>" : "") +
        "</span><span>" + money(it.net) + " RON</span></a></li>";
    }).join("");
  }
  function chipsFor(r) {
    var c = [];
    c.push(["chip", num(r.area, 2) + " m²"]);
    c.push(["chip", num(r.ml) + " ml placă"]);
    c.push(["chip", r.useBat ? r.batBars + " grinzi" : "fără grinzi"]);
    c.push(["chip", r.clips + " cleme"]);
    c.push(["chip", r.G.par ? "paralel cu casa" : "perpendicular pe casă"]);
    return c;
  }
  function waText(r, lines) {
    var t = ["Bună ziua! Am folosit calculatorul de deck WPC de pe site.", "", "CONFIGURAȚIA MEA:"];
    t.push("• Terasă: " + num(S.l) + " × " + num(S.d) + " mm");
    each(lines, function (x) { t.push("• " + x[0] + ": " + x[1]); });
    t.push(""); t.push("PRODUSE:");
    each(r.items, function (it) { t.push("• " + qty(it) + " " + it.r.full + " = " + money(it.net) + " RON"); });
    t.push("• TOTAL ESTIMAT: " + money(r.total) + " RON cu TVA");
    t.push(""); t.push("Link configurație: " + shareUrl());
    t.push(""); t.push("Vă rog o ofertă completă, cu lungimea potrivită a plăcilor (2 m / 4 m), profilele L necesare și transport. Mulțumesc!");
    return t.join("\n");
  }
  function update() {
    var r = compute();
    draw(r);
    var lines = linesA(r);
    $("vdKTotal").textContent = money(r.total);
    $("vdKSave").innerHTML = r.saved > 0.004 ? '<span class="vd-strike">' + money(r.gross) + ' RON</span> <span class="vd-savings">reducere de cantitate · economisești ' + money(r.saved) + " RON</span>" : "";
    $("vdKLinesOut").innerHTML = map(lines, function (x) { return "<li" + (x[2] ? ' class="is-em"' : "") + "><span>" + esc(x[0]) + "</span><span>" + esc(x[1]) + "</span></li>"; }).join("");
    $("vdKItems").innerHTML = itemsHtml(r);
    $("vdKChips").innerHTML = map(chipsFor(r), function (c) { return '<span class="vd-chip' + (c[0] === "warn" ? " is-warn" : "") + '">' + esc(c[1]) + "</span>"; }).join("");
    var main = r.items[0];
    var wa = encodeURIComponent(waText(r, lines));
    $("vdKCta").innerHTML = '<a class="vd-btn vd-btn-primary" href="' + esc(main.r.url) + '"><span>Comandă ' + num(r.ml) + " ml de placă · " + esc(main.r.name) +
      "<small>Pune " + num(r.ml) + " în coș și scrie la „Observații” lungimea plăcilor (2 m sau 4 m); accesoriile, din lista de mai sus</small></span><i>" + ARROW + "</i></a>" +
      '<a class="vd-btn vd-btn-ghost" href="https://wa.me/40747127292?text=' + wa + '"><span>Trimite configurația pe WhatsApp<small>Cu toate cantitățile și linkul de mai sus</small></span><i>' + ARROW + "</i></a>";
    var dt = $("vdKDockTotal");
    if (dt) {
      dt.textContent = money(r.total);
      $("vdKDockSub").textContent = num(r.ml) + " ml placă · " + (r.useBat ? r.batBars + " grinzi · " : "") + num(r.area, 1) + " m²";
      $("vdKDockCta").href = main.r.url;
    }
    scheduleUrl();
  }

  /* ---------------- stare in URL ---------------- */
  var urlReady = false, urlTimer = null;
  function dirty() { urlReady = true; }
  function params(withTest) {
    var p = new URLSearchParams();
    if (withTest && /[?&]vdtest=1/.test(location.search)) p.set("vdtest", "1");
    p.set("c", S.c); p.set("l", S.l); p.set("d", S.d); p.set("o", S.o); p.set("bt", S.bt); p.set("sp", S.sp); p.set("pl", S.pl); p.set("su", S.su);
    return p;
  }
  function scheduleUrl() {
    if (!urlReady || !window.history || !history.replaceState) return;
    clearTimeout(urlTimer);
    urlTimer = setTimeout(function () {
      var p = params(false), cur = new URLSearchParams(location.search);
      if (cur.get("vdtest")) p.set("vdtest", cur.get("vdtest"));
      try { history.replaceState(null, "", location.pathname + "?" + p.toString() + location.hash); } catch (e) {}
    }, 400);
  }
  function shareUrl() { return location.origin + location.pathname + "?" + params(true).toString(); }
  function readUrl() {
    var p; try { p = new URLSearchParams(location.search); } catch (e) { return; }
    function int(k, lo, hi, cb) { var v = parseInt(p.get(k), 10); if (!isNaN(v)) cb(clamp(v, lo, hi)); }
    var c = p.get("c"); if (c && BY[c] && BY[c].kind === "board") S.c = c;
    int("l", LIM.l[0], LIM.l[1], function (v) { S.l = v; });
    int("d", LIM.d[0], LIM.d[1], function (v) { S.d = v; });
    if (p.get("o") === "p" || p.get("o") === "x") S.o = p.get("o");
    if (p.get("bt") === "0" || p.get("bt") === "1") S.bt = +p.get("bt");
    int("sp", 0, 999, function (v) { if (SP_OPTS.indexOf(v) > -1) S.sp = v; });
    int("pl", 0, 9, function (v) { if (PL_OPTS.indexOf(v) > -1) S.pl = v; });
    int("su", 0, 9, function (v) { if (SU_OPTS.indexOf(v) > -1 && (v === 0 || BY[SU_ID[v]])) S.su = v; });
    if (p.get("l") || p.get("c")) urlReady = true;
  }
  function fixCanonical() {
    var head = document.head; if (!head) return;
    var clean = location.origin + location.pathname;
    var c = head.querySelector('link[rel="canonical"]');
    if (c) { if ((c.getAttribute("href") || "").indexOf("?") > -1) c.setAttribute("href", clean); }
    else { c = document.createElement("link"); c.setAttribute("rel", "canonical"); c.setAttribute("href", clean); head.appendChild(c); }
    var og = head.querySelector('meta[property="og:url"]');
    if (og && (og.getAttribute("content") || "").indexOf("?") > -1) og.setAttribute("content", clean);
  }

  /* ---------------- sincronizare preturi din categorie ---------------- */
  function priceIn(txt) {
    var m = String(txt).match(/(-?)\s*(\d{1,3}(?:\.\d{3})*|\d+)(?:,(\d{1,2}))?\s*(?:RON|lei)/i);
    if (!m || m[1] === "-") return NaN;
    return parseFloat(m[2].replace(/\./g, "") + "." + (m[3] || "0"));
  }
  function currentPrice(node) {
    var struck = node.querySelectorAll('del, s, strike, [class*="old"], [class*="Old"]');
    var all = node.querySelectorAll("*"), found = NaN;
    for (var i = 0; i < all.length; i++) {
      var e = all[i]; if (e.children.length) continue;
      var skip = false;
      for (var j = 0; j < struck.length; j++) if (struck[j] === e || struck[j].contains(e)) { skip = true; break; }
      if (skip) continue;
      var v = priceIn(e.textContent);
      if (!isNaN(v) && v > 0) found = v;
    }
    return found;
  }
  function slug(u) {
    try { u = decodeURIComponent(String(u)); } catch (e) {}
    u = u.split("?")[0].split("#")[0].replace(/\/+$/, "");
    return u.substring(u.lastIndexOf("/") + 1).toLowerCase();
  }
  function applyPrices(pm) {
    var changed = 0;
    each(ROWS, function (r) {
      /* nosync = produs cu variante de lungime: in categorie poate aparea pretul altei variante */
      if (r.nosync) return;
      var v = pm[slug(r.url)];
      if (v === undefined || isNaN(v) || v <= 0) return;
      if (Math.abs(v - r.price) / r.price > 0.3) return;
      if (Math.abs(v - r.price) < 0.005) return;
      r.price = v; r.row.dataset.price = v;
      var p = r.row.querySelector(".vd-p"); if (p) p.textContent = money(v) + " RON";
      var pu = r.row.querySelector(".vd-pu");
      if (pu && r.pu === "m2") pu.textContent = money(v * PER_M2) + " RON";
      if (pu && r.pu === "ml") pu.textContent = money(v / (r.len / 1000)) + " RON";
      if (pu && r.pu === "m2acc") pu.textContent = money(v * r.per) + " RON";
      changed++;
    });
    if (changed) {
      renderControls(); update();
      var cap = document.querySelector("#vdKPrices caption");
      if (cap) cap.textContent = "Prețuri cu TVA · sincronizate automat " + new Date().toLocaleDateString("ro-RO");
    }
  }
  var CACHE_KEY = "vdKPrices_v1";
  function syncPrices() {
    if (!CAT_URL || !window.fetch || !window.DOMParser) return;
    try {
      var c = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
      if (c && Date.now() - c.t < 12e5) { applyPrices(c.p); return; }
    } catch (e) {}
    var urls = [CAT_URL, CAT_URL + "?p=2"];
    var late = false, timer = setTimeout(function () { late = true; }, 8000);
    var merged = {}, pending = urls.length;
    function done() {
      if (--pending > 0) return;
      clearTimeout(timer);
      if (late) return;
      try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), p: merged })); } catch (e) {}
      applyPrices(merged);
    }
    each(urls, function (u) {
      fetch(u, { credentials: "omit" }).then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      }).then(function (html) {
        var links = new DOMParser().parseFromString(html, "text/html").querySelectorAll("a[href]");
        for (var i = 0; i < links.length; i++) {
          var s = slug(links[i].getAttribute("href"));
          if (!s || merged[s] !== undefined) continue;
          var n = links[i], d = 0;
          while (n && d < 6) {
            var v = currentPrice(n);
            if (!isNaN(v)) { merged[s] = v; break; }
            n = n.parentElement; d++;
          }
        }
      }).catch(function () {}).then(done);
    });
  }

  /* ---------------- PDF ---------------- */
  var jsPdfP = null;
  function loadJsPdf() {
    if (jsPdfP) return jsPdfP;
    jsPdfP = new Promise(function (ok, bad) {
      if (window.jspdf && window.jspdf.jsPDF) { ok(window.jspdf.jsPDF); return; }
      if (!JSPDF_SRC) { bad(new Error("JSPDF_SRC gol")); return; }
      var s = document.createElement("script");
      s.src = JSPDF_SRC;
      s.onload = function () { if (window.jspdf && window.jspdf.jsPDF) ok(window.jspdf.jsPDF); else bad(new Error("jsPDF nu s-a initializat")); };
      s.onerror = function () { bad(new Error("biblioteca PDF nu s-a incarcat")); };
      document.head.appendChild(s);
    });
    jsPdfP.catch(function () { jsPdfP = null; });
    return jsPdfP;
  }
  var LINK_BOX = { y: 972, h: 58 };
  function pdfSvg(r) {
    var F = "Arial, Helvetica, sans-serif", M = "Consolas, 'Courier New', monospace";
    var ink = "#16211C", soft = "#4A5A52", tech = "#5B7183", line = "#DCE3DD", green = "#1E6B45";
    var d = new Date(), date = ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear();
    var rows = linesA(r), RH = 18;
    var o = [];
    o.push('<svg xmlns="http://www.w3.org/2000/svg" width="794" height="1123" viewBox="0 0 794 1123">');
    o.push('<rect width="794" height="1123" fill="#FFFFFF"/><rect width="794" height="7" fill="' + green + '"/>');
    o.push('<text x="52" y="62" font-family="' + F + '" font-size="20" font-weight="700" fill="' + ink + '">VIVODECOR</text>');
    o.push('<text x="52" y="80" font-family="' + M + '" font-size="9.5" letter-spacing="2" fill="' + tech + '">HOME ' + AMP + 'amp; GARDEN</text>');
    o.push('<text x="742" y="58" text-anchor="end" font-family="' + F + '" font-size="15" font-weight="700" fill="' + ink + '">' +
      "Configurație terasă deck WPC</text>");
    o.push('<text x="742" y="76" text-anchor="end" font-family="' + M + '" font-size="10" fill="' + tech + '">Estimare generată la ' + date + "</text>");
    o.push('<line x1="52" y1="95" x2="742" y2="95" stroke="' + line + '"/>');
    /* cele doua desene, unul langa altul */
    each([["vdKPersp", 52, "VEDERE DE ANSAMBLU"], ["vdKPlan", 400, "VEDERE DE SUS, CU COTE"]], function (v) {
      o.push('<rect x="' + v[1] + '" y="106" width="342" height="238" fill="#FBFAF7" stroke="' + line + '"/>');
      o.push('<text x="' + (v[1] + 9) + '" y="121" font-family="' + M + '" font-size="8.5" letter-spacing="1.6" fill="' + tech + '">' + v[2] + "</text>");
      var svg = $(v[0]);
      if (svg) {
        var cl = svg.cloneNode(true);
        cl.removeAttribute("id"); cl.removeAttribute("style");
        cl.setAttribute("x", v[1] + 4); cl.setAttribute("y", 128); cl.setAttribute("width", 334); cl.setAttribute("height", 209);
        o.push(new XMLSerializer().serializeToString(cl));
      }
    });
    var y = 370;
    o.push('<text x="52" y="' + y + '" font-family="' + M + '" font-size="9.5" letter-spacing="2" fill="' + tech + '">CONFIGURAȚIA</text>');
    y += 16;
    each(rows, function (x, i) {
      var yy = y + i * RH;
      if (i % 2 === 0) o.push('<rect x="52" y="' + (yy - 12.5) + '" width="690" height="' + RH + '" fill="#F6F8F6"/>');
      o.push('<text x="61" y="' + yy + '" font-family="' + F + '" font-size="10.5" fill="' + soft + '">' + esc(x[0]) + "</text>");
      o.push('<text x="733" y="' + yy + '" text-anchor="end" font-family="' + M + '" font-size="10.5" font-weight="600" fill="' + ink + '">' + esc(x[1]) + "</text>");
    });
    y += rows.length * RH + 12;
    o.push('<text x="52" y="' + y + '" font-family="' + M + '" font-size="9.5" letter-spacing="2" fill="' + tech + '">PRODUSE</text>');
    y += 16;
    each(r.items, function (it, i) {
      var yy = y + i * RH;
      var name = qty(it) + " " + it.r.full + (it.pct ? "  (−" + it.pct + "%)" : "");
      if (name.length > 84) name = name.slice(0, 82) + "…";
      o.push('<text x="61" y="' + yy + '" font-family="' + F + '" font-size="10.5" fill="' + soft + '">' + esc(name) + "</text>");
      o.push('<text x="733" y="' + yy + '" text-anchor="end" font-family="' + M + '" font-size="10.5" font-weight="600" fill="' + ink + '">' + money(it.net) + " RON</text>");
    });
    y += r.items.length * RH + 6;
    o.push('<rect x="52" y="' + y + '" width="690" height="54" fill="' + ink + '" rx="3"/>');
    o.push('<text x="68" y="' + (y + 22) + '" font-family="' + M + '" font-size="9.5" letter-spacing="1.6" fill="#8FA79A">TOTAL ESTIMAT MATERIALE</text>');
    o.push('<text x="68" y="' + (y + 44) + '" font-family="' + M + '" font-size="21" font-weight="700" fill="#FFFFFF">' + money(r.total) + " RON</text>");
    o.push('<text x="726" y="' + (y + 44) + '" text-anchor="end" font-family="' + M + '" font-size="11" fill="#8FA79A">TVA inclus</text>');
    y += 64;
    o.push('<rect x="52" y="' + y + '" width="690" height="42" fill="#E9F2EC" rx="3"/>');
    var noteY = y;
    o.push('<text x="64" y="' + (y + 18) + '" font-family="' + F + '" font-size="10.5" fill="' + green + '">' +
      (r.useBat ? "Grinzi la aproximativ 300 mm, maximum 400 mm, perpendicular pe plăci. Plăcile se prind cu cleme și startere." :
        "Grinzile de montaj nu sunt incluse: plăcile se prind pe structura existentă, la maximum 400 mm.") + "</text>");
    o.push('<text x="64" y="' + (y + 33) + '" font-family="' + F + '" font-size="10.5" fill="' + green + '">Placa se comandă la metru liniar: la „Observații” scrii lungimea plăcilor (2 m sau 4 m). Transportul se ofertează separat.</text>');
    y = noteY + 50;
    o.push('<rect x="52" y="' + y + '" width="690" height="42" fill="#FBF1E3" stroke="#E8C79E" rx="3"/>');
    o.push('<text x="64" y="' + (y + 18) + '" font-family="' + F + '" font-size="10.5" font-weight="700" fill="#8A4B0B">Profilele L de colț nu sunt incluse în această estimare.</text>');
    o.push('<text x="64" y="' + (y + 33) + '" font-family="' + F + '" font-size="10.5" fill="#8A4B0B">Adaugă-le în coș din categoria Decking WPC sau cere-ne oferta completă la 0747 127 292 și le calculăm noi.</text>');
    LINK_BOX.y = Math.max(y + 54, 900);
    var ly = LINK_BOX.y;
    o.push('<rect x="52" y="' + ly + '" width="690" height="' + LINK_BOX.h + '" fill="' + green + '" rx="3"/>');
    o.push('<text x="68" y="' + (ly + 21) + '" font-family="' + F + '" font-size="12.5" font-weight="700" fill="#FFFFFF">' + ARROW + "  Apasă aici ca să redeschizi și să modifici această configurație</text>");
    o.push('<text x="68" y="' + (ly + 38) + '" font-family="' + F + '" font-size="10" fill="#BFE0CC">Se deschide calculatorul cu toate valorile completate. Îl poți trimite mai departe montatorului.</text>');
    var su = shareUrl().replace(/^https?:\/\//, "");
    if (su.length > 100) su = su.slice(0, 97) + "...";
    o.push('<text x="68" y="' + (ly + 52) + '" font-family="' + M + '" font-size="8.5" fill="#8FC7A5">' + esc(su) + "</text>");
    o.push('<line x1="52" y1="1045" x2="742" y2="1045" stroke="' + line + '"/>');
    o.push('<text x="52" y="1062" font-family="' + F + '" font-size="10.5" font-weight="700" fill="' + ink + '">VIVODECOR · SC FIERONART SRL · CUI RO 17572384</text>');
    o.push('<text x="52" y="1077" font-family="' + F + '" font-size="10" fill="' + soft + '">Showroom Cluj-Napoca, Str. Fabricii de Zahăr 109, L–V 8:30–16:30  ·  Depozit-showroom Rudeni, Chiajna, Ilfov</text>');
    o.push('<text x="52" y="1092" font-family="' + M + '" font-size="10.5" fill="' + ink + '">0747 127 292  ·  0724 604 236  ·  vivodecor.ro</text>');
    o.push('<text x="52" y="1108" font-family="' + F + '" font-size="9" fill="' + tech + '">Estimarea nu constituie ofertă fermă. Prețurile afișate în pagina fiecărui produs sunt cele oficiale.</text>');
    o.push("</svg>");
    return o.join("");
  }
  function svgToJpeg(svgText) {
    return new Promise(function (ok, bad) {
      var img = new Image();
      img.onload = function () {
        try {
          var c = document.createElement("canvas"); c.width = 1588; c.height = 2246;
          var x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height);
          x.drawImage(img, 0, 0, c.width, c.height);
          ok(c.toDataURL("image/jpeg", 0.92));
        } catch (e) { bad(e); }
      };
      img.onerror = function () { bad(new Error("desenul nu a putut fi randat")); };
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgText);
    });
  }
  function bindPdf() {
    var btn = $("vdKPdfBtn"), sub = $("vdKPdfSub"); if (!btn) return;
    var orig = sub.textContent;
    btn.addEventListener("click", function () {
      btn.disabled = true; sub.textContent = "Se pregătește documentul…";
      var r = compute();
      loadJsPdf().then(function (JsPDF) {
        return svgToJpeg(pdfSvg(r)).then(function (jpg) {
          var doc = new JsPDF({ orientation: "p", unit: "px", format: [794, 1123], hotfixes: ["px_scaling"] });
          doc.addImage(jpg, "JPEG", 0, 0, 794, 1123);
          doc.link(52, LINK_BOX.y, 690, LINK_BOX.h, { url: shareUrl() });
          doc.link(52, 1082, 260, 14, { url: "tel:+40747127292" });
          var nm = r.board.name + "-" + S.l + "x" + S.d;
          doc.save("Configuratie-deck-WPC-" + nm.replace(/[^A-Za-z0-9]+/g, "-") + ".pdf");
        });
      }).then(function () {
        sub.textContent = "Descărcat. Poți genera altul după ce modifici configurația.";
        var lead = $("vdKLead"); if (lead && LEAD_URL) lead.hidden = false;
      }).catch(function (e) {
        sub.textContent = "Nu s-a putut genera PDF-ul. Trimite configurația pe WhatsApp.";
        if (window.console) console.warn("[VIVODECOR deck PDF]", e);
      }).then(function () {
        btn.disabled = false;
        setTimeout(function () { if (sub.textContent.indexOf("Descărcat") === 0) sub.textContent = orig; }, 9000);
      });
    });
  }

  /* ---------------- cerere de oferta ---------------- */
  function bindLead() {
    var box = $("vdKLead"); if (!box) return;
    var mail = $("vdKLeadMail"), tel = $("vdKLeadPhone"), ok = $("vdKLeadOk"), send = $("vdKLeadSend"), msg = $("vdKLeadMsg");
    function say(t, err) { msg.textContent = t; msg.hidden = false; msg.classList.toggle("is-err", !!err); }
    send.addEventListener("click", function () {
      var em = (mail.value || "").trim();
      if (!(em.length <= 120 && /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,24}$/.test(em))) { say("Adresa de email nu pare validă.", true); mail.focus(); return; }
      var ph = (tel.value || "").trim(), digits = ph.replace(/\D/g, "");
      if (!(ph.length <= 30 && /^[\d\s.()+\-]+$/.test(ph) && digits.length >= 9 && digits.length <= 15)) { say("Numărul de telefon nu pare valid. Exemplu: 0722 123 456", true); tel.focus(); return; }
      if (!ok.checked) { say("Bifează acordul ca să putem trimite oferta.", true); return; }
      send.disabled = true; say("Se trimite…");
      var r = compute();
      var cfg = map(r.items, function (it) { return (it.r.kind === "board" ? it.q + " ml " : it.q + " x ") + it.r.full; }).join("; ");
      /* Campurile urmeaza coloanele din Sheet ale gardului (ca la riflaj / lambriu):
         panouri = ml de placa, deschidere / inaltime = lungimea / adancimea terasei. */
      var body = {
        token: LEAD_TOKEN, website: $("vdKLeadWeb").value, email: em, telefon: ph, url: shareUrl(),
        culoare: "[DECK] " + r.board.full,
        pretMl: r.items[0].r.price,
        panouri: r.ml,
        deschidere_mm: S.l,
        inaltime_dorita_mm: S.d,
        inaltime_reala_mm: S.d,
        randuri: r.rows,
        distanta_sipci_mm: 0,
        distantiere_capat_buc: 0,
        lungime_gard_m: +(S.l / 1000).toFixed(2),
        suprafata_mp: +r.area.toFixed(2),
        necesar_ml: r.ml,
        total_ron: +r.total.toFixed(2),
        cere_cadre: false, cere_stalpi: false,
        calculator: "deck", configuratie: cfg + "; FARA profile L (de inclus in oferta)" + (r.useBat ? "" : "; fara grinzi (structura existenta)") + (S.o === "x" ? "; placi perpendiculare pe casa" : "; placi paralele cu casa"),
        data: new Date().toISOString()
      };
      fetch(LEAD_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body) })
        .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.text(); })
        .then(function (t) { var good = false; try { good = JSON.parse(t).ok === true; } catch (e) {} if (!good) throw new Error("respins de server"); })
        .then(function () {
          box.innerHTML = '<p class="vd-lead-t">Mulțumim! Am primit cererea.</p><p class="vd-lead-s">Un coleg verifică configurația și îți trimite oferta completă pe ' + esc(em) + " sau te sună la " + esc(ph) + ". Dacă e urgent, sună tu la 0747 127 292.</p>";
        }).catch(function (e) {
          send.disabled = false; say("Nu s-a putut trimite. Încearcă pe WhatsApp sau la 0747 127 292.", true);
          if (window.console) console.warn("[VIVODECOR deck lead]", e);
        });
    });
    mail.addEventListener("keydown", function (e) { if (e.key === "Enter") send.click(); });
  }

  /* ---------------- antet tema + bara mobila ---------------- */
  var headMin = Infinity, headMax = 0, measured = false;
  function fixedTop(e, vw) {
    var cs; try { cs = getComputedStyle(e); } catch (x) { return null; }
    if (cs.position !== "fixed" && cs.position !== "sticky") return null;
    if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) return null;
    var r = e.getBoundingClientRect();
    if (r.height < 45 || r.height > 400 || r.top > 12 || r.width < vw * 0.6) return null;
    return r;
  }
  function measureHead() {
    var vw = window.innerWidth, bottom = 0, all = document.body.getElementsByTagName("*");
    for (var i = 0; i < all.length; i++) {
      var e = all[i];
      if (e.id === "vdK" || (e.closest && e.closest("#vdK"))) continue;
      var r = fixedTop(e, vw); if (r && r.bottom > bottom) bottom = r.bottom;
    }
    var ch = false;
    if (bottom > 0 && bottom < headMin) { headMin = bottom; ch = true; }
    if (bottom > headMax) { headMax = bottom; ch = true; }
    if (!ch && measured) return;
    var ok = headMin !== Infinity && headMax > 0;
    var room = ok ? Math.max(70, headMin) : 16;
    var cover = ok ? Math.min(170, Math.max(0, Math.round(headMax - room))) : 0;
    var st = document.documentElement.style;
    st.setProperty("--vd-headroom", Math.round(room + TOP_ADJ) + "px");
    st.setProperty("--vd-cover", cover + "px");
    measured = true;
  }
  function measureDock() {
    var vw = window.innerWidth, vh = window.innerHeight, l = 0, r = 0, all = document.body.getElementsByTagName("*");
    for (var i = 0; i < all.length; i++) {
      var e = all[i];
      if (e.id === "vdKDock" || e.id === "vdK") continue;
      if (e.closest && (e.closest("#vdKDock") || e.closest("#vdK"))) continue;
      var cs; try { cs = getComputedStyle(e); } catch (x) { continue; }
      if (cs.position !== "fixed" || cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) continue;
      var b = e.getBoundingClientRect();
      if (b.width < 24 || b.width > 140 || b.height < 24 || b.height > 140) continue;
      if (b.bottom < vh - 190 || b.top > vh - 10) continue;
      if (b.left < vw * 0.42) { if (b.right > l) l = b.right; }
      else if (b.right > vw * 0.58) { if (vw - b.left > r) r = vw - b.left; }
    }
    var st = document.documentElement.style;
    st.setProperty("--vd-dock-l", Math.max(16, Math.round(l)) + "px");
    st.setProperty("--vd-dock-r", Math.max(16, Math.round(r)) + "px");
  }
  function layoutWatchers() {
    var dock = $("vdKDock"), res = $("vdKResult");
    if (dock && res && "IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { dock.classList.toggle("is-off", en[0].isIntersecting); }, { threshold: 0.18 }).observe(res);
    }
    var mob = isMobile(), rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      /* desenele se refac si cand se schimba doar inaltimea ferestrei (cadrul lor depinde de ea) */
      rt = setTimeout(function () { headMax = 0; measureHead(); measureDock(); if (isMobile() !== mob) { mob = isMobile(); update(); } else redrawIfFrameChanged(); }, 200);
    });
    window.addEventListener("orientationchange", function () { setTimeout(update, 220); });
    var raf = 0;
    window.addEventListener("scroll", function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = 0; measureHead(); measureDock(); redrawIfFrameChanged(); });
    }, { passive: true });
    measureHead(); measureDock(); redrawIfFrameChanged();
    each([400, 900, 1800], function (t) { setTimeout(function () { measureHead(); measureDock(); redrawIfFrameChanged(); }, t); });
  }

  function injectLd() {
    if ($("vdKLdJson")) return;
    var s = document.createElement("script");
    s.type = "application/ld+json"; s.id = "vdKLdJson";
    s.textContent = JSON.stringify(LDJSON);
    (document.head || document.body).appendChild(s);
  }

  /* ---------------- pornire ---------------- */
  function start() {
    var root = $("vdK");
    if (!root || root.getAttribute("data-ready")) return;
    readRows();
    if (!boards().length) return;
    root.setAttribute("data-ready", "1");
    injectLd();
    fixCanonical();
    readUrl();
    curBoard();
    fillInputs();
    bindNum("vdKL", "vdKFieldL", function () { return S.l; }, function (v) { S.l = v; }, LIM.l[0], LIM.l[1]);
    bindNum("vdKD", "vdKFieldD", function () { return S.d; }, function (v) { S.d = v; }, LIM.d[0], LIM.d[1]);
    renderControls();
    update();
    bindPdf();
    bindLead();
    layoutWatchers();
    root.classList.add("is-ready");
    syncPrices();
  }
  var tries = 0;
  function wait() {
    if ($("vdK") && $("vdKPrices") && $("vdKPersp")) { try { start(); } catch (e) { if (window.console) console.warn("[VIVODECOR deck] eroare:", e); } return; }
    if (++tries > 80) return;
    setTimeout(wait, 150);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wait); else wait();
})();
