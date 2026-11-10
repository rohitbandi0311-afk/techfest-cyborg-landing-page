const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '✕' : '☰';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = '☰';
}));

// Subtle pointer parallax on the hero artwork (disabled for touch/reduced motion).
const art = document.querySelector('.hero-art');
if (art && window.matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
  art.addEventListener('pointermove', event => {
    const rect = art.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    art.style.transform = `translate(${x * 9}px, ${y * 9}px)`;
  });
  art.addEventListener('pointerleave', () => { art.style.transform = ''; });
}
