/* ========================================
   shop.js – Portfolio Filter
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // PORTFOLIO CATEGORY FILTER
    // ===========================
    const filterBtns     = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioItems.forEach(item => {
                const matches = filter === 'all' || item.dataset.category === filter;

                if (matches) {
                    // Show: restore display then animate in
                    item.style.display  = '';
                    item.style.opacity  = '0';
                    item.style.transform = 'scale(0.97)';
                    // Small delay to allow display:'' to take effect
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            item.style.opacity   = '1';
                            item.style.transform = 'scale(1)';
                        });
                    });
                } else {
                    // Hide: animate out then set display:none
                    item.style.opacity   = '0';
                    item.style.transform = 'scale(0.97)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 350);
                }
            });

            // Recalculate layout for portfolio-wide/tall after filter
            // (grid reflows automatically – no extra work needed)
        });
    });

});
