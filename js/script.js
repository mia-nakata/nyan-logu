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
      loopedSlides: 16, // 複製するスライド数
      centeredSlides: true, // アクティブなスライドを中央に配置
      speed: 1000, // スライドのトランジション速度
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },

      // ▼ 変更：SP用のデフォルト設定（中央1枚 + 左右見切れ）
      slidesPerView: 2,
      spaceBetween: 16,

      breakpoints: {
        // ▼ 変更：PCサイズ（768px以上）の設定
        768: {
          slidesPerView: 6, // 画面内に「6枚分」の幅を確保（5枚表示＋両端見切れ）
          spaceBetween: 24,
        },
      },
    });
  }

  // ==================================================
  // 3. FAQ Accordion
  // ==================================================
  const faqToggles = document.querySelectorAll('.js-faq-toggle');

  if (faqToggles.length > 0) {
    faqToggles.forEach((button) => {
      button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // a11y: aria-expandedの切り替え
        button.setAttribute('aria-expanded', String(!isExpanded));

        // 回答エリアの表示・非表示切り替え
        if (answer) {
          answer.hidden = isExpanded;
        }
      });
    });
  }
});
