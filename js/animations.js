/* ========================================
   animations.js – Scroll Reveal & Hero Card Effect
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // SCROLL REVEAL – HERO ONLY (.visible trigger)
    // ===========================
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));


    // ===========================
    // HERO TEXT REVEAL (after loader)
    // ===========================
    const heroRevealEls = document.querySelectorAll('.hero-card .reveal-up');
    setTimeout(() => {
        heroRevealEls.forEach(el => el.classList.add('visible'));
    }, 1600);


    // ===========================
    // HERO CARD SCROLL EFFECT
    // ===========================
    const heroWrapper = document.getElementById('heroWrapper');
    const heroCardInner = document.getElementById('heroCardInner');
    const heroCard = document.getElementById('heroCard');

    if (heroWrapper && heroCardInner) {
        let ticking = false;

        const updateCard = () => {
            const wrapperTop = heroWrapper.getBoundingClientRect().top;
            const vh = window.innerHeight;

            // scrollProgress: 0 at top, 1 when scrolled one viewport height
            const scrolled = -wrapperTop;
            const progress = Math.max(0, Math.min(scrolled / vh, 1));

            // Card transforms
            const borderRadius = progress * 28;
            const scale = 1 - progress * 0.05;
            const shadowBlur = progress * 80;
            const shadowY = progress * 40;
            const shadowOpacity = progress * 0.6;
            heroCardInner.style.borderRadius = borderRadius + 'px';
            heroCardInner.style.transform = `scale(${scale})`;
            heroCardInner.style.boxShadow = `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`;

            // Fade out hero content as it scrolls
            const heroContent = heroCard.querySelector('.hero-content');
            const heroScroll = heroCard.querySelector('.hero-scroll-indicator');
            const heroNumber = heroCard.querySelector('.hero-number');
            const contentOpacity = 1 - progress * 2; // fades out by 50% scroll

            if (heroContent) heroContent.style.opacity = Math.max(0, contentOpacity);
            if (heroScroll) heroScroll.style.opacity = Math.max(0, contentOpacity);
            if (heroNumber) heroNumber.style.opacity = Math.max(0, contentOpacity);

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateCard);
                ticking = true;
            }
        }, { passive: true });

        // Initial call
        updateCard();
    }


    // ===========================
    // SCROLL REVEAL – NON-HERO (.active trigger)
    // ===========================
    const activeEls = document.querySelectorAll('.reveal, .reveal-stagger');

    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                activeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    activeEls.forEach(el => activeObserver.observe(el));

});
