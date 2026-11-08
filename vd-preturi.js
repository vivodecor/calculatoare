/* VIVODECOR - pagina Preturi (/preturi-vivodecor, #vdM): actualizeaza live preturile si stocul
   din feedul Gomag /feed/chatgpt.csv. Fara feed (eroare, browser vechi) ramane tabelul static din HTML.
   Se incarca din JS Global (window.VD_PRETURI.SRC) doar pe pagina care are #vdM. */
(function () {
  "use strict";
  var root = document.getElementById("vdM");
  if (!root || root.getAttribute("data-live") || !window.fetch) { return; }
  root.setAttribute("data-live", "0");
  var cfg = window.VD_PRETURI || {};
  var LUNI = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august",
    "septembrie", "octombrie", "noiembrie", "decembrie"];

  function ro(x) {
    var s = (Math.round(x * 100) / 100).toFixed(2).split(".");
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return s[0] + "," + s[1];
  }

  // CSV RFC 4180 (campuri intre ghilimele, cu virgule si randuri noi in descrieri)
  function parseCSV(t) {
    var rows = [], row = [], i = 0, n = t.length, start, c, f;
    while (i < n) {
      if (t.charCodeAt(i) === 34) {
        f = ""; i++;
        while (i < n) {
          start = i;
          while (i < n && t.charCodeAt(i) !== 34) { i++; }
          f += t.slice(start, i);
          if (t.charCodeAt(i + 1) === 34) { f += "\""; i += 2; } else { i++; break; }
        }
      } else {
        start = i;
        while (i < n) { c = t.charCodeAt(i); if (c === 44 || c === 10 || c === 13) { break; } i++; }
        f = t.slice(start, i);
      }
      row.push(f);
      c = t.charCodeAt(i);
      if (c === 44) { i++; }
      else {
        if (c === 13) { i++; }
        if (t.charCodeAt(i) === 10) { i++; }
        rows.push(row); row = [];
      }
    }
    if (row.length) { rows.push(row); }
    return rows;
  }

  function num(s) { var v = parseFloat(String(s || "").split(" ")[0]); return isFinite(v) && v > 0 ? v : null; }

  function stockTxt(n, tot) {
    if (!n) { return "Stoc epuizat"; }
    return tot === 1 ? "\u00cen stoc" : "\u00cen stoc (" + n + " din " + tot + " variante)";
  }

  function apply(text, lastMod) {
    var rows = parseCSV(text);
    if (rows.length < 100) { throw new Error("feed scurt"); }
    var h = rows[0], ci = {}, k;
    for (k = 0; k < h.length; k++) { ci[h[k]] = k; }
    if (ci.item_id === undefined || ci.price === undefined) { throw new Error("coloane"); }
    var map = {};
    for (k = 1; k < rows.length; k++) {
      var r = rows[k], id = (r[ci.item_id] || "").trim();
      if (!id) { continue; }
      var p = num(r[ci.sale_price]) || num(r[ci.price]);
      if (p) { map[id] = { p: p, s: r[ci.availability] === "in_stock" }; }
    }
    var res = {}, trs = root.querySelectorAll("tr[data-ids]"), changed = 0;
    for (k = 0; k < trs.length; k++) {
      var tr = trs[k], ids = tr.getAttribute("data-ids").split("|"), all = [], ins = [], j;
      for (j = 0; j < ids.length; j++) {
        var it = map[ids[j]];
        if (it) { all.push(it.p); if (it.s) { ins.push(it.p); } }
      }
      if (!all.length) { continue; }
      var pool = ins.length ? ins : all, min = Math.min.apply(null, pool);
      var m2 = parseFloat(tr.getAttribute("data-m2")), unit = tr.getAttribute("data-u") || "lei";
      var cp = tr.querySelector(".vm-p"), cm = tr.querySelector(".vm-m2"), cs = tr.querySelector(".vm-s");
      if (cp) {
        if (cp.getAttribute("data-v") !== min.toFixed(2)) { changed++; }
        cp.setAttribute("data-v", min.toFixed(2));
        cp.innerHTML = "de la <b>" + ro(min) + "</b> " + unit;
      }
      if (cm && m2) { cm.textContent = "\u2248 " + ro(min * m2) + " lei/m\u00b2"; }
      if (cs) { cs.textContent = stockTxt(ins.length, all.length); }
      res[tr.id.replace(/^vdM-/, "")] = { p: min, m2: m2 };
    }
    var refs = root.querySelectorAll(".vm-ref[data-ref]");
    for (k = 0; k < refs.length; k++) {
      var v = res[refs[k].getAttribute("data-ref")];
      if (!v) { continue; }
      refs[k].textContent = refs[k].getAttribute("data-k") === "m2" && v.m2 ? ro(v.p * v.m2) : ro(v.p);
    }
    var d = lastMod ? new Date(lastMod) : new Date();
    if (isNaN(d.getTime())) { d = new Date(); }
    var t = document.getElementById("vdMDate"), live = document.getElementById("vdMLive");
    if (t) {
      t.textContent = d.getDate() + " " + LUNI[d.getMonth()] + " " + d.getFullYear();
      t.setAttribute("datetime", d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2));
    }
    if (live) { live.hidden = false; }
    root.setAttribute("data-live", "1");
    root.setAttribute("data-changed", String(changed));
  }

  var lm = null;
  fetch(cfg.FEED_URL || "/feed/chatgpt.csv", { cache: "no-cache", credentials: "same-origin" })
    .then(function (r) { if (!r.ok) { throw new Error("HTTP " + r.status); } lm = r.headers.get("Last-Modified"); return r.text(); })
    .then(function (t) { apply(t, lm); })
    .catch(function () { root.setAttribute("data-live", "err"); });
})();
