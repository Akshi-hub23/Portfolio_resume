document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav a');
    const sections = document.querySelectorAll('main section[id]');

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

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const id = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            });
        }, {
            threshold: 0.3,
            rootMargin: '-25% 0px -55% 0px'
        });

        sections.forEach((section) => navObserver.observe(section));
    } else {
        revealElements.forEach((el) => el.classList.add('active'));
    }

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
            const stickyOffset = window.innerWidth <= 1024 ? 132 : 24;
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - stickyOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
});
