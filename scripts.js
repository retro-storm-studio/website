document.addEventListener('DOMContentLoaded', function () {

  /* Burger menu */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');

  if (burger && menu) {
    const icon = burger.querySelector('i');

    const setMenu = (open) => {
      menu.classList.toggle('show', open);
      burger.setAttribute('aria-expanded', String(open));
      icon.classList.toggle('fa-bars', !open);
      icon.classList.toggle('fa-times', open);
    };

    burger.addEventListener('click', () => {
      setMenu(!menu.classList.contains('show'));
    });

    // Close after tapping a link, otherwise the menu covers the section you jumped to.
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });
  }

  /* Trailer. The iframe is only injected on click, so the page ships no
     player and sets no cookies for visitors who never press play. */
  const trailer = document.getElementById('trailer-player');

  if (trailer) {
    const loadTrailer = () => {
      const id = trailer.dataset.video;
      if (!id) return;

      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = 'Tank Lore announcement trailer';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;

      trailer.innerHTML = '';
      trailer.appendChild(iframe);
    };

    trailer.addEventListener('click', loadTrailer);
  }

  /* Screenshot lightbox */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  let lastFocused = null;

  if (lightbox && lightboxImg) {
    const openLightbox = (src, alt) => {
      lastFocused = document.activeElement;
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    };

    const closeLightbox = () => {
      lightbox.hidden = true;
      lightboxImg.src = '';
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };

    document.querySelectorAll('.shot').forEach((shot) => {
      shot.addEventListener('click', () => {
        const img = shot.querySelector('img');
        openLightbox(shot.dataset.full, img ? img.alt : '');
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }

  /* Scroll reveal */
  const revealItems = document.querySelectorAll('[data-reveal]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    revealItems.forEach((el, i) => {
      el.style.transitionDelay = (i % 5) * 70 + 'ms';
      observer.observe(el);
    });
  }

});