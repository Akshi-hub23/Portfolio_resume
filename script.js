document.addEventListener('DOMContentLoaded', () => {
    // Reveal animation on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Scroll animation staggered delays

    // Add staggered delay to reveal elements if needed
    const projects = document.querySelectorAll('.project-card');
    projects.forEach((project, index) => {
        project.style.transitionDelay = `${index * 0.1}s`;
    });

    const certs = document.querySelectorAll('.cert-card');
    certs.forEach((cert, index) => {
        cert.style.transitionDelay = `${index * 0.05}s`;
    });

    // Custom Smooth Scrolling for Nav Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 100; // Offset to ensure section header is visible
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
