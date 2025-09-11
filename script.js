// script.js — Güncellenmiş ve hata kontrolü yapılmış
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- Menu toggle (mobil) ---------------- */
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
      });

      // Menüdeki linke tıklandığında mobil menüyü kapat
      menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => menu.classList.remove('active'));
      });
    }

    /* ---------------- Logo (anasayfaya yönlendirme) ---------------- */
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.style.cursor = 'pointer';
      logo.addEventListener('click', () => {
        // Eğer halihazırda index.html içinde isek, aynı sayfaya gitmeyi engelle
        if (window.location.pathname.indexOf('index') === -1) {
          window.location.href = 'index.html';
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    /* ---------------- Topbar saat kontrolü ---------------- */
    const topbar = document.querySelector('.topbar');
    if (topbar) {
      function checkTime() {
        const now = new Date();
        const hours = now.getHours();
        if (hours >= 21 || hours < 8) {
          topbar.textContent = 'Kapalı: 08:00 – 21:00';
          topbar.style.background = '#b71c1c';
          topbar.style.color = '#fff';
        } else {
          topbar.textContent = 'Açık: 08:00 – 21:00';
          topbar.style.background = '#1b5e20';
          topbar.style.color = '#fff';
        }
      }
      checkTime();
      setInterval(checkTime, 60000);
    }

    /* ---------------- Instagram feed (örnek görseller) ---------------- */
    const instagramPhotos = document.querySelector('.instagram-photos');
    const photoUrls = [
      'images/hero1.jpg',
      'images/hero2.jpg',
      'images/hero3.jpg',
      'images/hero1.jpg'
    ];
    if (instagramPhotos && Array.isArray(photoUrls)) {
      photoUrls.forEach(url => {
        const a = document.createElement('a');
        a.className = 'photo';
        a.style.backgroundImage = `url(${url})`;
        a.href = 'https://www.instagram.com/flamingokoy/';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        instagramPhotos.appendChild(a);
      });
    }

    /* ---------------- Smooth scroll for internal anchors ---------------- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    /* ---------------- Scroll to top button ---------------- */
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
      // başlangıçta gizle
      scrollTopBtn.style.display = 'none';
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // görünürlük kontrolü
      const toggleScrollBtn = () => {
        if (window.scrollY > 300) {
          scrollTopBtn.style.display = 'flex';
        } else {
          scrollTopBtn.style.display = 'none';
        }
      };

      window.addEventListener('scroll', toggleScrollBtn);
      // hemen kontrol et (sayfa reload durumları için)
      toggleScrollBtn();
    }

    /* ---------------- Scroll reveal (fade-in) ---------------- */
    const revealElems = document.querySelectorAll('[data-animate], .about, .kahvalti, .barbeku, .dostlarimiz, .info-grid, .testimonials');
    const revealOnScroll = () => {
      revealElems.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('active');
        } else {
          // istersen kaldırılmasını engelleyebilirsin; şu an toggle yapıyor
          el.classList.remove('active');
        }
      });
    };

    // performans için raf kullan
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          revealOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    // ilk yüklemede bir kez çalıştır
    revealOnScroll();

    /* ---------------- Küçük güvenlik kontrolleri ---------------- */
    // Eğer bazı elementler beklenmedik şekilde eksikse, hata fırlatmayı önle
    // (tüm addEventListener çağrıları yukarıda koşullarla sarmalandı)

  }); // DOMContentLoaded
})();
