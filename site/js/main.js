(function () {
  "use strict";
  var D = window.UNG;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var norm = function (s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, " "); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var poleLabel = function (k) { return k === "FC" ? "Certif." : k; };

  /* ================= En-tête ================= */
  var header = $("#header");
  window.addEventListener("scroll", function () { header.classList.toggle("scrolled", window.scrollY > 40); }, { passive: true });

  var mega = $("#mega"), openBtn = $("#menuOpen");
  function setMenu(open) {
    mega.hidden = !open; openBtn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    (open ? $("#menuClose") : openBtn).focus();
  }
  openBtn.addEventListener("click", function () { setMenu(true); });
  $("#menuClose").addEventListener("click", function () { setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !mega.hidden) setMenu(false);
    if (e.key === "Escape" && !$("#assist").hidden) { $("#assist").hidden = true; $("#fab").setAttribute("aria-expanded", "false"); $("#fab").focus(); }
    /* Le focus clavier reste dans le menu plein écran tant qu'il est ouvert */
    if (e.key === "Tab" && !mega.hidden) {
      var f = $$("a[href], button", mega).filter(function (x) { return x.offsetParent !== null; });
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  $$("#mega a[href^='#']").forEach(function (a) { a.addEventListener("click", function () { mega.hidden = true; document.body.style.overflow = ""; openBtn.setAttribute("aria-expanded", "false"); }); });

  /* ================= Hero : la photo vue à travers les barres du logo ================= */
  var BASE = [0.5, 0.92, 0.8, 1, 0.86, 0.56, 0.72, 0.6];
  var eq = $("#eq"), wrap = document.createElement("div"); wrap.className = "eq-bars"; eq.appendChild(wrap);
  var bars = BASE.map(function () { var b = document.createElement("div"); b.className = "eq-bar"; wrap.appendChild(b); return b; });
  var slide = 0, imgs = [], collapse = 1, mouseX = -1, t0 = performance.now();
  D.heroSlides.forEach(function (s, i) { var im = new Image(); im.onload = function () { if (i === slide) layout(); }; im.src = s.img; imgs[i] = im; });
  $("#eqDots").innerHTML = D.heroSlides.map(function (s, i) { return '<button type="button" aria-label="Photo ' + (i + 1) + '" aria-pressed="' + (i === 0) + '" data-i="' + i + '"></button>'; }).join("");
  function layout() {
    var im = imgs[slide]; if (!im || !im.naturalWidth) return;
    var R = wrap.getBoundingClientRect(), W = R.width, H = R.height;
    var sc = Math.max(W / im.naturalWidth, H / im.naturalHeight) * 1.1, sw = im.naturalWidth * sc, sh = im.naturalHeight * sc;
    var p = (D.heroSlides[slide].pos || "50% 50%").split(" ").map(parseFloat);
    /* le point d'intérêt de la photo est placé aux 2/3 de la hauteur, là où toutes les barres sont visibles */
    var ox = Math.min(0, Math.max(W - sw, W * 0.5 - sw * p[0] / 100));
    var oy = Math.min(0, Math.max(H - sh, H * 0.66 - sh * p[1] / 100));
    bars.forEach(function (b) {
      var L = b.offsetLeft;
      b.style.backgroundImage = "url('" + im.src + "')";
      b.style.backgroundSize = sw + "px " + sh + "px";
      b.style.backgroundPosition = (ox - L) + "px " + oy + "px";
    });
    $("#eqCaption").textContent = D.heroSlides[slide].caption;
    $$("#eqDots button").forEach(function (d) { d.setAttribute("aria-pressed", String(+d.dataset.i === slide)); });
  }
  function draw(now) {
    var t = (now - t0) / 1000;
    bars.forEach(function (b, i) {
      var h = BASE[i];
      if (!reduced) {
        h += Math.sin(t * 1.3 + i * 0.9) * 0.05;
        if (mouseX >= 0) { var d = Math.abs(mouseX - (i + 0.5) / bars.length); h += Math.max(0, 0.22 - d) * 0.9; }
      }
      h = Math.max(0.04, Math.min(1, h)) * (0.06 + 0.94 * collapse);
      b.style.clipPath = "inset(" + ((1 - h) * 100).toFixed(2) + "% 0 0 0)";
    });
    if (!reduced) requestAnimationFrame(draw);
  }
  function animateCollapse(to, dur, done) {
    if (reduced) { collapse = to; draw(performance.now()); if (done) done(); return; }
    var from = collapse, s = performance.now();
    (function step(n) { var p = Math.min(1, (n - s) / dur), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; collapse = from + (to - from) * e; if (p < 1) requestAnimationFrame(step); else if (done) done(); })(s);
  }
  function go(i) {
    if (i === slide) return;
    animateCollapse(0, 450, function () { slide = i; layout(); animateCollapse(1, 700); });
  }
  /* Rotation automatique : bouton pause, arrêt au survol / focus, désactivée si « réduire les animations » (auto-rotation-controls) */
  var userPaused = reduced, hovering = false, pauseBtn = $("#eqPause"), visual = $(".hero-visual");
  function syncPause() {
    pauseBtn.setAttribute("aria-pressed", String(userPaused));
    pauseBtn.setAttribute("aria-label", userPaused ? "Relancer le diaporama" : "Mettre le diaporama en pause");
    $(".pt", pauseBtn).textContent = userPaused ? "Lecture" : "Pause";
  }
  setInterval(function () { if (!userPaused && !hovering && !document.hidden) go((slide + 1) % D.heroSlides.length); }, 6000);
  pauseBtn.addEventListener("click", function () { userPaused = !userPaused; syncPause(); });
  visual.addEventListener("pointerenter", function () { hovering = true; });
  visual.addEventListener("pointerleave", function () { hovering = false; });
  visual.addEventListener("focusin", function () { hovering = true; });
  visual.addEventListener("focusout", function () { hovering = false; });
  syncPause();
  $("#eqDots").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; userPaused = true; syncPause(); go(+b.dataset.i); });
  eq.addEventListener("pointermove", function (e) { var r = wrap.getBoundingClientRect(); mouseX = (e.clientX - r.left) / r.width; });
  eq.addEventListener("pointerleave", function () { mouseX = -1; });
  window.addEventListener("resize", function () { layout(); if (reduced) draw(performance.now()); });
  collapse = 1; layout(); draw(performance.now());

  /* ================= Moteur « Que voulez-vous devenir ? » ================= */
  var hints = ["data scientist", "juriste du numérique", "traducteur", "ingénieur IA", "manager de club sportif", "technicien fibre optique", "community manager", "biologiste marin"];
  var hi = 0, askQ = $("#askQ");
  if (!reduced) setInterval(function () { if (document.activeElement !== askQ && !askQ.value) { hi = (hi + 1) % hints.length; askQ.placeholder = hints[hi]; } }, 2600);
  function expand(words) {
    var out = [];
    words.forEach(function (w) {
      out.push(w);
      Object.keys(D.synonyms).forEach(function (k) { if (w.indexOf(k) === 0 && w.length >= Math.min(k.length, 4)) out = out.concat(norm(D.synonyms[k]).split(" ")); });
    });
    return out.filter(function (w) { return w.length > 2; });
  }
  function search(q) {
    var words = expand(norm(q).split(/\s+/).filter(Boolean));
    if (!words.length) return [];
    return D.programs.map(function (p) {
      var jobs = norm(p.jobs.join(" | ")), title = norm(p.title), rest = norm([p.desc, (p.specs || []).join(" "), D.poles[p.pole].name].join(" "));
      var s = 0, hit = "";
      words.forEach(function (w) {
        if (jobs.indexOf(w) > -1) { s += 3; if (!hit) hit = p.jobs.filter(function (j) { return norm(j).indexOf(w) > -1; })[0]; }
        if (title.indexOf(w) > -1) s += 4;
        if (rest.indexOf(w) > -1) s += 1.5;
      });
      return { p: p, s: s, hit: hit };
    }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 4);
  }
  function showResults(q) {
    var out = $("#askOut"), r = search(q);
    out.hidden = false;
    if (!r.length) {
      out.innerHTML = "<h3>Aucune correspondance exacte</h3><p>Essayez un métier (« comptable », « développeur ») ou parcourez les <a href=\"#poles\">cinq pôles</a>.</p>";
      return;
    }
    out.innerHTML = "<h3>Vos trajectoires à l'UNG</h3>" + r.map(function (x) {
      return '<a class="match" href="#poles" data-pole="' + x.p.pole + '"><span class="bar" style="background:' + D.poles[x.p.pole].color + '"></span><span><b>' + esc(x.p.title) + "</b><small>" + (x.hit ? "Mène à : " + esc(x.hit) : esc(x.p.desc)) + "</small></span><em>" + poleLabel(x.p.pole) + " · " + x.p.level + "</em></a>";
    }).join("");
    if (window.Motion && !reduced) {
      var ms = $$(".match", out); ms.forEach(function (m) { m.style.animation = "none"; });
      window.Motion.animate(ms, { opacity: [0, 1], transform: ["translateX(-12px)", "translateX(0px)"] }, { type: "spring", stiffness: 220, damping: 22, delay: window.Motion.stagger(0.07) });
      window.Motion.animate($$(".match .bar", out), { transform: ["scaleY(0)", "scaleY(1)"] }, { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: window.Motion.stagger(0.07, { startDelay: 0.1 }) });
    }
  }
  $("#ask").addEventListener("submit", function (e) { e.preventDefault(); showResults(askQ.value || askQ.placeholder); });
  $$("[data-ask]").forEach(function (b) { b.addEventListener("click", function () { askQ.value = b.dataset.ask; showResults(b.dataset.ask); }); });
  $("#askOut").addEventListener("click", function (e) { var m = e.target.closest("[data-pole]"); if (m) openPole(m.dataset.pole); });
  $$("[data-focus-ask]").forEach(function (a) { a.addEventListener("click", function () { setTimeout(function () { askQ.focus({ preventScroll: true }); }, 500); }); });

  /* ================= Ticker ================= */
  var tick = D.news.map(function (n) { return '<a href="' + n.url + '" target="_blank" rel="noopener">' + esc(n.title) + "</a>"; });
  tick.unshift('<a href="https://ung.duaux.com/preinscription2026/" target="_blank" rel="noopener">Pré-inscriptions académiques 2026-2027 ouvertes</a>');
  $("#ticker").innerHTML = tick.join("") + tick.join("").replace(/<a /g, '<a tabindex="-1" aria-hidden="true" ');
  var tp = $("#tickerPause");
  tp.addEventListener("click", function () {
    var p = tp.getAttribute("aria-pressed") !== "true";
    tp.setAttribute("aria-pressed", String(p));
    tp.setAttribute("aria-label", p ? "Relancer le défilement des actualités" : "Arrêter le défilement des actualités");
    $(".ticker").classList.toggle("paused", p);
  });
  if (reduced) tp.hidden = true;

  /* ================= Chiffres ================= */
  var barsBox = $("#bars");
  var fmt = function (n) { return n.toLocaleString("fr-FR").replace(/ | /g, " "); };
  function countUp(el) {
    var end = +el.dataset.count, s = performance.now();
    if (window.Motion && window.Motion.animate) {
      window.Motion.animate(0, end, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: function (v) { el.textContent = fmt(Math.round(v)); } });
      return;
    }
    (function step(n) { var p = Math.min(1, (n - s) / 1300), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(Math.round(end * e)); if (p < 1) requestAnimationFrame(step); })(s);
  }
  $$("[data-count]").forEach(function (el) { el.textContent = fmt(+el.dataset.count); });
  if ("IntersectionObserver" in window && !reduced && barsBox.getBoundingClientRect().top > window.innerHeight) {
    barsBox.classList.add("grow");
    var release = function () { barsBox.classList.remove("grow"); $$("[data-count]", barsBox).forEach(countUp); io.disconnect(); };
    var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) release(); }, { threshold: .35 });
    io.observe(barsBox);
    setTimeout(function () { if (barsBox.classList.contains("grow") && barsBox.getBoundingClientRect().top < window.innerHeight) release(); }, 3000);
  }

  /* ================= Pôles ================= */
  var order = ["MPI", "STI", "SEDG", "SHS", "SVT", "FC"];
  $("#polesBox").innerHTML = order.map(function (k, i) {
    var P = D.poles[k], progs = D.programs.filter(function (p) { return p.pole === k; });
    var bg = P.img ? "background-image:url('" + P.img + "')" : "background-image:repeating-linear-gradient(90deg, rgba(61,179,146,.35) 0 10px, transparent 10px 26px)";
    return '<div class="pole' + (i === 0 ? " open" : "") + '" style="--c:' + P.color + '" data-k="' + k + '" role="button" tabindex="0" aria-expanded="' + (i === 0) + '" aria-label="Pôle ' + k + " : " + esc(P.name) + '">' +
      '<span class="pole-bg" style="' + bg + '"></span>' +
      '<span class="pole-code" data-name="' + esc(P.name) + '">' + (k === "FC" ? "CERTIF." : k) + "</span>" +
      '<div class="pole-in"><div><span class="code">' + (k === "FC" ? "PRO" : k) + "</span></div>" +
      "<div><h3>" + esc(P.name) + '</h3><p class="pitch">' + esc(P.pitch) + "</p></div>" +
      '<ul class="prog-list">' + progs.map(function (p) {
        return '<li><details><summary><span class="lv">' + p.level + '</span><span class="t">' + esc(p.title) + (p.ai ? ' <span class="ai">◆ IA</span>' : "") + '</span><span class="plus" aria-hidden="true">+</span></summary><div class="more"><span>' + esc(p.desc) + "</span>" +
          (p.specs ? "<span><b>Spécialités :</b> " + esc(p.specs.join(", ")) + "</span>" : "") + "<span><b>Débouchés :</b> " + esc(p.jobs.join(", ")) + "</span></div></details></li>";
      }).join("") + "</ul></div></div>";
  }).join("");
  function openPole(k) {
    var springy = window.Motion && !reduced && window.innerWidth > 860;
    $$(".pole").forEach(function (el) {
      var on = el.dataset.k === k;
      el.classList.toggle("open", on); el.setAttribute("aria-expanded", String(on));
      /* Motion : la largeur des barres suit un ressort (léger rebond) au lieu d'une transition linéaire */
      if (springy) window.Motion.animate(el, { flexGrow: on ? 5.2 : 1 }, { type: "spring", stiffness: 120, damping: 18 });
    });
  }
  $$(".pole").forEach(function (el) {
    el.addEventListener("click", function (e) { if (!el.classList.contains("open") && !e.target.closest("details")) openPole(el.dataset.k); });
    el.addEventListener("keydown", function (e) { if ((e.key === "Enter" || e.key === " ") && e.target === el) { e.preventDefault(); openPole(el.dataset.k); } });
  });

  /* ================= IA : carte diplômes → métiers ================= */
  $("#tracks").innerHTML = D.aiTracks.map(function (t) { return '<li><span class="c">' + t.code + "</span><span><b>" + esc(t.title) + "</b><span>" + esc(t.text) + "</span></span></li>"; }).join("");
  (function graph() {
    var svg = $("#graph"), progs = D.programs.filter(function (p) { return p.pole === "MPI" && p.title !== "Licence Mathématiques et Physique"; });
    var short = function (t) { return t.replace("Master ", "M · ").replace("Licence ", "L · "); };
    var jobs = [];
    progs.forEach(function (p) { p.jobs.slice(0, 3).forEach(function (j) { if (jobs.indexOf(j) < 0) jobs.push(j); }); });
    var H = 560, py = function (i) { return 40 + i * ((H - 80) / (progs.length - 1)); }, jy = function (i) { return 24 + i * ((H - 48) / (jobs.length - 1)); };
    var px = 210, jx = 380, html = "";
    progs.forEach(function (p, i) {
      p.jobs.slice(0, 3).forEach(function (j) {
        var k = jobs.indexOf(j), y1 = py(i), y2 = jy(k);
        html += '<path class="edge" data-p="' + i + '" data-j="' + k + '" d="M' + px + " " + y1 + " C " + (px + 90) + " " + y1 + ", " + (jx - 90) + " " + y2 + ", " + jx + " " + y2 + '"/>';
      });
    });
    progs.forEach(function (p, i) { html += '<g class="n prog" data-p="' + i + '" tabindex="0" role="button" aria-label="' + esc(p.title) + '"><circle cx="' + px + '" cy="' + py(i) + '" r="7"/><text x="' + (px - 16) + '" y="' + (py(i) + 5) + '" text-anchor="end">' + esc(short(p.title)) + "</text></g>"; });
    jobs.forEach(function (j, k) { html += '<g class="n job" data-j="' + k + '" tabindex="0" role="button" aria-label="' + esc(j) + '"><circle cx="' + jx + '" cy="' + jy(k) + '" r="5"/><text x="' + (jx + 14) + '" y="' + (jy(k) + 4.5) + '">' + esc(j) + "</text></g>"; });
    svg.innerHTML = html;
    function light(attr, v) {
      svg.classList.add("dim");
      var ps = {}, js = {};
      $$(".edge", svg).forEach(function (e) { var on = e.dataset[attr] === v; e.classList.toggle("on", on); if (on) { ps[e.dataset.p] = 1; js[e.dataset.j] = 1; } });
      $$(".n", svg).forEach(function (n) { n.classList.toggle("on", n.dataset.p != null ? !!ps[n.dataset.p] : !!js[n.dataset.j]); });
    }
    function clear() { svg.classList.remove("dim"); $$(".on", svg).forEach(function (e) { e.classList.remove("on"); }); }
    $$(".n", svg).forEach(function (n) {
      var a = n.dataset.p != null ? "p" : "j", v = n.dataset.p != null ? n.dataset.p : n.dataset.j;
      n.addEventListener("mouseenter", function () { light(a, v); });
      n.addEventListener("focus", function () { light(a, v); });
      n.addEventListener("click", function () { light(a, v); });
      n.addEventListener("mouseleave", clear);
      n.addEventListener("blur", clear);
    });
    light("p", "1"); setTimeout(function () { if (!svg.matches(":hover")) clear(); }, 2500);
  })();

  /* ================= ENO ================= */
  $("#enoList").innerHTML = D.eno.map(function (e, i) {
    return '<li><button type="button" aria-expanded="false" data-i="' + i + '"><span class="sig" aria-hidden="true"><i></i><i></i><i></i><i></i></span>ENO ' + e.id + "</button></li>";
  }).join("") + '<li class="eno-note" id="enoNote" hidden></li>';
  $("#enoList").addEventListener("click", function (ev) {
    var b = ev.target.closest("button"); if (!b) return;
    var open = b.getAttribute("aria-expanded") !== "true", e = D.eno[+b.dataset.i], note = $("#enoNote");
    $$("#enoList button").forEach(function (x) { x.setAttribute("aria-expanded", "false"); });
    b.setAttribute("aria-expanded", String(open));
    note.hidden = !open;
    if (open) note.innerHTML = "<b>ENO " + e.id + "</b> · " + esc(e.host) + ". " + esc(e.note);
  });

  /* ================= À la une ================= */
  $("#uneGrid").innerHTML = D.news.map(function (n, i) {
    return '<a class="story' + (i === 0 ? " feature" : "") + '" href="' + n.url + '" target="_blank" rel="noopener"><div class="story-img"><img src="' + n.img + '" alt="" loading="lazy"><span class="tag">' + esc(n.tag) + "</span></div><time>" + esc(n.date) + "</time><h3>" + esc(n.title) + "</h3>" + (n.text ? "<p>" + esc(n.text) + "</p>" : "") + "</a>";
  }).join("");

  /* ================= Partenaires ================= */
  $("#partners").innerHTML = D.partners.map(function (p) {
    var tag = p.url ? "a" : "div";
    return "<" + tag + ' class="partner"' + (p.url ? ' href="' + p.url + '" target="_blank" rel="noopener"' : "") + '><img src="' + p.logo + '" alt="Logo ' + esc(p.full) + '" loading="lazy"><b>' + esc(p.name) + "</b><span>" + esc(p.what) + "</span></" + tag + ">";
  }).join("");

  /* ================= Copier ================= */
  $$(".copy").forEach(function (b) {
    b.addEventListener("click", function () {
      var done = function () { b.textContent = "Copié"; setTimeout(function () { b.textContent = "Copier"; }, 1500); };
      var fallback = function () { var r = document.createRange(); r.selectNodeContents(b.parentNode.firstChild); var s = getSelection(); s.removeAllRanges(); s.addRange(r); };
      if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.copy).then(done, fallback); else fallback();
    });
  });

  /* ================= Assistant UNG ================= */
  var fab = $("#fab"), box = $("#assist"), log = $("#assistLog");
  var faq = [
    { k: ["inscri", "admission", "candidat", "rejoindre", "preinscription"], a: 'Les pré-inscriptions 2026-2027 se font en ligne : <a href="https://ung.duaux.com/preinscription2026/" target="_blank" rel="noopener">formulaire de pré-inscription</a>. L\'UNG étudie ensuite votre dossier.' },
    { k: ["ia", "intelligence", "data", "donnee", "machine", "big"], a: 'Le pôle MPI propose la Licence Informatique (spécialité IA, Big Data…) et les Masters IA, Big Data, Ingénierie des données et Data analyse. <a href="#ia">Voir la carte IA</a>.' },
    { k: ["cours", "classe", "plateforme", "connexion", "myung", "portail", "moodle"], a: 'Les cours se suivent sur la <a href="https://ung-educ.org/login/index.php" target="_blank" rel="noopener">classe virtuelle</a>. Le <a href="https://ung.duaux.com/" target="_blank" rel="noopener">portail UNG</a> et l\'application <a href="https://my.duaux.com/#/login" target="_blank" rel="noopener">MyUNG</a> gèrent la scolarité.' },
    { k: ["eno", "espace", "ordinateur", "salle", "internet"], a: 'Six Espaces Numériques Ouverts accueillent les étudiants à Libreville : INSG, USS, UOB, ENS, ENSET et CFEP-TIC. <a href="#eno">Voir les ENO</a>.' },
    { k: ["contact", "telephone", "adresse", "email", "mail", "joindre"], a: "Siège : 76 Impasse Gnambault, Batterie IV, Libreville. Tél. : +241 60 17 94 88. E-mail : contact@ung.ga." },
    { k: ["certif", "continue", "professionnel", "travail"], a: 'Pour les professionnels : 8 certifications (mobile, communication et stratégie digitales, réseaux sociaux, infographie, multimédia, HTML, ingénierie pédagogique) et des executive masters. <a href="#poles" data-pole="FC">Voir les certifications</a>.' },
    { k: ["diplome", "reconnu", "etat", "valeur"], a: "Les diplômes de l'UNG, université publique, sont reconnus par l'État gabonais." },
    { k: ["frais", "prix", "cout", "tarif", "payer", "bourse"], a: "Les frais de scolarité ne sont pas encore publiés sur ce site. Contactez l'UNG au +241 60 17 94 88 ou à contact@ung.ga." }
  ];
  function say(html, who) { var m = document.createElement("div"); m.className = "msg " + who; m.innerHTML = html; log.appendChild(m); log.scrollTop = log.scrollHeight; }
  function answer(q) {
    var n = " " + norm(q) + " ", best = null, bs = 0;
    faq.forEach(function (f) { var s = f.k.filter(function (k) { return k.length < 3 ? n.indexOf(" " + k + " ") > -1 : n.indexOf(k) > -1; }).length; if (s > bs) { bs = s; best = f; } });
    if (best) return best.a;
    var r = search(q);
    if (r.length) return "Ces formations pourraient vous intéresser : " + r.slice(0, 3).map(function (x) { return "<b>" + esc(x.p.title) + "</b>"; }).join(", ") + '. <a href="#poles" data-pole="' + r[0].p.pole + '">Voir le pôle</a>.';
    return "Je n'ai pas encore la réponse. Écrivez à contact@ung.ga ou appelez le +241 60 17 94 88.";
  }
  function ask(q) {
    say(esc(q), "me");
    if (reduced) { say(answer(q), "bot"); return; }
    var t = document.createElement("div"); t.className = "msg bot typing"; t.setAttribute("aria-label", "L'assistant écrit"); t.innerHTML = "<i></i><i></i><i></i>"; log.appendChild(t); log.scrollTop = log.scrollHeight;
    setTimeout(function () { t.remove(); say(answer(q), "bot"); }, 650);
  }
  say("Bonjour ! Je réponds aux questions sur les formations, les inscriptions, les ENO et les plateformes de l'UNG.", "bot");
  var sg = document.createElement("div"); sg.className = "sugg";
  ["Comment s'inscrire ?", "Formations en IA", "Où suivre les cours ?", "Les ENO", "Contact"].forEach(function (t) { var b = document.createElement("button"); b.type = "button"; b.textContent = t; b.addEventListener("click", function () { ask(t); }); sg.appendChild(b); });
  log.appendChild(sg);
  function setAssist(open) {
    box.hidden = !open; fab.setAttribute("aria-expanded", String(open));
    if (open && window.Motion && !reduced) {
      box.style.animation = "none"; box.style.transformOrigin = "bottom right";
      window.Motion.animate(box, { opacity: [0, 1], transform: ["scale(.9) translateY(12px)", "scale(1) translateY(0px)"] }, { type: "spring", stiffness: 260, damping: 22 });
    }
    if (open) $("#assistQ").focus();
  }
  fab.addEventListener("click", function () { setAssist(box.hidden); });
  $("#assistClose").addEventListener("click", function () { setAssist(false); fab.focus(); });
  $("#assistForm").addEventListener("submit", function (e) { e.preventDefault(); var v = $("#assistQ").value.trim(); if (v) { ask(v); $("#assistQ").value = ""; } });
  log.addEventListener("click", function (e) { var a = e.target.closest("a[data-pole]"); if (a) openPole(a.dataset.pole); if (e.target.closest("a[href^='#']") && window.innerWidth < 700) setAssist(false); });

  /* ================= Vie de la page : progression, navigation active, apparitions, survols ================= */
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* Barre de progression de lecture + bouton « retour en haut » */
  var prog = $("#progress"), toTop = $("#toTop"), ticking = false;
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    prog.style.transform = "scaleX(" + (max > 0 ? h.scrollTop / max : 0) + ")";
    toTop.classList.toggle("show", h.scrollTop > 900);
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); $(".logo").focus({ preventScroll: true }); });

  /* Lien de navigation actif selon la section visible */
  if ("IntersectionObserver" in window) {
    var links = $$(".nav a"), map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) { links.forEach(function (l) { l.classList.remove("active"); l.removeAttribute("aria-current"); }); map[e.target.id].classList.add("active"); map[e.target.id].setAttribute("aria-current", "location"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* Apparition au défilement (ui-ux-pro-max « Scroll Reveal subtil ») :
     seuls les éléments sous la ligne de flottaison sont masqués, et tout s'affiche au plus tard après 4 s */
  var revealSel = ".sec-head, .fig-head, .story, .labs-grid article, .tracks li, .dirs div, .partner, .steps li, .values div, .life-text, .life-collage img, .voice-portrait, .voice-text blockquote, .eno-panel > *, .admit-visual, .ia-map";
  var M = window.Motion, useMotion = !!(M && M.animate && M.inView) && !reduced;
  if (useMotion) document.documentElement.classList.add("has-motion");

  if (useMotion) {
    /* Avec Motion : apparition à ressort, groupe par groupe, en cascade (stagger).
       Seuls les éléments sous la ligne de flottaison partent masqués ; filet de sécurité à 4 s. */
    var pending = new Map();
    $$(revealSel).forEach(function (el) {
      if (el.getBoundingClientRect().top <= window.innerHeight * 0.92) return;
      el.style.opacity = "0"; el.style.transform = "translateY(18px)";
      var k = el.parentNode; if (!pending.has(k)) pending.set(k, []); pending.get(k).push(el);
    });
    var show = function (els) {
      M.animate(els, { opacity: 1, transform: "translateY(0px)" }, { type: "spring", stiffness: 170, damping: 22, delay: M.stagger(0.06) });
    };
    pending.forEach(function (els, parent) {
      var stop = M.inView(parent, function () { show(els); }, { margin: "0px 0px -8% 0px" });
      setTimeout(function () { if (els[0].style.opacity === "0" && parent.getBoundingClientRect().top < window.innerHeight) { stop(); show(els); } }, 4000);
    });
    /* Filet de sécurité : si une animation n'a pas pu tourner, le contenu vu à l'écran s'affiche quand même */
    var rescue = function () {
      pending.forEach(function (els) { els.forEach(function (el) { if (getComputedStyle(el).opacity === "0" && el.getBoundingClientRect().top < window.innerHeight) { el.style.opacity = "1"; el.style.transform = "none"; } }); });
    };
    setTimeout(rescue, 6000);
    window.addEventListener("scroll", function () { clearTimeout(rescue.t); rescue.t = setTimeout(rescue, 1500); }, { passive: true });
  } else if ("IntersectionObserver" in window && !reduced) {
    var groups = new Map();
    $$(revealSel).forEach(function (el) {
      el.classList.add("reveal");
      var k = el.parentNode, i = groups.get(k) || 0; groups.set(k, i + 1);
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) { el.classList.add("pre"); el.style.setProperty("--d", Math.min(i, 6) * 0.07 + "s"); }
    });
    var rio = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target; el.classList.remove("pre"); rio.unobserve(el);
        setTimeout(function () { el.style.setProperty("--d", "0s"); }, 1100); /* les survols suivants restent immédiats */
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$(".reveal.pre").forEach(function (el) { rio.observe(el); });
    setTimeout(function () { $$(".reveal.pre").forEach(function (el) { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.remove("pre"); }); }, 4000);
  }

  if (useMotion) {
    /* Entrée du bandeau : le cercle du logo « respire » une fois (il part visible, à 94 %), puis les pastilles arrivent */
    M.animate($("#eq"), { transform: ["scale(.94)", "scale(1)"] }, { type: "spring", stiffness: 90, damping: 12 });
    M.animate($$(".fchip"), { opacity: [0.4, 1], scale: [0.85, 1] }, { type: "spring", stiffness: 200, damping: 14, delay: M.stagger(0.12, { startDelay: 0.3 }) });
    /* Lien actif du menu : petit rebond quand il change */
    new MutationObserver(function (list) {
      list.forEach(function (m) { if (m.target.classList.contains("active")) M.animate(m.target, { transform: ["scale(.92)", "scale(1)"] }, { type: "spring", stiffness: 400, damping: 15 }); });
    }).observe($(".nav"), { subtree: true, attributes: true, attributeFilter: ["class"] });
    /* Repassage en mobile : on rend la main au CSS pour la hauteur des pôles */
    window.addEventListener("resize", function () { if (window.innerWidth <= 860) $$(".pole").forEach(function (p) { p.style.flexGrow = ""; }); });
  }

  if (fine && !reduced) {
    /* Pastilles flottantes du bandeau : léger effet de profondeur suivant la souris */
    var hero = $(".hero"), chips = $$(".fchip");
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      chips.forEach(function (c) { var d = +c.dataset.depth; c.style.translate = (-x * d).toFixed(1) + "px " + (-y * d).toFixed(1) + "px"; });
    });
    hero.addEventListener("pointerleave", function () { chips.forEach(function (c) { c.style.translate = "0 0"; }); });

    /* Boutons principaux « aimantés » */
    $$(".btn-vert, .ask-row button").forEach(function (b) {
      b.addEventListener("pointermove", function (e) { var r = b.getBoundingClientRect(); b.style.translate = ((e.clientX - r.left - r.width / 2) * 0.15).toFixed(1) + "px " + ((e.clientY - r.top - r.height / 2) * 0.25).toFixed(1) + "px"; });
      b.addEventListener("pointerleave", function () { b.style.translate = "0 0"; });
    });

    /* Cartes d'actualité inclinées en 3D au survol */
    $$(".story").forEach(function (c) {
      c.addEventListener("pointermove", function (e) { var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; c.style.transform = "perspective(900px) rotateY(" + (x * 6).toFixed(2) + "deg) rotateX(" + (-y * 6).toFixed(2) + "deg) translateY(-4px)"; });
      c.addEventListener("pointerleave", function () { c.style.transform = ""; });
    });

    /* Halo lumineux qui suit la souris sur les propositions IA */
    $$(".labs-grid article").forEach(function (c) {
      c.addEventListener("pointermove", function (e) { var r = c.getBoundingClientRect(); c.style.setProperty("--mx", (e.clientX - r.left) + "px"); c.style.setProperty("--my", (e.clientY - r.top) + "px"); });
    });
  }
})();
