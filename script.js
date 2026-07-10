document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav a');
    const sections = document.querySelectorAll('main section[id]');

    const setActiveNav = (id) => {
        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
        });
    };

    const updateActiveSection = () => {
        const offset = window.innerWidth <= 1024 ? 92 : 40;
        let activeId = sections[0]?.getAttribute('id') || 'home';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - offset;
            if (window.scrollY >= sectionTop) {
                activeId = section.getAttribute('id');
            }
        });

        setActiveNav(activeId);
    };

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        revealElements.forEach((el) => el.classList.add('active'));
    }

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    document.querySelectorAll('.project-card, .cert-card').forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 0.06, 0.24)}s`;
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            const targetElement = document.querySelector(href);
            if (!targetElement) return;

            event.preventDefault();
            const stickyOffset = window.innerWidth <= 1024 ? 82 : 24;
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - stickyOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
});
