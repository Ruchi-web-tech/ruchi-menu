// After `vite build`: write dist/menu.html and dist/about.html, copies of
// index.html with each page's own title, description and share preview.
// Firebase Hosting (cleanUrls) serves them at /menu and /about, so search
// engines and link previews see the right text before any JavaScript runs.
// Keep the texts in step with usePageMeta() in src/pages/Menu.tsx and About.tsx.
import { readFileSync, writeFileSync } from 'node:fs';

const PAGES = [
  {
    file: 'menu.html',
    path: '/menu',
    title: 'Menu & Prices | RUCHI Borås – Bowls, Bao, Sushi & Sando',
    description:
      'The full RUCHI menu with prices: Asian bowls, bao with fries, sushi rolls and nigiri, Nashville hot chicken sando, sides and drinks. Meny och priser – sushi, bao och bowls i Borås.',
  },
  {
    file: 'about.html',
    path: '/about',
    title: 'About RUCHI | Asian-inspired Restaurant in Borås',
    description:
      'Born in the north, inspired by Asia. Find RUCHI at Druveforsvägen 13A, Borås: opening hours, phone and directions. Öppettider, adress och telefon.',
  },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const base = readFileSync('dist/index.html', 'utf8');

for (const page of PAGES) {
  let html = base;
  const swap = (re, value) => {
    if (!re.test(html)) throw new Error(`seo-pages: ${re} not found in index.html`);
    html = html.replace(re, value);
  };
  swap(/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`);
  swap(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(page.description)}"`);
  swap(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="https://ruchi.se${page.path}"`);
  swap(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(page.title)}"`);
  swap(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(page.description)}"`);
  swap(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="https://ruchi.se${page.path}"`);
  writeFileSync(`dist/${page.file}`, html);
  console.log(`seo-pages: wrote dist/${page.file}`);
}
