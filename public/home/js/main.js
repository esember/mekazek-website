/* ============================================================
   SINAPS — Interaction & animation engine
   Path-based router (History API), page transitions, scroll
   animations, hero canvas, counters, chat demo, and the
   project page generator. Base path: /home
   ============================================================ */

(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const BASE = '/home';

  /* ---------- per-page cleanup ---------- */
  let observers = [];
  let canvasCtl = null;
  let chatCtl = null;
  let tlHandler = null;

  function clearPageArtifacts() {
    observers.forEach(o => o.disconnect());
    observers = [];
    if (chatCtl) { chatCtl.stop(); chatCtl = null; }
    if (tlHandler) { window.removeEventListener('scroll', tlHandler); tlHandler = null; }
  }

  /* ============================================================
     ROUTER (path based, History API)
     ============================================================ */
  const KNOWN = ['services', 'projects', 'about', 'contact'];

  function parseRoute() {
    // strip BASE prefix, leading/trailing slashes
    let path = location.pathname;
    if (path.startsWith(BASE)) path = path.slice(BASE.length);
    path = path.replace(/^\/+|\/+$/g, '');
    const parts = path ? path.split('/') : [];
    if (parts[0] === 'projects' && parts[1]) return { page: 'project-detail', slug: parts[1] };
    if (KNOWN.includes(parts[0])) return { page: parts[0] };
    return { page: 'home' };
  }

  function pageTitle(route) {
    const map = {
      home: 'Sinaps — Automation & Agentic AI Consulting',
      services: 'Services — Sinaps',
      projects: 'Projects — Sinaps',
      about: 'About — Sinaps',
      contact: 'Contact — Sinaps'
    };
    if (route.page === 'project-detail') {
      const p = PROJECTS.find(x => x.slug === route.slug);
      return (p ? p.title : 'Project') + ' — Sinaps';
    }
    return map[route.page];
  }

  function setActiveNav(route) {
    const key = route.page === 'project-detail' ? 'projects' : route.page;
    $$('[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === key));
  }

  function showPage(route) {
    $$('.page').forEach(p => p.classList.toggle('active', p.dataset.page === route.page));
    if (route.page === 'project-detail') renderProjectDetail(route.slug);
    window.scrollTo(0, 0);
    document.title = pageTitle(route);
    setActiveNav(route);
    closeMobileMenu();
    initPage(route);
  }

  let firstLoad = true;
  function onRoute() {
    const route = parseRoute();
    if (firstLoad) { firstLoad = false; showPage(route); return; }
    clearPageArtifacts();
    const t = $('#page-transition');
    t.classList.add('in');
    setTimeout(() => {
      showPage(route);
      t.classList.add('out');
      setTimeout(() => t.classList.remove('in', 'out'), 720);
    }, 640);
  }

  // Intercept internal link clicks and route via History API.
  function isInternal(href) {
    return href && (href === BASE || href.startsWith(BASE + '/') || href.startsWith(BASE));
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    // Let external links, myportfolio, mailto, new-tab, and modified clicks pass through.
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!isInternal(href)) return;
    e.preventDefault();
    if (href === location.pathname) { closeMobileMenu(); return; }
    history.pushState({}, '', href);
    onRoute();
  });
  window.addEventListener('popstate', onRoute);

  /* ============================================================
     PAGE INIT (runs on every navigation)
     ============================================================ */
  function initPage(route) {
    const section = $('.page.active');
    if (!section) return;

    // Stagger delays
    $$('[data-stagger]', section).forEach(parent => {
      const step = parseFloat(parent.dataset.stagger) || 0.08;
      [...parent.children].forEach((c, i) => c.style.setProperty('--rd', (i * step).toFixed(2) + 's'));
    });

    // Reveal animations (reset so they can replay)
    const revs = $$('[data-reveal]', section);
    revs.forEach(el => el.classList.remove('revealed'));
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    requestAnimationFrame(() => revs.forEach(el => io.observe(el)));
    observers.push(io);

    // Counters
    const cio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    $$('[data-count]', section).forEach(el => cio.observe(el));
    observers.push(cio);

    // Line-draw animations
    const dio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('drawn'); dio.unobserve(e.target); }
      });
    }, { threshold: 0 });
    $$('[data-draw-line]', section).forEach(el => { el.classList.remove('drawn'); dio.observe(el); });
    observers.push(dio);

    // Page-specific
    if (route.page === 'home') startCanvas(); else stopCanvas();
    const chatEl = $('[data-chat]', section);
    if (chatEl) setupChat(chatEl);
    if (route.page === 'project-detail') setupTimeline(section);

    bindInteractive(section);
  }

  /* ============================================================
     COUNTER ANIMATION
     ============================================================ */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const dur = parseInt(el.dataset.dur || '1900', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = prefix + val.toLocaleString('en-US') + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ============================================================
     WORD-BY-WORD HEADINGS
     ============================================================ */
  function splitWords() {
    $$('[data-split]').forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words
        .map((w, i) => `<span class="w"><span class="wi" style="transition-delay:${(i * 0.055).toFixed(3)}s">${w}</span></span>`)
        .join(' ');
    });
  }

  /* ============================================================
     HERO CANVAS — particle network
     ============================================================ */
  function startCanvas() {
    const canvas = $('#hero-canvas');
    if (!canvas || canvasCtl) return;
    const ctx = canvas.getContext('2d');
    let w, h, raf;
    const mouse = { x: -9999, y: -9999 };
    const parts = [];

    function seed() {
      const N = Math.min(85, Math.floor((w * h) / 20000));
      while (parts.length < N) {
        parts.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.7 + 0.7,
          hue: Math.random() < 0.55 ? 187 : 239
        });
      }
      if (parts.length > N) parts.length = Math.max(N, 0);
    }
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }
    resize();

    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < 170 && d > 0.001) { p.x += (dx / d) * 0.35; p.y += (dy / d) * 0.35; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 44%, .55)`;
        ctx.fill();
      }
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i], b = parts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `hsla(222, 60%, 45%, ${((1 - d / 130) * 0.16).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    }

    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', resize);
    tick();

    canvasCtl = {
      stop() {
        cancelAnimationFrame(raf);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('resize', resize);
        ctx.clearRect(0, 0, w, h);
      }
    };
  }
  function stopCanvas() { if (canvasCtl) { canvasCtl.stop(); canvasCtl = null; } }

  /* ============================================================
     CHAT DEMO (Copilot Studio)
     ============================================================ */
  const CHAT_SCRIPT = [
    { from: 'user', text: 'Can I check my annual leave balance?' },
    { from: 'bot', text: 'Of course! 👋 You have <b>14 days</b> of leave remaining for 2026. Would you like me to create a new leave request?' },
    { from: 'user', text: 'Yes, July 21–25 please.' },
    { from: 'bot', text: 'Done ✅ Your request has been sent to your manager for approval. You will be notified in Teams once it is approved.' }
  ];

  function setupChat(root) {
    if (chatCtl) { chatCtl.stop(); chatCtl = null; }
    const body = root.querySelector('.chat-body');
    let stopped = false;
    const timers = [];
    const wait = ms => new Promise(res => timers.push(setTimeout(res, ms)));
    const scrollDown = () => { body.scrollTop = body.scrollHeight; };

    async function run() {
      while (!stopped) {
        body.innerHTML = '';
        await wait(700);
        for (const m of CHAT_SCRIPT) {
          if (stopped) return;
          if (m.from === 'bot') {
            const t = document.createElement('div');
            t.className = 'msg bot typing';
            t.innerHTML = '<span></span><span></span><span></span>';
            body.appendChild(t); scrollDown();
            await wait(1200);
            if (stopped) return;
            t.classList.remove('typing');
            t.innerHTML = m.text;
          } else {
            const d = document.createElement('div');
            d.className = 'msg user';
            d.innerHTML = m.text;
            body.appendChild(d);
          }
          scrollDown();
          await wait(1100);
        }
        await wait(3200);
      }
    }

    let running = false;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !running) { running = true; run(); }
      });
    }, { threshold: 0.25 });
    io.observe(root);
    observers.push(io);

    chatCtl = { stop() { stopped = true; timers.forEach(clearTimeout); } };
  }

  /* ============================================================
     TIMELINE PROGRESS (project detail)
     ============================================================ */
  function setupTimeline(section) {
    const line = $('.tl-line', section);
    const wrap = $('.timeline', section);
    if (!line || !wrap) return;
    tlHandler = () => {
      const r = wrap.getBoundingClientRect();
      const passed = Math.min(Math.max(window.innerHeight * 0.78 - r.top, 0), r.height);
      line.style.transform = `scaleY(${(passed / r.height).toFixed(4)})`;
    };
    window.addEventListener('scroll', tlHandler, { passive: true });
    tlHandler();
  }

  /* ============================================================
     PROJECT CARDS + DETAIL PAGE GENERATOR
     ============================================================ */
  function projectCard(p) {
    const metrics = p.metrics.slice(0, 2).map(m =>
      `<span><b>${(m.prefix || '') + m.count.toLocaleString('en-US') + (m.suffix || '')}</b>${m.label}</span>`
    ).join('');
    return `
      <a class="project-card" href="${BASE}/projects/${p.slug}" data-reveal style="--pc:${p.color}">
        <div class="project-visual">
          <img class="pv-img" src="${BASE}/img/${p.slug}.jpg" alt="" loading="lazy" onerror="this.remove()">
          <div class="pv-rings" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="pv-icon" aria-hidden="true">${ICONS[p.icon]}</div>
        </div>
        <div class="project-info">
          <span class="chip">${p.category}</span>
          <h3>${p.title}</h3>
          <p>${p.tagline}</p>
          <div class="project-metrics">${metrics}</div>
          <span class="card-link">View the Process ${ICONS.arrow}</span>
        </div>
      </a>`;
  }

  function renderProjectGrids() {
    const featured = $('#featured-projects');
    if (featured) featured.innerHTML = PROJECTS.slice(0, 3).map(projectCard).join('');
    const grid = $('#projects-grid');
    if (grid) grid.innerHTML = PROJECTS.map(projectCard).join('');
  }

  function buildFlowSVG(p) {
    const steps = p.steps;
    const n = steps.length;
    const W = Math.max(760, n * 180);
    const H = 175;
    const y = 70;
    const xs = steps.map((_, i) => Math.round(80 + i * ((W - 160) / (n - 1))));
    const d = `M ${xs[0]} ${y} L ${xs[n - 1]} ${y}`;
    const nodes = xs.map((x, i) => `
      <g class="flow-node" style="--fd:${(i * 0.14).toFixed(2)}s">
        <circle cx="${x}" cy="${y}" r="28" class="fn-c"/>
        <text x="${x}" y="${y + 6}" class="fn-num" text-anchor="middle">${i + 1}</text>
        <text x="${x}" y="${y + 56}" class="fn-label" text-anchor="middle">${steps[i].short}</text>
      </g>`).join('');
    return `
      <svg class="flow-svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
        <path class="flow-base" d="${d}"/>
        <path class="flow-dash" d="${d}"/>
        ${nodes}
        <circle r="6" class="flow-pulse"><animateMotion dur="${(n * 1.3).toFixed(1)}s" repeatCount="indefinite" path="${d}"/></circle>
      </svg>`;
  }

  function renderProjectDetail(slug) {
    const p = PROJECTS.find(x => x.slug === slug) || PROJECTS[0];
    const next = PROJECTS[(PROJECTS.indexOf(p) + 1) % PROJECTS.length];

    const metrics = p.metrics.map(m => `
      <div class="metric glass" data-reveal>
        <div class="metric-value" data-count="${m.count}" data-prefix="${m.prefix || ''}" data-suffix="${m.suffix || ''}">0</div>
        <div class="metric-label">${m.label}</div>
      </div>`).join('');

    const timeline = p.steps.map((s, i) => `
      <div class="tl-item ${i % 2 ? 'right' : ''}" data-reveal="${i % 2 ? 'right' : 'left'}">
        <div class="tl-dot">${i + 1}</div>
        <div class="tl-card glass">
          <div class="tl-icon">${ICONS[s.icon]}</div>
          <h4>${s.title}</h4>
          <p>${s.desc}</p>
        </div>
      </div>`).join('');

    const backArrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>';

    $('#project-detail').innerHTML = `
      <div class="detail-hero">
        <div class="container">
          <a class="back-link" href="${BASE}/projects">${backArrow} All Projects</a>
          <div><span class="chip" style="--sc:${p.color}">${p.category}</span></div>
          <h1 data-reveal>${p.title}</h1>
          <p class="lead" data-reveal style="--rd:.15s">${p.summary}</p>
          ${p.links && p.links.length ? `<div class="proj-links" data-reveal style="--rd:.25s">${p.links.map(l => `<a class="btn btn-ghost btn-sm" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('')}</div>` : ''}
          <div class="detail-photo" data-reveal="zoom" style="--pc:${p.color}">
            <img src="${BASE}/img/${p.slug}.jpg" alt="" loading="lazy" onerror="this.closest('.detail-photo').remove()">
          </div>
          <div class="metrics-row" data-stagger="0.13">${metrics}</div>
          <div class="two-col">
            <div class="glass pad" data-reveal="left"><h3>🎯 The Challenge</h3><p>${p.challenge}</p></div>
            <div class="glass pad" data-reveal="right"><h3>⚡ Our Solution</h3><p>${p.solution}</p></div>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <div class="container">
          <h2 data-reveal>The <em>live process flow</em></h2>
          <div class="flow-wrap glass" data-reveal="zoom">${buildFlowSVG(p)}</div>
        </div>
      </div>

      <div class="detail-section">
        <div class="container">
          <h2 data-reveal>What we did, <em>step by step</em></h2>
          <div class="timeline">
            <div class="tl-track"><div class="tl-line"></div></div>
            ${timeline}
          </div>
          <div class="tech-row" data-reveal>
            <h3>Technologies Used</h3>
            <div class="chips">${p.tech.map(t => `<span class="chip">${t}</span>`).join('')}</div>
          </div>
        </div>
      </div>

      <div class="detail-cta">
        <div class="container">
          <a class="next-project glass" href="${BASE}/projects/${next.slug}" data-reveal="zoom">
            <span>Next Project</span>
            <h3>${next.title} <em>→</em></h3>
          </a>
        </div>
      </div>`;
  }

  /* ============================================================
     MAGNETIC BUTTONS + 3D CARD TILT
     ============================================================ */
  const FINE_POINTER = window.matchMedia('(pointer: fine)').matches;

  function bindInteractive(scope) {
    if (!FINE_POINTER) return;
    $$('[data-magnetic]', scope).forEach(el => {
      if (el.dataset.mBound) return;
      el.dataset.mBound = '1';
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${(x * 0.22).toFixed(1)}px, ${(y * 0.22).toFixed(1)}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
        el.style.transform = '';
        setTimeout(() => { el.style.transition = ''; }, 500);
      });
    });
    $$('[data-tilt]', scope).forEach(el => {
      if (el.dataset.tBound) return;
      el.dataset.tBound = '1';
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
        el.style.transform = '';
        setTimeout(() => { el.style.transition = ''; }, 600);
      });
    });
  }

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  function setupCursor() {
    if (!FINE_POINTER) return;
    const dot = $('.cursor-dot');
    const ring = $('.cursor-ring');
    let tx = -100, ty = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', e => {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = `translate(${tx}px, ${ty}px)`;
      const hot = e.target.closest('a, button, input, textarea, [data-tilt]');
      document.body.classList.toggle('cursor-hot', !!hot);
    });
    (function loop() {
      rx += (tx - rx) * 0.16; ry += (ty - ry) * 0.16;
      ring.style.transform = `translate(${rx.toFixed(1)}px, ${ry.toFixed(1)}px)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ============================================================
     SCROLL: PROGRESS + HEADER STATE
     ============================================================ */
  function setupScrollUI() {
    const bar = $('#scroll-progress');
    const header = $('#site-header');
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  function closeMobileMenu() {
    $('#mobile-menu').classList.remove('open');
    const t = $('#menu-toggle');
    t.classList.remove('open');
    t.setAttribute('aria-expanded', 'false');
  }

  function setupMobileMenu() {
    const toggle = $('#menu-toggle');
    const menu = $('#mobile-menu');
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* ============================================================
     CONTACT FORM (demo)
     ============================================================ */
  function setupForm() {
    const form = $('#contact-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const required = $$('input[required], textarea[required]', form);
      const empty = required.filter(i => !i.value.trim());
      if (empty.length) { empty[0].focus(); return; }
      form.innerHTML = `
        <div class="form-success">
          <svg class="fs-check" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="26.5"/>
            <path d="M19 31l8 8 15-16"/>
          </svg>
          <h3>Message received!</h3>
          <p>We'll get back to you within 24 hours.<br><small>(Demo mode — will connect to an email service when live.)</small></p>
        </div>`;
    });
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function boot() {
    splitWords();
    renderProjectGrids();
    setupCursor();
    setupScrollUI();
    setupMobileMenu();
    setupForm();

    const preloader = $('#preloader');
    const start = () => {
      if (preloader.classList.contains('done')) return;
      preloader.classList.add('done');
      onRoute();
    };
    if (document.readyState === 'complete') {
      setTimeout(start, 1300);
    } else {
      window.addEventListener('load', () => setTimeout(start, 1300));
      setTimeout(start, 4000);
    }
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
