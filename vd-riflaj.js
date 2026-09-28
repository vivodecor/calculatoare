/* ============================================================
   VIVODECOR - Calculator Riflaj WPC exterior (motor)
   Fisier extern, incarcat de incarcatorul din Design -> JS
   numai pe pagina /calculator-riflaj-wpc (#vdR).
   Setarile (LEAD_URL, LEAD_TOKEN, JSPDF_SRC, TOP_ADJUST) se citesc
   din window.VD_CONFIG, deja existent pentru calculatorul de gard.
   ============================================================ */
(function () {
  "use strict";
  if (window.__vdRiflajLoaded) return;
  window.__vdRiflajLoaded = true;

  var CFG = window.VD_CONFIG || {};
  var RC = window.VD_RIFLAJ || {};
  var LEAD_URL = CFG.LEAD_URL || "";
  var LEAD_TOKEN = CFG.LEAD_TOKEN || "";
  var JSPDF_SRC = CFG.JSPDF_SRC || "";
  var TOP_ADJ = parseFloat(CFG.TOP_ADJUST) || 0;
  var CAT_URL = RC.CATEGORY_URL || "";
  var LDJSON = {"@context": "https://schema.org", "@graph": [{"@type": "WebApplication", "@id": "https://www.vivodecor.ro/calculator-riflaj-wpc#app", "name": "Calculator riflaj WPC exterior \u2014 pl\u0103ci, grinzi, tuburi \u0219i pre\u021b", "url": "https://www.vivodecor.ro/calculator-riflaj-wpc", "applicationCategory": "BusinessApplication", "operatingSystem": "Web", "inLanguage": "ro-RO", "description": "Calculeaz\u0103 c\u00e2te pl\u0103ci de riflaj WPC 219 \u00d7 26 mm de 2,9 m \u0219i c\u00e2te grinzi de montaj sunt necesare pentru o fa\u021bad\u0103, sau c\u00e2te tuburi WPC \u0219i suporturi intr\u0103 \u00eentr-un perete desp\u0103r\u021bitor, cu debitare real\u0103 \u0219i pre\u021buri cu TVA.", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "RON"}, "publisher": {"@type": "Organization", "name": "VIVODECOR", "url": "https://www.vivodecor.ro"}}, {"@type": "FAQPage", "inLanguage": "ro-RO", "mainEntity": [{"@type": "Question", "name": "C\u00e2te pl\u0103ci de riflaj WPC intr\u0103 pe un metru p\u0103trat?", "acceptedAnswer": {"@type": "Answer", "text": "Teoretic 1,72 pl\u0103ci de 219 \u00d7 26 mm \u00d7 2,9 m pe m\u00b2 (5 metri liniari), pentru c\u0103 o plac\u0103 acoper\u0103 200 mm dup\u0103 \u00eembinare. Valoarea este exact\u0103 doar pe pere\u021bi de 2,9 m \u00een\u0103l\u021bime. La 2,5 m consumul real este de 2 pl\u0103ci/m\u00b2, iar la 2 m de 2,5 pl\u0103ci/m\u00b2 la montaj vertical, din cauza resturilor de debitare. Pentru 10 m\u00b2 pe un perete de 3,45 \u00d7 2,9 m sunt necesare 18 pl\u0103ci."}}, {"@type": "Question", "name": "Montez riflajul WPC pe vertical sau pe orizontal?", "acceptedAnswer": {"@type": "Answer", "text": "Alegi dup\u0103 \u00een\u0103l\u021bimea peretelui. Dac\u0103 \u00een\u0103l\u021bimea este aproape de 2,9 m (sau de 1,44 m, dou\u0103 buc\u0103\u021bi dintr-o plac\u0103), montajul vertical folose\u0219te pl\u0103cile aproape f\u0103r\u0103 rest. La pere\u021bi de 2 m, montajul orizontal pe un perete de 4 m folose\u0219te 15 pl\u0103ci \u00een loc de 20. Calculatorul afi\u0219eaz\u0103 automat varianta cu mai pu\u021bine pl\u0103ci."}}, {"@type": "Question", "name": "La ce distan\u021b\u0103 se monteaz\u0103 grinzile pentru riflaj WPC?", "acceptedAnswer": {"@type": "Answer", "text": "La cel mult 400 mm pe ax, perpendicular pe direc\u021bia pl\u0103cilor. Calculatorul folose\u0219te implicit 300 mm, ceea ce \u00eenseamn\u0103 aproximativ 3,8 metri liniari de grind\u0103 40 \u00d7 25 mm pe m\u00b2 de perete la 2,9 m \u00een\u0103l\u021bime, apropiat de consumul de 4 ml/m\u00b2 din fi\u0219a produsului. La 400 mm, consumul scade la aproximativ 3,1 ml/m\u00b2."}}, {"@type": "Question", "name": "C\u00e2t cost\u0103 riflajul WPC pe m\u00b2 cu tot cu grinzile de montaj?", "acceptedAnswer": {"@type": "Answer", "text": "La pre\u021burile din 20 septembrie 2026, un perete de 10 m\u00b2 placat vertical la 2,9 m \u00een\u0103l\u021bime cost\u0103 296,02 RON/m\u00b2 cu placa clasic\u0103 \u0219i 328,26 RON/m\u00b2 cu placa co-extrudat\u0103 220 \u00d7 26 mm, cu TVA, inclusiv grinzile de montaj. \u0218uruburile, diblurile \u0219i transportul se adaug\u0103 separat."}}, {"@type": "Question", "name": "C\u00e2te tuburi de riflaj WPC \u00eemi trebuie pentru un metru de perete desp\u0103r\u021bitor?", "acceptedAnswer": {"@type": "Answer", "text": "Depinde de l\u0103\u021bimea tubului \u0219i de rost: tuburi pe metru = 1000 / (fa\u021ba tubului + rost). Cu tub de 100 mm \u0219i rost de 80 mm intr\u0103 5,6 tuburi pe metru; cu tub de 55 mm \u0219i rost de 80 mm, 7,4 tuburi. Pentru o lungime dat\u0103, calculatorul rotunje\u0219te la un num\u0103r \u00eentreg de tuburi egal distan\u021bate \u0219i afi\u0219eaz\u0103 rostul real."}}, {"@type": "Question", "name": "Ce suport folosesc pentru riflajul tub WPC?", "acceptedAnswer": {"@type": "Answer", "text": "Fiecare profil are suportul lui: L55 \u0219i U55 pentru tubul 55 \u00d7 35 mm, L80 \u0219i U80 pentru 80 \u00d7 35 mm, L100 pentru 100 \u00d7 52 \u0219i 120 \u00d7 62 mm \u0219i U100 pentru 100 \u00d7 52 mm. Se folosesc 2 suporturi pe tub, sus \u0219i jos, ancorate \u00een beton, c\u0103r\u0103mid\u0103 plin\u0103 sau o\u021bel. Pentru profilul 150 \u00d7 50 mm, suportul se stabile\u0219te la comand\u0103."}}, {"@type": "Question", "name": "Pot monta tuburi de riflaj WPC mai \u00eenalte de 2 metri?", "acceptedAnswer": {"@type": "Answer", "text": "Da, p\u00e2n\u0103 la lungimea barei: 2,9 m pentru profilele 55 \u00d7 35 \u2026 100 \u00d7 52 mm \u0219i 3,5 m pentru 120 \u00d7 62 \u0219i 150 \u00d7 50 mm. Peste 2 m, tubul trebuie sprijinit \u0219i la mijloc, la fiecare 1\u20131,2 m, sau rigidizat cu o \u021beav\u0103 metalic\u0103 introdus\u0103 \u00een interior, altfel se poate curba \u00een timp."}}, {"@type": "Question", "name": "Pre\u021bul din calculator include TVA \u0219i accesoriile?", "acceptedAnswer": {"@type": "Answer", "text": "Da, toate pre\u021burile sunt cu TVA. Totalul include pl\u0103cile sau tuburile, grinzile de montaj, col\u021barele, profilele de finisaj \u0219i suporturile, cu reducerile de cantitate unde se aplic\u0103. \u0218uruburile, diblurile \u0219i transportul nu sunt incluse. Pre\u021bul din pagina fiec\u0103rui produs r\u0103m\u00e2ne cel oficial."}}]}, {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Acas\u0103", "item": "https://www.vivodecor.ro/"}, {"@type": "ListItem", "position": 2, "name": "Riflaj WPC", "item": "https://www.vivodecor.ro/riflaj-wpc"}, {"@type": "ListItem", "position": 3, "name": "Calculator riflaj WPC", "item": "https://www.vivodecor.ro/calculator-riflaj-wpc"}]}]};

  var EDGE = 20, KERF = 5, BAT_ID = "grinda";
  var ARROW = "\u2192";

  function $(id) { return document.getElementById(id); }
  function each(list, fn) { for (var i = 0; i < list.length; i++) fn(list[i], i); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function money(v) { return v.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function num(v, d) { d = d === undefined ? 0 : d; return v.toLocaleString("ro-RO", { minimumFractionDigits: d, maximumFractionDigits: d }); }
  var AMP = String.fromCharCode(38), QUO = String.fromCharCode(34);
  function esc(s) {
    return String(s).split(AMP).join(AMP + "amp;").split("<").join(AMP + "lt;")
      .split(">").join(AMP + "gt;").split(QUO).join(AMP + "quot;");
  }

  /* ---------------- date din tabelul de preturi ---------------- */
  function lighten(hex, k) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex); if (!m) return hex;
    var n = parseInt(m[1], 16), out = "#";
    each([16, 8, 0], function (sh) {
      var c = (n >> sh) & 255; c = Math.round(c + (255 - c) * k);
      out += ("0" + c.toString(16)).slice(-2);
    });
    return out;
  }
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
    each(document.querySelectorAll("#vdRPrices tr[data-id]"), function (r) {
      var d = r.dataset, a = r.querySelector("a[href]"), th = r.querySelector("th");
      var full = d.full || (th ? th.textContent.replace(/\s+/g, " ").trim() : d.name);
      var kind = d.kind, hex = d.hex || "#8A7A6A";
      var pu = d.pu || (kind === "board" ? "m2" : kind === "support" ? "" : "ml");
      var o = {
        id: d.id, kind: kind, name: d.name || full, full: full,
        price: parseFloat(d.price), url: d.url || (a ? a.href : ""),
        hex: hex, hex2: d.hex2 || lighten(hex, 0.1), stripe: d.stripe === "1",
        line: d.line || "", prof: d.prof || "", len: parseFloat(d.len) || 0,
        a: parseFloat(d.a) || 0, b: parseFloat(d.b) || 0, cover: parseFloat(d.cover) || 0,
        tiers: parseTiers(d.tiers), kg: d.kg ? parseFloat(d.kg) : NaN,
        corner: d.corner || "", trim: d.trim || "", fam: d.fam || "",
        sup: (d.sup || "").split(" "), st: d.st || "", pu: pu, row: r
      };
      if (!isNaN(o.price) && o.price > 0) { ROWS.push(o); BY[o.id] = o; }
    });
  }
  function rowsWhere(fn) { var o = []; each(ROWS, function (r) { if (fn(r)) o.push(r); }); return o; }
  function tierPct(item, q) {
    for (var i = 0; i < item.tiers.length; i++) if (q >= item.tiers[i].min) return item.tiers[i].pct;
    return 0;
  }

  var LINES = [], PROFS = [];
  function readMeta() {
    LINES = []; PROFS = [];
    each(document.querySelectorAll("#vdRLines [data-line]"), function (el) {
      LINES.push({ id: el.getAttribute("data-line"), label: el.getAttribute("data-label"), full: el.getAttribute("data-full") });
    });
    each(document.querySelectorAll("#vdRProfs [data-prof]"), function (el) {
      PROFS.push({ id: el.getAttribute("data-prof"), label: el.getAttribute("data-label"), full: el.getAttribute("data-full"),
        a: parseFloat(el.getAttribute("data-a")), b: parseFloat(el.getAttribute("data-b")), len: parseFloat(el.getAttribute("data-len")) });
    });
  }
  function lineOf(id) { for (var i = 0; i < LINES.length; i++) if (LINES[i].id === id) return LINES[i]; return LINES[0]; }
  function profOf(id) { for (var i = 0; i < PROFS.length; i++) if (PROFS[i].id === id) return PROFS[i]; return PROFS[0]; }

  /* ---------------- stare ---------------- */
  var S = {
    mode: "a",
    a: { line: "clasic", c: "", w: 4000, h: 2900, op: 0, or: "v", sp: 300, co: 0, tr: 0, rs: 5 },
    b: { pf: "p100x52", c: "", l: 3000, h: 2500, g: 80, n: 0, e: "t", f: "w", st: "L" }
  };
  var LIM = {
    w: [500, 40000], h: [300, 12000], op: [0, 5000], co: [0, 40], tr: [0, 2000],
    l: [300, 40000], hb: [300, 3500]
  };
  var SP_OPTS = [300, 400], RS_OPTS = [0, 5, 10], GAP_OPTS = [20, 30, 50, 80, 100, 150];

  function boardsOfLine(l) { return rowsWhere(function (r) { return r.kind === "board" && r.line === l; }); }
  function tubesOfProf(p) { return rowsWhere(function (r) { return r.kind === "tube" && r.prof === p; }); }
  function curBoard() {
    var list = boardsOfLine(S.a.line);
    for (var i = 0; i < list.length; i++) if (list[i].id === S.a.c) return list[i];
    S.a.c = list[0].id; return list[0];
  }
  function curTube() {
    var list = tubesOfProf(S.b.pf);
    for (var i = 0; i < list.length; i++) if (list[i].id === S.b.c) return list[i];
    S.b.c = list[0].id; return list[0];
  }

  /* ---------------- calcul ---------------- */
  function cut(count, len, bar) {
    if (count <= 0 || len <= 0) return { bars: 0, per: 0, joints: 0 };
    if (len <= bar) {
      var per = Math.max(1, Math.floor((bar + KERF) / (len + KERF)));
      return { bars: Math.ceil(count / per), per: per, joints: 0 };
    }
    var k = Math.floor(len / bar), r = len - k * bar;
    if (r < 1) return { bars: count * k, per: 1, joints: count * (k - 1) };
    var pr = Math.max(1, Math.floor((bar + KERF) / (r + KERF)));
    return { bars: count * k + Math.ceil(count / pr), per: 0, joints: count * k };
  }
  function boardsFor(a, board, orient) {
    var cover = board.cover || 200;
    var wn = Math.max(cover, a.w - 2 * EDGE);
    var vert = orient === "v";
    var count = vert ? Math.ceil(wn / cover) : Math.ceil(a.h / cover);
    var plen = vert ? a.h : wn;
    var c = cut(count, plen, board.len);
    var gross = a.w * a.h / 1e6;
    var open = Math.min(a.op, gross * 0.9);
    var net = gross - open;
    var ratio = gross > 0 ? net / gross : 1;
    var need = Math.ceil(c.bars * ratio - 1e-9);
    var order = Math.max(2, Math.ceil(need * (1 + a.rs / 100) - 1e-9));
    return { cover: cover, wn: wn, count: count, plen: plen, cut: c, gross: gross, net: net, open: open, ratio: ratio, need: need, order: order };
  }
  function item(r, q, note) {
    var pct = tierPct(r, q);
    var gross = q * r.price;
    return { r: r, q: q, pct: pct, gross: gross, net: gross * (1 - pct / 100), note: note || "" };
  }
  function computeA() {
    var a = S.a, board = curBoard();
    var B = boardsFor(a, board, a.or);
    var alt = boardsFor(a, board, a.or === "v" ? "h" : "v");
    var vert = a.or === "v";
    var bat = BY[BAT_ID];
    var nB = Math.ceil((vert ? a.h : a.w) / a.sp) + 1;
    var bLen = vert ? a.w : a.h;
    var bc = bat ? cut(nB, bLen, bat.len) : { bars: 0 };
    var items = [item(board, B.order)];
    if (bat) items.push(item(bat, bc.bars));
    var corner = BY[board.corner], trim = BY[board.trim];
    var cornerQty = 0, trimQty = 0;
    if (a.co > 0 && corner) { cornerQty = a.co * Math.ceil(a.h / corner.len); items.push(item(corner, cornerQty, "col\u021bar")); }
    if (a.tr > 0 && trim) { trimQty = Math.ceil(a.tr * 1000 / trim.len * 1.05 - 1e-9); items.push(item(trim, trimQty, "finisaj")); }
    var total = 0, gross = 0;
    each(items, function (it) { total += it.net; gross += it.gross; });
    var screws = Math.ceil(B.count * nB * B.ratio);
    var anchors = nB * (Math.ceil(bLen / 500) + 1);
    return {
      mode: "a", board: board, line: lineOf(a.line), B: B, alt: alt, nB: nB, bLen: bLen, batBars: bc.bars,
      batMl: nB * bLen / 1000, items: items, total: total, gross: gross, saved: gross - total,
      perM2: B.net > 0 ? total / B.net : 0, screws: screws, anchors: anchors,
      weight: isNaN(board.kg) ? NaN : B.order * board.kg,
      cornerQty: cornerQty, trimQty: trimQty, joints: B.plen > board.len
    };
  }
  function nOptions(L, face, g, ends) {
    var n0 = ends === "t" ? Math.round((L + g) / (face + g)) : Math.round((L - g) / (face + g));
    var min = ends === "t" ? 2 : 1;
    n0 = Math.max(min, n0);
    function gapFor(n) { return ends === "t" ? (L - n * face) / (n - 1) : (L - n * face) / (n + 1); }
    var out = [];
    each([n0 - 1, n0, n0 + 1], function (n) {
      if (n >= min && gapFor(n) >= 5) out.push({ n: n, gap: gapFor(n) });
    });
    if (!out.length) out.push({ n: min, gap: gapFor(min) });
    return { n0: n0, list: out };
  }
  function findSupport(prof, st, fam) {
    var list = rowsWhere(function (r) { return r.kind === "support" && r.st === st && r.sup.indexOf(prof) > -1; });
    if (!list.length) return null;
    for (var i = 0; i < list.length; i++) if (list[i].fam === fam) return { r: list[i], match: true };
    return { r: list[0], match: false };
  }
  function computeB() {
    var b = S.b, t = curTube(), P = profOf(b.pf);
    var face = b.f === "w" ? P.a : P.b, depth = b.f === "w" ? P.b : P.a;
    var hMax = P.len;
    var H = Math.min(b.h, hMax);
    var opts = nOptions(b.l, face, b.g, b.e);
    var pick = opts.list[0];
    each(opts.list, function (o) { if (o.n === opts.n0 + b.n) pick = o; });
    if (pick.n !== opts.n0 + b.n) { each(opts.list, function (o) { if (o.n === opts.n0) pick = o; }); }
    var n = pick.n, gap = pick.gap;
    var c = cut(n, H, P.len);
    var items = [item(t, c.bars)];
    var sup = null, supQty = 0;
    if (b.st !== "none") {
      sup = findSupport(b.pf, b.st, t.fam);
      if (sup) { supQty = 2 * n; items.push(item(sup.r, supQty)); }
    }
    var total = 0, gross = 0;
    each(items, function (it) { total += it.net; gross += it.gross; });
    var runM = b.l / 1000, area = b.l * H / 1e6;
    return {
      mode: "b", tube: t, prof: P, face: face, depth: depth, H: H, tooTall: b.h > hMax, hMax: hMax,
      opts: opts, n: n, gap: gap, cut: c, sup: sup, supQty: supQty, items: items,
      total: total, gross: gross, saved: gross - total,
      perMl: runM > 0 ? total / runM : 0, perM2: area > 0 ? total / area : 0, area: area,
      cover: b.l > 0 ? n * face / b.l * 100 : 0, perMeter: 1000 / (face + gap),
      weight: isNaN(t.kg) ? NaN : c.bars * t.kg
    };
  }
  function compute() { return S.mode === "a" ? computeA() : computeB(); }

  /* ---------------- SVG ---------------- */
  var SVGNS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, text) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function isMobile() { return window.innerWidth <= 900; }
  var MONO = "'IBM Plex Mono',monospace", TECH = "#5B7183";

  function clearSvg(svg) {
    each(Array.prototype.slice.call(svg.childNodes), function (n) {
      var t = n.tagName ? String(n.tagName).toLowerCase() : "";
      if (t !== "title" && t !== "desc") svg.removeChild(n);
    });
  }
  function gradient(defs, id, hex, hex2, vertical) {
    var g = el("linearGradient", vertical ? { id: id, x1: "0", y1: "0", x2: "0", y2: "1" } : { id: id, x1: "0", y1: "0", x2: "1", y2: "0" });
    g.appendChild(el("stop", { offset: "0%", "stop-color": hex2 }));
    g.appendChild(el("stop", { offset: "55%", "stop-color": hex }));
    g.appendChild(el("stop", { offset: "100%", "stop-color": hex2 }));
    defs.appendChild(g);
  }
  function dimH(g, x1, x2, y, label, fs, sw) {
    g.appendChild(el("line", { x1: x1, y1: y, x2: x2, y2: y, stroke: TECH, "stroke-width": sw }));
    g.appendChild(el("path", { d: "M" + x1 + " " + y + " l" + fs + " -" + fs * 0.44 + " l0 " + fs * 0.88 + " Z", fill: TECH }));
    g.appendChild(el("path", { d: "M" + x2 + " " + y + " l-" + fs + " -" + fs * 0.44 + " l0 " + fs * 0.88 + " Z", fill: TECH }));
    g.appendChild(el("text", { x: (x1 + x2) / 2, y: y - fs * 0.55, "font-size": fs, "text-anchor": "middle", fill: TECH, "font-family": MONO, "font-weight": "500" }, label));
  }
  function dimV(g, x, y1, y2, label, fs, sw) {
    g.appendChild(el("line", { x1: x, y1: y1, x2: x, y2: y2, stroke: TECH, "stroke-width": sw }));
    g.appendChild(el("path", { d: "M" + x + " " + y1 + " l-" + fs * 0.44 + " " + fs + " l" + fs * 0.88 + " 0 Z", fill: TECH }));
    g.appendChild(el("path", { d: "M" + x + " " + y2 + " l-" + fs * 0.44 + " -" + fs + " l" + fs * 0.88 + " 0 Z", fill: TECH }));
    var tx = x - fs * 0.75, ty = (y1 + y2) / 2;
    g.appendChild(el("text", { x: tx, y: ty, "font-size": fs, "text-anchor": "middle", fill: TECH, "font-family": MONO, "font-weight": "500", transform: "rotate(-90 " + tx + " " + ty + ")" }, label));
  }
  function ground(g, x1, x2, y, sw) {
    g.appendChild(el("line", { x1: x1, y1: y, x2: x2, y2: y, stroke: "#B9C6BC", "stroke-width": sw }));
    var step = Math.max(90, (x2 - x1) / 70);
    for (var x = x1; x < x2; x += step) {
      g.appendChild(el("line", { x1: x, y1: y, x2: x - step * 0.5, y2: y + step * 0.5, stroke: "#C9D4CB", "stroke-width": sw * 0.72 }));
    }
  }
  function person(g, x, yGround, fs) {
    var p = el("g", { transform: "translate(" + x + "," + (yGround - 1750) + ") scale(17.5)", fill: "#AEBCB2", opacity: ".85" });
    p.appendChild(el("circle", { cx: 15, cy: 9, r: 8.4 }));
    p.appendChild(el("path", { d: "M15 19 C6 19 3 26 3 38 L3 60 L8 60 L9 100 L14 100 L15 66 L16 100 L21 100 L22 60 L27 60 L27 38 C27 26 24 19 15 19 Z" }));
    g.appendChild(p);
    g.appendChild(el("text", { x: x + 262, y: yGround + fs * 1.6, "font-size": fs * 0.72, "text-anchor": "middle", fill: "#8FA097", "font-family": MONO }, "1,75 m"));
  }
  function callout(g, x, y, tx, label, fs, sw, color) {
    g.appendChild(el("line", { x1: x, y1: y, x2: tx, y2: y, stroke: color, "stroke-width": sw * 0.7 }));
    g.appendChild(el("circle", { cx: x, cy: y, r: sw * 2.6, fill: color }));
    g.appendChild(el("text", { x: tx + fs * 0.3, y: y + fs * 0.32, "font-size": fs * 0.82, fill: color, "font-family": MONO }, label));
  }

  function frame(W, H, mob, padTmin) {
    var padL = Math.max(mob ? 420 : 520, W * 0.07), padT = Math.max(padTmin, H * 0.06), v, fs;
    if (mob) { v = W + padL + Math.max(120, W * 0.03); fs = Math.max(v / 22, 46); }
    else { v = (W + padL + 1145) / 0.805; fs = Math.max(v / 46, 46); }
    if (fs * 2.9 > padL) {
      var extra = fs * 2.9 - padL; padL += extra; v += extra;
      fs = Math.max(v / (mob ? 22 : 46), 46);
    }
    var sw = Math.max(v / (mob ? 300 : 520), 3.4);
    return { padL: padL, padT: padT, v: v, fs: fs, sw: sw, personX: W + 250, textX: W + 1025 };
  }
  function drawA(res, svg) {
    var a = S.a, W = a.w, H = a.h, mob = isMobile();
    var B = res.B, cover = B.cover, vert = a.or === "v";
    var F = frame(W, H, mob, 160), padL = F.padL, padT = F.padT, v = F.v, fs = F.fs, sw = F.sw, fullW = v - padL - 120;
    var hv = H + padT + fs * 4.2;
    svg.setAttribute("viewBox", (-padL) + " " + (-padT) + " " + v + " " + hv);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    var defs = el("defs");
    gradient(defs, "vdRGrad", res.board.hex, res.board.hex2, !vert);
    svg.appendChild(defs);
    var g = el("g"); svg.appendChild(g);
    ground(g, -padL + 40, fullW + 40, H, sw);
    g.appendChild(el("rect", { x: 0, y: 0, width: W, height: H, fill: "#E4E7E3", stroke: "#B9C6BC", "stroke-width": sw }));
    var many = B.count > 90;
    var grooves = 4, i, k;
    if (vert) {
      var x0 = EDGE;
      for (i = 0; i < B.count; i++) {
        var bx = x0 + i * cover, bw = Math.min(cover, W - EDGE - bx);
        if (bw <= 0) break;
        g.appendChild(el("rect", { x: bx, y: 0, width: bw, height: H, fill: "url(#vdRGrad)", stroke: "rgba(0,0,0,.30)", "stroke-width": sw * 0.5 }));
        if (!many) for (k = 1; k < grooves; k++) {
          var gx = bx + cover * k / grooves;
          if (gx < bx + bw) g.appendChild(el("line", { x1: gx, y1: 0, x2: gx, y2: H, stroke: "rgba(0,0,0,.22)", "stroke-width": sw * 0.55 }));
        }
        if (res.joints) {
          var jy = i % 2 ? res.board.len : H - res.board.len;
          if (jy > 0 && jy < H) g.appendChild(el("line", { x1: bx, y1: jy, x2: bx + bw, y2: jy, stroke: "#FBFAF7", "stroke-width": sw * 0.9 }));
        }
      }
    } else {
      for (i = 0; i < B.count; i++) {
        var by = H - (i + 1) * cover, bh = cover;
        if (by < 0) { bh = cover + by; by = 0; }
        if (bh <= 0) break;
        g.appendChild(el("rect", { x: EDGE, y: by, width: W - 2 * EDGE, height: bh, fill: "url(#vdRGrad)", stroke: "rgba(0,0,0,.30)", "stroke-width": sw * 0.5 }));
        if (!many) for (k = 1; k < grooves; k++) {
          var gy = by + bh - cover * k / grooves;
          if (gy > by) g.appendChild(el("line", { x1: EDGE, y1: gy, x2: W - EDGE, y2: gy, stroke: "rgba(0,0,0,.22)", "stroke-width": sw * 0.55 }));
        }
        if (res.joints) {
          var jx = EDGE + (i % 2 ? res.board.len : (W - 2 * EDGE) - res.board.len);
          if (jx > EDGE && jx < W - EDGE) g.appendChild(el("line", { x1: jx, y1: by, x2: jx, y2: by + bh, stroke: "#FBFAF7", "stroke-width": sw * 0.9 }));
        }
      }
    }
    /* grinzile de montaj, desenate transparent peste placare */
    var sp = a.sp, nB = res.nB, j;
    for (j = 0; j < nB; j++) {
      var pos = Math.min(j * sp, vert ? H : W);
      if (j === nB - 1) pos = vert ? H - 20 : W - 20;
      if (j === 0) pos = 20;
      if (vert) g.appendChild(el("line", { x1: 0, y1: pos, x2: W, y2: pos, stroke: "#E9C46A", "stroke-width": sw * 1.1, "stroke-dasharray": (sw * 4) + " " + (sw * 3), opacity: ".85" }));
      else g.appendChild(el("line", { x1: pos, y1: 0, x2: pos, y2: H, stroke: "#E9C46A", "stroke-width": sw * 1.1, "stroke-dasharray": (sw * 4) + " " + (sw * 3), opacity: ".85" }));
    }
    var yDim = H + fs * 2.2;
    g.appendChild(el("line", { x1: 0, y1: H, x2: 0, y2: yDim + fs * 0.6, stroke: TECH, "stroke-width": sw * 0.6, "stroke-dasharray": "14 12" }));
    g.appendChild(el("line", { x1: W, y1: H, x2: W, y2: yDim + fs * 0.6, stroke: TECH, "stroke-width": sw * 0.6, "stroke-dasharray": "14 12" }));
    dimH(g, 0, W, yDim, num(W) + " mm", fs, sw);
    var xDim = -fs * 1.4;
    dimV(g, xDim, 0, H, num(H) + " mm", fs, sw);
    if (!mob) {
      var tx = F.textX;
      callout(g, W - EDGE - cover * 0.5, H * 0.12, tx, res.board.name, fs, sw, "#4A5A52");
      var ly = vert ? Math.min(sp * (nB > 3 ? 2 : 1), H * 0.5) : H * 0.34;
      var lx = vert ? W * 0.72 : Math.min(sp * 2, W * 0.5);
      if (vert) ly = Math.min(Math.max(20, sp * Math.round(H * 0.34 / sp)), H - 20);
      callout(g, lx, ly, tx, "grinzi la " + sp + " mm", fs, sw, "#B4650F");
      callout(g, W - EDGE * 0.5, H * 0.66, tx, "dilatare 20 mm", fs, sw, TECH);
      person(g, F.personX, H, fs);
    }
    var desc = svg.querySelector("#vdRDrawDesc");
    if (desc) desc.textContent = "Perete de " + num(W) + " \u00d7 " + num(H) + " mm placat " + (vert ? "vertical" : "orizontal") +
      " cu riflaj WPC " + res.board.name.toLowerCase() + ": " + B.count + (vert ? " coloane" : " r\u00e2nduri") +
      " de 200 mm, " + nB + " grinzi de montaj la " + sp + " mm.";
  }

  function drawB(res, svg) {
    var b = S.b, L = b.l, H = res.H, mob = isMobile();
    var face = res.face, gap = res.gap, n = res.n;
    var F = frame(L, H, mob, 200), padL = F.padL, padT = F.padT, v = F.v, fs = F.fs, sw = F.sw, fullW = v - padL - 120;
    var hv = H + padT + fs * 4.2;
    svg.setAttribute("viewBox", (-padL) + " " + (-padT) + " " + v + " " + hv);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    var defs = el("defs");
    gradient(defs, "vdRGrad", res.tube.hex, res.tube.hex2, false);
    svg.appendChild(defs);
    var g = el("g"); svg.appendChild(g);
    ground(g, -padL + 40, fullW + 40, H, sw);
    g.appendChild(el("line", { x1: -60, y1: 0, x2: L + 60, y2: 0, stroke: "#B9C6BC", "stroke-width": sw }));
    g.appendChild(el("rect", { x: -60, y: -Math.min(120, padT * 0.6), width: L + 120, height: Math.min(120, padT * 0.6), fill: "#E4E7E3", stroke: "#B9C6BC", "stroke-width": sw * 0.6 }));
    var x = b.e === "t" ? 0 : gap, i;
    var supH = Math.max(40, face * 0.45);
    for (i = 0; i < n; i++) {
      g.appendChild(el("rect", { x: x, y: 0, width: face, height: H, fill: "url(#vdRGrad)", stroke: "rgba(0,0,0,.32)", "stroke-width": sw * 0.5 }));
      if (res.tube.stripe) {
        for (var k = 1; k <= 3; k++) g.appendChild(el("line", { x1: x + face * k / 4, y1: 0, x2: x + face * k / 4, y2: H, stroke: "rgba(255,255,255,.14)", "stroke-width": sw * 0.7 }));
      }
      if (b.st !== "none") {
        g.appendChild(el("rect", { x: x - sw, y: 0, width: face + 2 * sw, height: supH, fill: "#9AA8B4", stroke: "#6C7E8D", "stroke-width": sw * 0.4 }));
        g.appendChild(el("rect", { x: x - sw, y: H - supH, width: face + 2 * sw, height: supH, fill: "#9AA8B4", stroke: "#6C7E8D", "stroke-width": sw * 0.4 }));
      }
      x += face + gap;
    }
    var yDim = H + fs * 2.2;
    g.appendChild(el("line", { x1: 0, y1: H, x2: 0, y2: yDim + fs * 0.6, stroke: TECH, "stroke-width": sw * 0.6, "stroke-dasharray": "14 12" }));
    g.appendChild(el("line", { x1: L, y1: H, x2: L, y2: yDim + fs * 0.6, stroke: TECH, "stroke-width": sw * 0.6, "stroke-dasharray": "14 12" }));
    dimH(g, 0, L, yDim, num(L) + " mm", fs, sw);
    dimV(g, -fs * 1.4, 0, H, num(H) + " mm", fs, sw);
    if (!mob) {
      var tx = F.textX;
      var xl = (b.e === "t" ? 0 : gap) + (n - 1) * (face + gap);
      callout(g, xl - gap / 2, H * 0.14, tx, "rost " + num(gap, 1) + " mm", fs, sw, TECH);
      callout(g, xl + face / 2, H * 0.30, tx, "fa\u021b\u0103 " + face + " mm", fs, sw, "#4A5A52");
      if (b.st !== "none") callout(g, xl + face / 2, supH / 2, tx, "suport sus + jos", fs, sw, "#6C7E8D");
      person(g, F.personX, H, fs);
    }
    var desc = svg.querySelector("#vdRDrawDesc");
    if (desc) desc.textContent = "Perete desp\u0103r\u021bitor de " + num(L) + " mm lungime \u0219i " + num(H) + " mm \u00een\u0103l\u021bime din " + n +
      " tuburi WPC " + res.prof.a + " \u00d7 " + res.prof.b + " mm, " + res.tube.name.toLowerCase() + ", cu rost de " + num(gap, 1) + " mm.";
  }
  function draw(res) {
    var svg = $("vdRDraw");
    clearSvg(svg);
    if (res.mode === "a") drawA(res, svg); else drawB(res, svg);
  }

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
  function swatches(id, list, cur, unit, pick) {
    var box = $(id); if (!box) return;
    box.innerHTML = "";
    each(list, function (r) {
      var bt = document.createElement("button");
      bt.type = "button"; bt.className = "vd-sw";
      bt.setAttribute("aria-pressed", r.id === cur ? "true" : "false");
      var bg = "linear-gradient(160deg," + r.hex2 + "," + r.hex + " 62%," + r.hex2 + ")";
      bt.innerHTML = '<span class="vd-swcolor" style="background:' + (r.stripe ? "repeating-linear-gradient(90deg,rgba(255,255,255,.10) 0 3px,transparent 3px 12px)," : "") + bg + '"></span>' +
        '<span class="vd-swname">' + esc(r.name) + '<span class="vd-swprice">' + money(r.price) + " RON/" + unit + "</span></span>";
      bt.addEventListener("click", function () { pick(r); dirty(); renderControls(); update(); });
      box.appendChild(bt);
    });
  }
  function renderControls() {
    seg("vdRMode", ["a", "b"], function (m) {
      return m === "a" ? "Placare perete / fa\u021bad\u0103<small>pl\u0103ci 219 \u00d7 26 \u0219i 220 \u00d7 26 mm</small>" : "Perete desp\u0103r\u021bitor din tub<small>profile 55 \u2026 150 mm</small>";
    }, function (m) { return S.mode === m; }, function (m) { S.mode = m; });
    $("vdRPanelA").hidden = S.mode !== "a";
    $("vdRPanelB").hidden = S.mode !== "b";
    if (S.mode === "a") {
      var a = S.a;
      seg("vdRLine", map(LINES, function (l) { return l.id; }), function (id) { return esc(lineOf(id).label); },
        function (id) { return a.line === id; }, function (id) { a.line = id; a.c = ""; });
      var board = curBoard();
      swatches("vdRSwA", boardsOfLine(a.line), board.id, "plac\u0103", function (r) { a.c = r.id; });
      seg("vdROrient", ["v", "h"], function (o) { return o === "v" ? "Vertical" : "Orizontal"; },
        function (o) { return a.or === o; }, function (o) { a.or = o; });
      seg("vdRSpace", SP_OPTS, function (s) { return s + " mm" + (s === 300 ? " (recomandat)" : " (maxim)"); },
        function (s) { return a.sp === s; }, function (s) { a.sp = s; });
      seg("vdRRes", RS_OPTS, function (r) { return r === 0 ? "F\u0103r\u0103 rezerv\u0103" : "+" + r + "%"; },
        function (r) { return a.rs === r; }, function (r) { a.rs = r; });
    } else {
      var b = S.b;
      seg("vdRProf", map(PROFS, function (p) { return p.id; }), function (id) { return esc(profOf(id).label); },
        function (id) { return b.pf === id; }, function (id) { b.pf = id; b.c = ""; b.n = 0; if (b.st === "U" && !findSupport(id, "U", "gri")) b.st = "L"; });
      var t = curTube();
      swatches("vdRSwB", tubesOfProf(b.pf), t.id, "tub", function (r) { b.c = r.id; });
      seg("vdRGap", GAP_OPTS, function (g) { return g + " mm"; }, function (g) { return b.g === g; }, function (g) { b.g = g; b.n = 0; });
      seg("vdREnds", ["t", "g"], function (e) { return e === "t" ? "Tub lipit de capete" : "Rost \u0219i la capete"; },
        function (e) { return b.e === e; }, function (e) { b.e = e; b.n = 0; });
      var P = profOf(b.pf);
      seg("vdRFace", ["w", "n"], function (f) { return f === "w" ? "Fa\u021ba lat\u0103 (" + P.a + " mm)" : "Fa\u021ba \u00eengust\u0103 (" + P.b + " mm)"; },
        function (f) { return b.f === f; }, function (f) { b.f = f; b.n = 0; });
      var stOpts = ["L"];
      if (findSupport(b.pf, "U", "gri")) stOpts.push("U");
      stOpts.push("none");
      seg("vdRSup", stOpts, function (s) { return s === "L" ? "Suport tip L" : s === "U" ? "Suport tip U" : "F\u0103r\u0103 suporturi"; },
        function (s) { return b.st === s; }, function (s) { b.st = s; });
      var face = b.f === "w" ? P.a : P.b;
      var opts = nOptions(b.l, face, b.g, b.e);
      seg("vdRN", map(opts.list, function (o) { return o.n; }), function (n) {
        var o; each(opts.list, function (x) { if (x.n === n) o = x; });
        return n + " tuburi<small>rost " + num(o.gap, 1) + " mm</small>";
      }, function (n) {
        var want = opts.n0 + b.n, has = false;
        each(opts.list, function (x) { if (x.n === want) has = true; });
        return has ? n === want : n === opts.n0;
      }, function (n) { b.n = n - opts.n0; });
      var hl = $("vdRHBLim"); if (hl) hl.textContent = "Valoare acceptat\u0103: \u00eentre 300 \u0219i " + num(P.len) + " mm (lungimea tubului ales).";
    }
  }
  function map(list, fn) { var o = []; each(list, function (x, i) { o.push(fn(x, i)); }); return o; }

  function bindNum(inputId, fieldId, get, set, min, maxFn, decimals) {
    var inp = $(inputId), fld = fieldId ? $(fieldId) : null;
    if (!inp) return;
    function apply(final) {
      var raw = String(inp.value).replace(",", ".").replace(/[^\d.]/g, "");
      var v = decimals ? parseFloat(raw) : parseInt(raw, 10);
      var max = maxFn();
      if (isNaN(v)) { if (final) v = get(); else return; }
      var bad = v < min || v > max;
      if (fld) fld.classList.toggle("is-err", bad && !final);
      if (final) {
        v = clamp(v, min, max);
        inp.value = decimals ? String(v).replace(".", ",") : v;
        if (fld) fld.classList.remove("is-err");
      }
      set(clamp(v, min, max));
      dirty(); if (S.mode === "b") renderControls(); update();
    }
    inp.addEventListener("input", function () { apply(false); });
    inp.addEventListener("blur", function () { apply(true); });
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") inp.blur(); });
  }
  function fillInputs() {
    $("vdRW").value = S.a.w; $("vdRH").value = S.a.h;
    $("vdROp").value = String(S.a.op).replace(".", ","); $("vdRCo").value = S.a.co; $("vdRTr").value = String(S.a.tr).replace(".", ",");
    $("vdRL").value = S.b.l; $("vdRHB").value = S.b.h;
  }

  /* ---------------- rezultat ---------------- */
  function linesA(r) {
    var a = S.a, B = r.B, l = [];
    l.push(["Tip \u0219i culoare", r.line.label + " \u00b7 " + r.board.name, true]);
    l.push(["Suprafa\u021b\u0103 perete", num(B.gross, 2) + " m\u00b2" + (B.open > 0 ? " \u2212 goluri " + num(B.open, 2) + " = " + num(B.net, 2) + " m\u00b2" : ""), false]);
    l.push(["Montaj", (a.or === "v" ? "vertical \u00b7 " + B.count + " coloane" : "orizontal \u00b7 " + B.count + " r\u00e2nduri") + " de 200 mm", false]);
    l.push(["Pl\u0103ci de 2,9 m (net)", B.need + " buc", false]);
    l.push(["Pl\u0103ci de comandat", B.order + " buc" + (a.rs ? " (cu " + a.rs + "% rezerv\u0103)" : ""), true]);
    l.push(["Grinzi de montaj 3 m", r.batBars + " buc \u00b7 " + num(r.batMl, 1) + " ml, " + r.nB + " r\u00e2nduri la " + a.sp + " mm", true]);
    if (r.cornerQty) l.push(["Col\u021bare exterioare", r.cornerQty + " buc \u00b7 " + a.co + " col\u021buri", false]);
    if (r.trimQty) l.push(["Profile de finisaj", r.trimQty + " buc \u00b7 " + num(a.tr, 1) + " ml", false]);
    l.push(["\u0218uruburi pl\u0103ci (orientativ)", "~" + r.screws + " buc, cap \u00eenecat", false]);
    l.push(["Dibluri grinzi (orientativ)", "~" + r.anchors + " buc, la 500 mm", false]);
    if (!isNaN(r.weight)) l.push(["Greutate pl\u0103ci", num(r.weight) + " kg", false]);
    l.push(["Pre\u021b pe m\u00b2 placat", money(r.perM2) + " RON", true]);
    return l;
  }
  function linesB(r) {
    var b = S.b, l = [];
    l.push(["Profil \u0219i culoare", r.prof.label + " \u00b7 " + r.tube.name, true]);
    l.push(["Lungime \u00d7 \u00een\u0103l\u021bime", num(b.l) + " \u00d7 " + num(r.H) + " mm", false]);
    l.push(["Num\u0103r de tuburi", r.n + " buc \u00b7 fa\u021ba " + r.face + " mm", true]);
    l.push(["Rost real \u00eentre tuburi", num(r.gap, 1) + " mm", true]);
    l.push(["Tuburi pe metru liniar", num(r.perMeter, 1) + " buc/ml", false]);
    l.push(["Bare de comandat", r.cut.bars + " \u00d7 " + num(r.prof.len / 1000, 1) + " m" + (r.cut.per > 1 ? " \u00b7 " + r.cut.per + " buc\u0103\u021bi/bar\u0103" : ""), true]);
    if (r.sup) l.push(["Suporturi", r.supQty + " buc \u00b7 " + r.sup.r.name, false]);
    l.push(["Acoperire vizual\u0103", num(r.cover) + "% plin", false]);
    if (!isNaN(r.weight)) l.push(["Greutate tuburi", num(r.weight) + " kg", false]);
    l.push(["Pre\u021b pe metru liniar", money(r.perMl) + " RON", true]);
    return l;
  }
  function itemsHtml(r) {
    return map(r.items, function (it) {
      return '<li><a href="' + esc(it.r.url) + '"><span>' + it.q + " \u00d7 " + esc(it.r.full) + (it.pct ? ' <em>\u2212' + it.pct + "%</em>" : "") +
        "</span><span>" + money(it.net) + " RON</span></a></li>";
    }).join("");
  }
  function chipsFor(r) {
    var c = [];
    if (r.mode === "a") {
      var a = S.a;
      c.push(["chip", num(r.B.net, 2) + " m\u00b2"]);
      c.push(["chip", r.B.order + " pl\u0103ci"]);
      c.push(["chip", r.batBars + " grinzi"]);
      c.push(["chip", (a.or === "v" ? "vertical" : "orizontal")]);
      if (r.alt.order < r.B.order) c.push(["warn", (a.or === "v" ? "Orizontal" : "Vertical") + ": " + r.alt.order + " pl\u0103ci (\u2212" + (r.B.order - r.alt.order) + ")"]);
      if (r.joints) c.push(["warn", "Peste 2,9 m \u2014 \u00eembin\u0103ri decalate, pe grind\u0103"]);
      if (a.op > r.B.gross * 0.9) c.push(["warn", "Golurile dep\u0103\u0219esc suprafa\u021ba"]);
    } else {
      var b = S.b;
      c.push(["chip", r.n + " tuburi"]);
      c.push(["chip", "rost " + num(r.gap, 1) + " mm"]);
      c.push(["chip", num(r.perMeter, 1) + " buc/ml"]);
      if (r.tooTall) c.push(["warn", "Max. " + num(r.hMax) + " mm pentru acest profil"]);
      if (r.H > 2000) c.push(["warn", "Peste 2 m \u2014 prinde tubul \u0219i la mijloc (la 1\u20131,2 m)"]);
      if (b.st !== "none" && !r.sup) c.push(["warn", "Suport la cerere pentru acest profil"]);
      if (r.sup && !r.sup.match) c.push(["warn", "Suport disponibil doar " + r.sup.r.fam]);
    }
    if (r.mode === "a" ? r.B.order < 2 : r.cut.bars < 2) c.push(["warn", "Minim 2 buc. pentru curier"]);
    return c;
  }
  function waText(r, lines) {
    var t = ["Bun\u0103 ziua! Am folosit calculatorul de riflaj WPC de pe site.", "", "CONFIGURA\u021aIA MEA:"];
    t.push("\u2022 Tip: " + (r.mode === "a" ? "placare perete / fa\u021bad\u0103" : "perete desp\u0103r\u021bitor din tub"));
    if (r.mode === "a") t.push("\u2022 Perete: " + num(S.a.w) + " \u00d7 " + num(S.a.h) + " mm");
    each(lines, function (x) { t.push("\u2022 " + x[0] + ": " + x[1]); });
    t.push(""); t.push("PRODUSE:");
    each(r.items, function (it) { t.push("\u2022 " + it.q + " \u00d7 " + it.r.full + " = " + money(it.net) + " RON"); });
    t.push("\u2022 TOTAL ESTIMAT: " + money(r.total) + " RON cu TVA");
    t.push(""); t.push("Link configura\u021bie: " + shareUrl());
    t.push(""); t.push("V\u0103 rog o ofert\u0103 complet\u0103, cu transport. Mul\u021bumesc!");
    return t.join("\n");
  }
  var LAST = null;
  function update() {
    var r = compute(); LAST = r;
    draw(r);
    var lines = r.mode === "a" ? linesA(r) : linesB(r);
    $("vdRTotal").textContent = money(r.total);
    $("vdRSave").innerHTML = r.saved > 0.004 ? '<span class="vd-strike">' + money(r.gross) + ' RON</span> <span class="vd-savings">reducere de cantitate \u00b7 economise\u0219ti ' + money(r.saved) + " RON</span>" : "";
    $("vdRLinesOut").innerHTML = map(lines, function (x) { return "<li" + (x[2] ? ' class="is-em"' : "") + "><span>" + esc(x[0]) + "</span><span>" + esc(x[1]) + "</span></li>"; }).join("");
    $("vdRItems").innerHTML = itemsHtml(r);
    $("vdRChips").innerHTML = map(chipsFor(r), function (c) { return '<span class="vd-chip' + (c[0] === "warn" ? " is-warn" : "") + '">' + esc(c[1]) + "</span>"; }).join("");
    var main = r.items[0];
    var wa = encodeURIComponent(waText(r, lines));
    $("vdRCta").innerHTML = '<a class="vd-btn vd-btn-primary" href="' + esc(main.r.url) + '"><span>Comand\u0103 ' + main.q + " buc \u00b7 " + esc(main.r.name) +
      "<small>Adaug\u0103 cantitatea \u00een co\u0219; accesoriile se comand\u0103 din lista de mai sus</small></span><i>" + ARROW + "</i></a>" +
      '<a class="vd-btn vd-btn-ghost" href="https://wa.me/40747127292?text=' + wa + '"><span>Trimite configura\u021bia pe WhatsApp<small>Cu toate cantit\u0103\u021bile \u0219i linkul de mai sus</small></span><i>' + ARROW + "</i></a>";
    var dt = $("vdRDockTotal");
    if (dt) {
      dt.textContent = money(r.total);
      $("vdRDockSub").textContent = r.mode === "a" ? r.B.order + " pl\u0103ci \u00b7 " + r.batBars + " grinzi \u00b7 " + num(r.B.net, 1) + " m\u00b2" : r.n + " tuburi \u00b7 rost " + num(r.gap, 0) + " mm";
      $("vdRDockCta").href = main.r.url;
    }
    scheduleUrl();
  }

  /* ---------------- stare in URL ---------------- */
  var urlReady = false, urlTimer = null, blockUrl = false;
  function dirty() { urlReady = true; }
  function params(withTest) {
    var p = new URLSearchParams();
    if (withTest && /[?&]vdtest=1/.test(location.search)) p.set("vdtest", "1");
    p.set("m", S.mode);
    if (S.mode === "a") {
      var a = S.a;
      p.set("ln", a.line); p.set("c", a.c); p.set("w", a.w); p.set("h", a.h); p.set("o", a.or); p.set("sp", a.sp); p.set("rs", a.rs);
      if (a.op) p.set("op", a.op); if (a.co) p.set("co", a.co); if (a.tr) p.set("tr", a.tr);
    } else {
      var b = S.b;
      p.set("pf", b.pf); p.set("c", b.c); p.set("l", b.l); p.set("h", b.h); p.set("g", b.g); p.set("n", b.n); p.set("e", b.e); p.set("f", b.f); p.set("st", b.st);
    }
    return p;
  }
  function scheduleUrl() {
    if (!urlReady || blockUrl || !window.history || !history.replaceState) return;
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
    function flt(k, lo, hi, cb) { var v = parseFloat(p.get(k)); if (!isNaN(v)) cb(clamp(v, lo, hi)); }
    if (p.get("m") === "a" || p.get("m") === "b") S.mode = p.get("m");
    if (S.mode === "a") {
      var a = S.a, ln = p.get("ln");
      each(LINES, function (l) { if (l.id === ln) a.line = ln; });
      var c = p.get("c"); if (c && BY[c] && BY[c].kind === "board" && BY[c].line === a.line) a.c = c;
      int("w", LIM.w[0], LIM.w[1], function (v) { a.w = v; });
      int("h", LIM.h[0], LIM.h[1], function (v) { a.h = v; });
      if (p.get("o") === "v" || p.get("o") === "h") a.or = p.get("o");
      int("sp", 0, 999, function (v) { if (SP_OPTS.indexOf(v) > -1) a.sp = v; });
      int("rs", 0, 99, function (v) { if (RS_OPTS.indexOf(v) > -1) a.rs = v; });
      flt("op", LIM.op[0], LIM.op[1], function (v) { a.op = v; });
      int("co", LIM.co[0], LIM.co[1], function (v) { a.co = v; });
      flt("tr", LIM.tr[0], LIM.tr[1], function (v) { a.tr = v; });
    } else {
      var b = S.b, pf = p.get("pf");
      each(PROFS, function (x) { if (x.id === pf) b.pf = pf; });
      var ct = p.get("c"); if (ct && BY[ct] && BY[ct].kind === "tube" && BY[ct].prof === b.pf) b.c = ct;
      int("l", LIM.l[0], LIM.l[1], function (v) { b.l = v; });
      int("h", LIM.hb[0], LIM.hb[1], function (v) { b.h = v; });
      int("g", 0, 999, function (v) { if (GAP_OPTS.indexOf(v) > -1) b.g = v; });
      int("n", -1, 1, function (v) { b.n = v; });
      if (p.get("e") === "t" || p.get("e") === "g") b.e = p.get("e");
      if (p.get("f") === "w" || p.get("f") === "n") b.f = p.get("f");
      if (["L", "U", "none"].indexOf(p.get("st")) > -1) b.st = p.get("st");
    }
    if (p.get("m")) urlReady = true;
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
  function applyPrices(map) {
    var changed = 0;
    each(ROWS, function (r) {
      var v = map[slug(r.url)];
      if (v === undefined || isNaN(v) || v <= 0) return;
      if (Math.abs(v - r.price) / r.price > 0.3) return;
      if (Math.abs(v - r.price) < 0.005) return;
      r.price = v; r.row.dataset.price = v;
      var p = r.row.querySelector(".vd-p"); if (p) p.textContent = money(v) + " RON";
      var pu = r.row.querySelector(".vd-pu");
      if (pu && r.pu === "m2") pu.textContent = money(v / (r.len / 1000 * (r.cover || 200) / 1000)) + " RON";
      if (pu && r.pu === "ml") pu.textContent = money(v / (r.len / 1000)) + " RON";
      changed++;
    });
    if (changed) {
      renderControls(); update();
      var cap = document.querySelector("#vdRPrices caption");
      if (cap) cap.textContent = "Pre\u021buri cu TVA \u00b7 sincronizate automat " + new Date().toLocaleDateString("ro-RO");
    }
  }
  var CACHE_KEY = "vdRPrices_v1";
  function syncPrices() {
    if (!CAT_URL || !window.fetch || !window.DOMParser) return;
    try {
      var c = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
      if (c && Date.now() - c.t < 12e5) { applyPrices(c.p); return; }
    } catch (e) {}
    var urls = [CAT_URL, CAT_URL + "?p=1", CAT_URL + "?p=2"];
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
    var rows = r.mode === "a" ? linesA(r) : linesB(r);
    var o = [];
    o.push('<svg xmlns="http://www.w3.org/2000/svg" width="794" height="1123" viewBox="0 0 794 1123">');
    o.push('<rect width="794" height="1123" fill="#FFFFFF"/><rect width="794" height="7" fill="' + green + '"/>');
    o.push('<text x="52" y="62" font-family="' + F + '" font-size="20" font-weight="700" fill="' + ink + '">VIVODECOR</text>');
    o.push('<text x="52" y="80" font-family="' + M + '" font-size="9.5" letter-spacing="2" fill="' + tech + '">HOME ' + AMP + 'amp; GARDEN</text>');
    o.push('<text x="742" y="58" text-anchor="end" font-family="' + F + '" font-size="15" font-weight="700" fill="' + ink + '">' +
      (r.mode === "a" ? "Configura\u021bie placare riflaj WPC" : "Configura\u021bie perete din riflaj tub") + "</text>");
    o.push('<text x="742" y="76" text-anchor="end" font-family="' + M + '" font-size="10" fill="' + tech + '">Estimare generat\u0103 la ' + date + "</text>");
    o.push('<line x1="52" y1="95" x2="742" y2="95" stroke="' + line + '"/>');
    o.push('<rect x="52" y="108" width="690" height="250" fill="#FBFAF7" stroke="' + line + '"/>');
    var svg = $("vdRDraw");
    if (svg) {
      var cl = svg.cloneNode(true);
      cl.removeAttribute("id"); cl.removeAttribute("style");
      cl.setAttribute("x", 60); cl.setAttribute("y", 116); cl.setAttribute("width", 674); cl.setAttribute("height", 234);
      o.push(new XMLSerializer().serializeToString(cl));
    }
    var y = 384;
    o.push('<text x="52" y="' + y + '" font-family="' + M + '" font-size="9.5" letter-spacing="2" fill="' + tech + '">CONFIGURA\u021aIA</text>');
    y += 16;
    each(rows, function (x, i) {
      var yy = y + i * 19;
      if (i % 2 === 0) o.push('<rect x="52" y="' + (yy - 13) + '" width="690" height="19" fill="#F6F8F6"/>');
      o.push('<text x="61" y="' + yy + '" font-family="' + F + '" font-size="11" fill="' + soft + '">' + esc(x[0]) + "</text>");
      o.push('<text x="733" y="' + yy + '" text-anchor="end" font-family="' + M + '" font-size="11" font-weight="600" fill="' + ink + '">' + esc(x[1]) + "</text>");
    });
    y += rows.length * 19 + 14;
    o.push('<text x="52" y="' + y + '" font-family="' + M + '" font-size="9.5" letter-spacing="2" fill="' + tech + '">PRODUSE</text>');
    y += 16;
    each(r.items, function (it, i) {
      var yy = y + i * 19;
      var name = it.q + " \u00d7 " + it.r.full + (it.pct ? "  (\u2212" + it.pct + "%)" : "");
      if (name.length > 84) name = name.slice(0, 82) + "\u2026";
      o.push('<text x="61" y="' + yy + '" font-family="' + F + '" font-size="11" fill="' + soft + '">' + esc(name) + "</text>");
      o.push('<text x="733" y="' + yy + '" text-anchor="end" font-family="' + M + '" font-size="11" font-weight="600" fill="' + ink + '">' + money(it.net) + " RON</text>");
    });
    y += r.items.length * 19 + 8;
    o.push('<rect x="52" y="' + y + '" width="690" height="54" fill="' + ink + '" rx="3"/>');
    o.push('<text x="68" y="' + (y + 22) + '" font-family="' + M + '" font-size="9.5" letter-spacing="1.6" fill="#8FA79A">TOTAL ESTIMAT MATERIALE</text>');
    o.push('<text x="68" y="' + (y + 44) + '" font-family="' + M + '" font-size="21" font-weight="700" fill="#FFFFFF">' + money(r.total) + " RON</text>");
    o.push('<text x="726" y="' + (y + 44) + '" text-anchor="end" font-family="' + M + '" font-size="11" fill="#8FA79A">TVA inclus</text>');
    y += 66;
    o.push('<rect x="52" y="' + y + '" width="690" height="42" fill="#E9F2EC" rx="3"/>');
    o.push('<text x="64" y="' + (y + 18) + '" font-family="' + F + '" font-size="10.5" fill="' + green + '">' +
      (r.mode === "a" ? "\u0218uruburile \u0219i diblurile nu sunt incluse. Grinzile se prind la maximum 400 mm ax, cu 20 mm dilatare la margini." :
        "Suporturile se monteaz\u0103 sus \u0219i jos. Peste 2 m, tubul se sprijin\u0103 \u0219i la mijloc (1\u20131,2 m).") + "</text>");
    o.push('<text x="64" y="' + (y + 33) + '" font-family="' + F + '" font-size="10.5" fill="' + green + '">Transportul se oferteaz\u0103 separat. Pre\u021burile din pagina fiec\u0103rui produs sunt cele oficiale.</text>');
    LINK_BOX.y = Math.max(y + 56, 900);
    var ly = LINK_BOX.y;
    o.push('<rect x="52" y="' + ly + '" width="690" height="' + LINK_BOX.h + '" fill="' + green + '" rx="3"/>');
    o.push('<text x="68" y="' + (ly + 21) + '" font-family="' + F + '" font-size="12.5" font-weight="700" fill="#FFFFFF">' + ARROW + "  Apas\u0103 aici ca s\u0103 redeschizi \u0219i s\u0103 modifici aceast\u0103 configura\u021bie</text>");
    o.push('<text x="68" y="' + (ly + 38) + '" font-family="' + F + '" font-size="10" fill="#BFE0CC">Se deschide calculatorul cu toate valorile completate. \u00cel po\u021bi trimite mai departe montatorului.</text>');
    var su = shareUrl().replace(/^https?:\/\//, "");
    if (su.length > 100) su = su.slice(0, 97) + "...";
    o.push('<text x="68" y="' + (ly + 52) + '" font-family="' + M + '" font-size="8.5" fill="#8FC7A5">' + esc(su) + "</text>");
    o.push('<line x1="52" y1="1045" x2="742" y2="1045" stroke="' + line + '"/>');
    o.push('<text x="52" y="1062" font-family="' + F + '" font-size="10.5" font-weight="700" fill="' + ink + '">VIVODECOR \u00b7 SC FIERONART SRL \u00b7 CUI RO 17572384</text>');
    o.push('<text x="52" y="1077" font-family="' + F + '" font-size="10" fill="' + soft + '">Showroom Cluj-Napoca, Str. Fabricii de Zah\u0103r 109, L\u2013V 8:30\u201316:30  \u00b7  Depozit-showroom Rudeni, Chiajna, Ilfov</text>');
    o.push('<text x="52" y="1092" font-family="' + M + '" font-size="10.5" fill="' + ink + '">0747 127 292  \u00b7  0724 604 236  \u00b7  vivodecor.ro</text>');
    o.push('<text x="52" y="1108" font-family="' + F + '" font-size="9" fill="' + tech + '">Estimarea nu constituie ofert\u0103 ferm\u0103. Pre\u021burile afi\u0219ate \u00een pagina fiec\u0103rui produs sunt cele oficiale.</text>');
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
    var btn = $("vdRPdfBtn"), sub = $("vdRPdfSub"); if (!btn) return;
    var orig = sub.textContent;
    btn.addEventListener("click", function () {
      btn.disabled = true; sub.textContent = "Se preg\u0103te\u0219te documentul\u2026";
      var r = compute();
      loadJsPdf().then(function (JsPDF) {
        return svgToJpeg(pdfSvg(r)).then(function (jpg) {
          var doc = new JsPDF({ orientation: "p", unit: "px", format: [794, 1123], hotfixes: ["px_scaling"] });
          doc.addImage(jpg, "JPEG", 0, 0, 794, 1123);
          doc.link(52, LINK_BOX.y, 690, LINK_BOX.h, { url: shareUrl() });
          doc.link(52, 1082, 260, 14, { url: "tel:+40747127292" });
          var nm = r.mode === "a" ? "placare-" + r.board.name + "-" + S.a.w + "x" + S.a.h : "tub-" + r.prof.a + "x" + r.prof.b + "-" + S.b.l + "x" + r.H;
          doc.save("Configuratie-riflaj-WPC-" + nm.replace(/[^A-Za-z0-9]+/g, "-") + ".pdf");
        });
      }).then(function () {
        sub.textContent = "Desc\u0103rcat. Po\u021bi genera altul dup\u0103 ce modifici configura\u021bia.";
        var lead = $("vdRLead"); if (lead && LEAD_URL) lead.hidden = false;
      }).catch(function (e) {
        sub.textContent = "Nu s-a putut genera PDF-ul. Trimite configura\u021bia pe WhatsApp.";
        if (window.console) console.warn("[VIVODECOR riflaj PDF]", e);
      }).then(function () {
        btn.disabled = false;
        setTimeout(function () { if (sub.textContent.indexOf("Desc\u0103rcat") === 0) sub.textContent = orig; }, 9000);
      });
    });
  }

  /* ---------------- cerere de oferta ---------------- */
  function bindLead() {
    var box = $("vdRLead"); if (!box) return;
    var mail = $("vdRLeadMail"), tel = $("vdRLeadPhone"), ok = $("vdRLeadOk"), send = $("vdRLeadSend"), msg = $("vdRLeadMsg");
    function say(t, err) { msg.textContent = t; msg.hidden = false; msg.classList.toggle("is-err", !!err); }
    send.addEventListener("click", function () {
      var em = (mail.value || "").trim();
      if (!(em.length <= 120 && /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,24}$/.test(em))) { say("Adresa de email nu pare valid\u0103.", true); mail.focus(); return; }
      var ph = (tel.value || "").trim(), digits = ph.replace(/\D/g, "");
      if (!(ph.length <= 30 && /^[\d\s.()+\-]+$/.test(ph) && digits.length >= 9 && digits.length <= 15)) { say("Num\u0103rul de telefon nu pare valid. Exemplu: 0722 123 456", true); tel.focus(); return; }
      if (!ok.checked) { say("Bifeaz\u0103 acordul ca s\u0103 putem trimite oferta.", true); return; }
      send.disabled = true; say("Se trimite\u2026");
      var r = compute(), a = S.a, b = S.b;
      var cfg = map(r.items, function (it) { return it.q + " x " + it.r.full; }).join("; ");
      var body = {
        token: LEAD_TOKEN, website: $("vdRLeadWeb").value, email: em, telefon: ph, url: shareUrl(),
        culoare: "[RIFLAJ] " + (r.mode === "a" ? r.line.label + " " + r.board.name : "Tub " + r.prof.label + " " + r.tube.name),
        pretMl: r.items[0].r.price,
        panouri: r.mode === "a" ? r.B.order : r.cut.bars,
        deschidere_mm: r.mode === "a" ? a.w : b.l,
        inaltime_dorita_mm: r.mode === "a" ? a.h : b.h,
        inaltime_reala_mm: r.mode === "a" ? a.h : r.H,
        randuri: r.mode === "a" ? r.B.count : r.n,
        distanta_sipci_mm: r.mode === "a" ? 0 : Math.round(r.gap),
        distantiere_capat_buc: 0,
        lungime_gard_m: +((r.mode === "a" ? a.w : b.l) / 1000).toFixed(2),
        suprafata_mp: +(r.mode === "a" ? r.B.net : r.area).toFixed(2),
        necesar_ml: +(r.mode === "a" ? r.B.order * 2.9 : r.cut.bars * r.prof.len / 1000).toFixed(2),
        total_ron: +r.total.toFixed(2),
        cere_cadre: false, cere_stalpi: false,
        calculator: "riflaj", configuratie: cfg,
        data: new Date().toISOString()
      };
      fetch(LEAD_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body) })
        .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.text(); })
        .then(function (t) { var good = false; try { good = JSON.parse(t).ok === true; } catch (e) {} if (!good) throw new Error("respins de server"); })
        .then(function () {
          box.innerHTML = '<p class="vd-lead-t">Mul\u021bumim! Am primit cererea.</p><p class="vd-lead-s">Un coleg verific\u0103 configura\u021bia \u0219i \u00ee\u021bi trimite oferta complet\u0103 pe ' + esc(em) + " sau te sun\u0103 la " + esc(ph) + ". Dac\u0103 e urgent, sun\u0103 tu la 0747 127 292.</p>";
        }).catch(function (e) {
          send.disabled = false; say("Nu s-a putut trimite. \u00cencearc\u0103 pe WhatsApp sau la 0747 127 292.", true);
          if (window.console) console.warn("[VIVODECOR riflaj lead]", e);
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
      if (e.id === "vdR" || (e.closest && e.closest("#vdR"))) continue;
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
      if (e.id === "vdRDock" || e.id === "vdR") continue;
      if (e.closest && (e.closest("#vdRDock") || e.closest("#vdR"))) continue;
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
    var dock = $("vdRDock"), res = $("vdRResult");
    if (dock && res && "IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { dock.classList.toggle("is-off", en[0].isIntersecting); }, { threshold: 0.18 }).observe(res);
    }
    var mob = isMobile(), rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { headMax = 0; measureHead(); measureDock(); if (isMobile() !== mob) { mob = isMobile(); update(); } }, 200);
    });
    window.addEventListener("orientationchange", function () { setTimeout(update, 220); });
    var raf = 0;
    window.addEventListener("scroll", function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = 0; measureHead(); measureDock(); });
    }, { passive: true });
    measureHead(); measureDock();
    each([400, 900, 1800], function (t) { setTimeout(function () { measureHead(); measureDock(); }, t); });
  }

  function injectLd() {
    if ($("vdRLdJson")) return;
    var s = document.createElement("script");
    s.type = "application/ld+json"; s.id = "vdRLdJson";
    s.textContent = JSON.stringify(LDJSON);
    (document.head || document.body).appendChild(s);
  }

  /* ---------------- pornire ---------------- */
  function start() {
    var root = $("vdR");
    if (!root || root.getAttribute("data-ready")) return;
    readRows(); readMeta();
    each(ROWS, function (r) {
      if (!r.len) r.len = r.kind === "tube" ? profOf(r.prof).len : r.kind === "batten" ? 3000 : 2900;
    });
    if (!ROWS.length || !LINES.length || !PROFS.length) return;
    root.setAttribute("data-ready", "1");
    injectLd();
    fixCanonical();
    readUrl();
    curBoard(); curTube();
    fillInputs();
    bindNum("vdRW", "vdRFieldW", function () { return S.a.w; }, function (v) { S.a.w = v; }, LIM.w[0], function () { return LIM.w[1]; });
    bindNum("vdRH", "vdRFieldH", function () { return S.a.h; }, function (v) { S.a.h = v; }, LIM.h[0], function () { return LIM.h[1]; });
    bindNum("vdROp", "vdRFieldOp", function () { return S.a.op; }, function (v) { S.a.op = v; }, 0, function () { return Math.floor(S.a.w * S.a.h / 1e6 * 0.9 * 100) / 100; }, true);
    bindNum("vdRCo", null, function () { return S.a.co; }, function (v) { S.a.co = v; }, LIM.co[0], function () { return LIM.co[1]; });
    bindNum("vdRTr", null, function () { return S.a.tr; }, function (v) { S.a.tr = v; }, LIM.tr[0], function () { return LIM.tr[1]; }, true);
    bindNum("vdRL", "vdRFieldL", function () { return S.b.l; }, function (v) { S.b.l = v; }, LIM.l[0], function () { return LIM.l[1]; });
    bindNum("vdRHB", "vdRFieldHB", function () { return S.b.h; }, function (v) { S.b.h = v; }, LIM.hb[0], function () { return profOf(S.b.pf).len; });
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
    if ($("vdR") && $("vdRPrices") && $("vdRDraw")) { try { start(); } catch (e) { if (window.console) console.warn("[VIVODECOR riflaj] eroare:", e); } return; }
    if (++tries > 80) return;
    setTimeout(wait, 150);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wait); else wait();
})();
