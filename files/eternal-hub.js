/* ============================================================
   £T€R₦AL HUB — eternal-hub.js
   Zero-dependency vanilla ES6+. Six self-contained modules
   inside one IIFE. No state management, no virtual DOM.

   Modules:
     1. Header Scroll Effect
     2. Mobile Menu
     3. Scroll Reveal (IntersectionObserver)
     4. Vendor Filtering
     5. Smooth Scroll (Anchor Links)
     6. Keyboard Accessibility (Vendor Cards)

   Usage: <script src="assets/js/eternal-hub.js" defer></script>
   System: Eternal Noir · v1.0
   Maintainer: Millenial Renaissance Art Limited
   ============================================================ */

(function () {
  'use strict';

  /* ─── 1. HEADER SCROLL EFFECT ──────────────────────────────
     Adds .is-scrolled to #header when window.scrollY > 20px.
     Uses requestAnimationFrame + ticking flag to throttle the
     scroll handler — never fires more than once per frame.
  ──────────────────────────────────────────────────────────── */
  const header = document.getElementById('header');

  if (header) {
    let ticking = false;

    function updateHeader() {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }


  /* ─── 2. MOBILE MENU ────────────────────────────────────────
     Toggles .is-open on #mobile-nav and aria-expanded on the
     .menu-toggle button. Locks body scroll while open.
     Closes automatically when any nav link is clicked.
  ──────────────────────────────────────────────────────────── */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav  = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.classList.toggle('is-open', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }


  /* ─── 3. SCROLL REVEAL (IntersectionObserver) ───────────────
     Observes all [data-reveal] elements. Adds .is-revealed
     when they enter the viewport, then unobserves (fires once).
     CSS handles the actual transition in _animations.css.
     Works with plain [data-reveal] and [data-reveal="stagger"].
  ──────────────────────────────────────────────────────────── */
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if (revealTargets.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -60px 0px'
    });

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback — no IntersectionObserver support (old browsers) */
    revealTargets.forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }


  /* ─── 4. VENDOR FILTERING ───────────────────────────────────
     Reads data-name, data-category, data-location from each
     vendor card article. Filters against:
       - Text search [data-filter-search]   (debounced 150ms)
       - Category select [data-filter-category]
       - Location select [data-filter-location]
     Shows .empty-state when zero results match.
     No JSON. No state management. Pure DOM data attributes.
  ──────────────────────────────────────────────────────────── */
  const searchInput    = document.querySelector('[data-filter-search]');
  const categorySelect = document.querySelector('[data-filter-category]');
  const locationSelect = document.querySelector('[data-filter-location]');
  const emptyState     = document.querySelector('[data-empty-state]');
  const vendorCards    = Array.from(
    document.querySelectorAll('[data-vendor-grid] > article')
  );

  if (searchInput && categorySelect && locationSelect && vendorCards.length > 0) {

    function filterVendors() {
      const query    = (searchInput.value || '').toLowerCase().trim();
      const category = categorySelect.value;
      const location = locationSelect.value;
      let   visible  = 0;

      vendorCards.forEach(function (card) {
        const name     = (card.dataset.name     || '').toLowerCase();
        const catAttr  =  card.dataset.category || '';
        const locAttr  =  card.dataset.location || '';
        const descEl   =  card.querySelector('.vendor-card__desc');
        const desc     = descEl ? descEl.textContent.toLowerCase() : '';

        const matchSearch   = !query || name.includes(query) || desc.includes(query);
        const matchCategory = category === 'all' || catAttr === category;
        const matchLocation = location === 'all' || locAttr === location;

        if (matchSearch && matchCategory && matchLocation) {
          /* Show with fade-in */
          card.style.display   = '';
          card.style.opacity   = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(function () {
            card.style.transition = 'opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)';
            card.style.opacity    = '1';
            card.style.transform  = 'translateY(0)';
          });
          visible++;
        } else {
          /* Fade out then hide */
          card.style.opacity   = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(function () { card.style.display = 'none'; }, 300);
        }
      });

      if (emptyState) {
        emptyState.classList.toggle('is-visible', visible === 0);
      }
    }

    let filterTimeout;

    searchInput.addEventListener('input', function () {
      clearTimeout(filterTimeout);
      filterTimeout = setTimeout(filterVendors, 150);
    });

    categorySelect.addEventListener('change', filterVendors);
    locationSelect.addEventListener('change', filterVendors);
  }


  /* ─── 5. SMOOTH SCROLL (Anchor Links) ──────────────────────
     Overrides default anchor behaviour on all href="#..." links.
     Accounts for fixed header height + 20px breathing room.
  ──────────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight   = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });


  /* ─── 6. KEYBOARD ACCESSIBILITY (Vendor Cards) ──────────────
     Makes article vendor cards keyboard-operable.
     Enter or Space activates the card's .vendor-card__link.
  ──────────────────────────────────────────────────────────── */
  vendorCards.forEach(function (card) {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const link = card.querySelector('.vendor-card__link');
        if (link) link.click();
      }
    });
  });

})();
