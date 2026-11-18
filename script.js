document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav a');
    const sections = document.querySelectorAll('main section[id]');
    const progressBar = document.querySelector('.scroll-progress span');
    const backToTop = document.querySelector('.back-to-top');
    const projectCards = document.querySelectorAll('.project-card[data-category]');
    const projectFilters = document.querySelectorAll('.project-filter');
    const projectFilterStatus = document.querySelector('#project-filter-status');

    const setActiveNav = (id) => {
        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
        });
    };

    const updateActiveSection = () => {
        const offset = window.innerWidth <= 960 ? 76 : 84;
        let activeId = sections[0]?.getAttribute('id') || 'home';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - offset;
            if (window.scrollY >= sectionTop) {
                activeId = section.getAttribute('id');
            }
        });

        setActiveNav(activeId);

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        if (progressBar) progressBar.style.transform = `scaleX(${progress})`;

        if (backToTop) {
            const isVisible = window.scrollY > 420;
            backToTop.classList.toggle('visible', isVisible);
            backToTop.setAttribute('aria-hidden', String(!isVisible));
            backToTop.tabIndex = isVisible ? 0 : -1;
        }
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

    const currentYear = document.querySelector('#current-year');
    if (currentYear) currentYear.textContent = new Date().getFullYear();

    projectFilters.forEach((filter) => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-filter');
            if (!category) return;

            projectFilters.forEach((button) => {
                button.setAttribute('aria-pressed', String(button === filter));
            });

            let visibleCount = 0;
            projectCards.forEach((card) => {
                const categories = card.getAttribute('data-category')?.split(/\s+/) || [];
                const isVisible = category === 'all' || categories.includes(category);
                card.hidden = !isVisible;
                if (isVisible) visibleCount += 1;
            });

            if (projectFilterStatus) {
                projectFilterStatus.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'}.`;
            }
        });
    });

    const projectImageDialog = document.querySelector('#project-image-dialog');
    const projectImage = document.querySelector('#project-image-dialog-image');
    const projectImageTitle = document.querySelector('#project-image-dialog-title');
    const zoomLevel = document.querySelector('#project-image-zoom-level');
    const zoomIn = document.querySelector('#project-image-zoom-in');
    const zoomOut = document.querySelector('#project-image-zoom-out');
    const closeProjectImage = document.querySelector('#project-image-close');

    if (projectImageDialog instanceof HTMLDialogElement && projectImage instanceof HTMLImageElement
        && projectImageTitle && zoomLevel && zoomIn && zoomOut && closeProjectImage) {
        let zoom = 1;

        const updateZoom = () => {
            projectImage.style.width = `${zoom * 100}%`;
            zoomLevel.textContent = `${Math.round(zoom * 100)}%`;
            zoomOut.disabled = zoom <= 0.75;
            zoomIn.disabled = zoom >= 2.5;
        };

        document.querySelectorAll('.case-shot').forEach((button) => {
            button.addEventListener('click', () => {
                const image = button.querySelector('img');
                if (!image) return;

                zoom = 1;
                projectImage.src = image.currentSrc || image.src;
                projectImage.alt = image.alt;
                projectImageTitle.textContent = button.getAttribute('data-image-title') || image.alt;
                updateZoom();
                projectImageDialog.showModal();
            });
        });

        zoomIn.addEventListener('click', () => {
            zoom = Math.min(2.5, zoom + 0.25);
            updateZoom();
        });

        zoomOut.addEventListener('click', () => {
            zoom = Math.max(0.75, zoom - 0.25);
            updateZoom();
        });

        closeProjectImage.addEventListener('click', () => projectImageDialog.close());
        projectImageDialog.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                projectImageDialog.close();
            }
        });
        projectImageDialog.addEventListener('click', (event) => {
            if (event.target === projectImageDialog) projectImageDialog.close();
        });
        projectImageDialog.addEventListener('close', () => {
            projectImage.removeAttribute('src');
            projectImage.alt = '';
            zoom = 1;
            updateZoom();
        });
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
            const stickyOffset = window.innerWidth <= 960 ? 74 : 84;
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - stickyOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
});
