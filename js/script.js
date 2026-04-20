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
  // 1.5 Header Scroll Tracking (PC Only)
  // ==================================================
  const headerElement = document.querySelector('.js-header');
  const fvSection = document.querySelector('.fv');

  if (headerElement && fvSection) {
    // スクロールイベントを監視
    window.addEventListener('scroll', () => {
      // PC幅（768px以上）の時のみ動作させる
      if (window.innerWidth >= 768) {
        // ファーストビュー(FV)の高さを取得
        const fvHeight = fvSection.offsetHeight;

        // スクロール量がFVの高さを超えたら表示クラスを付与
        if (window.scrollY > fvHeight) {
          headerElement.classList.add('is-active');
        } else {
          headerElement.classList.remove('is-active');
        }
      }
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
          },
        },
      });
    });
  }

  // ==================================================
  // 4. Reviews Swiper Init (SP Only)
  // ==================================================
  const reviewsSwiperEl = document.querySelector('.js-reviews-swiper');

  if (reviewsSwiperEl && typeof Swiper !== 'undefined') {
    new Swiper('.js-reviews-swiper', {
      // ▼ 3番(Features)と同じく、ブレイクポイントでON/OFFを自動切り替え！
      breakpoints: {
        0: {
          enabled: true,
          slidesPerView: 1,
          spaceBetween: 16,
          navigation: {
            nextEl: '.js-reviews-next',
            prevEl: '.js-reviews-prev',
          },
        },
        768: {
          enabled: false,
          spaceBetween: 0,
        },
      },
    });
  }

  // ==================================================
  // 5. FAQ Accordion Toggle
  // ==================================================
  const faqToggles = document.querySelectorAll('.js-faq-toggle');

  if (faqToggles.length > 0) {
    faqToggles.forEach((toggle) => {
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

  // ==================================================
  // 6. Scroll Animation (Intersection Observer)
  // ==================================================
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -20% 0px', // 画面の下から20%の位置を通過したら発火
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 画面に入ったら is-active クラスを付与
        entry.target.classList.add('is-active');
        // 一度アニメーションしたら監視を解除する（何度も動かないようにする）
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // js-observe クラスがついた要素を監視対象にする
  const observeElements = document.querySelectorAll('.js-observe');
  observeElements.forEach((el) => observer.observe(el));
  // ==================================================
  // 8. AOS (Animate On Scroll) Init
  // ==================================================
  if (typeof AOS !== 'undefined') {
    AOS.init({
      offset: 100, // アニメーションが始まるスクロール位置（px）
      duration: 800, // アニメーションの完了にかかる時間（ミリ秒）★少し長めが優しいです
      easing: 'ease-out', // アニメーションの動き方
      once: true, // スクロールして戻った時に、何度もアニメーションするかどうか（trueで1回きり）
    });
  }
});
