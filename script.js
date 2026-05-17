/* ═══════════════════════════════════════════════
   SARA AZOUGGAGH — script.js
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL ── */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* ── BURGER MOBILE MENU ── */
  const burger  = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── ACTIVE NAV LINK on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));

  /* ── SKILL BARS ANIMATION ── */
  const fills = document.querySelectorAll('.skill-fill');
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animated');
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: .4 });
  fills.forEach(f => skillObs.observe(f));

  /* ── FADE-UP on scroll ── */
  const fadeEls = document.querySelectorAll('[data-fade]');
  const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.animation = `fadeUp .7s ${i * 0.08}s ease both`;
        fadeObs.unobserve(e.target);
      }
    });
  }, { threshold: .15 });
  fadeEls.forEach(el => {
    el.style.opacity = '0';
    fadeObs.observe(el);
  });

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const success = document.getElementById('formSuccess');
      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.textContent = 'Message envoyé ✓';
        btn.style.background = '#065f46';
        if (success) success.style.display = 'block';
        setTimeout(() => {
          btn.textContent = 'Envoyer le message';
          btn.style.background = '';
          btn.disabled = false;
          if (success) success.style.display = 'none';
        }, 4000);
      }, 1400);
    });
  }

  /* ── GALLERY LIGHTBOX ── */
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length) {
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.innerHTML = `
      <div class="lb-overlay"></div>
      <div class="lb-content">
        <button class="lb-close">✕</button>
        <img class="lb-img" src="" alt="">
        <p class="lb-caption"></p>
      </div>`;
    document.body.appendChild(lb);

    const lbImg = lb.querySelector('.lb-img');
    const lbCap = lb.querySelector('.lb-caption');

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const cap = item.querySelector('.gallery-caption');
        if (img) lbImg.src = img.src;
        if (cap) lbCap.textContent = cap.textContent;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    [lb.querySelector('.lb-overlay'), lb.querySelector('.lb-close')].forEach(el => {
      el.addEventListener('click', () => {
        lb.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── CV FILE UPLOAD PREVIEW ── */
  const cvInput = document.getElementById('cvFileInput');
  const cvPlaceholder = document.getElementById('cvPlaceholder');
  if (cvInput && cvPlaceholder) {
    cvInput.addEventListener('change', function() {
      const file = this.files[0];
      if (!file || file.type !== 'application/pdf') return;
      const url = URL.createObjectURL(file);
      const embed = document.createElement('embed');
      embed.src = url;
      embed.type = 'application/pdf';
      embed.className = 'cv-embed';
      embed.title = 'CV Sara Azouggagh';
      cvPlaceholder.replaceWith(embed);
      document.querySelectorAll('.cv-dl-btn, .cv-view-btn').forEach(b => { b.href = url; });
    });
  }

  /* ── CPGE SEARCH FILTER ── */
  const searchInput = document.getElementById('cpgeSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const q = this.value.toLowerCase();
      document.querySelectorAll('.resource-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  /* ── POEM TABS ── */
  document.querySelectorAll('.poem-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.closest('.poem-tabs-wrapper');
      parent.querySelectorAll('.poem-tab').forEach(t => t.classList.remove('active'));
      parent.querySelectorAll('.poem-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.target;
      const panel = parent.querySelector(`#${target}`);
      if (panel) panel.classList.add('active');
    });
  });

});