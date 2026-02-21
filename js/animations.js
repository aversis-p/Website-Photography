/* ========================================
   animations.js – Scroll Reveal & Parallax
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // SCROLL REVEAL
    // ===========================
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after first reveal for performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));


    // ===========================
    // HERO TEXT REVEAL (after loader)
    // ===========================
    const heroRevealEls = document.querySelectorAll('.hero .reveal-up');
    setTimeout(() => {
        heroRevealEls.forEach(el => el.classList.add('visible'));
    }, 1600); // triggers just after loader fades


    // ===========================
    // HERO PARALLAX
    // ===========================
    const heroBg = document.getElementById('heroBg');

    if (heroBg) {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    // Parallax: image moves slower than scroll
                    heroBg.style.transform = `translateY(${scrollY * 0.38}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

});
