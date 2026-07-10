document.addEventListener('DOMContentLoaded', () => {

  /* ===== TYPED EFFECT ===== */
  const phrases = [
    'responsive web apps.',
    'full-stack solutions.',
    'REST API backends.',
    'React interfaces.',
    'things that scale.'
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;
  const typedEl = document.getElementById('typed');

  function type() {
    if (!typedEl) return;
    const current = phrases[phraseIdx];
    typedEl.textContent = deleting
      ? current.substring(0, charIdx--)
      : current.substring(0, charIdx++);

    let delay = deleting ? 50 : 90;
    if (!deleting && charIdx === current.length + 1) { delay = 2000; deleting = true; }
    if (deleting && charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; delay = 400; }
    setTimeout(type, delay);
  }
  type();

  /* ===== HAMBURGER / SIDEBAR ===== */
  const sidebar   = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  const overlay   = document.getElementById('nav-overlay');
  const closeBtn  = document.getElementById('sidebar-close');

  function openSidebar()  { sidebar.classList.add('open');  overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('active'); document.body.style.overflow = ''; }

  hamburger && hamburger.addEventListener('click', openSidebar);
  closeBtn  && closeBtn.addEventListener('click', closeSidebar);
  overlay   && overlay.addEventListener('click', closeSidebar);

  /* Close sidebar on nav link click (mobile) */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) closeSidebar();
    });
  });

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.getElementById(anchor.getAttribute('href').slice(1));
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
    });
  });

  /* ===== REVEAL ON SCROLL ===== */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

  /* ===== ACTIVE NAV ON SCROLL ===== */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ===== STAGGERED CARD DELAYS ===== */
  document.querySelectorAll('.project-card').forEach((el, i)  => el.style.setProperty('--delay', `${i * 0.1}s`));
  document.querySelectorAll('.cert-card').forEach((el, i)     => el.style.setProperty('--delay', `${i * 0.08}s`));
  document.querySelectorAll('.timeline-item').forEach((el, i) => el.style.setProperty('--delay', `${i * 0.15}s`));

});
