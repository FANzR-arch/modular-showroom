/* Site settings — edit this file first.
   Read by site.js (header, footer, WhatsApp button, notes toggle) and projects.js (page titles).
   Page copy, <title>, meta descriptions and JSON-LD live in each HTML file: search for "Solenne" to replace them. */
window.SITE = {
  brand: 'Solenne',                         // name used in titles
  logo: 'SOLENNE',                          // header wordmark
  legalName: 'Solenne Studio Ltd',          // footer copyright line
  email: 'hello@example.com',
  phone: '+1 555 0100',
  whatsapp: '15550100',                     // digits only, used for wa.me links; '' hides every WhatsApp link
  location: ['Example Street 1', 'Example City'],
  instagram: 'https://www.instagram.com/',  // '' hides the link
  catalogue: 'assets/catalogue/catalogue.pdf',
  year: new Date().getFullYear(),
  notes: true,                              // "Notes" toggle that shows what each section is for; set false before launch
  storagePrefix: 'solenne',                 // localStorage key prefix for theme / notes
};
