/* ========================================
   main.js – Loader, Cursor, Nav, Scroll
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // LOADER
    // ===========================
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);


    // ===========================
    // CUSTOM CURSOR
    // ===========================
    const cursor    = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');

    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let curX   = 0, curY   = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top  = mouseY + 'px';
        });

        // Smooth lag for large cursor ring
        function animateCursor() {
            curX += (mouseX - curX) * 0.10;
            curY += (mouseY - curY) * 0.10;
            cursor.style.left = curX + 'px';
            cursor.style.top  = curY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover grow effect
        const hoverTargets = document.querySelectorAll('a, button, .portfolio-item, .shop-item, .filter-btn');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });

        // Hide when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity    = '0';
            cursorDot.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity    = '1';
            cursorDot.style.opacity = '1';
        });
    } else {
        // Touch device – hide cursors
        cursor.style.display    = 'none';
        cursorDot.style.display = 'none';
        document.body.style.cursor = 'auto';
        document.querySelectorAll('a, button, input, textarea, select').forEach(el => {
            el.style.cursor = 'auto';
        });
    }


    // ===========================
    // NAVIGATION
    // ===========================
    const nav       = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Scroll: make nav opaque
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        const spans  = navToggle.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            document.body.style.overflow = 'hidden';
        } else {
            spans[0].style.transform = '';
            spans[1].style.transform = '';
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.transform = '';
            document.body.style.overflow = '';
        });
    });


    // ===========================
    // SMOOTH SCROLL
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - navH;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
    });


    // ===========================
    // CONTACT FORM
    // ===========================
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const origHTML = btn.innerHTML;
            btn.innerHTML = 'Nachricht gesendet ✓';
            btn.style.background = '#1a5c38';
            btn.style.borderColor = '#1a5c38';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML  = origHTML;
                btn.style.background  = '';
                btn.style.borderColor = '';
                btn.disabled = false;
                form.reset();
            }, 3500);
        });
    }

});
