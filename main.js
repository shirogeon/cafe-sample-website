const body = document.body;
const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const navLinks = [...document.querySelectorAll('.main-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
const revealEls = [...document.querySelectorAll('.reveal')];

function setHeaderState() {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
}

function closeNav() {
  body.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', () => {
  const isOpen = body.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', closeNav);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealEls.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 40, 260)}ms`;
  revealObserver.observe(el);
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.remove('active'));
    const active = document.querySelector(`.main-nav a[href="#${entry.target.id}"]`);
    if (active) active.classList.add('active');
  });
}, { rootMargin: '-38% 0px -54% 0px', threshold: 0.01 });

sections.forEach((section) => sectionObserver.observe(section));
window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();
