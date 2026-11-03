/* Shared header, footer and interactions. Each page sets <body data-page="...">; settings come from config.js */
(function () {
  const page = document.body.dataset.page || '';
  const S = window.SITE || {};
  const pre = S.storagePrefix || 'site';
  const wa = S.whatsapp ? `https://wa.me/${S.whatsapp}` : '';
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  /* ---------- theme + notes (restore early) ---------- */
  const root = document.documentElement;
  const savedTheme = store.get(pre + '-theme');
  if (savedTheme) root.dataset.theme = savedTheme;
  if (store.get(pre + '-notes') === '1' || /[?&]notes\b/.test(location.search)) root.classList.add('notes');

  const SHOP = [
    { t: 'Candles', h: 'candles.html', key: 'candles', pic: '<img src="assets/img/photos/candle-sizes.jpg" alt="">' },
    { t: 'Diffusers', h: 'diffusers.html', key: 'diffusers', pic: '<img src="assets/img/photos/diffuser-product.jpg" alt="">' },
    { t: 'Objects', h: 'objects.html', key: 'objects', pic: '<img src="assets/img/photos/accessories.jpg" alt="">' },
    { t: 'Scent library', h: 'scents.html', key: 'scents', pic: '<img src="assets/img/photos/scent-samples.jpg" alt="">' },
  ];
  const LINKS = [
    { t: 'Gallery', h: 'gallery.html', key: 'gallery' },
    { t: 'Projects', h: 'projects.html', key: 'projects' },
    { t: 'About', h: 'about.html', key: 'about' },
    { t: 'Contact', h: 'contact.html', key: 'contact' },
  ];
  const shopOn = SHOP.some(s => s.key === page);
  const I = {
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
    menu: '<svg viewBox="0 0 24 24"><path d="M3 8h18M3 16h18"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19"/></svg>',
    wa: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>',
  };

  const notesBtn = cls => S.notes === false ? '' : `<button class="notes-btn ${cls}" data-notes title="Show what each section is for">Notes</button>`;
  if (S.notes === false) root.classList.remove('notes');

  /* ---------- header ---------- */
  const minimal = document.body.dataset.header === 'minimal';
  const hdr = document.createElement('header');
  hdr.className = 'hdr';
  hdr.innerHTML = minimal
    ? `<div class="wrap in" style="grid-template-columns:1fr auto"><a class="logo" href="index.html">${S.logo || S.brand || ''}</a>
       <div class="acts">${notesBtn('')}<a class="ic" href="javascript:history.length>1?history.back():location.href='index.html'" aria-label="Close">${I.close}</a></div></div>`
    : `<div class="wrap in">
      <a class="logo" href="index.html" aria-label="${S.brand || ''} home">${S.logo || S.brand || ''}</a>
      <nav class="nav" aria-label="Main">
        <button type="button" class="${shopOn ? 'on' : ''}" aria-expanded="false" data-mega>Products</button>
        ${LINKS.map(l => `<a href="${l.h}" class="${l.key === page ? 'on' : ''}">${l.t}</a>`).join('')}
      </nav>
      <div class="acts">
        ${notesBtn('desk')}
        <button class="ic" data-theme-btn aria-label="Toggle dark mode"></button>
        <a class="btn" href="quote.html">Trade enquiry</a>
        <button class="ic burger" aria-label="Menu" data-burger>${I.menu}</button>
      </div></div>`;
  document.body.prepend(hdr);

  if (!minimal) {
    const mega = document.createElement('div');
    mega.className = 'mega';
    mega.innerHTML = `<div class="wrap grid"><div class="grp">${SHOP.slice(0, 2).map(s => `<a href="${s.h}"><div class="pic">${s.pic}</div><span>${s.t}</span></a>`).join('')}</div><div class="grp">${SHOP.slice(2).map(s => `<a href="${s.h}"><div class="pic">${s.pic}</div><span>${s.t}</span></a>`).join('')}</div></div>`;
    const scrim = document.createElement('div');
    scrim.className = 'scrim';
    hdr.after(mega, scrim);
    const btn = hdr.querySelector('[data-mega]');
    let t;
    const open = v => { mega.classList.toggle('open', v); scrim.classList.toggle('on', v); btn.setAttribute('aria-expanded', v); };
    btn.addEventListener('click', () => open(!mega.classList.contains('open')));
    btn.addEventListener('mouseenter', () => { clearTimeout(t); open(true); });
    [btn, mega].forEach(el => el.addEventListener('mouseleave', () => { t = setTimeout(() => open(false), 220); }));
    mega.addEventListener('mouseenter', () => clearTimeout(t));
    scrim.addEventListener('click', () => open(false));

    const mnav = document.createElement('div');
    mnav.className = 'mnav';
    mnav.innerHTML = `<div class="cats">${SHOP.map(s => `<a href="${s.h}"><div class="pic">${s.pic}</div>${s.t}</a>`).join('')}</div>
      <div class="big">${LINKS.map(l => `<a href="${l.h}">${l.t}</a>`).join('')}<a href="quote.html">Trade enquiry</a></div>
      <div style="display:flex;gap:10px;margin-top:24px">${notesBtn('')}</div>`;
    scrim.after(mnav);
    const bb = hdr.querySelector('[data-burger]');
    bb.addEventListener('click', () => { const o = !mnav.classList.contains('open'); mnav.classList.toggle('open', o); bb.innerHTML = o ? I.close : I.menu; document.body.style.overflow = o ? 'hidden' : ''; });
  }

  /* theme toggle */
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const tb = hdr.querySelector('[data-theme-btn]');
  const paintTb = () => { if (tb) tb.innerHTML = isDark() ? I.sun : I.moon; };
  paintTb();
  tb && tb.addEventListener('click', () => { root.dataset.theme = isDark() ? 'light' : 'dark'; store.set(pre + '-theme', root.dataset.theme); paintTb(); });
  document.querySelectorAll('[data-notes]').forEach(b => b.addEventListener('click', () => {
    const on = root.classList.toggle('notes'); store.set(pre + '-notes', on ? '1' : '0');
  }));

  /* ---------- footer ---------- */
  if (!minimal) {
    const ftr = document.createElement('footer');
    ftr.className = 'ftr';
    // newsletter form is front-end only: point it at your mailing-list service (replace the onsubmit handler)
    ftr.innerHTML = `<div class="wrap">
      <div class="cols">
        <div><h4>Newsletter</h4><p class="muted small" style="max-width:30ch">New systems, projects and studio notes. A few times a year.</p>
          <form class="news" onsubmit="event.preventDefault();this.innerHTML='<span style=&quot;padding:10px 0;font-size:14px&quot;>Thank you.</span>'"><input type="email" placeholder="Email address" aria-label="Email" required><button>→</button></form></div>
        <div><h4>Products</h4><ul>${SHOP.map(s => `<li><a href="${s.h}">${s.t}</a></li>`).join('')}${S.catalogue ? `<li><a href="${S.catalogue}" download>Catalogue PDF</a></li>` : ''}</ul></div>
        <div><h4>Discover</h4><ul><li><a href="gallery.html">Gallery</a></li><li><a href="projects.html">Projects</a></li><li><a href="about.html">About</a></li><li><a href="ethos.html">Ethos</a></li><li><a href="manufacturing.html">Making</a></li><li><a href="good-design.html">Principles</a></li></ul></div>
        <div><h4>Help</h4><ul><li><a href="quote.html">Trade enquiry</a></li><li><a href="faqs.html">FAQs</a></li><li><a href="contact.html">Contact</a></li><li><a href="legal.html">Legal</a></li></ul></div>
        <div><h4>Studio</h4><ul><li>${(S.location || []).join('<br>')}</li>${S.email ? `<li><a href="mailto:${S.email}">${S.email}</a></li>` : ''}${wa ? `<li><a href="${wa}" target="_blank" rel="noopener">WhatsApp</a></li>` : ''}${S.instagram ? `<li><a href="${S.instagram}" target="_blank" rel="noopener">Instagram</a></li>` : ''}</ul></div>
      </div>
      <div class="mark" aria-hidden="true"><span>${S.logo || S.brand || ''}</span></div>
      <div class="base"><span>© ${S.year || ''} ${S.legalName || S.brand || ''}</span><span><a href="legal.html#privacy">Privacy</a><a href="legal.html#terms">Terms</a><a href="legal.html#cookies">Cookies</a></span></div>
    </div>`;
    document.body.append(ftr);
    if (wa) {
      const fab = document.createElement('a');
      fab.className = 'wa'; fab.href = wa; fab.target = '_blank'; fab.rel = 'noopener'; fab.setAttribute('aria-label', 'Chat on WhatsApp');
      fab.innerHTML = I.wa;
      document.body.append(fab);
    }
  }
  /* any link marked data-wa / data-email / data-phone picks up the contact details from config.js */
  document.querySelectorAll('[data-wa]').forEach(a => { if (wa) a.href = wa; else a.remove(); });
  document.querySelectorAll('[data-email]').forEach(a => { a.href = 'mailto:' + S.email; if (!a.children.length) a.textContent = S.email; });
  document.querySelectorAll('[data-phone]').forEach(a => { a.href = 'tel:' + (S.phone || '').replace(/[^+\d]/g, ''); if (!a.children.length) a.textContent = S.phone; });

  /* ---------- hero carousel: full-width slides moving left/right, seamless loop, swipe/drag ---------- */
  document.querySelectorAll('[data-carousel]').forEach(c => {
    const track = c.querySelector('.track'), real = [...track.children], n = real.length;
    const dur = +(c.dataset.carousel || 6000);
    c.style.setProperty('--dur', dur + 'ms');
    // clones at both ends make the loop seamless
    const head = real[n - 1].cloneNode(true), tail = real[0].cloneNode(true);
    [head, tail].forEach(x => {
      x.setAttribute('aria-hidden', 'true'); x.querySelectorAll('a').forEach(a => a.tabIndex = -1);
      // keep one H1 on the page: headings inside the copies become plain divs
      x.querySelectorAll('h1').forEach(h => { const d = document.createElement('div'); d.className = h.className; d.innerHTML = h.innerHTML; h.replaceWith(d); });
    });
    track.prepend(head); track.append(tail);
    let pos = 1, timer, dragX = null, dx = 0, moved = false;
    const dots = c.querySelector('.dots');
    real.forEach((_, k) => { const b = document.createElement('button'); b.setAttribute('aria-label', 'Slide ' + (k + 1)); b.onclick = () => to(k + 1); dots && dots.append(b); });
    const place = (animate, off = 0) => {
      track.classList.toggle('dragging', !animate);
      track.style.transform = `translate3d(${-pos * c.clientWidth + off}px,0,0)`;
    };
    const mark = () => {
      if (!dots) return;
      const k = (pos - 1 + n) % n;
      [...dots.children].forEach(d => d.classList.remove('on'));
      void dots.offsetWidth; // restart the progress line
      dots.children[k].classList.add('on');
    };
    const restart = () => { clearTimeout(timer); if (!c.classList.contains('hold')) timer = setTimeout(() => to(pos + 1), dur); };
    // after sliding onto a clone, jump to the real slide it copies (transitionend, with a timer as backup)
    let fix;
    const normalize = () => { clearTimeout(fix); if (pos === 0) { pos = n; place(false); } else if (pos === n + 1) { pos = 1; place(false); } };
    const to = p => { pos = Math.max(0, Math.min(n + 1, p)); place(true); mark(); restart(); clearTimeout(fix); fix = setTimeout(normalize, 950); };
    track.addEventListener('transitionend', e => { if (e.target === track) normalize(); });
    c.querySelector('[data-prev]')?.addEventListener('click', () => to(pos - 1));
    c.querySelector('[data-next]')?.addEventListener('click', () => to(pos + 1));
    // pause while hovered or the tab is hidden
    const hold = v => { c.classList.toggle('hold', v); restart(); };
    c.addEventListener('mouseenter', () => hold(true));
    c.addEventListener('mouseleave', () => hold(false));
    document.addEventListener('visibilitychange', () => hold(document.hidden));
    // drag / swipe
    track.addEventListener('pointerdown', e => { if (e.button !== 0 || e.target.closest('.ctrl')) return; dragX = e.clientX; dx = 0; moved = false; clearTimeout(timer); });
    addEventListener('pointermove', e => { if (dragX === null) return; dx = e.clientX - dragX; if (Math.abs(dx) > 6) moved = true; if (moved) place(false, dx); });
    addEventListener('pointerup', () => {
      if (dragX === null) return; dragX = null;
      if (!moved) { restart(); return; }
      to(Math.abs(dx) > c.clientWidth * 0.12 ? pos + (dx < 0 ? 1 : -1) : pos);
    });
    track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    c.tabIndex = 0;
    c.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') to(pos - 1); if (e.key === 'ArrowRight') to(pos + 1); });
    addEventListener('resize', () => place(false));
    place(false); mark(); restart();
  });

  /* header shadow once the page scrolls */
  const onScroll = () => root.classList.toggle('scrolled', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- word cycle: one word at a time is highlighted ---------- */
  document.querySelectorAll('[data-cycle]').forEach(el => {
    const w = [...el.children]; let k = 0;
    w[0].classList.add('on');
    setInterval(() => { w[k].classList.remove('on'); k = (k + 1) % w.length; w[k].classList.add('on'); }, 2000);
  });

  /* ---------- anchor pills scrollspy ---------- */
  const pills = document.querySelector('.pills');
  if (pills) {
    const links = [...pills.querySelectorAll('a[href^="#"]')];
    const secs = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const spy = () => {
      let cur = secs[0];
      secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * 0.35) cur = s; });
      const bar = pills.querySelector('.in');
      links.forEach(a => {
        const on = cur && a.getAttribute('href') === '#' + cur.id;
        if (on === a.classList.contains('on')) return;
        a.classList.toggle('on', on);
        // keep the active pill in view by scrolling the bar sideways only (scrollIntoView would also move the page)
        if (on && (a.offsetLeft < bar.scrollLeft || a.offsetLeft + a.offsetWidth > bar.scrollLeft + bar.clientWidth)) bar.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
      });
    };
    addEventListener('scroll', () => requestAnimationFrame(spy), { passive: true });
  }

  /* ---------- filters: several chip bars can filter the same list (data-key picks the attribute, default "tags") ---------- */
  const applyFilters = target => {
    const bars = [...document.querySelectorAll(`[data-filter="${target}"]`)];
    [...document.querySelector(target).children].forEach(it => {
      const show = bars.every(bar => {
        const f = bar.querySelector('button.on')?.dataset.f || 'all';
        return f === 'all' || (it.dataset[bar.dataset.key || 'tags'] || '').split(' ').includes(f);
      });
      it.style.display = show ? '' : 'none';
    });
  };
  document.querySelectorAll('[data-filter]').forEach(bar => bar.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    bar.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
    applyFilters(bar.dataset.filter);
  }));

  /* ---------- lightbox ---------- */
  const lbItems = [...document.querySelectorAll('[data-lb]')];
  if (lbItems.length) {
    const lb = document.createElement('div');
    lb.className = 'lb';
    lb.innerHTML = '<img alt=""><div class="cap"></div><button class="x" aria-label="Close">×</button><button class="pv" aria-label="Previous">‹</button><button class="nx" aria-label="Next">›</button>';
    document.body.append(lb);
    let k = 0;
    const vis = () => lbItems.filter(x => x.offsetParent !== null);
    const show = j => { const v = vis(); k = (j + v.length) % v.length; const it = v[k]; lb.querySelector('img').src = it.dataset.lb; lb.querySelector('.cap').textContent = it.dataset.cap || ''; };
    lbItems.forEach(it => it.addEventListener('click', e => { if (e.target.closest('a[href]')) return; e.preventDefault(); show(vis().indexOf(it)); lb.classList.add('open'); }));
    lb.querySelector('.x').onclick = () => lb.classList.remove('open');
    lb.querySelector('.pv').onclick = () => show(k - 1);
    lb.querySelector('.nx').onclick = () => show(k + 1);
    lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });
    addEventListener('keydown', e => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') lb.classList.remove('open'); if (e.key === 'ArrowLeft') show(k - 1); if (e.key === 'ArrowRight') show(k + 1); });
  }

  /* ---------- rail arrows: step one card at a time ---------- */
  document.querySelectorAll('[data-rail]').forEach(b => b.addEventListener('click', () => {
    const r = b.closest('section').querySelector('.rail');
    const cards = [...r.children], pad = parseFloat(getComputedStyle(r).paddingLeft) || 0;
    const edge = r.getBoundingClientRect().left + pad;
    const cur = Math.max(0, cards.findIndex(c => c.getBoundingClientRect().left >= edge - 4));
    const next = cards[Math.max(0, Math.min(cards.length - 1, cur + (+b.dataset.rail)))];
    r.scrollTo({ left: r.scrollLeft + next.getBoundingClientRect().left - edge, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }));

  /* ---------- drag-to-scroll rails ---------- */
  document.querySelectorAll('.rail').forEach(r => {
    let down = false, x0, s0, moved;
    r.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; x0 = e.clientX; s0 = r.scrollLeft; r.classList.add('drag'); });
    addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - x0; if (Math.abs(dx) > 4) moved = true; r.scrollLeft = s0 - dx; });
    addEventListener('pointerup', () => { down = false; r.classList.remove('drag'); });
    r.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  });

})();
