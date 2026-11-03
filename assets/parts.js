/* Catalogue data — shared by scents.html (the scent library) and catalogue.html (the printable PDF).
   FORMATS: the switch at the top of the page; every category re-renders for the chosen format.
   Each category: id, t (title), d (description), table (one picture + table instead of cards),
   items(format) → [{ c: code, n: name, s: size, u: notes / use, img: picture (relative to assets/img/), price? }].
   Names, codes, sizes and prices here are sample data: replace them with your own range. */
(function () {
  const FORMATS = [{ id: 'candle', label: 'Candle' }, { id: 'diffuser', label: 'Diffuser' }];
  const COLS = ['Code', 'Item', 'Size', 'Notes', 'Price'];   // table headings
  const PRICE = 'Price on request';                            // shown when an item has no price
  // pictures (relative to assets/img/): scents cycle through a few photos per format; swap in your own product shots
  const PICS = {
    candle: ['still-life-day', 'living-room', 'melt-pool', 'bedroom', 'still-life-dusk', 'candle-sizes'],
    diffuser: ['diffuser-product', 'hallway', 'bathroom-sill', 'hotel-lounge', 'fashion-store', 'cafe-books'],
  };
  let n = 0;
  const ph = f => `photos/${PICS[f][n++ % PICS[f].length]}.jpg`;

  // one scent = one code; the format decides the size and the code prefix
  const scent = (code, name, notes) => f => ({
    c: (f === 'candle' ? 'C-' : 'D-') + code, n: name, u: notes,
    s: f === 'candle' ? '220 g · about 45 hours' : '200 ml · about 10 weeks', img: ph(f),
  });
  const family = (id, t, d, list) => ({ id, t, d, items: f => list.map(fn => fn(f)) });

  const CATS = [
    family('woody', 'Woody', 'Dry woods, resins and soft smoke. Warm without being heavy.', [
      scent('S01', 'Cedar Room', 'Cedarwood, vetiver, dry amber'),
      scent('S02', 'Black Fig', 'Fig leaf, cedar, white musk'),
      scent('S03', 'Hinoki Bath', 'Hinoki, yuzu peel, warm steam'),
    ]),
    family('floral', 'Floral', 'Flowers kept quiet: powdery, green or a little spiced.', [
      scent('S04', 'Iris Hour', 'Iris, violet leaf, soft suede'),
      scent('S05', 'White Courtyard', 'Jasmine, neroli, sun-warmed stone'),
      scent('S06', 'Rose Smoke', 'Rose, incense, pink pepper'),
    ]),
    family('fresh', 'Fresh', 'Clean air, citrus and green leaves. Good for halls, bathrooms and offices.', [
      scent('S07', 'Linen Line', 'Cotton, bergamot, clean musk'),
      scent('S08', 'Sea Fennel', 'Sea salt, fennel, driftwood'),
      scent('S09', 'Green Tea Garden', 'Green tea, mint, moss'),
    ]),
    family('amber', 'Amber', 'Leather, spice and honeyed woods for evenings and winter.', [
      scent('S10', 'Ember Library', 'Leather, smoked birch, old paper'),
      scent('S11', 'Tobacco Honey', 'Tobacco leaf, honey, tonka'),
      scent('S12', 'Cardamom Ash', 'Cardamom, cacao, sandalwood'),
    ]),
    { id: 'refills', table: true, t: 'Refills', d: 'Keep the vessel, replace what is inside. Larger sizes for hotels, shops and offices.',
      items: f => (f === 'candle'
        ? [['R-C120', 'Candle refill', '120 g', 'Travel size'], ['R-C220', 'Candle refill', '220 g', 'Fits every 220 g vessel'], ['R-C400', 'Candle refill', '400 g', 'Fits every 400 g vessel']]
        : [['R-D100', 'Diffuser refill', '100 ml', 'Small rooms'], ['R-D200', 'Diffuser refill', '200 ml', 'Living rooms, halls'], ['R-D500', 'Diffuser refill', '500 ml', 'Shops, receptions'], ['R-D1000', 'Diffuser refill', '1 L', 'Hospitality, on a refill plan']]
      ).map(([c, nm, s, u]) => ({ c, n: nm, s, u, img: 'photos/refill.jpg' })) },
    { id: 'accessories', table: true, t: 'Accessories', d: 'The small things that make a candle burn well and a diffuser last.',
      items: f => (f === 'candle'
        ? [['A-WT', 'Wick trimmer', 'Brushed metal', 'Trim to 5 mm before each burn'], ['A-SN', 'Snuffer', 'Brushed metal', 'Puts out the flame without smoke'], ['A-LD', 'Lid', 'Oak or ceramic', 'Keeps dust out, doubles as a coaster']]
        : [['A-RD', 'Reeds, pack of 8', '25 cm', 'Replace with every refill'], ['A-RL', 'Reeds, long, pack of 8', '35 cm', 'For 500 ml and 1 L vessels'], ['A-FN', 'Refill funnel', 'Glass', 'Pour without spills']]
      ).map(([c, nm, s, u]) => ({ c, n: nm, s, u, img: 'photos/accessories.jpg' })) },
  ];
  const pic = it => `<img src="assets/img/${it.img}" alt="${it.n}" loading="lazy">`;
  window.PARTS = { CATS, FORMATS, COLS, PRICE, pic };
})();
