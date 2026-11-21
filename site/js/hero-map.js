/* Bandeau motion design : le Gabon relié par l'UNG.
   Séquence maîtrisée, au rythme d'une présentation institutionnelle :
   1. les 9 provinces se dessinent ; 2. Libreville (siège et ENO) s'allume ;
   3. des liaisons partent vers chaque chef-lieu ; 4. des « paquets de savoir » circulent en continu ;
   en fond, la courbe des temps forts de l'UNG se trace et ses jalons apparaissent.
   Tout est statique (état final) si l'utilisateur a demandé de réduire les animations. */
(function () {
  "use strict";
  var G = window.GABON, svg = document.getElementById("gabonMap");
  if (!G || !svg) return;
  var NS = "http://www.w3.org/2000/svg";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var M = window.Motion && window.Motion.animate ? window.Motion : null;
  var el = function (tag, attrs, parent) { var n = document.createElementNS(NS, tag); for (var k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };
  var ease = [0.22, 1, 0.36, 1];
  var tween = function (node, kf, opt) {
    if (reduced) { for (var k in kf) node.style[k] = Array.isArray(kf[k]) ? kf[k][kf[k].length - 1] : kf[k]; return; }
    if (M) return M.animate(node, kf, opt);
    var a = {}; for (var k2 in kf) a[k2] = kf[k2];
    return node.animate(a, { duration: (opt.duration || 0.6) * 1000, delay: (opt.delay || 0) * 1000, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" });
  };

  /* ---------- Construction de la carte ---------- */
  var defs = el("defs", {}, svg);
  var glow = el("radialGradient", { id: "hubGlow" }, defs);
  el("stop", { offset: "0", "stop-color": "#3DB392", "stop-opacity": ".55" }, glow);
  el("stop", { offset: "1", "stop-color": "#3DB392", "stop-opacity": "0" }, glow);

  var gLand = el("g", { class: "m-land" }, svg);
  var hub = G.provinces.filter(function (p) { return p.city === "Libreville"; })[0];
  var provs = G.provinces.map(function (p, i) {
    var path = el("path", { d: p.d, class: "m-prov" + (p === hub ? " is-hub" : ""), tabindex: "0", role: "img", "aria-label": p.name + ", chef-lieu " + p.city }, gLand);
    path.dataset.i = i;
    return path;
  });
  var eq = el("g", { class: "m-equator" }, svg);
  el("line", { x1: 0, x2: G.w, y1: G.equator, y2: G.equator }, eq);
  var eqT = el("text", { x: G.w - 6, y: G.equator - 8, "text-anchor": "end" }, eq); eqT.textContent = "Équateur 0°";

  var gArcs = el("g", { class: "m-arcs" }, svg);
  var gDots = el("g", { class: "m-dots" }, svg);
  var gNodes = el("g", { class: "m-nodes" }, svg);

  /* Liaisons courbes Libreville → chef-lieu (le bombé dépend de la direction pour éviter les croisements) */
  var others = G.provinces.filter(function (p) { return p !== hub; });
  var links = others.map(function (p) {
    var dx = p.x - hub.x, dy = p.y - hub.y, len = Math.sqrt(dx * dx + dy * dy);
    var bend = Math.min(90, len * 0.28), nx = -dy / len, ny = dx / len;
    var cx = (hub.x + p.x) / 2 + nx * bend, cy = (hub.y + p.y) / 2 + ny * bend;
    var path = el("path", { d: "M" + hub.x + " " + hub.y + " Q" + cx.toFixed(1) + " " + cy.toFixed(1) + " " + p.x + " " + p.y, class: "m-arc" }, gArcs);
    var L = path.getTotalLength();
    path.style.strokeDasharray = L + " " + L; path.style.strokeDashoffset = L;
    var dot = el("circle", { r: 4.5, class: "m-packet", opacity: 0 }, gDots);
    var node = el("g", { class: "m-node", transform: "translate(" + p.x + " " + p.y + ")" }, gNodes);
    el("circle", { r: 14, class: "m-ring" }, node);
    el("circle", { r: 5.5, class: "m-city" }, node);
    var right = p.x < 470;
    var t = el("text", { x: right ? 11 : -11, y: 4, "text-anchor": right ? "start" : "end", class: "m-label" }, node); t.textContent = p.city;
    node.style.opacity = 0;
    return { p: p, path: path, L: L, dot: dot, node: node };
  });

  /* Libreville : halo, anneaux et étiquette « UNG » avec les barres du logo */
  var gHub = el("g", { class: "m-hub", transform: "translate(" + hub.x + " " + hub.y + ")" }, svg);
  el("circle", { r: 46, fill: "url(#hubGlow)" }, gHub);
  el("circle", { r: 20, class: "m-hub-ring r1" }, gHub);
  el("circle", { r: 20, class: "m-hub-ring r2" }, gHub);
  el("circle", { r: 9, class: "m-hub-core" }, gHub);
  var badge = el("g", { class: "m-badge", transform: "translate(-64 -58)" }, gHub);
  el("rect", { x: 0, y: 0, width: 132, height: 30, rx: 15 }, badge);
  [[12, 9], [17, 15], [22, 11], [27, 17], [32, 7]].forEach(function (b) { el("rect", { x: b[0], y: 22 - b[1], width: 3, height: b[1], class: "m-bar" }, badge); });
  var bt = el("text", { x: 42, y: 20 }, badge); bt.textContent = "UNG · Libreville";
  gHub.style.opacity = 0;

  /* ---------- Info-bulle des provinces (souris et clavier) ---------- */
  var tip = document.getElementById("mapTip"), fig = svg.parentNode;
  function showTip(i, evt) {
    var p = G.provinces[i], isHub = p === hub;
    tip.innerHTML = "<b>" + p.name + "</b><span>Chef-lieu : " + p.city + "</span><span>" + (isHub ? "Siège de l'UNG et 6 Espaces Numériques Ouverts" : "Cours en ligne accessibles depuis la province") + "</span>";
    tip.hidden = false;
    var r = fig.getBoundingClientRect(), x, y;
    if (evt && evt.clientX) { x = evt.clientX - r.left; y = evt.clientY - r.top; }
    else { var pt = svg.createSVGPoint(); pt.x = p.x; pt.y = p.y; var s = pt.matrixTransform(svg.getScreenCTM()); x = s.x - r.left; y = s.y - r.top; }
    tip.style.left = Math.min(Math.max(x, 90), r.width - 90) + "px"; tip.style.top = Math.max(y - 16, 40) + "px";
  }
  provs.forEach(function (pp) {
    pp.addEventListener("pointermove", function (e) { showTip(+pp.dataset.i, e); });
    pp.addEventListener("pointerleave", function () { tip.hidden = true; });
    pp.addEventListener("focus", function () { showTip(+pp.dataset.i); });
    pp.addEventListener("blur", function () { tip.hidden = true; });
  });

  /* ---------- Courbe des temps forts (fond du bandeau) ---------- */
  var steps = [
    { x: 5, y: 86, d: "Avr. 2025", t: "Partenariat avec l'UVCI" },
    { x: 22, y: 76, d: "Mai 2025", t: "Personnel formé à la techno-pédagogie" },
    { x: 39, y: 64, d: "Juin 2025", t: "Inauguration d'un ENO" },
    { x: 57, y: 50, d: "Oct. 2025", t: "Agrégation CAMES à Libreville" },
    { x: 76, y: 33, d: "2026-2027", t: "Pré-inscriptions ouvertes" },
    { x: 95, y: 14, d: "Oct. 2026", t: "Semaine du Numérique" }
  ];
  var line = document.getElementById("curveLinePath"), area = document.getElementById("curveArea");
  if (line && area) {
    var P = steps.map(function (s) { return [s.x * 10, s.y * 3]; }), d = "M" + P[0][0] + " " + P[0][1];
    for (var i = 1; i < P.length; i++) { var a = P[i - 1], b = P[i], mx = (a[0] + b[0]) / 2; d += " C" + mx + " " + a[1] + " " + mx + " " + b[1] + " " + b[0] + " " + b[1]; }
    line.setAttribute("d", d);
    area.setAttribute("d", d + " L" + P[P.length - 1][0] + " 300 L" + P[0][0] + " 300 Z");
    /* Le tracé se dévoile de gauche à droite par un masque (compatible avec l'étirement du SVG) */
    line.style.clipPath = reduced ? "inset(0 0 0 0)" : "inset(0 100% 0 0)";
    area.style.clipPath = line.style.clipPath;
    var ol = document.getElementById("milestones");
    ol.innerHTML = steps.map(function (s, k) {
      return '<li class="ms' + (k === steps.length - 1 ? " ms-now" : "") + '" style="left:' + s.x + "%;top:" + s.y + '%"><i></i><span><time>' + s.d + "</time>" + s.t + "</span></li>";
    }).join("");
  }

  /* ---------- Séquence ---------- */
  var live = document.getElementById("liveCount"), nLive = 0;
  function finalState() {
    provs.forEach(function (p) { p.style.opacity = 1; p.classList.add("drawn"); });
    links.forEach(function (l) { l.path.style.strokeDashoffset = 0; l.node.style.opacity = 1; });
    gHub.style.opacity = 1; live.textContent = links.length;
    if (line) { line.style.clipPath = "inset(0 0 0 0)"; area.style.clipPath = "inset(0 0 0 0)"; }
    document.querySelectorAll(".ms").forEach(function (m) { m.classList.add("on"); });
  }
  if (reduced) { finalState(); return; }

  /* 1. Provinces : contour qui se trace puis remplissage */
  provs.forEach(function (p, k) {
    var L = p.getTotalLength(); p.style.strokeDasharray = L + " " + L; p.style.strokeDashoffset = L;
    tween(p, { strokeDashoffset: [L, 0] }, { duration: 1.4, delay: 0.1 + k * 0.08, ease: ease });
    setTimeout(function () { p.classList.add("drawn"); }, 900 + k * 80);
  });
  /* 2. Libreville */
  setTimeout(function () { tween(gHub, { opacity: [0, 1], transform: ["translate(" + hub.x + "px," + hub.y + "px) scale(.4)", "translate(" + hub.x + "px," + hub.y + "px) scale(1)"] }, { type: "spring", stiffness: 160, damping: 14, duration: 0.8 }); }, 1300);
  /* 3. Liaisons, une par une, dans l'ordre des distances */
  links.slice().sort(function (a, b) { return a.L - b.L; }).forEach(function (l, k) {
    var t0 = 1800 + k * 260;
    setTimeout(function () {
      tween(l.path, { strokeDashoffset: [l.L, 0] }, { duration: 0.9, ease: ease });
      setTimeout(function () {
        tween(l.node, { opacity: [0, 1] }, { duration: 0.4 });
        l.node.classList.add("lit"); nLive++; live.textContent = nLive;
      }, 820);
    }, t0);
  });
  /* 4. Courbe et jalons */
  if (line) {
    setTimeout(function () {
      [line, area].forEach(function (n) { tween(n, { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] }, { duration: 3.2, ease: [0.45, 0, 0.2, 1] }); });
      document.querySelectorAll(".ms").forEach(function (m, k) { setTimeout(function () { m.classList.add("on"); }, 300 + k * 430); });
    }, 900);
  }
  /* 5. Circulation continue des « paquets de savoir » (seulement quand le bandeau est visible) */
  var running = true, start = null;
  if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { running = en[0].isIntersecting; if (running) requestAnimationFrame(loop); }).observe(svg);
  function loop(ts) {
    if (!running) return;
    if (!start) start = ts;
    var t = (ts - start) / 1000 - 4.2;
    links.forEach(function (l, k) {
      if (t < 0) return;
      var period = 3.4, u = ((t + k * 0.43) % period) / period;
      if (u < 0.82) {
        var q = u / 0.82, e = q < .5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2, pt = l.path.getPointAtLength(e * l.L);
        l.dot.setAttribute("cx", pt.x); l.dot.setAttribute("cy", pt.y); l.dot.setAttribute("opacity", q < .1 ? q * 10 : q > .9 ? (1 - q) * 10 : 1);
        l.arrived = false;
      } else {
        l.dot.setAttribute("opacity", 0);
        if (!l.arrived) { l.arrived = true; l.node.classList.remove("ping"); void l.node.getBBox(); l.node.classList.add("ping"); }
      }
    });
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
  /* Filet de sécurité : si une animation ne peut pas tourner, l'état final s'affiche */
  setTimeout(function () { if (nLive < links.length) finalState(); }, 7000);
})();
