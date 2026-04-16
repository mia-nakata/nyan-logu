document.addEventListener('DOMContentLoaded', () => {
  // ==================================================
  // 1. Drawer Menu Toggle
  // ==================================================
  const drawerBtn = document.querySelector('.js-drawer-open');
  const drawer = document.querySelector('.js-drawer');
  const drawerLinks = document.querySelectorAll('.js-drawer-link');
  const body = document.body;

  const toggleDrawer = () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      drawer.classList.remove('is-open');
      drawerBtn.classList.remove('is-open');
      drawerBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      body.style.overflow = '';
    } else {
      drawer.classList.add('is-open');
      drawerBtn.classList.add('is-open');
      drawerBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      body.style.overflow = 'hidden'; // 背面のスクロール固定
    }
  };

  if (drawerBtn && drawer) {
    drawerBtn.addEventListener('click', toggleDrawer);
  }

  if (drawerLinks.length > 0) {
    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        // メニューリンククリック時にドロワーが開いていれば閉じる
        if (drawer.classList.contains('is-open')) toggleDrawer();
      });
    });
  }

  // ==================================================
  // 2. FV Swiper Init
  // ==================================================
  const fvSliderElement = document.querySelector('.js-fv-swiper');

  if (fvSliderElement && typeof Swiper !== 'undefined') {
    const fvSwiper = new Swiper('.js-fv-swiper', {
      loop: true,
      loopedSlides: 16,
      centeredSlides: true,
      speed: 1000,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      slidesPerView: 2,
      spaceBetween: 16,
      breakpoints: {
        768: {
          slidesPerView: 6,
          spaceBetween: 24,
        },
      },
    });
  }

  // ==================================================
  // 3. Features Swiper Init (SP Only)
  // ==================================================
  const featureSwipers = document.querySelectorAll('.js-features-swiper');
  
  if (featureSwipers.length > 0 && typeof Swiper !== 'undefined') {
    featureSwipers.forEach((swiperEl) => {
      new Swiper(swiperEl, {
        noSwiping: true, 
        breakpoints: {
          0: {
            enabled: true,
            slidesPerView: 1,
            spaceBetween: 24,
            navigation: {
              nextEl: swiperEl.querySelector('.js-features-next'),
              prevEl: swiperEl.querySelector('.js-features-prev'),
            },
          },
          768: {
            enabled: false,
            spaceBetween: 0,
          }
        }
      });
    });
  }

  // ==================================================
  // 4. Reviews Swiper Init (SP Only)
  // ==================================================
  let reviewsSwiper;
  
  const initReviewsSwiper = () => {
    const swiperEl = document.querySelector('.js-reviews-swiper');
    if (!swiperEl || typeof Swiper === 'undefined') return;

    if (window.innerWidth <= 767) {
      if (!reviewsSwiper) {
        reviewsSwiper = new Swiper('.js-reviews-swiper', {
          slidesPerView: 1,
          spaceBetween: 16,
          navigation: {
            nextEl: '.js-reviews-next',
            prevEl: '.js-reviews-prev',
          },
        });
      }
    } else {
      if (reviewsSwiper) {
        reviewsSwiper.destroy(true, true);
        reviewsSwiper = undefined;
      }
    }
  };

  // 初回実行とリサイズ時のイベント登録
  initReviewsSwiper();
  window.addEventListener('resize', initReviewsSwiper);

  // ==================================================
  // 5. FAQ Accordion Toggle
  // ==================================================
  const faqToggles = document.querySelectorAll('.js-faq-toggle');
  
  if (faqToggles.length > 0) {
    faqToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        
        const answer = toggle.parentElement.nextElementSibling;
        if (answer) {
          answer.setAttribute('aria-hidden', isExpanded);
        }
      });
    });
  }
});