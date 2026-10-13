/* Crowned360 Beauty Bar — site.js (vanilla, no libraries) */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Header state ---- */
  var header = doc.querySelector('.site-header');
  function onHeader() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }

  /* ---- Mobile menu ---- */
  var btn = doc.querySelector('.menu-btn'), menu = doc.getElementById('mobile-menu');
  function setMenu(open) {
    if (!btn || !menu) return;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.querySelector('.lbl').textContent = open ? 'Close' : 'Menu';
    menu.classList.toggle('open', open);
    doc.body.classList.toggle('menu-open', open);
    if (open) { var f = menu.querySelector('a'); if (f) f.focus(); }
  }
  if (btn && menu) {
    btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); btn.focus(); } });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1000) setMenu(false); });
  }

  /* ---- Reveal + sheen + count-up + circle clips ---- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count')), dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce || isNaN(target)) return;
    var start = null, dur = 1600;
    function step(t) {
      if (!start) start = t;
      var p = Math.min(1, (t - start) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(step); else el.textContent = target.toFixed(dec) + suffix;
    }
    el.textContent = (0).toFixed(dec) + suffix;
    requestAnimationFrame(step);
  }
  var watch = doc.querySelectorAll('.reveal, .sheen, .circ, [data-count]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        if (el.hasAttribute('data-count')) countUp(el);
        el.classList.add(el.classList.contains('sheen') ? 'lit' : 'in');
        if (el.classList.contains('sheen') && el.classList.contains('reveal')) el.classList.add('in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    watch.forEach(function (el) { io.observe(el); });
  } else {
    watch.forEach(function (el) { el.classList.add('in', 'lit'); });
  }

  /* ---- Rotating ring text (scroll-linked) ---- */
  var rotors = doc.querySelectorAll('[data-ring]');
  /* ---- Pinned 360 pillars ---- */
  var pill = doc.querySelector('.pillars');
  var desktop = window.matchMedia('(min-width: 1024px) and (min-height: 620px)');
  var pillars = pill ? pill.querySelectorAll('.pillar') : [];
  var discs = pill ? pill.querySelectorAll('.discs img') : [];
  var arcs = pill ? pill.querySelectorAll('.arc') : [];
  var labels = pill ? pill.querySelectorAll('.arc-label') : [];
  var ticks = pill ? pill.querySelectorAll('.pillar-progress i') : [];
  var rotor = pill ? pill.querySelector('.rotor') : null;
  var active = -1;
  function setPinned() {
    if (!pill) return;
    var on = desktop.matches && !reduce;
    pill.classList.toggle('is-pinned', on);
    active = -1;
    if (!on) pillars.forEach(function (p) { p.classList.remove('active'); p.removeAttribute('aria-hidden'); });
  }
  function setActive(i) {
    if (i === active) return; active = i;
    pillars.forEach(function (p, k) { p.classList.toggle('active', k === i); p.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
    discs.forEach(function (p, k) { p.classList.toggle('on', k === i); });
    arcs.forEach(function (p, k) { p.classList.toggle('on', k === i); });
    labels.forEach(function (p, k) { p.classList.toggle('on', k === i); });
    ticks.forEach(function (p, k) { p.classList.toggle('on', k === i); });
    if (rotor) rotor.style.transform = 'rotate(' + (-90 * i) + 'deg)';
  }
  function onPillars() {
    if (!pill || !pill.classList.contains('is-pinned')) return;
    var r = pill.getBoundingClientRect();
    var total = pill.offsetHeight - window.innerHeight;
    var p = Math.min(0.9999, Math.max(0, -r.top / Math.max(1, total)));
    setActive(Math.floor(p * 4));
  }
  if (pill) {
    setPinned();
    if (desktop.addEventListener) desktop.addEventListener('change', function () { setPinned(); onPillars(); });
  }

  var ticking = false;
  function frame() {
    ticking = false;
    onHeader();
    if (!reduce) {
      var y = window.scrollY;
      rotors.forEach(function (g) {
        var k = parseFloat(g.getAttribute('data-ring')) || 0.12;
        g.style.transform = 'rotate(' + (y * k) % 360 + 'deg)';
      });
    }
    onPillars();
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  window.addEventListener('resize', function () { requestAnimationFrame(frame); });
  frame();

  /* ---- Services: highlight current category chip ---- */
  var chips = doc.querySelectorAll('.menu-nav a');
  if (chips.length && 'IntersectionObserver' in window) {
    var map = {};
    chips.forEach(function (c) { map[c.getAttribute('href').slice(1)] = c; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          chips.forEach(function (c) { c.classList.remove('on'); });
          var c = map[en.target.id]; c.classList.add('on');
          var sc = c.parentElement; if (sc && sc.scrollTo) sc.scrollTo({ left: c.offsetLeft - 16, behavior: reduce ? 'auto' : 'smooth' });
        }
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    doc.querySelectorAll('.menu-sec').forEach(function (s) { so.observe(s); });
  }

  /* ---- Gallery filter + lightbox ---- */
  var fbtns = doc.querySelectorAll('.filters button');
  fbtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      fbtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      doc.querySelectorAll('.g-grid .g').forEach(function (g) {
        var show = f === 'all' || (g.getAttribute('data-cat') || '').indexOf(f) > -1;
        g.classList.toggle('hide', !show);
        if (show) g.classList.add('in');
      });
    });
  });
  var lb = doc.getElementById('lightbox');
  if (lb && typeof lb.showModal === 'function') {
    var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('figcaption');
    doc.querySelectorAll('.g-open').forEach(function (b) {
      b.addEventListener('click', function () {
        var img = b.querySelector('img');
        lbImg.src = b.getAttribute('data-full'); lbImg.alt = img.alt;
        lbImg.width = img.width; lbImg.height = img.height;
        lbCap.textContent = img.alt;
        lb.showModal();
      });
    });
    lb.querySelector('.lb-close').addEventListener('click', function () { lb.close(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  } else {
    doc.querySelectorAll('.g-open').forEach(function (b) { b.addEventListener('click', function () { window.location.href = b.getAttribute('data-full'); }); });
  }

  /* ---- Hours: mark today ---- */
  var today = doc.querySelector('.hours tr[data-day="' + new Date().getDay() + '"]');
  if (today) today.classList.add('today');

  /* ---- Netlify form ---- */
  var form = doc.querySelector('form[data-netlify]');
  if (form) {
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) {
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (inp) {
        var f = inp.closest('.field'), valid = inp.value.trim() !== '' && (inp.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim()));
        if (inp.type === 'tel') valid = inp.value.replace(/\D/g, '').length >= 10;
        if (f) f.classList.toggle('invalid', !valid);
        inp.setAttribute('aria-invalid', valid ? 'false' : 'true');
        if (!valid && ok) { inp.focus(); ok = false; }
      });
      e.preventDefault();
      if (!ok) return;
      var data = new URLSearchParams(new FormData(form)).toString();
      var done = function () {
        form.hidden = true;
        var s = doc.getElementById('form-success'); s.classList.add('show'); s.focus();
      };
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data })
        .then(function (r) { if (r.ok) done(); else throw new Error(r.status); })
        .catch(function () {
          var s = doc.getElementById('form-error'); if (s) { s.hidden = false; s.focus(); }
        });
    });
  }

  var yr = doc.querySelectorAll('[data-year]');
  yr.forEach(function (y) { y.textContent = new Date().getFullYear(); });
})();
