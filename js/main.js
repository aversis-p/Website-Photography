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
    // PORTFOLIO MODAL
    // ===========================
    const portfolioModal   = document.getElementById('portfolioModal');
    const modalBackdrop    = document.getElementById('modalBackdrop');
    const modalClose       = document.getElementById('modalClose');
    const modalImg         = document.getElementById('modalImg');
    const modalCat         = document.getElementById('modalCat');
    const modalTitle       = document.getElementById('modalTitle');

    function openModal(item) {
        const img   = item.querySelector('.portfolio-img-wrap img');
        const cat   = item.querySelector('.portfolio-cat');
        const title = item.querySelector('.portfolio-info h3');
        modalImg.src        = img.src;
        modalImg.alt        = img.alt;
        modalCat.textContent   = cat ? cat.textContent : '';
        modalTitle.textContent = title ? title.textContent : '';
        portfolioModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        portfolioModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => openModal(item));
    });

    if (modalClose)    modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
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
