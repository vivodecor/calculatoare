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
  var LDJSON = {"@context": "https://schema.org", "@graph": [{"@type": "WebApplication", "@id": "https://www.vivodecor.ro/calculator-riflaj-wpc#app", "name": "Calculator riflaj WPC exterior \u2014 pl\u0103ci, grinzi de montaj \u0219i pre\u021b", "url": "https://www.vivodecor.ro/calculator-riflaj-wpc", "applicationCategory": "BusinessApplication", "operatingSystem": "Web", "inLanguage": "ro-RO", "description": "Calculeaz\u0103 c\u00e2te pl\u0103ci de riflaj WPC 219 \u00d7 26 mm de 2,9 m (1,7 pl\u0103ci pe m\u00b2) \u0219i c\u00e2te grinzi de montaj sunt necesare pentru placarea unui perete sau a unei fa\u021bade, cu pre\u021buri cu TVA.", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "RON"}, "publisher": {"@type": "Organization", "name": "VIVODECOR", "url": "https://www.vivodecor.ro"}}, {"@type": "FAQPage", "inLanguage": "ro-RO", "mainEntity": [{"@type": "Question", "name": "C\u00e2te pl\u0103ci de riflaj WPC intr\u0103 pe un metru p\u0103trat?", "acceptedAnswer": {"@type": "Answer", "text": "1,7 pl\u0103ci de 219 \u00d7 26 mm \u00d7 2,9 m pe m\u00b2, adic\u0103 5 metri liniari, pentru c\u0103 o plac\u0103 acoper\u0103 200 mm dup\u0103 \u00eembinare. Pentru 10 m\u00b2 sunt necesare 17 pl\u0103ci, pentru 20 m\u00b2 34 de pl\u0103ci, pentru 30 m\u00b2 51 de pl\u0103ci."}}, {"@type": "Question", "name": "Montez riflajul WPC pe vertical sau pe orizontal?", "acceptedAnswer": {"@type": "Answer", "text": "Ambele variante folosesc aceea\u0219i cantitate de pl\u0103ci, 1,7 pe m\u00b2. Alegerea \u021bine de aspect: vertical \u00eenal\u021b\u0103 vizual peretele, orizontal \u00eel l\u0103rge\u0219te. Grinzile de montaj se pun perpendicular pe pl\u0103ci: orizontal la montaj vertical \u0219i vertical la montaj orizontal."}}, {"@type": "Question", "name": "La ce distan\u021b\u0103 se monteaz\u0103 grinzile pentru riflaj WPC?", "acceptedAnswer": {"@type": "Answer", "text": "La cel mult 400 mm pe ax, perpendicular pe direc\u021bia pl\u0103cilor. Calculatorul folose\u0219te implicit 300 mm, ceea ce \u00eenseamn\u0103 aproximativ 3,8 metri liniari de grind\u0103 40 \u00d7 30 mm pe m\u00b2 de perete, apropiat de consumul de 4 ml/m\u00b2 din fi\u0219a produsului. La 400 mm, consumul scade la aproximativ 3,1 ml/m\u00b2."}}, {"@type": "Question", "name": "C\u00e2t cost\u0103 riflajul WPC pe m\u00b2 cu tot cu grinzile de montaj?", "acceptedAnswer": {"@type": "Answer", "text": "La pre\u021burile din 20 septembrie 2026, un perete de 4 \u00d7 2,5 m (10 m\u00b2) cu 17 pl\u0103ci clasice \u0219i 15 grinzi de montaj cost\u0103 2.925,16 RON, adic\u0103 292,52 RON/m\u00b2 cu TVA; cu placa co-extrudat\u0103 219 \u00d7 26 mm, de la 3.229,80 RON (322,98 RON/m\u00b2). Transportul se adaug\u0103 separat."}}, {"@type": "Question", "name": "Pot monta riflajul WPC f\u0103r\u0103 grinzi de montaj?", "acceptedAnswer": {"@type": "Answer", "text": "Da, dac\u0103 peretele are deja o structur\u0103 din lemn sau metal cu elementele la cel mult 400 mm pe ax: pl\u0103cile se prind direct pe ea, perpendicular pe elemente, cu 20 mm dilatare pe toate laturile. Riflajul nu se lipe\u0219te \u0219i nu se prinde direct \u00een zid\u0103rie. Calculatorul porne\u0219te implicit cu op\u021biunea \u201eF\u0103r\u0103 grinzi\u201d, care calculeaz\u0103 doar pl\u0103cile; \u201eCu grinzi de montaj\u201d adaug\u0103 \u0219i grinzile WPC 40 \u00d7 30 mm."}}, {"@type": "Question", "name": "Pre\u021bul din calculator include TVA \u0219i accesoriile?", "acceptedAnswer": {"@type": "Answer", "text": "Da, toate pre\u021burile sunt cu TVA. Totalul include pl\u0103cile \u0219i, dac\u0103 le alegi, grinzile de montaj, cu reducerile de cantitate unde se aplic\u0103. Col\u021barele, profilele de finisaj \u0219i transportul nu sunt incluse. Pre\u021bul din pagina fiec\u0103rui produs r\u0103m\u00e2ne cel oficial."}}]}, {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Acas\u0103", "item": "https://www.vivodecor.ro/"}, {"@type": "ListItem", "position": 2, "name": "Riflaj WPC", "item": "https://www.vivodecor.ro/riflaj-wpc"}, {"@type": "ListItem", "position": 3, "name": "Calculator riflaj WPC", "item": "https://www.vivodecor.ro/calculator-riflaj-wpc"}]}]};

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
        sup: (d.sup || "").split(" "), st: d.st || "", pu: pu, nosync: d.nosync === "1", profile: d.profile || "p219", row: r
      };
      if (!isNaN(o.price) && o.price > 0) { ROWS.push(o); BY[o.id] = o; }
    });
  }
  function rowsWhere(fn) { var o = []; each(ROWS, function (r) { if (fn(r)) o.push(r); }); return o; }
  function tierPct(item, q) {
    for (var i = 0; i < item.tiers.length; i++) if (q >= item.tiers[i].min) return item.tiers[i].pct;
    return 0;
  }

  var LINES = [];
  function readMeta() {
    LINES = [];
    each(document.querySelectorAll("#vdRLines [data-line]"), function (el) {
      LINES.push({ id: el.getAttribute("data-line"), label: el.getAttribute("data-label"), full: el.getAttribute("data-full") });
    });
  }
  function lineOf(id) { for (var i = 0; i < LINES.length; i++) if (LINES[i].id === id) return LINES[i]; return LINES[0]; }

  /* ---------------- stare ---------------- */
  var S = { line: "clasic", c: "", w: 4000, h: 2900, or: "v", sp: 300, bt: 0 };
  var LIM = { w: [500, 40000], h: [300, 12000] };
  var SP_OPTS = [300, 400];

  function boardsOfLine(l) { return rowsWhere(function (r) { return r.kind === "board" && r.line === l; }); }
  function curBoard() {
    var list = boardsOfLine(S.line);
    for (var i = 0; i < list.length; i++) if (list[i].id === S.c) return list[i];
    S.c = list[0].id; return list[0];
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
  function item(r, q, note) {
    var pct = tierPct(r, q);
    var gross = q * r.price;
    return { r: r, q: q, pct: pct, gross: gross, net: gross * (1 - pct / 100), note: note || "" };
  }
  /* Consum de placi: 1,7 placi de 2,9 m pe m2 (5 ml/m2), ca in descrierea produselor:
     10 m2 = 17 placi. Se rotunjeste in sus. */
  var PER_M2 = 1.7;
  function geom(orient) {
    var vert = orient === "v";
    var L = vert ? S.h : S.w, cross = vert ? S.w : S.h;
    var nB = Math.ceil(L / S.sp) + 1;
    var reg = [];
    for (var k = 0; k < nB; k++) reg.push(k === 0 ? 20 : k === nB - 1 ? L - 20 : k * S.sp);
    return { vert: vert, L: L, cross: cross, nB: nB, reg: reg };
  }
  function batPieces(lines, len, bl) {
    var bp = [];
    for (var i = 0; i < lines; i++) { var rest = len; while (rest > bl) { bp.push(bl); rest -= bl; } bp.push(rest); }
    return bp;
  }
  function compute() {
    var board = curBoard(), G = geom(S.or), cover = board.cover || 200, bat = BY[BAT_ID];
    var laneW = G.vert ? S.w - 2 * EDGE : S.h - 2 * EDGE;
    var count = Math.ceil(Math.max(cover, laneW) / cover);
    var gross = S.w * S.h / 1e6, net = gross, ratio = 1;
    var order = Math.max(2, Math.ceil(net * PER_M2 - 1e-9));
    var useBat = !!(S.bt && bat);
    var batBars = useBat ? pack(batPieces(G.nB, G.cross, bat.len), bat.len) : 0;
    var items = [item(board, order)];
    if (useBat) items.push(item(bat, batBars));
    var total = 0, grossP = 0;
    each(items, function (it) { total += it.net; grossP += it.gross; });
    var B = { G: G, cover: cover, count: count, gross: gross, net: net, ratio: ratio, order: order };
    return {
      board: board, line: lineOf(S.line), B: B, nB: G.nB, useBat: useBat, batBars: batBars, batMl: G.nB * G.cross / 1000,
      items: items, total: total, gross: grossP, saved: grossP - total,
      perM2: net > 0 ? total / net : 0,
      weight: isNaN(board.kg) ? NaN : order * board.kg
    };
  }

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
  /* ---- textura riflajului (04.10.2026, refacuta dupa fotografiile de pe vivodecor.ro) ----
     Se genereaza o imagine (canvas) cu 4 placi x 1,2 m, folosita ca model repetat pe perete:
     - forma: profilul p219 (4 nervuri egale, canal 13,5 mm la fiecare 50 mm, fisa tehnica) sau
       p220 (co-extrudat Gri Antracit / Maro Alun: nervuri inguste si late alternativ, canale ~11 mm,
       centrele la 0/37/114/149 mm pe placa, masurat pe pozele clientilor);
     - canal: perete in umbra, fund intunecat, perete luminat (lumina din stanga-sus);
     - nervura: muchii usor rotunjite, lucire laterala, fibra fina periata (pete scurte) + dungi
       largi; la co-extrudat nuante diferite pe nervuri si dungi calde (doar la maro/bej);
     - culoare: mai luminoasa la culorile inchise (lumina de zi), saturata usor la cele terne.
     Imaginea se calculeaza o data pe culoare si se tine in memorie. Daca browserul nu are
     canvas (ex. testele jsdom), desenul foloseste culoarea medie. ---- */
  var PROFILES = {
    p219: { grooves: [[0, 13.5], [50, 13.5], [100, 13.5], [150, 13.5]], shadowW: 0.26, litW: 0.30, dark: 0.70 },
    p220: { grooves: [[-5.5, 11], [31.5, 11], [108.5, 11], [143.5, 11]], shadowW: 0.34, litW: 0.12, dark: 0.72 }
  };
  function darken(hex, k) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex); if (!m) return hex;
    var n = parseInt(m[1], 16), out = "#";
    each([16, 8, 0], function (sh) { out += ("0" + Math.round(((n >> sh) & 255) * (1 - k)).toString(16)).slice(-2); });
    return out;
  }
  function seedOf(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function hash3(x, y, s) {
    var h = (x * 374761393 + y * 668265263 + s * 2147483647) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177); h = h ^ (h >>> 16);
    return (h >>> 0) / 4294967296;
  }
  /* zgomot periodic pe ambele axe (perioada px, py celule): textura se repeta fara cusatura */
  function pnoise(x, y, s, px, py) {
    var xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    var x0 = ((xi % px) + px) % px, x1 = (x0 + 1) % px, y0 = ((yi % py) + py) % py, y1 = (y0 + 1) % py;
    var a = hash3(x0, y0, s), b = hash3(x1, y0, s), c = hash3(x0, y1, s), d = hash3(x1, y1, s);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  var TEX_CACHE = {};
  function riflajTexture(b, k) {
    var key = b.id + "|" + k;
    if (TEX_CACHE[key] !== undefined) return TEX_CACHE[key];
    var TW = 800, TH = 1200, W = Math.round(TW * k), H = Math.round(TH * k), cv, ctx;
    try { cv = document.createElement("canvas"); cv.width = W; cv.height = H; ctx = cv.getContext("2d"); } catch (e) { ctx = null; }
    if (!ctx || !ctx.createImageData) { TEX_CACHE[key] = null; return null; }
    var prof = PROFILES[b.profile] || PROFILES.p219, coex = (b.line || "").indexOf("cox") === 0, seed = seedOf(b.id);
    var m0 = /^#?([0-9a-f]{6})$/i.exec(b.hex), n0 = parseInt(m0 ? m0[1] : "8A7A6A", 16);
    var b0 = [(n0 >> 16) & 255, (n0 >> 8) & 255, n0 & 255], gray = (b0[0] + b0[1] + b0[2]) / 3;
    var chroma = (Math.max(b0[0], b0[1], b0[2]) - Math.min(b0[0], b0[1], b0[2])) / 255, sat = chroma > 0.25 ? 1 : 1.1;
    var base = [gray + (b0[0] - gray) * sat, gray + (b0[1] - gray) * sat, gray + (b0[2] - gray) * sat];
    var bright = 1 + 0.24 * Math.max(0, 1 - gray / 150), warm = Math.max(0, Math.min(1, (b0[0] - b0[2]) / 60));
    var warmK = Math.max(0, Math.min(1, (b0[0] - b0[2]) / 50));
    var A = coex ? 0.07 : 0.035, ribTk = coex ? 0.02 + 0.045 * warmK : 0.025;
    /* segmentele unei placi de 200 mm: canalele din profil si nervurile dintre ele */
    var gl = map(prof.grooves, function (q) { var s0 = ((q[0] % 200) + 200) % 200; return [s0, s0 + q[1]]; }).sort(function (p1, p2) { return p1[0] - p2[0]; });
    var segs = [], g, px, py;
    for (g = 0; g < gl.length; g++) { segs.push([gl[g][0], gl[g][1], 1, g]); segs.push([gl[g][1], g + 1 < gl.length ? gl[g + 1][0] : gl[0][0] + 200, 0, g]); }
    var cT = new Int8Array(W), cU = new Float32Array(W), cW = new Float32Array(W), cR = new Int32Array(W);
    for (px = 0; px < W; px++) {
      var x = (px + 0.5) / k, bd = Math.floor(x / 200), bx = x - bd * 200;
      if (bx < segs[0][0]) { bx += 200; bd -= 1; }
      for (var si = 0; si < segs.length; si++) {
        var sg = segs[si];
        if (bx >= sg[0] && bx < sg[1]) { cT[px] = sg[2]; cU[px] = (bx - sg[0]) / (sg[1] - sg[0]); cW[px] = sg[1] - sg[0]; cR[px] = bd * 8 + sg[3]; break; }
      }
    }
    var tones = {};
    function tone(id) { if (tones[id] === undefined) tones[id] = hash3(id, 11, seed) - 0.5; return tones[id]; }
    var pFX = Math.round(TW / 0.5), pFY = Math.round(TH / 22), pBX = Math.round(TW / 5), pBY = Math.max(1, Math.round(TH / 520)), pWX = Math.round(TW / 40), pWY = Math.max(1, Math.round(TH / 700));
    var fX = TW / pFX, fY = TH / pFY, bX = TW / pBX, bY = TH / pBY, wX = TW / pWX, wY = TH / pWY;
    var img = ctx.createImageData(W, H), d = img.data, dk = prof.dark, lit = 0.40, shW = prof.shadowW, ltW = prof.litW;
    for (py = 0; py < H; py++) {
      var y = py / k;
      for (px = 0; px < W; px++) {
        var xx = px / k, i = (py * W + px) * 4, m;
        var wob = (pnoise(xx / wX, y / wY, seed + 5, pWX, pWY) - 0.5) * 2.2;
        /* fiecare coloana a fibrei fine are grila decalata pe inaltime: fara decalaj, celulele
           zgomotului se aliniaza si de departe apar randuri orizontale ondulate */
        var fx = (xx + wob) / fX, nf = pnoise(fx, y / fY + hash3(Math.floor(fx), 7, seed) * 7.3, seed, pFX, pFY);
        var nb = pnoise((xx + wob) / bX, y / bY + hash3(Math.floor((xx + wob) / bX), 9, seed) * 3.1, seed + 3, pBX, pBY);
        var grain = (nf > 0.62 ? (nf - 0.62) * 2.6 : (nf - 0.62) * 0.35) + (nb - 0.5) * 0.35;
        if (cT[px] === 1) {
          var u = cU[px];
          if (u < shW) m = 1 - (dk + 0.08);
          else if (u > 1 - ltW) m = 1 - (dk - (dk - lit) * Math.pow((u - (1 - ltW)) / ltW, 0.7));
          else m = 1 - dk;
          m *= 1 + grain * A * 0.6;
        } else {
          var vv = cU[px], e = 1.6 / cW[px];
          m = bright * (1 + 0.08 * (0.5 - vv));
          if (vv < e) m += 0.07 * (1 - vv / e);
          if (vv > 1 - e) m -= 0.09 * ((vv - (1 - e)) / e);
          m *= 1 + tone(cR[px]) * ribTk * 2 + grain * A;
        }
        var r = base[0] * m, gg = base[1] * m, bb = base[2] * m;
        if (coex && cT[px] === 0) {
          var st = (nb - 0.5) * 0.06;
          r += 255 * st * (0.6 + 0.3 * warm); gg += 255 * st * (0.6 - 0.05 * warm); bb += 255 * st * (0.6 - 0.35 * warm);
        }
        d[i] = r < 0 ? 0 : r > 255 ? 255 : r; d[i + 1] = gg < 0 ? 0 : gg > 255 ? 255 : gg; d[i + 2] = bb < 0 ? 0 : bb > 255 ? 255 : bb; d[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    var url; try { url = cv.toDataURL("image/jpeg", 0.9); } catch (e2) { url = ""; }
    TEX_CACHE[key] = url ? { url: url, w: TW, h: TH } : null;
    return TEX_CACHE[key];
  }
  function linGrad(defs, id, stops, vertical) {
    var g = el("linearGradient", vertical ? { id: id, x1: "0", y1: "0", x2: "0", y2: "1" } : { id: id, x1: "0", y1: "0", x2: "1", y2: "0" });
    each(stops, function (s) { g.appendChild(el("stop", { offset: s[0], "stop-color": s[1], "stop-opacity": s[2] === undefined ? 1 : s[2] })); });
    defs.appendChild(g);
  }
  /* pune textura in defs (pattern#vdRTex) si intoarce "" ; sau intoarce culoarea medie de folosit
     daca textura nu se poate genera sau ar fi sub ~0,15 px pe canal */
  function riflajDefs(defs, b, vert, W, H, pxPerMm, mob) {
    var avg = darken(b.hex, 0.74 * 13.5 / 50);
    if (13.5 * pxPerMm < 0.15) return avg;
    var t = riflajTexture(b, mob ? 0.9 : 1.25);
    if (!t) return avg;
    var tf = vert ? "translate(" + EDGE + ",0)" : "translate(0," + (H - EDGE) + ") rotate(90)";
    var p = el("pattern", { id: "vdRTex", patternUnits: "userSpaceOnUse", width: t.w, height: t.h, patternTransform: tf });
    var im = el("image", { x: 0, y: 0, width: t.w, height: t.h, preserveAspectRatio: "none" });
    im.setAttribute("href", t.url);
    try { im.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", t.url); } catch (e) {}
    p.appendChild(im); defs.appendChild(p);
    return "";
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
  function draw(res) {
    var svg = $("vdRDraw");
    clearSvg(svg);
    var W = S.w, H = S.h, mob = isMobile();
    var B = res.B, cover = B.cover, vert = S.or === "v";
    var F = frame(W, H, mob, 160), padL = F.padL, padT = F.padT, v = F.v, fs = F.fs, sw = F.sw, fullW = v - padL - 120;
    var leg = [];
    if (res.useBat) leg.push(["b", "grind\u0103 de montaj, la " + S.sp + " mm"]);
    var lf = fs * (mob ? 0.62 : 0.72), lh = lf * 1.8;
    var hv = H + padT + fs * 4.2 + (leg.length ? leg.length * lh + lf * 0.6 : 0);
    svg.setAttribute("viewBox", (-padL) + " " + (-padT) + " " + v + " " + hv);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    var defs = el("defs");
    /* cati pixeli are un mm pe ecran: sub ~1 px pe canal textura s-ar amesteca (moire) */
    var shown = svg.getBoundingClientRect ? svg.getBoundingClientRect().width : 0;
    var flat = riflajDefs(defs, res.board, vert, W, H, (shown > 50 ? shown : (mob ? 340 : 620)) / v, mob);
    linGrad(defs, "vdRLight", [["0%", "#fff", 0.10], ["40%", "#fff", 0], ["100%", "#000", 0.16]], true);
    svg.appendChild(defs);
    var g = el("g"); svg.appendChild(g);
    ground(g, -padL + 40, fullW + 40, H, sw);
    g.appendChild(el("rect", { x: 0, y: 0, width: W, height: H, fill: "#E4E7E3", stroke: "#B9C6BC", "stroke-width": sw }));
    /* placarea: o singura suprafata, cu 20 mm dilatare pe toate laturile */
    var pa = { x: EDGE, y: EDGE, width: W - 2 * EDGE, height: H - 2 * EDGE };
    function paRect(extra) { var a = {}, k; for (k in pa) a[k] = pa[k]; for (k in extra) a[k] = extra[k]; g.appendChild(el("rect", a)); }
    paRect({ fill: flat || "url(#vdRTex)" });
    paRect({ fill: "url(#vdRLight)" });
    paRect({ fill: "none", stroke: darken(res.board.hex, 0.6), "stroke-width": sw * 0.6 });
    /* grinzile de montaj: doar cand sunt incluse in calcul */
    var sp = S.sp, j, runL = vert ? H : W, BC = "#D7E0E6";
    function batLine(pos, wdt) {
      /* grinzile stau in spatele placilor: linie continua, subtire, deschisa, semitransparenta (liniile
         punctate groase se amestecau cu nervurile si de departe dadeau randuri ondulate) */
      var a = { stroke: BC, "stroke-width": sw * wdt, opacity: ".55" };
      if (vert) { a.x1 = 0; a.x2 = W; a.y1 = a.y2 = pos; } else { a.y1 = 0; a.y2 = H; a.x1 = a.x2 = pos; }
      g.appendChild(el("line", a));
    }
    if (res.useBat) {
      each(B.G.reg, function (pos) { batLine(pos, 0.7); });
    }
    var yDim = H + fs * 2.2;
    g.appendChild(el("line", { x1: 0, y1: H, x2: 0, y2: yDim + fs * 0.6, stroke: TECH, "stroke-width": sw * 0.6, "stroke-dasharray": "14 12" }));
    g.appendChild(el("line", { x1: W, y1: H, x2: W, y2: yDim + fs * 0.6, stroke: TECH, "stroke-width": sw * 0.6, "stroke-dasharray": "14 12" }));
    dimH(g, 0, W, yDim, num(W) + " mm", fs, sw);
    dimV(g, -fs * 1.4, 0, H, num(H) + " mm", fs, sw);
    if (!mob) {
      var tx = F.textX;
      callout(g, W - EDGE - cover * 0.5, H * 0.12, tx, res.board.name, fs, sw, "#1E6B45");
      callout(g, W - EDGE * 0.5, H * 0.66, tx, "dilatare 20 mm", fs, sw, "#1E6B45");
      person(g, F.personX, H, fs);
    }
    /* legenda, sub cota de latime */
    var ly0 = yDim + fs * 1.3;
    each(leg, function (L, n) {
      var y = ly0 + n * lh, x0 = 0, x1 = lf * 3.2;
      g.appendChild(el("line", { x1: x0, y1: y - lf * 0.2, x2: x1, y2: y - lf * 0.2, stroke: "#8A98A4", "stroke-width": sw * 0.8 }));
      g.appendChild(el("text", { x: x1 + lf * 0.6, y: y + lf * 0.2, "font-size": lf, fill: "#4A5A52", "font-family": MONO }, L[1]));
    });
    var desc = svg.querySelector("#vdRDrawDesc");
    if (desc) desc.textContent = "Perete de " + num(W) + " \u00d7 " + num(H) + " mm placat " + (vert ? "vertical" : "orizontal") +
      " cu riflaj WPC " + res.board.name.toLowerCase() + ": " + B.count + (vert ? " coloane" : " r\u00e2nduri") +
      " de 200 mm" + (res.useBat ? ", grinzi de montaj la " + sp + " mm" : "") + ".";
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
    seg("vdRLine", map(LINES, function (l) { return l.id; }), function (id) { return esc(lineOf(id).label); },
      function (id) { return S.line === id; }, function (id) { S.line = id; S.c = ""; });
    var board = curBoard();
    swatches("vdRSwA", boardsOfLine(S.line), board.id, "plac\u0103", function (r) { S.c = r.id; });
    seg("vdROrient", ["v", "h"], function (o) { return o === "v" ? "Vertical" : "Orizontal"; },
      function (o) { return S.or === o; }, function (o) { S.or = o; });
    seg("vdRBat", [0, 1], function (b) { return b ? "Cu grinzi de montaj<small>incluse \u00een calcul</small>" : "F\u0103r\u0103 grinzi<small>am deja structura</small>"; },
      function (b) { return S.bt === b; }, function (b) { S.bt = b; });
    seg("vdRSpace", SP_OPTS, function (s) { return s + " mm" + (s === 300 ? " (recomandat)" : " (maxim)"); },
      function (s) { return S.sp === s; }, function (s) { S.sp = s; });
    var sl = $("vdRSpaceLbl");
    if (sl) sl.textContent = S.bt ? "Distan\u021ba dintre grinzile de montaj (pe ax)" : "Distan\u021ba dintre elementele structurii existente (pe ax)";
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
      dirty(); update();
    }
    inp.addEventListener("input", function () { apply(false); });
    inp.addEventListener("blur", function () { apply(true); });
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") inp.blur(); });
  }
  function fillInputs() {
    $("vdRW").value = S.w; $("vdRH").value = S.h;
  }

  /* ---------------- rezultat ---------------- */
  function linesA(r) {
    var B = r.B, l = [];
    l.push(["Tip \u0219i culoare", r.line.label + " \u00b7 " + r.board.name, true]);
    l.push(["Suprafa\u021b\u0103 perete", num(B.gross, 2) + " m\u00b2", false]);
    l.push(["Montaj", (S.or === "v" ? "vertical \u00b7 " + B.count + " coloane" : "orizontal \u00b7 " + B.count + " r\u00e2nduri") + " de 200 mm", false]);
    l.push(["Pl\u0103ci de 2,9 m de comandat", B.order + " buc (1,7 pl\u0103ci/m\u00b2)", true]);
    if (r.useBat) l.push(["Grinzi de montaj " + num(BY[BAT_ID].len / 1000, 1) + " m", r.batBars + " buc \u00b7 " + num(r.batMl, 1) + " ml, " + r.nB + " r\u00e2nduri la " + S.sp + " mm", true]);
    else l.push(["Grinzi de montaj", "nu sunt incluse", false]);
    if (!isNaN(r.weight)) l.push(["Greutate pl\u0103ci", num(r.weight) + " kg", false]);
    l.push(["Pre\u021b pe m\u00b2 placat", money(r.perM2) + " RON", true]);
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
    c.push(["chip", num(r.B.net, 2) + " m\u00b2"]);
    c.push(["chip", r.B.order + " pl\u0103ci"]);
    c.push(["chip", r.useBat ? r.batBars + " grinzi" : "f\u0103r\u0103 grinzi"]);
    c.push(["chip", S.or === "v" ? "vertical" : "orizontal"]);
    if (r.B.order < 2) c.push(["warn", "Minim 2 buc. pentru curier"]);
    return c;
  }
  function waText(r, lines) {
    var t = ["Bun\u0103 ziua! Am folosit calculatorul de riflaj WPC de pe site.", "", "CONFIGURA\u021aIA MEA:"];
    t.push("\u2022 Perete: " + num(S.w) + " \u00d7 " + num(S.h) + " mm");
    each(lines, function (x) { t.push("\u2022 " + x[0] + ": " + x[1]); });
    t.push(""); t.push("PRODUSE:");
    each(r.items, function (it) { t.push("\u2022 " + it.q + " \u00d7 " + it.r.full + " = " + money(it.net) + " RON"); });
    t.push("\u2022 TOTAL ESTIMAT: " + money(r.total) + " RON cu TVA");
    t.push(""); t.push("Link configura\u021bie: " + shareUrl());
    t.push(""); t.push("V\u0103 rog o ofert\u0103 complet\u0103, cu transport. Mul\u021bumesc!");
    return t.join("\n");
  }
  /* pregateste in fundal texturile celorlalte culori din gama aleasa, cate una la ~150 ms,
     ca la primul click pe o culoare desenul sa apara imediat (generarea dureaza ~0,2-0,3 s) */
  var warmLine = "";
  function prewarm() {
    if (warmLine === S.line) return;
    warmLine = S.line;
    var list = boardsOfLine(S.line), k = isMobile() ? 0.9 : 1.25, n = 0;
    (function next() {
      if (n >= list.length || warmLine !== S.line) return;
      riflajTexture(list[n++], k);
      setTimeout(next, 150);
    })();
  }
  function update() {
    var r = compute();
    draw(r);
    var lines = linesA(r);
    $("vdRTotal").textContent = money(r.total);
    $("vdRSave").innerHTML = r.saved > 0.004 ? '<span class="vd-strike">' + money(r.gross) + ' RON</span> <span class="vd-savings">reducere de cantitate \u00b7 economise\u0219ti ' + money(r.saved) + " RON</span>" : "";
    $("vdRLinesOut").innerHTML = map(lines, function (x) { return "<li" + (x[2] ? ' class="is-em"' : "") + "><span>" + esc(x[0]) + "</span><span>" + esc(x[1]) + "</span></li>"; }).join("");
    $("vdRItems").innerHTML = itemsHtml(r);
    $("vdRChips").innerHTML = map(chipsFor(r), function (c) { return '<span class="vd-chip' + (c[0] === "warn" ? " is-warn" : "") + '">' + esc(c[1]) + "</span>"; }).join("");
    var main = r.items[0];
    var wa = encodeURIComponent(waText(r, lines));
    $("vdRCta").innerHTML = '<a class="vd-btn vd-btn-primary" href="' + esc(main.r.url) + '"><span>Comand\u0103 ' + main.q + " buc \u00b7 " + esc(main.r.name) +
      "<small>Adaug\u0103 cantitatea \u00een co\u0219; accesoriile se comand\u0103 din lista de mai sus</small></span><i>" + ARROW + "</i></a>" +
      '<a class="vd-btn vd-btn-ghost" href="https://wa.me/40747127292?text=' + wa + '"><span>Vrei o ofert\u0103 mai bun\u0103? Trimite configura\u021bia pe WhatsApp<small>Cu toate cantit\u0103\u021bile \u0219i linkul de mai sus</small></span><i>' + ARROW + "</i></a>";
    var dt = $("vdRDockTotal");
    if (dt) {
      dt.textContent = money(r.total);
      $("vdRDockSub").textContent = r.B.order + " pl\u0103ci \u00b7 " + (r.useBat ? r.batBars + " grinzi \u00b7 " : "") + num(r.B.net, 1) + " m\u00b2";
      $("vdRDockCta").href = main.r.url;
    }
    scheduleUrl();
    setTimeout(prewarm, 700);
  }

  /* ---------------- stare in URL ---------------- */
  var urlReady = false, urlTimer = null, blockUrl = false;
  function dirty() { urlReady = true; }
  function params(withTest) {
    var p = new URLSearchParams();
    if (withTest && /[?&]vdtest=1/.test(location.search)) p.set("vdtest", "1");
    p.set("ln", S.line); p.set("c", S.c); p.set("w", S.w); p.set("h", S.h); p.set("o", S.or); p.set("sp", S.sp); p.set("bt", S.bt);
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
    var ln = p.get("ln");
    each(LINES, function (l) { if (l.id === ln) S.line = ln; });
    var c = p.get("c"); if (c && BY[c] && BY[c].kind === "board" && BY[c].line === S.line) S.c = c;
    int("w", LIM.w[0], LIM.w[1], function (v) { S.w = v; });
    int("h", LIM.h[0], LIM.h[1], function (v) { S.h = v; });
    if (p.get("o") === "v" || p.get("o") === "h") S.or = p.get("o");
    int("sp", 0, 999, function (v) { if (SP_OPTS.indexOf(v) > -1) S.sp = v; });
    if (p.get("bt") === "0" || p.get("bt") === "1") S.bt = +p.get("bt");
    if (p.get("w") || p.get("ln")) urlReady = true;
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
      /* nosync = produs cu variante de lungime: in categorie apare pretul altei variante */
      if (r.nosync) return;
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
    var rows = linesA(r);
    var o = [];
    o.push('<svg xmlns="http://www.w3.org/2000/svg" width="794" height="1123" viewBox="0 0 794 1123">');
    o.push('<rect width="794" height="1123" fill="#FFFFFF"/><rect width="794" height="7" fill="' + green + '"/>');
    o.push('<text x="52" y="62" font-family="' + F + '" font-size="20" font-weight="700" fill="' + ink + '">VIVODECOR</text>');
    o.push('<text x="52" y="80" font-family="' + M + '" font-size="9.5" letter-spacing="2" fill="' + tech + '">HOME ' + AMP + 'amp; GARDEN</text>');
    o.push('<text x="742" y="58" text-anchor="end" font-family="' + F + '" font-size="15" font-weight="700" fill="' + ink + '">' +
      "Configura\u021bie placare riflaj WPC</text>");
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
      (r.useBat ? "Grinzi la maximum 400 mm ax, 20 mm dilatare pe toate laturile." :
        "Grinzile de montaj nu sunt incluse: pl\u0103cile se prind pe structura existent\u0103, cu \u00eembin\u0103rile pe elementele ei.") + "</text>");
    o.push('<text x="64" y="' + (y + 33) + '" font-family="' + F + '" font-size="10.5" fill="' + green + '">Transportul se oferteaz\u0103 separat. Pre\u021burile din pagina fiec\u0103rui produs sunt cele oficiale.</text>');
    /* coltarele si profilele L nu intra in calcul: le spunem clar si ce are de facut (ca la lambriu) */
    y += 50;
    o.push('<rect x="52" y="' + y + '" width="690" height="42" fill="#FBF1E3" stroke="#E8C79E" rx="3"/>');
    o.push('<text x="64" y="' + (y + 18) + '" font-family="' + F + '" font-size="10.5" font-weight="700" fill="#8A4B0B">Col\u021barele \u0219i profilele L de finisaj nu sunt incluse \u00een aceast\u0103 estimare.</text>');
    o.push('<text x="64" y="' + (y + 33) + '" font-family="' + F + '" font-size="10.5" fill="#8A4B0B">Adaug\u0103-le \u00een co\u0219 din categoria Riflaj WPC sau cere-ne oferta complet\u0103 la 0747 127 292 \u0219i le calcul\u0103m noi.</text>');
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
          var nm = "placare-" + r.board.name + "-" + S.w + "x" + S.h;
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
      var r = compute();
      var cfg = map(r.items, function (it) { return it.q + " x " + it.r.full; }).join("; ");
      var body = {
        token: LEAD_TOKEN, website: $("vdRLeadWeb").value, email: em, telefon: ph, url: shareUrl(),
        culoare: "[RIFLAJ] " + r.line.label + " " + r.board.name,
        pretMl: r.items[0].r.price,
        panouri: r.B.order,
        deschidere_mm: S.w,
        inaltime_dorita_mm: S.h,
        inaltime_reala_mm: S.h,
        randuri: r.B.count,
        distanta_sipci_mm: 0,
        distantiere_capat_buc: 0,
        lungime_gard_m: +(S.w / 1000).toFixed(2),
        suprafata_mp: +r.B.net.toFixed(2),
        necesar_ml: +(r.B.order * 2.9).toFixed(2),
        total_ron: +r.total.toFixed(2),
        cere_cadre: false, cere_stalpi: false,
        calculator: "riflaj", configuratie: cfg + (r.useBat ? "" : "; fara grinzi (structura existenta)"),
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
    each(ROWS, function (r) { if (!r.len) r.len = 2900; });
    if (!ROWS.length || !LINES.length) return;
    root.setAttribute("data-ready", "1");
    injectLd();
    fixCanonical();
    readUrl();
    curBoard();
    fillInputs();
    bindNum("vdRW", "vdRFieldW", function () { return S.w; }, function (v) { S.w = v; }, LIM.w[0], function () { return LIM.w[1]; });
    bindNum("vdRH", "vdRFieldH", function () { return S.h; }, function (v) { S.h = v; }, LIM.h[0], function () { return LIM.h[1]; });
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
