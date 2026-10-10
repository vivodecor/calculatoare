/*! VIVODECOR - Calculator Gard WPC v1.0.17 (vd-gard.js) */
(function () {
/* ---- textura sipcii de gard (04.10.2026, dupa fotografiile de pe vivodecor.ro) ----
   O imagine (canvas -> JPEG) cu 4 sipci de 150 mm, una sub alta, lungi de TW mm; fiecare sipca din
   desen ia una din cele 4 benzi, cu alt decalaj pe lungime (model repetat pe fiecare sipca).
   - "3D lemn" (Maro, Gri Antracit, Bej): fibra in relief, inele de crestere taiate de fata placii
     (catedrale), linii fine si inchise, plus fibra periata si dungi largi foarte discrete;
   - "Dungi": canale de ~2 mm la pas de 5,3 mm, pe lungime, cu 3 mm netezi la margini (masurat pe
     poza de produs cu cota de 150 mm); peretele de sus al canalului in umbra, cel de jos luminat;
   - "cu imbinare": fata periata fin, fara spatii; la marginea de sus linia inchisa a imbinarii;
   - muchii usor rotunjite: lumina pe muchia de sus, umbra pe cea de jos; nuanta usor diferita pe
     fiecare sipca; culorile inchise putin luminate (lumina de zi).
   Zgomotul e periodic pe ambele axe (fara cusatura) si grila lui e decalata pe fiecare coloana
   (altfel, de departe, apar randuri/valuri). Imaginea se calculeaza o data pe culoare.
   Fara canvas (teste jsdom) -> null, iar desenul foloseste culoarea medie. ---- */
var GT_W = 2600, GT_SH = 150, GT_N = 4, GT_CACHE = {}, GT_FP = 1;
function gtRgb(h) {
  var m = /^#?([0-9a-f]{6})$/i.exec(h || ""), n = parseInt(m ? m[1] : "7A6E62", 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function gtHex(c) {
  return "#" + c.map(function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? "0" : "") + v.toString(16); }).join("");
}
function gtSeed(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function gtHash(x, y, s) {
  var h = (x * 374761393 + y * 668265263 + s * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177); h = h ^ (h >>> 16);
  return (h >>> 0) / 4294967296;
}
/* zgomot periodic (perioada px, py celule) */
function gtNoise(x, y, s, px, py) {
  var xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  var x0 = ((xi % px) + px) % px, x1 = (x0 + 1) % px, y0 = ((yi % py) + py) % py, y1 = (y0 + 1) % py;
  var a = gtHash(x0, y0, s), b = gtHash(x1, y0, s), c = gtHash(x0, y1, s), d = gtHash(x1, y1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
/* culoarea de baza din desen: culorile inchise luminate putin (lumina de zi), cele deschise lasate */
function gtBase(hex) {
  var c = gtRgb(hex), g = (c[0] + c[1] + c[2]) / 3, k = 1 + 0.2 * Math.max(0, 1 - g / 140);
  return [c[0] * k, c[1] * k, c[2] * k];
}
function gtKind(col) { return col.joint ? "j" : col.stripe ? "s" : "w"; }
/* culoarea medie a texturii (fara canvas, sau sipci prea mici pe ecran) */
function gtAvg(col) {
  var b = gtBase(col.hex), f = { w: 0.95, s: 0.84, j: 0.97 }[gtKind(col)];
  return gtHex([b[0] * f, b[1] * f, b[2] * f]);
}
/* profilul sipcii pe latime, la y mm de la muchia de sus: [multiplicator, lumina adaugata] */
function gtProf(kind, y) {
  if (y < 0 || y > GT_SH) return [1, 0];
  var e = 1 + 0.035 * (0.5 - y / GT_SH), lit = 0;
  /* muchii rotunjite: lumina pe muchia de sus, umbra pe cea de jos */
  if (y < 0.6) e *= 0.82; else if (y < 2.2) e *= 1.07;
  if (y > GT_SH - 3.2) e *= 1 - 0.42 * Math.pow((y - (GT_SH - 3.2)) / 3.2, 1.4);
  if (kind === "s") {
    /* canale pe lungime: 3 mm neted la margini, apoi pas 5,3 mm, canal 2 mm (peretele de sus in umbra) */
    var q = y - 3.4;
    if (q > 0 && y < GT_SH - 3.4) {
      var f = (q % 5.3) / 5.3;
      if (f < 2.0 / 5.3) { var u = f / (2.0 / 5.3); e *= u < 0.5 ? 0.38 : u < 0.85 ? 0.48 : 0.72; }
      else { var uu = (f - 2.0 / 5.3) / (1 - 2.0 / 5.3); e *= 1.03 - 0.06 * Math.abs(uu - 0.4); if (uu < 0.15) lit = 0.04; }
    }
  }
  /* imbinarea lamba-uluc: linie inchisa ~2,5 mm sus, apoi muchia luminata a placii */
  if (kind === "j" && y < 4) e = y < 1.2 ? 0.32 : y < 2.5 ? 0.55 : 1.08;
  return [e, lit];
}
function gardTex(col, k, fp) {
  /* fp = cati mm acopera un pixel de pe ecran (aproximativ); profilul se mediaza pe 1,5 x fp */
  fp = fp || 1;
  var key = col.id + "|" + k + "|" + fp, fw = Math.max(1 / k, 1.5 * fp);
  if (GT_CACHE[key] !== undefined) return GT_CACHE[key];
  var W = Math.round(GT_W * k), SH = Math.round(GT_SH * k), H = SH * GT_N, cv, ctx;
  try { cv = document.createElement("canvas"); cv.width = W; cv.height = H; ctx = cv.getContext("2d"); } catch (e) { ctx = null; }
  if (!ctx || !ctx.createImageData) { GT_CACHE[key] = null; return null; }
  var kind = gtKind(col), seed = gtSeed(col.id), base = gtBase(col.hex);
  var gray = (base[0] + base[1] + base[2]) / 3, warm = Math.max(0, Math.min(1, (base[0] - base[2]) / 45));
  /* contrastul fibrei, masurat pe poze: Maro ~-30%, Gri ~-17%, Bej ~-12% (cald + inchis = mai marcat);
     x1,35 pentru ca in poze liniile sunt deja estompate de rezolutie */
  var dark = Math.max(0, Math.min(1, (150 - gray) / 60)), ringA = 1.35 * (0.12 + 0.45 * warm * dark + 0.05 * dark) * (0.7 + 0.3 * dark);
  var img = ctx.createImageData(W, H), d = img.data;
  /* linia fibrei: 0,9 mm jumatate de latime, latita cand pixelul de pe ecran e mai mare (cu contrast
     redus pe masura, ca media sa ramana aceeasi si liniile sa nu se rupa) */
  var lw = Math.max(0.9, 0.5 * fw), lk = Math.min(1, 0.9 / lw);
  /* perioade (in celule) pentru zgomot: toate divid exact latimea, deci textura se repeta fara cusatura */
  var pS = Math.round(GT_W / 30), pB = Math.round(GT_W / 260), pR = Math.round(GT_W / 70), pZ = Math.round(GT_W / 250), pQ = Math.round(GT_W / 25);
  for (var s = 0; s < GT_N; s++) {
    var ss = seed + s * 101, tone = (gtHash(s, 3, seed) - 0.5) * 0.07;
    /* inelele: maduva la yc (adesea in afara placii), placa la distanta dz(x) de maduva */
    var yc = -120 + gtHash(s, 5, seed) * 390, sp = 3.8 + gtHash(s, 6, seed) * 2.4, z0 = 34 + gtHash(s, 7, seed) * 30;
    for (var py = 0; py < SH; py++) {
      var y = (py + 0.5) / k, row = (s * SH + py) * W * 4;
      /* profilul pe latime, mediat pe cat acopera un pixel de pe ecran (fp mm): altfel canalele de
         5,3 mm si muchiile, mai fine decat un pixel, dau valuri (moire) la gardul vazut intreg */
      var e = 0, lit = 0, nS = Math.max(1, Math.ceil(fw * 6));
      for (var sb = 0; sb < nS; sb++) {
        var pr = gtProf(kind, y + ((sb + 0.5) / nS - 0.5) * fw);
        e += pr[0]; lit += pr[1];
      }
      e /= nS; lit /= nS;
      for (var px = 0; px < W; px++) {
        var x = (px + 0.5) / k, i = row + px * 4, m = 1 + tone;
        /* fibra fina periata: pete scurte, mai mult spre deschis; grila decalata pe fiecare coloana */
        var cx = x * pS / GT_W, col0 = Math.floor(cx), cf = cx - col0, pY = Math.round(GT_SH / 0.55) * 64;
        var nf = gtNoise(cx, y / 0.55 + gtHash(col0, 7, ss) * 9.7, ss, pS, pY);
        /* trecere lina spre grila decalata a coloanei urmatoare (fara ea se vad blocuri de 30 mm) */
        if (cf > 0.7) { var tb = (cf - 0.7) / 0.3; tb = tb * tb * (3 - 2 * tb); nf += (gtNoise(cx, y / 0.55 + gtHash((col0 + 1) % pS, 7, ss) * 9.7, ss, pS, pY) - nf) * tb; }
        var fine = nf > 0.6 ? (nf - 0.6) * 0.16 : (nf - 0.6) * 0.03;
        /* dungi largi foarte discrete */
        var bx = x * pB / GT_W, bc = Math.floor(bx), bf = bx - bc, nb = gtNoise(bx, y / 9 + gtHash(bc, 9, ss) * 5.3, ss + 3, pB, 4096);
        if (bf > 0.6) { var tc = (bf - 0.6) / 0.4; tc = tc * tc * (3 - 2 * tc); nb += (gtNoise(bx, y / 9 + gtHash((bc + 1) % pB, 9, ss) * 5.3, ss + 3, pB, 4096) - nb) * tc; }
        m += fine * (kind === "j" ? 2.6 : 1) + (nb - 0.5) * 0.06;
        /* puncte deschise (fibre) pe fata cu dungi, ca in poza de produs */
        if (kind === "s" && fp < 1.5 && e > 0.9 && gtHash(Math.floor(x * 1.6), Math.floor(y * 1.6), ss) > 0.992) m += 0.18;
        if (kind === "w") {
          var rx = x * pR / GT_W, wy = (gtNoise(rx, y / 30, ss + 5, pR, 64) - 0.5) * 8 + (gtNoise(x * pQ / GT_W, y / 8, ss + 6, pQ, 64) - 0.5) * 1.6;
          var dz = z0 + 48 * gtNoise(x * pZ / GT_W, 0.5, ss + 8, pZ, 8);
          var dy = y - yc + wy, R = Math.sqrt(dy * dy + dz * dz), r = R / sp, gy = Math.abs(dy) / R;
          r += (gtNoise(rx, y / 12, ss + 11, pR, 64) - 0.5) * 0.3;
          /* linia are ~1,4 mm latime oriunde (in centrul catedralei inelul e aproape paralel cu placa
             si, fara corectie, linia s-ar lati intr-o pata) */
          var fr = r - Math.floor(r), dd = (fr < 0.5 ? fr : 1 - fr) * sp / (gy > 0.3 ? gy : 0.3), ln = dd < lw ? 1 - dd / lw : 0;
          /* liniile se estompeaza si reapar pe lungime; pete fine intre ele */
          var lv = 0.3 + 0.9 * gtNoise(rx * 2, y / 20, ss + 13, pR * 2, 64);
          ln = ln * ln * (3 - 2 * ln) * (lv > 1 ? 1 : lv);
          m *= 1 - ringA * lk * ln - 0.045 * fr + (gtNoise(x * pS / GT_W, y / 14, ss + 17, pS, 64) - 0.5) * 0.06;
        }
        m *= e;
        var rr = base[0] * m + 255 * lit, gg = base[1] * m + 255 * lit, bb = base[2] * m + 255 * lit;
        d[i] = rr < 0 ? 0 : rr > 255 ? 255 : rr; d[i + 1] = gg < 0 ? 0 : gg > 255 ? 255 : gg; d[i + 2] = bb < 0 ? 0 : bb > 255 ? 255 : bb; d[i + 3] = 255;
      }
    }
  }
  ctx.putImageData(img, 0, 0);
  var url; try { url = cv.toDataURL("image/jpeg", 0.88); } catch (e2) { url = ""; }
  GT_CACHE[key] = url ? { url: url, w: GT_W, h: GT_SH * GT_N } : null;
  return GT_CACHE[key];
}
/* beton (stalpi si soclu): pete mari si pori mici, periodic, 400 x 400 mm */
function gardConcrete(k) {
  var key = "beton|" + k;
  if (GT_CACHE[key] !== undefined) return GT_CACHE[key];
  var T = 400, W = Math.round(T * k), cv, ctx;
  try { cv = document.createElement("canvas"); cv.width = W; cv.height = W; ctx = cv.getContext("2d"); } catch (e) { ctx = null; }
  if (!ctx || !ctx.createImageData) { GT_CACHE[key] = null; return null; }
  var img = ctx.createImageData(W, W), d = img.data, b = [201, 199, 193];
  for (var py = 0; py < W; py++) for (var px = 0; px < W; px++) {
    var x = px / k, y = py / k, i = (py * W + px) * 4;
    var m = 1 + (gtNoise(x / 80, y / 80, 21, 5, 5) - 0.5) * 0.1 + (gtNoise(x / 16, y / 16, 22, 25, 25) - 0.5) * 0.07 + (gtNoise(x / 3, y / 3, 23, 133, 133) - 0.5) * 0.05;
    if (gtHash(Math.floor(x / 2.2), Math.floor(y / 2.2), 24) > 0.985) m -= 0.12;
    d[i] = b[0] * m; d[i + 1] = b[1] * m; d[i + 2] = b[2] * m; d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  var url; try { url = cv.toDataURL("image/jpeg", 0.85); } catch (e2) { url = ""; }
  GT_CACHE[key] = url ? { url: url, w: T, h: T } : null;
  return GT_CACHE[key];
}
/* pregateste in fundal texturile celorlalte culori, cate una la ~200 ms (schimbarea culorii e apoi instantanee) */
var GT_WARM = "";
function gardWarm(list, k, fp) {
  if (GT_WARM === k + "|" + fp) return;
  GT_WARM = k + "|" + fp;
  var j = 0;
  (function next() {
    if (!list || j >= list.length) return;
    try { gardTex(list[j++], k, fp); } catch (e) { return; }
    setTimeout(next, 200);
  })();
}

/* VIVODECOR - Calculator Gard WPC: MOTOR (vd-gard.min.js pe jsDelivr)
   Sursa extrasa la 04.10.2026 din JS Global (era comprimat acolo, deci numele scurte raman).
   Il incarca VD_GARD din JS Global, doar pe pagina care are #vdPrices + #vdDraw + #vdSwatches.
   Citeste window.VD_CONFIG (TEST_ONLY, TOP_ADJUST, CATEGORY_URL, LEAD_URL, LEAD_TOKEN, JSPDF_SRC). */
try {
(function() {
"use strict";
var e = window.VD_CONFIG;
if (e.TEST_ONLY && !/[?&]vdtest=1/.test(location.search)) {
try {
var t = document.createElement("style");
t.id = "vdHideWhileTesting";
t.textContent = "#vdCalc{display:none !important;}";
(document.head || document.documentElement).appendChild(t);
} catch (e) {}
return;
}
var i = 0;
function r() {
if (document.getElementById("vdPrices") && document.getElementById("vdDraw") && document.getElementById("vdSwatches")) {
(function() {
(function() {
if (document.getElementById("vdLdJson")) {
return;
}
var e = document.createElement("script");
e.type = "application/ld+json";
e.id = "vdLdJson";
e.textContent = JSON.stringify({
"@context": "https://schema.org",
"@graph": [ {
"@type": "WebApplication",
"@id": "https://www.vivodecor.ro/calculator-gard-wpc#app",
name: "Calculator gard WPC \u2014 necesar de \u0219ipc\u0103 \u0219i pre\u021b",
url: "https://www.vivodecor.ro/calculator-gard-wpc",
applicationCategory: "BusinessApplication",
operatingSystem: "Web",
inLanguage: "ro-RO",
description: "Calculeaz\u0103 c\xe2te r\xe2nduri de \u0219ipc\u0103 WPC intr\u0103 pe \xeen\u0103l\u021bimea dorit\u0103, c\xe2\u021bi metri liniari trebuie comanda\u021bi \u0219i c\xe2t cost\u0103, pe baza distan\u021bei dintre st\xe2lpi (1000-2500 mm), a \xeen\u0103l\u021bimii gardului (max. 2000 mm) \u0219i a distan\u021bei dintre \u0219ipci. Include automat cele 4 distan\u021biere de 30 mm obligatorii pe fiecare panou.",
offers: {
"@type": "Offer",
price: "0",
priceCurrency: "RON"
},
publisher: {
"@type": "Organization",
name: "VIVODECOR",
url: "https://www.vivodecor.ro"
}
}, {
"@type": "HowTo",
name: "Cum calculezi necesarul de \u0219ipc\u0103 pentru un gard WPC",
inLanguage: "ro-RO",
totalTime: "PT2M",
step: [ {
"@type": "HowToStep",
name: "M\u0103soar\u0103 deschiderea",
text: "M\u0103soar\u0103 distan\u021ba liber\u0103 dintre st\xe2lpi. Maximum recomandat: 2000 mm la st\xe2lpi din zid\u0103rie, 1800 mm la st\xe2lpi din aluminiu de 70x70 mm."
}, {
"@type": "HowToStep",
name: "Alege distan\u021ba dintre \u0219ipci",
text: "Distan\u021ba dintre \u0219ipci este dat\u0103 de grosimea distan\u021bierului: 10, 20, 30, 60 sau 100 mm. Distan\u021ba minim\u0103 recomandat\u0103 este 10 mm, pentru dilatarea termic\u0103 a WPC-ului."
}, {
"@type": "HowToStep",
name: "Scade distan\u021bierele de cap\u0103t",
text: "Din \xeen\u0103l\u021bimea dorit\u0103 scade 60 mm: c\xe2te un distan\u021bier de 30 mm se monteaz\u0103 obligatoriu sub prima \u0219ipc\u0103 \u0219i peste ultima, \xeen st\xe2nga \u0219i \xeen dreapta panoului."
}, {
"@type": "HowToStep",
name: "Calculeaz\u0103 r\xe2ndurile",
text: "\xcemparte suma dintre \xeen\u0103l\u021bimea r\u0103mas\u0103 \u0219i distan\u021ba dintre \u0219ipci la suma dintre l\u0103\u021bimea \u0219ipcii (150 mm) \u0219i aceea\u0219i distan\u021b\u0103, apoi rotunje\u0219te \xeen jos. Rezultatul este num\u0103rul de r\xe2nduri."
}, {
"@type": "HowToStep",
name: "Calculeaz\u0103 metrii liniari",
text: "\xcenmul\u021be\u0219te num\u0103rul de r\xe2nduri cu num\u0103rul de panouri \u0219i cu l\u0103\u021bimea unui panou \xeen metri. Adaug\u0103 rebutul de debitare, \xeen func\u021bie de lungimea pl\u0103cii alese: 2 m, 2,5 m sau 4 m."
} ]
}, {
"@type": "FAQPage",
inLanguage: "ro-RO",
mainEntity: [ {
"@type": "Question",
name: "Care este distan\u021ba maxim\u0103 \xeentre st\xe2lpi la un gard WPC?",
acceptedAnswer: {
"@type": "Answer",
text: "Distan\u021ba maxim\u0103 recomandat\u0103 este de 200 cm \xeentre st\xe2lpii din zid\u0103rie sau metal \u0219i 180 cm \xeentre st\xe2lpii din aluminiu de 70 x 70 mm. Peste aceste valori \u0219ipca de 150 x 20,6 mm flexeaz\u0103 vizibil, mai ales vara. Calculatorul accept\u0103 deschideri \xeentre 1000 \u0219i 2500 mm; peste 2000 mm se monteaz\u0103 obligatoriu un profil de rigidizare suplimentar pe vertical\u0103, la mijlocul panoului."
}
}, {
"@type": "Question",
name: "C\xe2\u021bi metri liniari de \u0219ipc\u0103 \xeemi trebuie pentru 20 de metri de gard?",
acceptedAnswer: {
"@type": "Answer",
text: "Pentru 20 m de gard cu distan\u021b\u0103 de 20 mm \xeentre \u0219ipci \u0219i 8 r\xe2nduri de \u0219ipc\u0103 (1400 mm \xeen\u0103l\u021bime rezultat\u0103) sunt necesari 8 x 20 m = 160 ml de \u0219ipc\u0103. La 32,90 RON/ml \u0219i reducerea de 5% peste 150 ml, \u0219ipca cost\u0103 aproximativ 5.000 RON cu TVA. Cu distan\u021bierele (40 de cap\u0103t \u0219i 140 \xeentre \u0219ipci, la panouri de 2 m), totalul ajunge la aproximativ 5.275 RON. St\xe2lpii, cadrele \u0219i profilele de rigidizare se adaug\u0103 separat."
}
}, {
"@type": "Question",
name: "Ce lungime de plac\u0103 de gard WPC s\u0103 comand: 2 m, 2,5 m sau 4 m?",
acceptedAnswer: {
"@type": "Answer",
text: "Alege lungimea care se \xeemparte f\u0103r\u0103 rest la deschiderea dintre st\xe2lpi. La 2000 mm \xeentre st\xe2lpi, placa de 2 m nu las\u0103 niciun rebut. La 1250 mm, placa de 2,5 m d\u0103 exact 2 buc\u0103\u021bi. Calculatorul alege automat varianta cu cel mai mic rebut la debitare."
}
}, {
"@type": "Question",
name: "De ce nu se monteaz\u0103 \u0219ipcile de gard WPC lipite una de alta?",
acceptedAnswer: {
"@type": "Answer",
text: "WPC-ul se dilat\u0103 la c\u0103ldur\u0103. Montate lipite, \u0219ipcile \xeemping una \xeen alta \u0219i ies din plan. Distan\u021ba minim\u0103 recomandat\u0103 este de 10 mm, ob\u021binut\u0103 cu distan\u021bier. Fiecare panou trebuie rigidizat cu un profil de aluminiu montat vertical \xeen spate, prins cu dou\u0103 \u0219uruburi sus \u0219i jos pe fiecare lamel\u0103."
}
}, {
"@type": "Question",
name: "De ce intr\u0103 automat 4 distan\u021biere de 30 mm \xeen calculul gardului WPC?",
acceptedAnswer: {
"@type": "Answer",
text: "Pe fiecare panou se monteaz\u0103 c\xe2te 2 distan\u021biere de 30 mm sub prima \u0219ipc\u0103 \u0219i 2 peste ultima, c\xe2te unul \xeen st\xe2nga \u0219i unul \xeen dreapta. Ele las\u0103 spa\u021biul de dilatare fa\u021b\u0103 de soclu \u0219i fa\u021b\u0103 de capacul de sus \u0219i fixeaz\u0103 \u0219ipca \xeen cadru. Sunt obligatorii \u0219i adaug\u0103 60 mm la \xeen\u0103l\u021bimea total\u0103 a panoului. Distan\u021bierele dintre \u0219ipci intr\u0103 \u0219i ele \xeen calcul: c\xe2te 2 pe fiecare spa\u021biu dintre r\xe2nduri, pe fiecare panou."
}
}, {
"@type": "Question",
name: "\u0218ipca de gard WPC cu \xeembinare are nevoie de distan\u021biere \xeentre r\xe2nduri?",
acceptedAnswer: {
"@type": "Answer",
text: "Nu. Variantele Gri Antracit cu \xeembinare \u0219i Maro cu \xeembinare au profil tip lamb\u0103 \u0219i uluc: pl\u0103cile se \xeembuc\u0103 una \xeen alta \u0219i formeaz\u0103 un gard opac, f\u0103r\u0103 spa\u021bii \u0219i f\u0103r\u0103 distan\u021biere \xeentre r\xe2nduri. R\u0103m\xe2n necesare doar cele 4 distan\u021biere de 30 mm de la capetele panoului."
}
}, {
"@type": "Question",
name: "C\xe2t c\xe2nt\u0103re\u0219te \u0219ipca de gard WPC?",
acceptedAnswer: {
"@type": "Answer",
text: "2,4 kg pe metru liniar. Un panou de 2 m l\u0103\u021bime \u0219i 1,5 m \xeen\u0103l\u021bime, cu 8 r\xe2nduri, c\xe2nt\u0103re\u0219te aproximativ 38 kg doar din \u0219ipc\u0103. Cantitatea minim\u0103 pentru livrarea prin curier este de 4 ml."
}
}, {
"@type": "Question",
name: "Pre\u021bul din calculatorul de gard WPC include TVA?",
acceptedAnswer: {
"@type": "Answer",
text: "Da, toate pre\u021burile sunt cu TVA inclus. Calculatorul folose\u0219te pre\u021burile curente ale \u0219ipcii, inclusiv reducerile de cantitate de 3%, 5% \u0219i 7%. Pre\u021bul afi\u0219at \xeen pagina fiec\u0103rui produs r\u0103m\xe2ne cel oficial \xeen momentul plas\u0103rii comenzii."
}
} ]
}, {
"@type": "BreadcrumbList",
itemListElement: [ {
"@type": "ListItem",
position: 1,
name: "Acas\u0103",
item: "https://www.vivodecor.ro/"
}, {
"@type": "ListItem",
position: 2,
name: "Gard WPC",
item: "https://www.vivodecor.ro/wpc-gard"
}, {
"@type": "ListItem",
position: 3,
name: "Calculator gard WPC",
item: "https://www.vivodecor.ro/calculator-gard-wpc"
} ]
} ]
});
(document.head || document.body).appendChild(e);
})();
(function() {
"use strict";
var t = e.CATEGORY_URL;
var i = e.TOP_ADJUST;
var r = e.LEAD_URL;
var a = e.LEAD_TOKEN;
var n = e.JSPDF_SRC;
var o = 150;
var l = [ 2000, 2500, 4000 ];
var s = function(e) {
return document.getElementById(e);
};
var c = (d = document.querySelectorAll("#vdPrices tr[data-id]"), Array.prototype.map.call(d, function(e) {
return {
id: e.dataset.id,
name: e.dataset.name,
price: parseFloat(e.dataset.price),
hex: e.dataset.hex,
hex2: e.dataset.hex2 || e.dataset.hex,
stripe: "1" === e.dataset.stripe,
joint: "1" === e.dataset.joint,
url: e.dataset.url,
askUrl: e.dataset.ask || "",
row: e
};
}));
/* lista culorilor, pentru pregatirea texturilor in fundal (in M() numele c e refolosit) */
var vgCols = c;
var d;
var u = function() {
var e = document.querySelectorAll("#vdTiers tbody tr");
return Array.prototype.map.call(e, function(e) {
return {
min: parseFloat(e.dataset.min),
pct: parseFloat(e.dataset.pct)
};
}).sort(function(e, t) {
return t.min - e.min;
});
}();
var p = {
color: c[0].id,
w: 2000,
h: 1500,
panels: 8,
gap: 20,
bar: "auto"
};
function m(e) {
return e.toLocaleString("ro-RO", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}
function f(e, t) {
t = void 0 === t ? 2 : t;
return e.toLocaleString("ro-RO", {
minimumFractionDigits: t,
maximumFractionDigits: t
});
}
function v(e, t, i) {
return Math.min(i, Math.max(t, e));
}
function h(e) {
var t = e / 10;
return (t % 1 === 0 ? String(t) : t.toFixed(1).replace(".", ",")) + " cm";
}
function g() {
for (var e = 0; e < c.length; e++) {
if (c[e].id === p.color) {
return c[e];
}
}
return c[0];
}
function x() {
var e = p.gap;
var t = Math.max(o, p.h - 60);
var i = Math.max(1, Math.floor((t + e) / (o + e)));
var r = i * o + (i - 1) * e;
var a = r + 60;
var n = i * p.panels;
var s = n * p.w / 1000;
var c = l.filter(function(e) {
return e >= p.w;
}).map(function(e) {
var t = Math.floor(e / p.w);
var i = Math.ceil(n / t);
return {
L: e,
per: t,
bars: i,
ml: i * e / 1000
};
});
if (!c.length) {
c = [ {
L: 4000,
per: 1,
bars: n,
ml: 4 * n
} ];
}
var d;
if ("auto" === p.bar) {
d = c.reduce(function(e, t) {
return t.ml < e.ml ? t : e;
});
} else {
var m = parseInt(p.bar, 10);
d = c.filter(function(e) {
return e.L === m;
})[0] || c[0];
}
var f = Math.max(4, d.ml);
var v = f - s;
var h = s > 0 ? v / s * 100 : 0;
var x = g();
var w = f * x.price;
var y = 4 * p.panels;
var C = 1.52 * y;
/* distantierele dintre sipci (04.10.2026): cate 2 pe fiecare spatiu (cate unul in fiecare stalp/cadru),
   pe fiecare panou; pret de pe /profile-aluminiu/distantier-stalp-30mm-aluminum.html:
   10-60 mm = 1,52 RON, 70-100 mm = 3,03 RON. La sipca cu imbinare (0 mm) nu exista. */
var vgGq = e > 0 ? 2 * (i - 1) * p.panels : 0;
var vgGp = e > 60 ? 3.03 : 1.52;
var vgGc = vgGq * vgGp;
var b = null;
for (var E = 0; E < u.length; E++) {
if (f >= u[E].min) {
b = u[E];
break;
}
}
var A = b ? b.pct : 0;
var k = w * (1 - A / 100);
var S = k + C + vgGc;
var M = p.panels * p.w / 1000;
var L = M * a / 1000;
var D = M > 0 ? S / M : 0;
var P = L > 0 ? S / L : 0;
var T = 2.4 * f;
return {
rows: i,
realH: a,
pieces: n,
netMl: s,
orderMl: f,
waste: v,
wastePc: h,
bar: d.L,
perBar: d.per,
bars: d.bars,
gross: w,
pct: A,
slats: k,
total: S,
saved: w - k,
endQty: y,
endCost: C,
gapQty: vgGq,
gapPrice: vgGp,
gapCost: vgGc,
slatH: r,
runM: M,
areaM2: L,
perRunMl: D,
perM2: P,
weight: T,
color: x
};
}
function w(e, t, i) {
var r = document.createElementNS("http://www.w3.org/2000/svg", e);
for (var a in t) {
if (t.hasOwnProperty(a)) {
r.setAttribute(a, t[a]);
}
}
if (void 0 !== i) {
r.textContent = i;
}
return r;
}
function y() {
return window.innerWidth <= 900;
}
function C() {
var e = s("vdSwatches");
e.innerHTML = "";
c.forEach(function(t) {
var i = document.createElement("button");
i.type = "button";
i.className = "vd-sw";
i.setAttribute("aria-pressed", t.id === p.color ? "true" : "false");
i.dataset.id = t.id;
var r = "linear-gradient(160deg," + t.hex2 + "," + t.hex + " 62%," + t.hex2 + ")";
t.stripe;
i.innerHTML = '<span class="vd-swcolor" style="background:' + (t.stripe ? "linear-gradient(0deg,rgba(255,255,255,.10),rgba(255,255,255,.10))," : "") + r + '"></span><span class="vd-swname">' + t.name + '<span class="vd-swprice">' + m(t.price) + " RON/ml</span></span>";
i.addEventListener("click", function() {
p.color = t.id;
C();
S();
q();
M();
});
e.appendChild(i);
});
}
var b = [ 0, 10, 20, 30, 60, 100 ];
var E = function(e) {
return 0 === e ? "F\u0103r\u0103 distan\u021bieri" : e + " mm (" + h(e) + ")";
};
function A(e, t, i, r, a) {
var n = s(e);
n.innerHTML = "";
t.forEach(function(o) {
var l = document.createElement("button");
l.type = "button";
l.textContent = r(o);
l.setAttribute("aria-pressed", String(p[i]) === String(o) ? "true" : "false");
if (void 0 !== a && String(o) !== String(a)) {
l.disabled = !0;
} else {
l.addEventListener("click", function() {
p[i] = "gap" === i ? parseInt(o, 10) : o;
A(e, t, i, r, a);
q();
M();
});
}
n.appendChild(l);
});
}
var k = 20;
function S() {
var e = g().joint;
if (e) {
if (0 !== p.gap) {
k = p.gap;
p.gap = 0;
}
} else if (0 === p.gap) {
p.gap = k || 20;
}
A("vdGap", e ? [ 0 ] : b.filter(function(e) {
return 0 !== e;
}), "gap", E, e ? 0 : void 0);
s("vdGapHint").innerHTML = e ? "\u0218ipca <strong>" + g().name + '</strong> are profil cu \xeembinare: pl\u0103cile se \xeembuc\u0103 una \xeen alta, f\u0103r\u0103 spa\u021bii \u0219i f\u0103r\u0103 distan\u021biere \xeentre ele.<span class="vd-lock">Distan\u021b\u0103 blocat\u0103 pe 0 mm pentru aceast\u0103 culoare.</span>' : "Distan\u021ba dintre \u0219ipci este dat\u0103 de grosimea distan\u021bierului montat \xeentre ele. 10 mm (1 cm) = gard aproape opac; 60 mm (6 cm) = aspect aerisit; 100 mm (10 cm) = gard transparent, tip pergol\u0103. Distan\u021bierele se fabric\u0103 \u0219i la dimensiuni intermediare, la cerere.";
}
function M() {
var e = x();
(function(e) {
var t = s("vdDraw");
Array.prototype.slice.call(t.childNodes).forEach(function(e) {
var i = e.tagName ? String(e.tagName).toLowerCase() : "";
if ("title" !== i && "desc" !== i) {
t.removeChild(e);
}
});
var i = y();
var r = 190, a = 170, n = 95;
var l = p.w + 2 * r;
var c = n + e.realH + a;
var d = i ? l : l + 340 + 620;
var u = i ? 300 : 340;
var m = i ? 110 : 150;
var v = d + u + (i ? 110 : 90);
var h = c + m + (i ? 250 : 330);
t.setAttribute("viewBox", -u + " " + -m + " " + v + " " + h);
t.setAttribute("preserveAspectRatio", "xMidYMid meet");
var g = Math.max(v / (i ? 24 : 46), 46);
var x = Math.max(v / (i ? 300 : 520), 3.4);
var C = w("defs");
t.appendChild(C);
/* desen realist (04.10.2026): sipci cu textura (tex.js), stalpi si soclu din beton, cadru U si
   distantiere din aluminiu. Textura se pune o singura data in defs (vdTexI) si fiecare sipca o
   foloseste printr-un pattern propriu (alta banda din imagine si alt decalaj pe lungime). */
var vgPx = 0;
try {
vgPx = t.getBoundingClientRect().width / v;
} catch (vgE) {}
if (!(vgPx > 0)) {
vgPx = (i ? 340 : 620) / v;
}
var vgK = i ? 0.5 : 0.55;
/* cati mm acopera un pixel fizic de pe ecran (in trepte, ca sa nu se refaca textura la orice latime) */
var vgFp = 1 / (vgPx * (window.devicePixelRatio || 1));
vgFp = vgFp < 1.5 ? 1 : vgFp < 3 ? 2 : vgFp < 5 ? 4 : 6;
GT_FP = vgFp;
var vgT = o * vgPx < 3 ? null : gardTex(e.color, vgK, vgFp);
var vgB = gardConcrete(0.5);
function vgImg(vgAttrs, vgUrl) {
var vgN = w("image", vgAttrs);
vgN.setAttribute("href", vgUrl);
try {
vgN.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", vgUrl);
} catch (vgE) {}
return vgN;
}
function vgUse(vgAttrs, vgRef) {
var vgN = w("use", vgAttrs);
vgN.setAttribute("href", vgRef);
try {
vgN.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", vgRef);
} catch (vgE) {}
return vgN;
}
function vgGrad(vgId, vgStops, vgVert) {
var vgG = w("linearGradient", vgVert ? { id: vgId, x1: "0", y1: "0", x2: "0", y2: "1" } : { id: vgId, x1: "0", y1: "0", x2: "1", y2: "0" });
vgStops.forEach(function(vgS) {
vgG.appendChild(w("stop", { offset: vgS[0], "stop-color": vgS[1], "stop-opacity": vgS[2] === void 0 ? 1 : vgS[2] }));
});
C.appendChild(vgG);
}
/* aluminiu vopsit gri antracit (mat, cu reflexie discreta pe muchii) */
vgGrad("vdAlu", [ [ "0", "#25282B" ], [ ".18", "#3E4246" ], [ ".42", "#565B60" ], [ ".62", "#3F4347" ], [ "1", "#222528" ] ]);
vgGrad("vdAluD", [ [ "0", "#4A4F55" ], [ ".35", "#6E747B" ], [ ".55", "#7D848B" ], [ "1", "#4A4F55" ] ]);
vgGrad("vdPil", [ [ "0", "#FFFFFF", 0.16 ], [ ".12", "#FFFFFF", 0 ], [ ".8", "#000000", 0 ], [ "1", "#000000", 0.1 ] ]);
var vgConc = "#C9C7C1";
if (vgB) {
var vgBP = w("pattern", { id: "vdBeton", patternUnits: "userSpaceOnUse", width: vgB.w, height: vgB.h });
vgBP.appendChild(vgImg({ x: 0, y: 0, width: vgB.w, height: vgB.h, preserveAspectRatio: "none" }, vgB.url));
C.appendChild(vgBP);
vgConc = "url(#vdBeton)";
}
if (vgT) {
C.appendChild(vgImg({ id: "vdTexI", x: 0, y: 0, width: vgT.w, height: vgT.h, preserveAspectRatio: "none" }, vgT.url));
}
var E = w("g");
t.appendChild(E);
E.appendChild(w("line", {
x1: 40 - u,
y1: c,
x2: d + 40,
y2: c,
stroke: "#B9C6BC",
"stroke-width": x
}));
for (var A = 40 - u; A < d + 40; A += 90) {
E.appendChild(w("line", {
x1: A,
y1: c,
x2: A - 46,
y2: c + 46,
stroke: "#C9D4CB",
"stroke-width": 0.72 * x
}));
}
/* soclul si stalpii din beton */
E.appendChild(w("rect", {
x: 0,
y: c - a,
width: l,
height: a,
fill: vgConc,
stroke: "#A8A59E",
"stroke-width": 0.6 * x
}));
[ 0, l - r ].forEach(function(e) {
E.appendChild(w("rect", {
x: e,
y: 0,
width: r,
height: c - a + 4,
fill: vgConc,
stroke: "#A8A59E",
"stroke-width": 0.6 * x
}));
E.appendChild(w("rect", {
x: e,
y: 0,
width: r,
height: c - a + 4,
fill: "url(#vdPil)"
}));
E.appendChild(w("rect", {
x: e,
y: 4,
width: r,
height: 16,
fill: "#000000",
opacity: ".13"
}));
E.appendChild(w("rect", {
x: e - 16,
y: -30,
width: r + 32,
height: 34,
fill: vgConc,
stroke: "#A8A59E",
"stroke-width": 0.6 * x
}));
E.appendChild(w("rect", {
x: e - 16,
y: -30,
width: r + 32,
height: 8,
fill: "#FFFFFF",
opacity: ".22"
}));
});
/* sipcile: fiecare cu banda ei din textura si alt decalaj pe lungime */
var vgAvg = gtAvg(e.color);
if (!p.gap) {
/* sipci imbinate: fond inchis in spate, altfel la marginea comuna a doua dreptunghiuri
   se vede fundalul alb printr-o linie de antialiasing */
E.appendChild(w("rect", {
x: r - 28,
y: n + 30,
width: p.w + 56,
height: e.slatH,
fill: "#2A2724"
}));
}
var k = n + 30;
for (var S = 0; S < e.rows; S++) {
var vgF = vgAvg;
if (vgT) {
var vgOff = Math.floor(gtHash(S, 1, 77) * Math.max(0, vgT.w - p.w - 60));
var vgP = w("pattern", {
id: "vdTex" + S,
patternUnits: "userSpaceOnUse",
width: vgT.w,
height: o,
patternTransform: "translate(" + (r - 28 - vgOff) + "," + k + ")"
});
vgP.appendChild(vgUse({ x: 0, y: -(S % GT_N) * o }, "#vdTexI"));
C.appendChild(vgP);
vgF = "url(#vdTex" + S + ")";
}
E.appendChild(w("rect", {
x: r - 28,
y: k,
width: p.w + 56,
height: o,
fill: vgF
}));
k += o + p.gap;
}
/* cadrul U din aluminiu pe fata stalpilor, peste capetele sipcilor; in spatiile dintre sipci si
   in cele 30 mm de sus/jos se vad distantierele din canalul cadrului, cu umbra sipcii de deasupra */
var vgSp = [ [ n, 30 ] ];
for (var vgR = 1; vgR < e.rows; vgR++) {
if (p.gap > 0) {
vgSp.push([ n + 30 + vgR * o + (vgR - 1) * p.gap, p.gap ]);
}
}
vgSp.push([ n + 30 + e.slatH, 30 ]);
[ r - 30, l - r ].forEach(function(vgX) {
E.appendChild(w("rect", {
x: vgX,
y: n,
width: 30,
height: e.realH,
fill: "url(#vdAlu)"
}));
vgSp.forEach(function(vgQ) {
E.appendChild(w("rect", {
x: vgX + 2.5,
y: vgQ[0],
width: 25,
height: vgQ[1],
fill: "url(#vdAluD)"
}));
E.appendChild(w("rect", {
x: vgX + 2.5,
y: vgQ[0],
width: 25,
height: Math.min(vgQ[1], 7),
fill: "#000000",
opacity: ".28"
}));
});
});
if (!i) {
var L = l + 340;
var D = w("g", {
transform: "translate(" + L + "," + (c - 1750) + ") scale(17.5)",
fill: "#AEBCB2",
opacity: ".85"
});
D.appendChild(w("circle", {
cx: 15,
cy: 9,
r: 8.4
}));
D.appendChild(w("path", {
d: "M15 19 C6 19 3 26 3 38 L3 60 L8 60 L9 100 L14 100 L15 66 L16 100 L21 100 L22 60 L27 60 L27 38 C27 26 24 19 15 19 Z"
}));
E.appendChild(D);
E.appendChild(w("text", {
x: L + 15,
y: c + 96,
"font-size": 0.72 * g,
"text-anchor": "middle",
fill: "#8FA097",
"font-family": "'IBM Plex Mono',monospace"
}, "1,75 m"));
}
var P = c + (i ? 120 : 158);
E.appendChild(w("line", {
x1: r,
y1: c - a,
x2: r,
y2: P + 34,
stroke: "#5B7183",
"stroke-width": 0.5 * x,
"stroke-opacity": ".55"
}));
E.appendChild(w("line", {
x1: l - r,
y1: c - a,
x2: l - r,
y2: P + 34,
stroke: "#5B7183",
"stroke-width": 0.5 * x,
"stroke-opacity": ".55"
}));
E.appendChild(w("line", {
x1: r,
y1: P,
x2: l - r,
y2: P,
stroke: "#5B7183",
"stroke-width": x
}));
[ [ r, 1 ], [ l - r, -1 ] ].forEach(function(e) {
E.appendChild(w("path", {
d: "M" + e[0] + " " + P + " l" + 46 * e[1] + " -20 l0 40 Z",
fill: "#5B7183"
}));
});
var T = w("text", {
x: l / 2,
y: P - 26,
"font-size": g,
"text-anchor": "middle",
fill: "#5B7183",
"font-family": "'IBM Plex Mono',monospace",
"font-weight": "500"
}, f(p.w, 0) + " mm");
E.appendChild(T);
var O = i ? -125 : -150;
E.appendChild(w("line", {
x1: O - 38,
y1: n,
x2: r,
y2: n,
stroke: "#5B7183",
"stroke-width": 0.5 * x,
"stroke-opacity": ".55"
}));
E.appendChild(w("line", {
x1: O - 38,
y1: n + e.realH,
x2: r,
y2: n + e.realH,
stroke: "#5B7183",
"stroke-width": 0.5 * x,
"stroke-opacity": ".55"
}));
E.appendChild(w("line", {
x1: O,
y1: n,
x2: O,
y2: n + e.realH,
stroke: "#5B7183",
"stroke-width": x
}));
[ [ n, 1 ], [ n + e.realH, -1 ] ].forEach(function(e) {
E.appendChild(w("path", {
d: "M" + O + " " + e[0] + " l-20 " + 46 * e[1] + " l40 0 Z",
fill: "#5B7183"
}));
});
var z = w("text", {
x: O - 34,
y: n + e.realH / 2,
"font-size": g,
"text-anchor": "middle",
fill: "#5B7183",
"font-family": "'IBM Plex Mono',monospace",
"font-weight": "500",
transform: "rotate(-90 " + (O - 34) + " " + (n + e.realH / 2) + ")"
}, f(e.realH, 0) + " mm");
E.appendChild(z);
if (!i) {
var N = n + 15, F = l + 60;
E.appendChild(w("line", {
x1: l - r + 15,
y1: N,
x2: F,
y2: N,
stroke: "#6C7E8D",
"stroke-width": 0.7 * x
}));
E.appendChild(w("circle", {
cx: l - r + 15,
cy: N,
r: 2.6 * x,
fill: "#6C7E8D"
}));
E.appendChild(w("text", {
x: F + 16,
y: N + 0.32 * g,
"font-size": 0.82 * g,
fill: "#6C7E8D",
"font-family": "'IBM Plex Mono',monospace"
}, "2\xd7 distan\u021bier 30 mm"));
if (e.rows > 1) {
var R = n + 30 + o + p.gap / 2;
var I = l + 60;
E.appendChild(w("line", {
x1: l - r + 15,
y1: R,
x2: I,
y2: R,
stroke: "#5B7183",
"stroke-width": 0.7 * x
}));
E.appendChild(w("circle", {
cx: l - r + 15,
cy: R,
r: 2.6 * x,
fill: "#5B7183"
}));
E.appendChild(w("text", {
x: I + 16,
y: R + 0.32 * g,
"font-size": 0.82 * g,
fill: "#5B7183",
"font-family": "'IBM Plex Mono',monospace"
}, "distan\u021b\u0103 " + p.gap + " mm"));
}
}
t.querySelector("#vdDrawDesc").textContent = "Panou de gard WPC " + e.color.name.toLowerCase() + ", " + e.rows + " r\xe2nduri de \u0219ipc\u0103 de 150 mm, " + (p.gap ? "distan\u021b\u0103 de " + p.gap + " mm \xeentre \u0219ipci" : "\u0219ipci \xeembinate, f\u0103r\u0103 spa\u021bii") + ", c\xe2te 2 distan\u021biere de 30 mm sus \u0219i jos, deschidere " + p.w + " mm \xeentre st\xe2lpi, \xeen\u0103l\u021bime rezultat\u0103 " + e.realH + " mm.";
})(e);
setTimeout(function() {
gardWarm(vgCols, y() ? 0.5 : 0.55, GT_FP);
}, 700);
s("vdTotal").textContent = m(e.total);
s("vdSaveRow").innerHTML = e.pct > 0 ? '<span class="vd-strike">' + m(e.gross + e.endCost + e.gapCost) + ' RON</span> <span class="vd-savings">\u2212' + e.pct + "% cantitate \xb7 economise\u0219ti " + m(e.saved) + " RON</span>" : "";
var t = p.panels > 30;
var i = s("vdQuote");
i.hidden = !t;
if (t) {
var r = e.color.askUrl || e.color.url;
i.href = r + (r.indexOf("?") > -1 ? "&" : "?") + [ "vdask=1", "c=" + encodeURIComponent(e.color.name), "w=" + p.w, "h=" + e.realH, "rd=" + e.rows, "g=" + p.gap, "p=" + p.panels, "ml=" + e.orderMl.toFixed(2) ].join("&");
}
var a = [ [ "R\xe2nduri de \u0219ipc\u0103", e.rows + " \xd7 150 mm", !0 ], [ "Distan\u021ba \xeentre \u0219ipci", 0 === p.gap ? "\xeembinare, f\u0103r\u0103 spa\u021bii" : p.gap + " mm (" + h(p.gap) + ")", !1 ], [ "Distan\u021biere 30 mm cap\u0103t", e.endQty + " buc \xb7 " + m(e.endCost) + " RON", !1 ], [ "Distan\u021biere " + (p.gap ? p.gap + " mm " : "") + "\xeentre \u0219ipci", e.gapQty ? e.gapQty + " buc \xb7 " + m(e.gapCost) + " RON" : "nu e cazul (\xeembinare)", !1 ], [ "\xcen\u0103l\u021bime real\u0103 rezultat\u0103", f(e.realH, 0) + " mm", !0 ], [ "Lungime total\u0103 de gard", f(e.runM, 2) + " m", !1 ], [ "Suprafa\u021b\u0103 gard", f(e.areaM2, 2) + " m\xb2", !1 ], [ "Necesar net", f(e.netMl, 2) + " ml", !1 ], [ "De comandat (cu debitare)", f(e.orderMl, 2) + " ml", !0 ], [ "Rebut la debitare", f(e.waste, 2) + " ml (" + f(e.wastePc, 1) + "%)", !1 ], [ "Pl\u0103ci de", f(e.bar / 1000, 1) + " m \xb7 " + e.bars + " buc \xb7 " + e.perBar + (1 === e.perBar ? " bucat\u0103/plac\u0103" : " buc\u0103\u021bi/plac\u0103"), !1 ], [ "Greutate estimat\u0103", f(e.weight, 0) + " kg", !1 ], [ "Subtotal \u0219ipc\u0103", m(e.slats) + " RON", !1 ], [ "Pre\u021b pe m\xb2 de gard", m(e.perM2) + " RON", !0 ] ];
s("vdLines").innerHTML = a.map(function(e) {
return "<li" + (e[2] ? ' class="is-em"' : "") + "><span>" + e[0] + "</span><span>" + e[1] + "</span></li>";
}).join("");
var n = s("vdExCadru").checked;
var l = s("vdExStalp").checked;
var c = 2 * p.panels;
var d = p.panels + 1;
var u = e.realH <= 1000 ? "1 m" : e.realH <= 1500 ? "1,5 m" : "2 m";
s("vdExCadruQ").textContent = c + " buc \xb7 lungime " + u;
s("vdExStalpQ").textContent = d + " buc \xb7 lungime " + u;
s("vdExNote").hidden = !(n && l);
var v = [ "Bun\u0103 ziua! Am folosit calculatorul de gard WPC de pe site.", "", "CONFIGURA\u021aIA MEA:" ];
v.push("\u2022 Culoare \u0219ipc\u0103: " + e.color.name + " (" + m(e.color.price) + " RON/ml)");
v.push("\u2022 Num\u0103r de panouri: " + p.panels);
v.push("\u2022 Distan\u021ba \xeentre st\xe2lpi: " + f(p.w, 0) + " mm");
v.push("\u2022 \xcen\u0103l\u021bime dorit\u0103: " + f(p.h, 0) + " mm");
a.forEach(function(e) {
v.push("\u2022 " + e[0] + ": " + e[1]);
});
v.push("\u2022 TOTAL ESTIMAT: " + m(e.total) + " RON cu TVA");
if (n || l) {
v.push("");
v.push("DORESC OFERT\u0102 \u0218I PENTRU:");
if (n) {
v.push("\u2022 Cadre de gard din aluminiu: " + c + " buc, lungime " + u);
}
if (l) {
v.push("\u2022 St\xe2lpi din aluminiu 70x70 mm: " + d + " buc, lungime " + u);
}
}
v.push("");
v.push("V\u0103 rog o ofert\u0103 complet\u0103, cu profile de rigidizare \u0219i transport. Mul\u021bumesc!");
var g = encodeURIComponent(v.join("\n"));
s("vdCta").innerHTML = '<a class="vd-btn vd-btn-primary" href="' + e.color.url + '"><span>Comand\u0103 ' + f(e.orderMl, 2) + " ml \xb7 " + e.color.name + "<small>Adaug\u0103 cantitatea \xeen co\u0219 \u0219i scrie la Observa\u021bii: pl\u0103ci de " + f(e.bar / 1000, 1) + " m</small></span><i>" + I + '</i></a><a class="vd-btn vd-btn-ghost" href="https://wa.me/40747127292?text=' + g + '"><span>Vrei o ofert\u0103 mai bun\u0103? Trimite configura\u021bia pe WhatsApp<small>Prime\u0219ti o ofert\u0103 personalizat\u0103, cu st\xe2lpi, cadre \u0219i transport' + (n || l ? " \xb7 inclusiv structura bifat\u0103" : "") + "</small></span><i>" + I + "</i></a>";
var C = [ [ "chip", e.rows + " r\xe2nduri" ], [ "chip", "H " + f(e.realH, 0) + " mm" ], [ "chip", "distan\u021b\u0103 " + p.gap + " mm" ], [ "chip", p.panels + " panouri \xb7 " + f(e.runM, 1) + " m" ], [ "chip", e.endQty + "\xd7 distan\u021bier 30 mm" ] ];
if (e.gapQty) {
C.push([ "chip", e.gapQty + "\xd7 distan\u021bier " + p.gap + " mm" ]);
}
if (p.w > 2000) {
C.push([ "warn", "Peste 2000 mm \u2014 necesit\u0103 rigidizare suplimentar\u0103" ]);
}
if (e.orderMl < 4.01) {
C.push([ "warn", "Minim 4 ml pentru livrare prin curier" ]);
}
if (t) {
C.push([ "warn", "Peste 30 de panouri \u2014 cere ofert\u0103 personalizat\u0103" ]);
}
s("vdChips").innerHTML = C.map(function(e) {
return '<span class="vd-chip' + ("warn" === e[0] ? " is-warn" : "") + '">' + e[1] + "</span>";
}).join("");
var b = s("vdDockTotal"), E = s("vdDockSub");
if (b) {
b.textContent = m(e.total);
E.textContent = e.rows + " r\xe2nduri \xb7 " + f(e.realH, 0) + " mm \xb7 " + f(e.orderMl, 2) + " ml";
s("vdDockCta").href = e.color.url;
s("vdDockCta").textContent = "Comand\u0103";
}
Q();
s("vdRunHint").textContent = t ? p.panels + " panouri \xd7 " + f(p.w / 1000, 2) + " m = " + f(e.runM, 2) + " m de gard. Peste 30 de panouri estimarea r\u0103m\xe2ne orientativ\u0103 \u2014 pentru cantit\u0103\u021bi mari prime\u0219ti pre\u021b de proiect." : p.panels + " panouri \xd7 " + f(p.w / 1000, 2) + " m = " + f(e.runM, 2) + " m de gard.";
}
var L = 1123;
var D = {
y: 960,
h: 60
};
var P = null;
var T = String.fromCharCode(34);
var O = String.fromCharCode(38);
var z = O + "amp;";
var N = O + "lt;";
var F = O + "gt;";
var R = O + "quot;";
var I = "\u2192";
function B(e) {
return String(e).split(O).join(z).split("<").join(N).split(">").join(F).split(T).join(R);
}
function H() {
var e = s("vdPdfBtn"), t = s("vdPdfSub");
if (!e) {
return;
}
var i = t.textContent;
e.addEventListener("click", function() {
e.disabled = !0;
t.textContent = "Se preg\u0103te\u0219te documentul\u2026";
(function() {
if (P) {
return P;
}
return P = new Promise(function(e, t) {
if (window.jspdf && window.jspdf.jsPDF) {
e(window.jspdf.jsPDF);
return;
}
var i = document.createElement("script");
i.src = n;
i.onload = function() {
if (window.jspdf && window.jspdf.jsPDF) {
e(window.jspdf.jsPDF);
} else {
t(new Error("jsPDF nu s-a ini\u021bializat"));
}
};
i.onerror = function() {
t(new Error("nu s-a putut \xeenc\u0103rca biblioteca PDF"));
};
document.head.appendChild(i);
});
})().then(function(e) {
return (t = function(e) {
var t = "Arial, Helvetica, sans-serif";
var i = "Consolas, 'Courier New', monospace";
var r = "#16211C", a = "#4A5A52", n = "#5B7183", o = "#DCE3DD", l = "#1E6B45";
var c = new Date;
var d = ("0" + c.getDate()).slice(-2) + "." + ("0" + (c.getMonth() + 1)).slice(-2) + "." + c.getFullYear();
var u = [ [ "Culoare \u0219ipc\u0103", e.color.name + "  \xb7  " + m(e.color.price) + " RON/ml" ], [ "Num\u0103r de panouri", String(p.panels) ], [ "Distan\u021ba \xeentre st\xe2lpi", f(p.w, 0) + " mm" ], [ "\xcen\u0103l\u021bime dorit\u0103", f(p.h, 0) + " mm" ], [ "\xcen\u0103l\u021bime real\u0103 rezultat\u0103", f(e.realH, 0) + " mm" ], [ "R\xe2nduri de \u0219ipc\u0103", e.rows + " \xd7 150 mm" ], [ "Distan\u021ba \xeentre \u0219ipci", 0 === p.gap ? "\xeembinare, f\u0103r\u0103 spa\u021bii" : p.gap + " mm (" + h(p.gap) + ")" ], [ "Distan\u021biere 30 mm cap\u0103t", e.endQty + " buc  \xb7  " + m(e.endCost) + " RON" ], [ "Distan\u021biere " + (p.gap ? p.gap + " mm " : "") + "\xeentre \u0219ipci", e.gapQty ? e.gapQty + " buc  \xb7  " + m(e.gapCost) + " RON" : "nu e cazul (\xeembinare)" ], [ "Lungime total\u0103 de gard", f(e.runM, 2) + " m" ], [ "Suprafa\u021b\u0103 gard", f(e.areaM2, 2) + " m\xb2" ], [ "Necesar net", f(e.netMl, 2) + " ml" ], [ "De comandat (cu debitare)", f(e.orderMl, 2) + " ml" ], [ "Rebut la debitare", f(e.waste, 2) + " ml (" + f(e.wastePc, 1) + "%)" ], [ "Pl\u0103ci de", f(e.bar / 1000, 1) + " m \xb7 " + e.bars + " buc \xb7 " + e.perBar + (1 === e.perBar ? " bucat\u0103/plac\u0103" : " buc\u0103\u021bi/plac\u0103") ], [ "Greutate estimat\u0103", f(e.weight, 0) + " kg" ], [ "Pre\u021b pe m\xb2 de gard", m(e.perM2) + " RON" ] ];
var v = [];
v.push('<svg xmlns="http://www.w3.org/2000/svg" width="794" height="1123" viewBox="0 0 794 1123">');
v.push('<rect width="794" height="1123" fill="#FFFFFF"/>');
v.push('<rect x="0" y="0" width="794" height="7" fill="' + l + '"/>');
v.push('<text x="52" y="62" font-family="' + t + '" font-size="20" font-weight="700" fill="' + r + '">VIVODECOR</text>');
v.push('<text x="52" y="80" font-family="' + i + '" font-size="9.5" letter-spacing="2" fill="' + n + '">HOME ' + z + " GARDEN</text>");
v.push('<text x="742" y="58" text-anchor="end" font-family="' + t + '" font-size="15" font-weight="700" fill="' + r + '">Configura\u021bie gard WPC</text>');
v.push('<text x="742" y="76" text-anchor="end" font-family="' + i + '" font-size="10" fill="' + n + '">Estimare generat\u0103 la ' + d + "</text>");
v.push('<line x1="52" y1="95" x2="742" y2="95" stroke="' + o + '" stroke-width="1"/>');
v.push('<rect x="52" y="108" width="690" height="286" fill="#FBFAF7" stroke="' + o + '"/>');
v.push(function() {
var e = document.getElementById("vdDraw");
if (!e) {
return "";
}
var t = e.cloneNode(!0);
t.removeAttribute("id");
t.removeAttribute("style");
t.setAttribute("x", 60);
t.setAttribute("y", 116);
t.setAttribute("width", 674);
t.setAttribute("height", 270);
t.setAttribute("preserveAspectRatio", "xMidYMid meet");
return (new XMLSerializer).serializeToString(t);
}());
var g = 420;
v.push('<text x="52" y="' + g + '" font-family="' + i + '" font-size="9.5" letter-spacing="2" fill="' + n + '">CONFIGURA\u021aIA</text>');
g += 16;
for (var x = 0; x < u.length; x++) {
var w = g + 19 * x;
if (x % 2 === 0) {
v.push('<rect x="52" y="' + (w - 13.5) + '" width="690" height="19" fill="#F6F8F6"/>');
}
v.push('<text x="61" y="' + w + '" font-family="' + t + '" font-size="11.5" fill="' + a + '">' + B(u[x][0]) + "</text>");
v.push('<text x="733" y="' + w + '" text-anchor="end" font-family="' + i + '" font-size="11.5" font-weight="600" fill="' + r + '">' + B(u[x][1]) + "</text>");
}
var y = g + 19 * u.length + 12;
v.push('<rect x="52" y="' + y + '" width="690" height="56" fill="' + r + '" rx="3"/>');
v.push('<text x="68" y="' + (y + 23) + '" font-family="' + i + '" font-size="9.5" letter-spacing="1.6" fill="#8FA79A">TOTAL ESTIMAT, \u0218IPC\u0102 \u0218I DISTAN\u021aIERE</text>');
v.push('<text x="68" y="' + (y + 45) + '" font-family="' + i + '" font-size="21" font-weight="700" fill="#FFFFFF">' + m(e.total) + " RON</text>");
v.push('<text x="726" y="' + (y + 45) + '" text-anchor="end" font-family="' + i + '" font-size="11" fill="#8FA79A">TVA inclus' + (e.pct > 0 ? "  \xb7  reducere " + e.pct + "% aplicat\u0103" : "") + "</text>");
var C = y + 78;
var b = s("vdExCadru").checked, E = s("vdExStalp").checked;
if (b || E) {
var A = e.realH <= 1000 ? "1 m" : e.realH <= 1500 ? "1,5 m" : "2 m";
v.push('<text x="52" y="' + C + '" font-family="' + i + '" font-size="9.5" letter-spacing="2" fill="' + n + '">STRUCTUR\u0102 CERUT\u0102 \xceN OFERT\u0102</text>');
C += 17;
if (b) {
v.push('<text x="52" y="' + C + '" font-family="' + t + '" font-size="11.5" fill="' + a + '">Cadre de gard din aluminiu \u2014 ' + 2 * p.panels + " buc, lungime " + A + "</text>");
C += 17;
}
if (E) {
v.push('<text x="52" y="' + C + '" font-family="' + t + '" font-size="11.5" fill="' + a + '">St\xe2lpi din aluminiu 70 \xd7 70 mm \u2014 ' + (p.panels + 1) + " buc, lungime " + A + "</text>");
C += 17;
}
C += 6;
}
v.push('<rect x="52" y="' + C + '" width="690" height="46" fill="#E9F2EC" rx="3"/>');
v.push('<text x="64" y="' + (C + 19) + '" font-family="' + t + '" font-size="10.5" fill="' + l + '">Estimarea acoper\u0103 \u0219ipca WPC, cele 4 distan\u021biere de 30 mm de cap\u0103t \u0219i distan\u021bierele dintre \u0219ipci (2 pe r\xe2nd, pe panou).</text>');
v.push('<text x="64" y="' + (C + 35) + '" font-family="' + t + '" font-size="10.5" fill="' + l + '">St\xe2lpii, cadrele, profilele de rigidizare \u0219i transportul se oferteaz\u0103 separat.</text>');
var k = D;
v.push('<rect x="52" y="' + k.y + '" width="690" height="' + k.h + '" fill="' + l + '" rx="3"/>');
v.push('<text x="68" y="' + (k.y + 20) + '" font-family="' + t + '" font-size="12.5" font-weight="700" fill="#FFFFFF">' + I + "  Apas\u0103 aici ca s\u0103 redeschizi \u0219i s\u0103 modifici aceast\u0103 configura\u021bie</text>");
v.push('<text x="68" y="' + (k.y + 37) + '" font-family="' + t + '" font-size="10" fill="#BFE0CC">Se deschide calculatorul cu toate valorile de mai sus completate. \xcel po\u021bi trimite mai departe constructorului.</text>');
var S = J().replace(/^https?:\/\//, "");
if (S.length > 96) {
S = S.slice(0, 93) + "...";
}
v.push('<text x="68" y="' + (k.y + 52) + '" font-family="' + i + '" font-size="8.5" fill="#8FC7A5">' + B(S) + "</text>");
v.push('<line x1="52" y1="1035" x2="742" y2="1035" stroke="' + o + '"/>');
v.push('<text x="52" y="1054" font-family="' + t + '" font-size="10.5" font-weight="700" fill="' + r + '">VIVODECOR \xb7 SC FIERONART SRL \xb7 CUI RO 17572384</text>');
v.push('<text x="52" y="1070" font-family="' + t + '" font-size="10" fill="' + a + '">Showroom Cluj-Napoca, Str. Fabricii de Zah\u0103r 109, L\u2013V 8:30\u201316:30  \xb7  Depozit-showroom Rudeni, Chiajna, Ilfov</text>');
v.push('<text x="52" y="1086" font-family="' + i + '" font-size="10.5" fill="' + r + '">0747 127 292  \xb7  0724 604 236  \xb7  vivodecor.ro</text>');
v.push('<text x="52" y="1103" font-family="' + t + '" font-size="9" fill="' + n + '">Estimarea nu constituie ofert\u0103 ferm\u0103. Pre\u021burile afi\u0219ate \xeen pagina fiec\u0103rui produs sunt cele oficiale.</text>');
v.push("</svg>");
return v.join("");
}(x()), new Promise(function(e, i) {
var r = new Image;
r.onload = function() {
try {
var t = document.createElement("canvas");
t.width = 1588;
t.height = 2246;
var a = t.getContext("2d");
a.fillStyle = "#fff";
a.fillRect(0, 0, t.width, t.height);
a.drawImage(r, 0, 0, t.width, t.height);
e(t.toDataURL("image/jpeg", 0.92));
} catch (e) {
i(e);
}
};
r.onerror = function() {
i(new Error("desenul nu a putut fi randat"));
};
r.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(t);
})).then(function(t) {
var i = new e({
orientation: "p",
unit: "px",
format: [ 794, L ],
hotfixes: [ "px_scaling" ]
});
i.addImage(t, "JPEG", 0, 0, 794, L);
var r = J();
i.link(52, D.y, 690, D.h, {
url: r
});
i.link(52, 1075, 260, 16, {
url: "tel:+40747127292"
});
i.save("Configuratie-gard-WPC-" + x().color.name.replace(/[^A-Za-z0-9]+/g, "-") + "-" + p.panels + "x" + p.w + "mm.pdf");
});
var t;
}).then(function() {
t.textContent = "Desc\u0103rcat. Po\u021bi genera altul dup\u0103 ce modifici configura\u021bia.";
var e = s("vdLead");
if (e && r) {
e.hidden = !1;
}
}).catch(function(e) {
t.textContent = "Nu s-a putut genera PDF-ul. Trimite configura\u021bia pe WhatsApp.";
if (window.console) {
console.warn("[VIVODECOR PDF]", e);
}
}).then(function() {
e.disabled = !1;
setTimeout(function() {
if (0 === t.textContent.indexOf("Desc\u0103rcat")) {
t.textContent = i;
}
}, 9000);
});
});
(function() {
var e = s("vdLead");
if (!e) {
return;
}
var t = s("vdLeadMail"), i = s("vdLeadPhone"), n = s("vdLeadOk"), o = s("vdLeadSend"), l = s("vdLeadMsg");
function c(e, t) {
l.textContent = e;
l.hidden = !1;
l.classList.toggle("is-err", !!t);
}
o.addEventListener("click", function() {
var l = (t.value || "").trim();
if (!(l.length <= 120 && /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,24}$/.test(l))) {
c("Adresa de email nu pare valid\u0103.", !0);
t.focus();
return;
}
var d = (i.value || "").trim();
var u = d.replace(/\D/g, "");
if (!(d.length <= 30 && /^[\d\s.()+\-]+$/.test(d) && u.length >= 9 && u.length <= 15)) {
c("Num\u0103rul de telefon nu pare valid. Exemplu: 0722 123 456", !0);
i.focus();
return;
}
if (!n.checked) {
c("Bifeaz\u0103 acordul ca s\u0103 putem trimite oferta.", !0);
return;
}
o.disabled = !0;
c("Se trimite\u2026");
var m = x();
var f = {
token: a,
website: s("vdLeadWeb").value,
email: l,
telefon: d,
url: J(),
culoare: m.color.name,
pretMl: m.color.price,
panouri: p.panels,
deschidere_mm: p.w,
inaltime_dorita_mm: p.h,
inaltime_reala_mm: m.realH,
randuri: m.rows,
distanta_sipci_mm: p.gap,
distantiere_capat_buc: m.endQty,
distantiere_intre_buc: m.gapQty,
lungime_gard_m: +m.runM.toFixed(2),
suprafata_mp: +m.areaM2.toFixed(2),
necesar_ml: +m.orderMl.toFixed(2),
total_ron: +m.total.toFixed(2),
cere_cadre: s("vdExCadru").checked,
cere_stalpi: s("vdExStalp").checked,
data: (new Date).toISOString()
};
fetch(r, {
method: "POST",
headers: {
"Content-Type": "text/plain;charset=utf-8"
},
body: JSON.stringify(f)
}).then(function(e) {
if (!e.ok) {
throw new Error("HTTP " + e.status);
}
return e.text();
}).then(function(e) {
var t = !1;
try {
t = !0 === JSON.parse(e).ok;
} catch (e) {
t = !1;
}
if (!t) {
throw new Error("respins de server");
}
}).then(function() {
e.innerHTML = '<p class="vd-lead-t">Mul\u021bumim! Am primit cererea.</p><p class="vd-lead-s">Un coleg verific\u0103 configura\u021bia \u0219i \xee\u021bi trimite oferta complet\u0103 pe ' + B(l) + " sau te sun\u0103 la " + B(d) + ". Dac\u0103 e urgent, sun\u0103 tu la 0747 127 292.</p>";
}).catch(function(e) {
o.disabled = !1;
c("Nu s-a putut trimite. \xcencearc\u0103 pe WhatsApp sau la 0747 127 292.", !0);
if (window.console) {
console.warn("[VIVODECOR lead]", e);
}
});
});
t.addEventListener("keydown", function(e) {
if ("Enter" === e.key) {
o.click();
}
});
})();
}
var j = !1;
var W = !1, _ = !1;
var U = null;
var V = !1;
function q() {
V = !0;
Q();
}
function Q() {
if (!V) {
return;
}
clearTimeout(U);
U = setTimeout(G, 400);
}
function G() {
if (j || !window.history || !history.replaceState) {
return;
}
var e = new URLSearchParams(location.search);
e.set("c", p.color);
e.set("w", p.w);
e.set("h", p.h);
e.set("g", p.gap);
e.set("p", p.panels);
e.set("b", p.bar);
if (s("vdExCadru").checked) {
e.set("ac", "1");
} else {
e.delete("ac");
}
if (s("vdExStalp").checked) {
e.set("as", "1");
} else {
e.delete("as");
}
try {
history.replaceState(null, "", location.pathname + "?" + e.toString() + location.hash);
} catch (e) {}
}
function J() {
var e = new URLSearchParams;
if (/[?&]vdtest=1/.test(location.search)) {
e.set("vdtest", "1");
}
e.set("c", p.color);
e.set("w", p.w);
e.set("h", p.h);
e.set("g", p.gap);
e.set("p", p.panels);
e.set("b", p.bar);
if (s("vdExCadru").checked) {
e.set("ac", "1");
}
if (s("vdExStalp").checked) {
e.set("as", "1");
}
return location.origin + location.pathname + "?" + e.toString();
}
function Z(e, t, i, r, a) {
var n = s(e), o = s(t);
function l(e) {
var t = n.value.replace(/[^\d]/g, "");
var l = parseInt(t, 10);
if (isNaN(l)) {
if (e) {
l = r;
} else {
return;
}
}
var s = l < r || l > a;
if (o) {
o.classList.toggle("is-err", s && !e);
}
if (e) {
l = v(l, r, a);
n.value = l;
if (o) {
o.classList.remove("is-err");
}
}
p[i] = v(l, r, a);
q();
M();
}
n.addEventListener("input", function() {
l(!1);
});
n.addEventListener("blur", function() {
l(!0);
});
n.addEventListener("keydown", function(e) {
if ("Enter" === e.key) {
n.blur();
}
});
}
function Y(e) {
var t = String(e).match(/(-?)\s*(\d{1,3}(?:\.\d{3})*|\d+)(?:,(\d{1,2}))?\s*(?:RON|lei)/i);
if (!t) {
return NaN;
}
if ("-" === t[1]) {
return NaN;
}
var i = t[2].replace(/\./g, "");
return parseFloat(i + "." + (t[3] || "0"));
}
function $(e) {
var t = e.querySelectorAll('del, s, strike, [class*="old"], [class*="Old"]');
var i = [];
for (var r = 0; r < t.length; r++) {
i.push(t[r]);
}
var a = NaN;
var n = e.querySelectorAll("*");
for (var o = 0; o < n.length; o++) {
var l = n[o];
if (l.children.length) {
continue;
}
var s = !1;
for (var c = 0; c < i.length; c++) {
if (i[c] === l || i[c].contains(l)) {
s = !0;
break;
}
}
if (s) {
continue;
}
var d = Y(l.textContent);
if (!isNaN(d) && d > 0) {
a = d;
}
}
return a;
}
function K(e) {
try {
e = decodeURIComponent(String(e));
} catch (e) {}
return (e = e.split("?")[0].split("#")[0].replace(/\/+$/, "")).substring(e.lastIndexOf("/") + 1).toLowerCase();
}
function X(e) {
var t = 0;
c.forEach(function(i) {
var r = e[K(i.url)];
if (void 0 === r || isNaN(r) || r <= 0) {
return;
}
if (Math.abs(r - i.price) / i.price > .3) {
return;
}
if (Math.abs(r - i.price) < 0.005) {
return;
}
i.price = r;
i.row.dataset.price = r;
var a = i.row.querySelectorAll("td");
if (a[1]) {
a[1].textContent = m(r) + " RON";
}
if (a[2]) {
a[2].textContent = m(r / 0.15) + " RON";
}
t++;
});
if (t) {
C();
M();
var i = document.querySelector("#vdPrices caption");
if (i) {
i.textContent = "Pre\u021b/ml \xb7 sincronizat automat " + (new Date).toLocaleDateString("ro-RO");
}
}
}
var ee = "vdPrices_v1";
function te() {
var e = t;
if (!e) {
return;
}
var i = function() {
try {
var e = sessionStorage.getItem(ee);
if (!e) {
return null;
}
var t = JSON.parse(e);
if (!t || Date.now() - t.t > 12e5) {
return null;
}
return t.p;
} catch (e) {
return null;
}
}();
if (i) {
X(i);
return;
}
var r = !1;
var a = setTimeout(function() {
r = !0;
}, 8e3);
(function(e) {
return fetch(e, {
credentials: "omit"
}).then(function(e) {
if (!e.ok) {
throw new Error("HTTP " + e.status);
}
return e.text();
}).then(function(e) {
var t = {};
var i = (new DOMParser).parseFromString(e, "text/html").querySelectorAll("a[href]");
for (var r = 0; r < i.length; r++) {
var a = K(i[r].getAttribute("href"));
if (!a || void 0 !== t[a]) {
continue;
}
var n = i[r], o = 0;
for (;n && o < 6; ) {
var l = $(n);
if (!isNaN(l)) {
t[a] = l;
break;
}
n = n.parentElement;
o++;
}
}
return t;
});
})(e).then(function(e) {
if (r) {
return;
}
clearTimeout(a);
(function(e) {
try {
sessionStorage.setItem(ee, JSON.stringify({
t: Date.now(),
p: e
}));
} catch (e) {}
})(e);
X(e);
}).catch(function() {
clearTimeout(a);
});
}
var ie = 1 / 0, re = 0;
function ae(e, t) {
var i;
try {
i = getComputedStyle(e);
} catch (e) {
return null;
}
if ("fixed" !== i.position && "sticky" !== i.position) {
return null;
}
if ("none" === i.display || "hidden" === i.visibility) {
return null;
}
if (0 === parseFloat(i.opacity)) {
return null;
}
var r = e.getBoundingClientRect();
if (r.height < 45 || r.height > 400) {
return null;
}
if (r.top > 12) {
return null;
}
if (r.width < 0.6 * t) {
return null;
}
return r;
}
var ne = !1;
function oe() {
var e = function() {
var e = window.innerWidth, t = 0;
var i = document.body.getElementsByTagName("*");
for (var r = 0; r < i.length; r++) {
var a = i[r];
if ("vdCalc" === a.id || a.closest && a.closest("#vdCalc")) {
continue;
}
var n = ae(a, e);
if (n && n.bottom > t) {
t = n.bottom;
}
}
return t;
}();
var t = !1;
if (e > 0 && e < ie) {
ie = e;
t = !0;
}
if (e > re) {
re = e;
t = !0;
}
if (!t && ne) {
return;
}
var r = ie !== 1 / 0 && re > 0;
var a = r ? Math.max(70, ie) : 16;
var n = r ? Math.min(170, Math.max(0, Math.round(re - a))) : 0;
var o = document.documentElement.style;
o.setProperty("--vd-headroom", Math.round(a + i) + "px");
o.setProperty("--vd-cover", n + "px");
ne = !0;
}
function le() {
var e = window.innerWidth, t = window.innerHeight;
var i = 0, r = 0;
var a = document.body.getElementsByTagName("*");
for (var n = 0; n < a.length; n++) {
var o = a[n];
if ("vdDock" === o.id || "vdCalc" === o.id) {
continue;
}
if (o.closest && (o.closest("#vdDock") || o.closest("#vdCalc"))) {
continue;
}
var l;
try {
l = getComputedStyle(o);
} catch (e) {
continue;
}
if ("fixed" !== l.position) {
continue;
}
if ("none" === l.display || "hidden" === l.visibility) {
continue;
}
if (0 === parseFloat(l.opacity)) {
continue;
}
var s = o.getBoundingClientRect();
if (s.width < 24 || s.width > 140) {
continue;
}
if (s.height < 24 || s.height > 140) {
continue;
}
if (s.bottom < t - 190 || s.top > t - 10) {
continue;
}
if (s.left < 0.42 * e) {
if (s.right > i) {
i = s.right;
}
} else if (s.right > 0.58 * e) {
if (e - s.left > r) {
r = e - s.left;
}
}
}
var c = document.documentElement.style;
c.setProperty("--vd-dock-l", Math.max(16, Math.round(i)) + "px");
c.setProperty("--vd-dock-r", Math.max(16, Math.round(r)) + "px");
}
function se() {
(function() {
var e = document.head;
if (!e) {
return;
}
var t = location.origin + location.pathname;
var i = e.querySelector('link[rel="canonical"]');
if (i) {
if ((i.getAttribute("href") || "").indexOf("?") > -1) {
i.setAttribute("href", t);
}
return;
}
var r = document.createElement("link");
r.setAttribute("rel", "canonical");
r.setAttribute("href", t);
e.appendChild(r);
var a = e.querySelector('meta[property="og:url"]');
if (a) {
if ((a.getAttribute("content") || "").indexOf("?") > -1) {
a.setAttribute("content", t);
}
} else {
var n = document.createElement("meta");
n.setAttribute("property", "og:url");
n.setAttribute("content", t);
e.appendChild(n);
}
})();
(function() {
var e;
try {
e = new URLSearchParams(location.search);
} catch (e) {
return;
}
var t;
if (t = e.get("c")) {
for (var i = 0; i < c.length; i++) {
if (c[i].id === t) {
p.color = t;
break;
}
}
}
t = parseInt(e.get("w"), 10);
if (!isNaN(t)) {
p.w = v(t, 1e3, 2500);
}
t = parseInt(e.get("h"), 10);
if (!isNaN(t)) {
p.h = v(t, 500, 2e3);
}
t = parseInt(e.get("p"), 10);
if (!isNaN(t)) {
p.panels = v(t, 1, 999);
}
t = parseInt(e.get("g"), 10);
if (!isNaN(t) && b.indexOf(t) > -1) {
p.gap = t;
}
if ("auto" === (t = e.get("b")) || "2000" === t || "2500" === t || "4000" === t) {
p.bar = t;
}
if ("1" === e.get("ac")) {
W = !0;
}
if ("1" === e.get("as")) {
_ = !0;
}
if (e.get("c") || e.get("w") || e.get("h") || e.get("p") || e.get("g")) {
V = !0;
}
s("vdW").value = p.w;
s("vdH").value = p.h;
s("vdPanels").value = p.panels;
})();
C();
S();
A("vdBar", [ "auto", 2000, 2500, 4000 ], "bar", function(e) {
return "auto" === e ? "Automat" : (e / 1000).toString().replace(".", ",") + " m";
});
Z("vdW", "vdFieldW", "w", 1e3, 2500);
Z("vdH", "vdFieldH", "h", 500, 2e3);
Z("vdPanels", null, "panels", 1, 999);
s("vdExCadru").checked = W;
s("vdExStalp").checked = _;
s("vdExCadru").addEventListener("change", function() {
q();
M();
});
s("vdExStalp").addEventListener("change", function() {
q();
M();
});
H();
M();
(function() {
var e = s("vdDock"), t = s("vdResult");
if (!e || !t || !("IntersectionObserver" in window)) {
return;
}
new IntersectionObserver(function(t) {
e.classList.toggle("is-off", t[0].isIntersecting);
}, {
threshold: 0.18
}).observe(t);
})();
(function() {
var e, t = y();
window.addEventListener("resize", function() {
clearTimeout(e);
e = setTimeout(function() {
if (y() !== t) {
t = y();
M();
}
}, 160);
});
window.addEventListener("orientationchange", function() {
setTimeout(M, 220);
});
})();
oe();
le();
var e = 0;
window.addEventListener("scroll", function() {
if (e) {
return;
}
e = requestAnimationFrame(function() {
e = 0;
oe();
le();
});
}, {
passive: !0
});
var t;
window.addEventListener("resize", function() {
clearTimeout(t);
t = setTimeout(function() {
re = 0;
oe();
le();
}, 200);
});
[ 400, 900, 1800 ].forEach(function(e) {
setTimeout(function() {
oe();
le();
}, e);
});
}
if ("loading" === document.readyState) {
document.addEventListener("DOMContentLoaded", function() {
se();
te();
});
} else {
se();
te();
}
})();
})();
return;
}
if (++i > 80) {
return;
}
setTimeout(r, 150);
}
if ("loading" === document.readyState) {
document.addEventListener("DOMContentLoaded", r);
} else {
r();
}
})();
} catch (vdError) {
  if (window.console && console.warn) {
    console.warn("[VIVODECOR calculator] oprit din cauza unei erori:", vdError);
  }
}

})();
