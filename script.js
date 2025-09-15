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

    /* ---------------- Logo'ya tıklanınca küçük menü açılması ---------------- */
    const smallMenu = document.createElement('div');
    smallMenu.classList.add('small-menu');
    smallMenu.innerHTML = `
      <ul>
        <li><a href="#">Menü 1</a></li>
        <li><a href="#">Menü 2</a></li>
        <li><a href="#">Menü 3</a></li>
      </ul>
    `;
    document.body.appendChild(smallMenu);

    if (logo) {
      logo.addEventListener('click', (e) => {
        e.stopPropagation();
        smallMenu.classList.toggle('visible');
      });

      document.addEventListener('click', () => {
        smallMenu.classList.remove('visible');
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

    /* ---------------- Sayfa kaydırıldığında logo davranışı ---------------- */
    const logoElement = document.querySelector('.logo');
    let lastScrollTop = 0;

    if (logoElement) {
      window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScrollTop) {
          // Aşağı kaydırılıyor
          logoElement.classList.add('small');
          logoElement.classList.remove('large', 'medium');
        } else {
          // Yukarı kaydırılıyor
          logoElement.classList.add('large');
          logoElement.classList.remove('small', 'medium');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Negatif scroll değerlerini sıfırla
      });
    }

    /* ---------------- Mobil Menü ve Logo Tıklanabilirlik ---------------- */
    const menuButton = document.querySelector('.btn-open');
    const navigationMenu = document.querySelector('.main-navigation');
    const logoElement2 = document.querySelector('.header-logo a');

    if (menuButton && navigationMenu) {
      menuButton.addEventListener('click', () => {
        navigationMenu.classList.toggle('active');
      });
    }

    if (logoElement2) {
      logoElement2.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Logo tıklandı!'); // Burada istediğiniz işlemi yapabilirsiniz.
      });
    }

    /* ---------------- Navbar Logo Ortalama ---------------- */
    const headerLogo = document.querySelector('.header-logo');
    if (headerLogo && navigationMenu) {
      // Logoyu ortalamak için gerekli işlemler
      headerLogo.style.textAlign = 'center';
      navigationMenu.style.display = 'flex';
      navigationMenu.style.justifyContent = 'space-between';
    }

    /* ---------------- Küçük güvenlik kontrolleri ---------------- */
    // Eğer bazı elementler beklenmedik şekilde eksikse, hata fırlatmayı önle
    // (tüm addEventListener çağrıları yukarıda koşullarla sarmalandı)

    /* ------------------- Hamburger Menü ------------------- */
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNavigation = document.querySelector('.main-navigation');

    if (hamburgerMenu && mainNavigation) {
      hamburgerMenu.addEventListener('click', () => {
        mainNavigation.classList.toggle('active');
      });
    }

    function attachNavbarHandlers() {
      const hamburgerMenu = document.querySelector('.hamburger-menu');
      const mainNavigation = document.querySelector('.main-navigation');
      const menuMobile = document.querySelector('.menu-mobile');
      if (hamburgerMenu && mainNavigation) {
        hamburgerMenu.addEventListener('click', () => {
          mainNavigation.classList.toggle('active');
          if (menuMobile) menuMobile.classList.toggle('active');
        });
        // close mobile nav when clicking a link
        mainNavigation.querySelectorAll('a').forEach(a => {
          a.addEventListener('click', () => {
            mainNavigation.classList.remove('active');
            if (menuMobile) menuMobile.classList.remove('active');
          });
        });
      }

      if (menuMobile) {
        menuMobile.querySelectorAll('a').forEach(a => {
          a.addEventListener('click', () => {
            menuMobile.classList.remove('active');
            if (mainNavigation) mainNavigation.classList.remove('active');
          });
        });
      }

      // Set active menu link based on current path
      function setActiveNavLinks() {
        try {
          const path = window.location.pathname.split('/').pop() || 'index.html';
          const anchors = document.querySelectorAll('.main-navigation a, .menu-mobile a');
          anchors.forEach(a => {
            const href = a.getAttribute('href');
            if (!href) return;
            const hrefFile = href.split('/').pop();
            if (hrefFile === path || (path === '' && hrefFile === 'index.html')) {
              a.classList.add('active');
            } else {
              a.classList.remove('active');
            }
          });
        } catch (e) {
          console.error('setActiveNavLinks failed', e);
        }
      }

      // call once to initialize
      setActiveNavLinks();

      // Ensure header centering style applies after include
      const header = document.querySelector('.site-header');
      if (header) header.style.display = 'block';
    }

  // Navbars are inlined; attach handlers directly
  attachNavbarHandlers();

  }); // DOMContentLoaded
})();
