const VH_ARTICLES = [
  { url: 'declaration-of-intent.html', title: 'Declaration of Intent', description: 'The mission, evidence standard, and intended audience.', domain: 'Basic Principles', domainIndex: 1, minutes: 4 },
  { url: 'harajuku-moment.html', title: 'The Harajuku Moment', description: 'The decision to stop living on autopilot.', domain: 'Basic Principles', domainIndex: 2, minutes: 5 },
  { url: 'the-holy-trinity.html', title: 'The Holy Trinity', description: 'Exercise, recovery, and nutrition—the core framework.', domain: 'Basic Principles', domainIndex: 3, minutes: 4 },
  { url: 'controlling-weight.html', title: 'Controlling Weight', description: 'Understand the direction of change and the levers you control.', domain: 'Basic Principles', domainIndex: 4, minutes: 5 },
  { url: 'the-search-for-homeostasis.html', title: 'The Search for Homeostasis', description: 'Why the body resists change and how adaptation shapes progress.', domain: 'Basic Principles', domainIndex: 5, minutes: 6 },
  { url: 'shifting-timescales.html', title: 'Shifting Timescales', description: 'Zoom out far enough to see what consistency can accomplish.', domain: 'Basic Principles', domainIndex: 6, minutes: 5 },
  { url: 'status-quo-and-setting-goals.html', title: 'Status Quo and Setting Goals', description: 'Measure what matters and establish a useful baseline.', domain: 'Calories In', domainIndex: 1, minutes: 8 },
  { url: 'framing.html', title: 'Framing', description: 'Change your relationship to hunger, discomfort, and effort.', domain: 'Calories In', domainIndex: 2, minutes: 6 },
  { url: 'commit-to-a-choice.html', title: 'Intermittent Fasting or Calorie Restriction', description: 'Choose a structure you can execute consistently.', domain: 'Calories In', domainIndex: 3, minutes: 7 },
  { url: 'food-subtracting-diets.html', title: 'Food-Subtracting Diets', description: 'Understand the advantages and tradeoffs of restrictive approaches.', domain: 'Calories In', domainIndex: 4, minutes: 7 }
].map((article, index) => ({ ...article, curriculumIndex: index + 1 }));

const VH_DOMAINS = [
  { number: '01', title: 'Basic Principles', url: 'basic-principles.html', description: 'Understand the system.' },
  { number: '02', title: 'Calories In', url: 'calories-in.html', description: 'Control the input.' },
  { number: '03', title: 'Calories Out', url: 'calories-out.html', description: 'Control the output.' },
  { number: '04', title: 'Tools & Protocols', url: 'hackz.html', description: 'Optimize the edges.' }
];

const pathName = window.location.pathname.split('/').pop() || 'index.html';
const currentArticle = VH_ARTICLES.find((article) => article.url === pathName);

function navMarkup() {
  return `
    <a class="site-mark" href="index.html" aria-label="Vegan Hypertrophy home">VH / FIELD MANUAL</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu"><span>Menu</span><i aria-hidden="true"></i></button>
    <div class="site-menu" id="site-menu">
      <a href="start-here.html" data-section="start">Start Here</a>
      <a href="library.html" data-section="library">Library</a>
      <details class="system-menu">
        <summary>The System</summary>
        <div class="system-menu-panel">
          ${VH_DOMAINS.map((domain) => `<a href="${domain.url}"><span>${domain.number}</span><b>${domain.title}</b><small>${domain.description}</small></a>`).join('')}
        </div>
      </details>
      <a href="resources.html" data-section="resources">Resources</a>
      <a href="about.html" data-section="about">About</a>
    </div>`;
}

function footerMarkup() {
  return `
    <div class="container footer-grid footer-grid-complete">
      <div class="footer-brand"><h3>Vegan Hypertrophy</h3><p>An evidence-led field manual for taking control of your body.</p></div>
      <div><h3>Navigate</h3><ul><li><a href="start-here.html">Start Here</a></li><li><a href="library.html">Library</a></li><li><a href="basic-principles.html">The System</a></li></ul></div>
      <div><h3>Domains</h3><ul>${VH_DOMAINS.map((domain) => `<li><a href="${domain.url}">${domain.number} — ${domain.title}</a></li>`).join('')}</ul></div>
      <div><h3>Elsewhere</h3><ul><li><a href="resources.html">Resources</a></li><li><a href="about.html">About</a></li><li><a href="contact.html">Contact</a></li></ul></div>
    </div>
    <div class="container legal-links" aria-label="Legal links"><a href="legal.html#privacy">Privacy</a><a href="legal.html#terms">Terms</a><a href="legal.html#affiliate-disclosure">Affiliate Disclosure</a><a href="legal.html#medical-disclaimer">Disclaimer</a></div>
    <p class="footer-legal">&copy; 2026 Vegan Hypertrophy. All rights reserved.</p>`;
}

function setActiveNavigation(nav) {
  let section = '';
  if (pathName === 'start-here.html') section = 'start';
  else if (pathName === 'library.html' || currentArticle) section = 'library';
  else if (pathName === 'resources.html') section = 'resources';
  else if (pathName === 'about.html') section = 'about';
  const active = nav.querySelector(`[data-section="${section}"]`);
  if (active) active.setAttribute('aria-current', 'page');
  if (VH_DOMAINS.some((domain) => domain.url === pathName) || currentArticle) nav.querySelector('.system-menu summary')?.classList.add('has-context');
}

function installShell() {
  const nav = document.querySelector('body > nav');
  if (nav) {
    nav.className = 'site-nav';
    nav.innerHTML = navMarkup();
    setActiveNavigation(nav);
    const toggle = nav.querySelector('.menu-toggle');
    const menu = nav.querySelector('.site-menu');
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => document.body.classList.remove('menu-open')));
  }
  const footer = document.querySelector('body > footer');
  if (footer) {
    footer.className = 'site-footer footer-complete';
    footer.innerHTML = footerMarkup();
  }
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function enhanceArticle(article) {
  document.body.classList.add('article-page', 'article-page-enhanced');
  const header = document.querySelector('body > header');
  const main = document.querySelector('main');
  if (!header || !main) return;

  header.querySelectorAll('.article-series, .article-meta, .article-breadcrumbs').forEach((node) => node.remove());
  const title = header.querySelector('h1');
  const domain = VH_DOMAINS.find((item) => item.title === article.domain);
  title?.insertAdjacentHTML('beforebegin', `<p class="article-breadcrumbs"><a href="library.html">Library</a><span>/</span><a href="${domain.url}">${article.domain}</a><span>/</span>${article.title}</p>`);
  title?.insertAdjacentHTML('afterend', `<div class="article-meta"><span>${article.domain} · ${String(article.domainIndex).padStart(2, '0')} of ${VH_ARTICLES.filter((item) => item.domain === article.domain).length}</span><span>Curriculum · ${String(article.curriculumIndex).padStart(2, '0')} of ${VH_ARTICLES.length}</span><span>${article.minutes} min read</span></div>`);

  main.querySelector('.article-pagination')?.remove();
  const headings = [...main.querySelectorAll('h2')];
  headings.forEach((heading) => { if (!heading.id) heading.id = slugify(heading.textContent); });

  let layout = main.closest('.article-layout');
  if (!layout) {
    layout = document.createElement('div');
    layout.className = 'article-layout';
    main.before(layout);
    layout.append(main);
  }
  layout.querySelector('.article-toc')?.remove();
  if (headings.length >= 3) {
    const aside = document.createElement('aside');
    aside.className = 'article-toc';
    aside.setAttribute('aria-label', 'On this page');
    aside.innerHTML = `<p>On this page</p>${headings.map((heading) => `<a href="#${heading.id}">${heading.textContent}</a>`).join('')}`;
    layout.prepend(aside);
  } else {
    layout.classList.add('without-toc');
  }

  const previous = VH_ARTICLES[article.curriculumIndex - 2];
  const next = VH_ARTICLES[article.curriculumIndex];
  const related = VH_ARTICLES.filter((item) => item.url !== article.url && item.domain !== article.domain).slice(0, 2);
  main.insertAdjacentHTML('beforeend', `
    <section class="reading-journey" aria-label="Continue reading">
      <p class="journey-progress">Curriculum progress · ${String(article.curriculumIndex).padStart(2, '0')} of ${VH_ARTICLES.length}</p>
      <div class="journey-track" aria-hidden="true"><span style="width:${article.curriculumIndex / VH_ARTICLES.length * 100}%"></span></div>
      <nav class="article-pagination" aria-label="Curriculum navigation">
        ${previous ? `<a href="${previous.url}"><span>Previous · ${String(previous.curriculumIndex).padStart(2, '0')}</span>← ${previous.title}</a>` : `<a class="is-muted" href="start-here.html"><span>Curriculum</span>Start Here</a>`}
        ${next ? `<a href="${next.url}"><span>Next · ${String(next.curriculumIndex).padStart(2, '0')}</span>${next.title} →</a>` : `<a href="library.html"><span>Complete</span>Explore the Library →</a>`}
      </nav>
      <div class="journey-actions"><a href="${domain.url}">View all ${article.domain} →</a><a href="start-here.html">View the complete curriculum →</a></div>
      <div class="related-reading"><p>Related field notes</p>${related.map((item) => `<a href="${item.url}"><span>${item.domain}</span><b>${item.title}</b><small>${item.description}</small></a>`).join('')}</div>
    </section>`);
}

function renderLibrary() {
  const mount = document.querySelector('[data-library]');
  if (!mount) return;
  mount.innerHTML = VH_DOMAINS.map((domain) => {
    const articles = VH_ARTICLES.filter((article) => article.domain === domain.title);
    if (!articles.length) return `<section class="library-domain"><div class="library-domain-heading"><p>${domain.number} / The System</p><h2>${domain.title}</h2><span>Foundational guide</span></div><a class="library-guide" href="${domain.url}"><b>${domain.description}</b><span>Open domain →</span></a></section>`;
    return `<section class="library-domain" id="${slugify(domain.title)}"><div class="library-domain-heading"><p>${domain.number} / The System</p><h2>${domain.title}</h2><span>${articles.length} articles</span></div><div class="library-list">${articles.map((article) => `<a href="${article.url}" class="library-row"><span>${String(article.domainIndex).padStart(2, '0')}</span><div><h3>${article.title}</h3><p>${article.description}</p></div><small>${article.minutes} min read</small><i>→</i></a>`).join('')}</div></section>`;
  }).join('');
}

function renderStartHere() {
  if (pathName !== 'start-here.html') return;
  const list = document.querySelector('.path-list');
  if (!list) return;
  list.innerHTML = VH_ARTICLES.map((article) => `<li><h3><a href="${article.url}">${article.title}</a></h3><p>${article.description}</p><span>${article.minutes} min read</span></li>`).join('');
  const heading = list.closest('section')?.querySelector('h2');
  if (heading) heading.textContent = 'The complete curriculum';
  const intro = list.closest('section')?.querySelector(':scope > p');
  if (intro) intro.textContent = 'Ten field notes, arranged from first principles to practical tactics.';
}

function enhanceDomainPage() {
  const domainIndex = VH_DOMAINS.findIndex((domain) => domain.url === pathName);
  if (domainIndex < 0) return;
  const main = document.querySelector('main');
  if (!main) return;
  const domain = VH_DOMAINS[domainIndex];
  const next = VH_DOMAINS[domainIndex + 1];
  main.insertAdjacentHTML('beforeend', `<section class="domain-continuation"><p>${domain.number} / The System</p><a href="library.html">View the complete Library →</a>${next ? `<a href="${next.url}">Continue to ${next.number} — ${next.title} →</a>` : `<a href="start-here.html">Follow the guided curriculum →</a>`}</section>`);
}

document.addEventListener('DOMContentLoaded', () => {
  installShell();
  renderLibrary();
  renderStartHere();
  enhanceDomainPage();
  if (currentArticle) enhanceArticle(currentArticle);
});
