/* Projects — one data source for the list page (projects.html) and the detail page (project.html?id=...).
   `photos`: image names in assets/img/photos/ (first = cover, second = hover, the rest fill the photo sections).
   Or set `cover`, `hover` and `sections` yourself (paths relative to assets/img/; sections = rows of images).
   Without either, the project shows neutral placeholders from assets/img/ph/.
   `system` is the product line(s) used ("Candle", "Diffuser" or "Candle + Diffuser"); projects.html filters on it.
   Loaded with defer BEFORE site.js so reveal observers see the rendered markup. */
(function () {
  /* fixtures: [code suffix, name, optional detail] — listed under "What's in it" */
  function project(o) {
    const k = parseInt(o.id.replace(/\D/g, ''), 10) || 0;
    const ph = j => o.photos ? `photos/${o.photos[j % o.photos.length]}.jpg` : `ph/${((k + j) % 6) + 1}.svg`;
    return { cover: ph(0), hover: ph(1), sections: [[ph(1), ph(2)], [ph(3), ph(4), ph(0)]], ...o };
  }
  const P = [
    project({
      id: 'P-01', photos: ['hotel-lounge', 'hotel-lobby-night', 'refill', 'diffuser-product', 'scent-samples'], title: 'Hotel lobby, signature scent', tagline: 'A scent guests remember before they reach the desk',
      type: 'Hotel', space: 'Lobby', size: 'L', system: 'Diffuser + Candle', client: 'City hotel', site: 'Lobby and lounge', area: '320 m²',
      overview: 'A signature blend for a 120-room city hotel, diffused through the lobby and lounge and sold as a candle at reception.',
      strategy: 'One scent, three strengths: stronger at the entrance, softer by the lounge, faint in the lifts. The candle lets guests take it home.',
      fixtures: [['a', 'Signature blend, custom', 'Woody floral, developed over three rounds'], ['b', 'Diffuser 1 L', '×6, refilled monthly'], ['c', 'Candle 400 g, hotel label', 'Sold at reception']],
    }),
    project({
      id: 'P-02', photos: ['hotel-nightstand', 'bedroom', 'accessories', 'candle-sizes', 'melt-pool'], title: 'Boutique hotel rooms', tagline: 'A small candle on every nightstand',
      type: 'Hotel', space: 'Guest rooms', size: 'L', system: 'Candle', client: 'Boutique hotel', site: '32 guest rooms', area: '32 rooms',
      overview: 'A travel candle and matches in each room, in a scent that matches the hotel’s linen and soap.',
      strategy: 'Low-soot wax and a lid that doubles as a coaster, so housekeeping can leave the candle out safely.',
      fixtures: [['a', 'Candle 120 g', 'Linen Line'], ['b', 'Matchbox', 'Room amenity']],
    }),
    project({
      id: 'P-03', photos: ['fashion-store', 'diffuser-product', 'refill', 'tester-table', 'hallway'], title: 'Fashion flagship', tagline: 'Scent that changes with the collection',
      type: 'Retail', space: 'Store', size: 'M', system: 'Diffuser', client: 'Fashion label', site: 'High street', area: '180 m²',
      overview: 'Reed diffusers across two floors of a flagship store, with a scent change each season.',
      strategy: 'Refills are swapped at each collection launch, so the store smells new without new hardware.',
      fixtures: [['a', 'Diffuser 500 ml', '×8, Iris Hour'], ['b', 'Seasonal refill plan', 'Four blends a year']],
    }),
    project({
      id: 'P-04', photos: ['tester-table', 'candle-sizes', 'gift-box', 'hallway', 'accessories'], title: 'Concept store', tagline: 'Candles on the counter, scent at the door',
      type: 'Retail', space: 'Store', size: 'S', system: 'Candle + Diffuser', client: 'Independent shop', site: 'Neighbourhood shop', area: '45 m²',
      overview: 'A small lifestyle shop that sells the range and uses one diffuser at the entrance as a sampler.',
      strategy: 'A tester tray of six scents sits by the till; the door diffuser is changed to the best seller each month.',
      fixtures: [['a', 'Retail display set', 'Candles in two sizes'], ['b', 'Diffuser 200 ml', 'Entrance'], ['c', 'Tester tray', 'Six scents']],
    }),
    project({
      id: 'P-05', photos: ['spa-room', 'bathroom-sill', 'bedroom', 'diffuser-product', 'still-life-day'], title: 'Day spa', tagline: 'Three rooms, three moods',
      type: 'Wellness', space: 'Spa', size: 'M', system: 'Diffuser', client: 'Day spa', site: 'Treatment rooms', area: '90 m²',
      overview: 'Different scents for the reception, the treatment rooms and the relaxation lounge.',
      strategy: 'Fresh at reception, soft and woody in the treatment rooms, warm in the lounge, so clients feel the change between spaces.',
      fixtures: [['a', 'Diffuser 200 ml', 'Reception, Green Tea Garden'], ['b', 'Diffuser 100 ml', 'Treatment rooms ×4, Hinoki Bath'], ['c', 'Diffuser 200 ml', 'Lounge, Cedar Room']],
    }),
    project({
      id: 'P-06', photos: ['restaurant', 'melt-pool', 'still-life-dusk', 'candle-sizes', 'accessories'], title: 'Restaurant', tagline: 'Candlelight without competing with the food',
      type: 'Hospitality', space: 'Restaurant', size: 'M', system: 'Candle', client: 'Neighbourhood restaurant', site: 'Dining room', area: '110 m²',
      overview: 'Unscented and lightly scented candles for a 60-cover dining room, with a stronger scent only in the washrooms.',
      strategy: 'Tables get unscented candles so nothing clashes with the menu; the scent lives where guests pause.',
      fixtures: [['a', 'Candle 220 g, unscented', 'Tables ×20'], ['b', 'Diffuser 200 ml', 'Washrooms, Sea Fennel']],
    }),
    project({
      id: 'P-07', photos: ['cafe-books', 'diffuser-product', 'hallway', 'living-room', 'refill'], title: 'Café and bookshop', tagline: 'Coffee first, then a hint of paper and wood',
      type: 'Hospitality', space: 'Café', size: 'S', system: 'Diffuser', client: 'Café', site: 'Café and shop', area: '70 m²',
      overview: 'A single quiet diffuser in the book corner of a café, chosen to sit behind the smell of coffee.',
      strategy: 'A low-throw blend placed away from the bar, so it is noticed only while browsing.',
      fixtures: [['a', 'Diffuser 200 ml', 'Ember Library']],
    }),
    project({
      id: 'P-08', photos: ['hotel-lounge', 'hallway', 'diffuser-product', 'refill', 'bathroom-sill'], title: 'Office reception', tagline: 'A clean, calm first impression',
      type: 'Office', space: 'Lobby', size: 'M', system: 'Diffuser', client: 'Design studio', site: 'Reception and meeting rooms', area: '150 m²',
      overview: 'Diffusers in the reception and meeting rooms of a design studio, refilled on a quarterly plan.',
      strategy: 'A fresh, low-intensity blend that works for long meetings and does not linger on clothes.',
      fixtures: [['a', 'Diffuser 500 ml', 'Reception'], ['b', 'Diffuser 100 ml', 'Meeting rooms ×5'], ['c', 'Refill plan', 'Quarterly']],
    }),
    project({
      id: 'P-09', photos: ['gallery-opening', 'still-life-dusk', 'gift-box', 'melt-pool', 'candle-sizes'], title: 'Gallery opening', tagline: 'One evening, one scent',
      type: 'Event', space: 'Gallery', size: 'M', system: 'Candle', client: 'Art gallery', site: 'Exhibition hall', area: '240 m²',
      overview: 'Candles in hurricane glasses along the route of an exhibition opening, in a scent made for the show.',
      strategy: 'A limited run of candles doubled as the gift for guests, so the scent stayed with the show.',
      fixtures: [['a', 'Candle 220 g, limited edition', '×80'], ['b', 'Gift box', 'For guests']],
    }),
    project({
      id: 'P-10', photos: ['restaurant', 'still-life-dusk', 'gift-box', 'candle-sizes', 'melt-pool'], title: 'Wedding dinner', tagline: 'Long tables, low light',
      type: 'Event', space: 'Venue', size: 'L', system: 'Candle', client: 'Private event', site: 'Barn venue', area: '160 guests',
      overview: 'Unscented pillar candles on the tables and a scented candle by each place card as a favour.',
      strategy: 'Scent kept to the entrance and favours, so the dinner itself stays about the food and the flowers.',
      fixtures: [['a', 'Candle 120 g', 'Favours ×160'], ['b', 'Candle 400 g', 'Entrance ×4']],
    }),
    project({
      id: 'P-11', photos: ['living-room', 'hallway', 'bedroom', 'still-life-day', 'bathroom-sill'], title: 'City apartment', tagline: 'A different scent for every room',
      type: 'Home', space: 'Living room', size: 'S', system: 'Candle + Diffuser', client: 'Private home', site: 'Apartment', area: '85 m²',
      overview: 'A home scented room by room: a diffuser in the hall, candles in the living room and a soft blend in the bedroom.',
      strategy: 'Scents from the same family, so moving between rooms feels like one home rather than four shops.',
      fixtures: [['a', 'Diffuser 200 ml', 'Hall, Linen Line'], ['b', 'Candle 400 g', 'Living room, Cedar Room'], ['c', 'Candle 220 g', 'Bedroom, Iris Hour']],
    }),
    project({
      id: 'P-12', photos: ['tester-table', 'scent-samples', 'weighing-oil', 'pouring', 'studio-dusk'], title: 'Studio showroom', tagline: 'Every scent, open to try',
      type: 'Showroom', space: 'Store', size: 'M', system: 'Candle + Diffuser', client: 'Our studio', site: 'Showroom', area: '60 m²',
      overview: 'Our own showroom, with every scent on a tester wall and a small blending bar for custom orders.',
      strategy: 'Visitors smell each family side by side before choosing a scent for their home or business.',
      fixtures: [['a', 'Tester wall', 'All scents'], ['b', 'Blending bar', 'Custom orders']],
    }),
  ];
  window.PROJECTS = P;

  const img = f => `assets/img/${f}`;
  const esc = s => s.replace(/'/g, '&#39;');

  /* ---------- list page ---------- */
  const list = document.getElementById('plist');
  if (list) {
    list.innerHTML = P.map(p => `<a class="pj" href="project.html?id=${p.id}" data-type="${p.type}" data-space="${p.space}" data-size="${p.size}" data-system="${p.system}">
      <div class="media"><img src="${img(p.cover)}" alt="${esc(p.title)}" loading="lazy"><img class="alt" src="${img(p.hover)}" alt="" loading="lazy"></div>
      <h3>${p.title}</h3><p class="code">${p.id}${p.client ? ' · ' + p.client : ''}</p><span class="more">View project →</span></a>`).join('');
  }

  /* ---------- detail page ---------- */
  const root = document.getElementById('pdetail');
  if (root) {
    const id = new URLSearchParams(location.search).get('id');
    const i = Math.max(0, P.findIndex(p => p.id === id));
    const p = P[i], prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
    document.title = `${p.title} — Projects | ${(window.SITE || {}).brand || ''}`;
    const rows = [['Client', p.client], ['Type', p.type], ['Site', p.site], ['Size', { S: 'S · up to 30 m²', M: 'M · 30–100 m²', L: 'L · 100 m²+' }[p.size]], ['Collection', p.system.split(' + ').map(s => s + 's').join(' + ')]];
    root.innerHTML = `
      <section class="pd-top wrap" data-note="Project header: cover image on the left, a sticky fact sheet on the right.
All of it comes from this project's entry in assets/projects.js.">
        <div class="pd-media">
          <div class="media pd-cover" data-rv="wipe"><img src="${img(p.cover)}" alt="${esc(p.title)}" data-lb="${img(p.cover)}" data-cap="${esc(p.title)}"></div>
        </div>
        <aside class="pd-info">
          <p class="code">${p.id}</p>
          <h1 class="d2 split">${p.title}</h1>
          <p class="tag" data-rv>“${p.tagline}”</p>
          <dl class="facts" data-rv>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
            ${p.area ? `<div><dt>Area</dt><dd>${p.area}</dd></div>` : ''}
            <div class="wide"><dt>Overview</dt><dd>${p.overview}</dd></div>
            <div class="wide"><dt>Strategy</dt><dd>${p.strategy}</dd></div></dl>
          <div class="acts" data-rv><a class="btn ghost" href="#fixtures">What's in it <span class="arr">↓</span></a></div>
        </aside>
      </section>
      ${p.sections.map((s, k) => `<section class="pd-sec wrap"><h2 class="sec-t" data-rv>Section ${String(k + 1).padStart(2, '0')}</h2>
        <div class="pd-grid n${Math.min(s.length, 4)}">${s.map(f => `<a class="media" data-rv="wipe" data-lb="${img(f)}" data-cap="${esc(p.title)}"><img src="${img(f)}" alt="${esc(p.title)}" loading="lazy"></a>`).join('')}</div></section>`).join('')}
      <section id="fixtures" class="pd-sec wrap" data-note="What the scheme is made of: fixture code, name and optional size, from the fixtures list in assets/projects.js.">
        <h2 class="d3" data-rv style="margin-bottom:22px">What's in it</h2>
        <div class="pd-fx">${p.fixtures.map(([s, n, size]) => `<div class="fx" data-rv>
          <div class="fx-t"><code>${p.id}${s}</code><h3>${n}</h3>${size ? `<p>${size}</p>` : ''}</div>
        </div>`).join('')}</div>
      </section>
      <section class="pd-sec wrap"><div class="cta" data-rv><h2 class="d3">Want a scent like this for your space?</h2><a class="btn" href="quote.html?set=${p.id}">Send an enquiry <span class="arr">→</span></a></div></section>
      <nav class="pd-nav wrap">
        <a href="project.html?id=${prev.id}"><span>← Previous</span><b>${prev.title}</b></a>
        <a href="projects.html" class="all">All projects</a>
        <a href="project.html?id=${next.id}" style="text-align:right"><span>Next →</span><b>${next.title}</b></a>
      </nav>`;
  }
})();
