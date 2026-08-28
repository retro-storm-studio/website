function initBurgerMenu() {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  if (!burger || !menu) return;

  const icon = burger.querySelector('i');

  const setMenu = (open) => {
    menu.classList.toggle('show', open);
    burger.setAttribute('aria-expanded', String(open));
    if (icon) {
      icon.classList.toggle('fa-bars', !open);
      icon.classList.toggle('fa-times', open);
    }
  };

  burger.addEventListener('click', () => {
    setMenu(!menu.classList.contains('show'));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });
}

function initTrailer() {
  const trailer = document.getElementById('trailer-player');
  if (!trailer) return;

  const videoId = trailer.dataset.video;
  if (!videoId) return;

  const poster = trailer.querySelector('.trailer-poster');
  if (poster) {
    // maxres doesn't exist for every upload; fall back once on error.
    poster.src = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';
    poster.addEventListener('error', function onErr() {
      poster.removeEventListener('error', onErr);
      poster.src = 'https://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg';
    });
  }

  trailer.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0';
    iframe.title = 'Tank Lore announcement trailer';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    trailer.innerHTML = '';
    trailer.appendChild(iframe);
  });
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  if (!lightbox || !lightboxImg || !lightboxClose) return;

  let lastFocused = null;

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
    if (lastFocused) {
      lastFocused.focus();
    }
  };

  document.querySelectorAll('.shot').forEach((shot) => {
    shot.addEventListener('click', () => {
      const img = shot.querySelector('img');
      openLightbox(shot.dataset.full, img ? img.alt : '');
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });
}

function initScrollReveal() {
  const revealItems = document.querySelectorAll('[data-reveal]');
  if (!revealItems.length) return;

  const reduceMotion = typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
    return;
  }

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

document.addEventListener('DOMContentLoaded', function () {
  renderTeam('team-grid');

  initBurgerMenu();
  initTrailer();
  initLightbox();
  initScrollReveal();
});