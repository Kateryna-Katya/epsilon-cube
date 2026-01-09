document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ИНИЦИАЛИЗАЦИЯ ПЛАВНОГО СКРОЛЛА (LENIS) ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- 2. МОБИЛЬНОЕ МЕНЮ И ХЕДЕР ---
    const header = document.querySelector('.header');
    const burger = document.querySelector('.burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    window.addEventListener('scroll', () => {
        header.classList.toggle('header--scrolled', window.scrollY > 50);
    });

    const toggleMenu = () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- 3. ФОН HERO (VANTA.JS) ---
    if (window.innerWidth > 768 && typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#vanta-canvas",
            mouseControls: true,
            color: 0x22d3ee,
            backgroundColor: 0x0a0c10,
            points: 12.00,
            maxDistance: 22.00,
            spacing: 18.00
        });
    }

    // --- 4. GSAP АНИМАЦИИ (БЕЗ СЕКЦИИ ИННОВАЦИЙ) ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero: Анимация заголовка
    const heroTitle = new SplitType('.hero__title', { types: 'chars' });
    const heroTl = gsap.timeline({ delay: 0.5 });
    
    heroTl.to(heroTitle.chars, {
        y: 0,
        rotate: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 1,
        ease: 'power4.out'
    }).to('.animate-fade', {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.5');

    // Описание платформы (About)
    gsap.from(".about__content .reveal-text", {
        scrollTrigger: {
            trigger: ".about",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1
    });

    // Инсайты (Блог) - ИСПРАВЛЕНО ПОДГРУЗКА
    gsap.to(".animate-blog", {
        scrollTrigger: {
            trigger: ".blog__grid",
            start: "top 85%",
        },
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        onStart: () => {
            document.querySelectorAll('.animate-blog').forEach(el => el.style.visibility = 'visible');
        }
    });

    // Счетчики в статистике
    document.querySelectorAll('.stat-item__num').forEach(counter => {
        const target = +counter.getAttribute('data-val');
        gsap.to(counter, {
            scrollTrigger: { trigger: counter, start: "top 90%" },
            innerText: target,
            duration: 2,
            snap: { innerText: 1 }
        });
    });

    // --- 5. SWIPER (ИННОВАЦИИ) - БЕЗ GSAP ---
    const innovationSwiper = new Swiper('.innovation-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '.inv-pagination', clickable: true },
        navigation: { nextEl: '.inv-next', prevEl: '.inv-prev' },
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 }
        }
    });

    // --- 6. КОНТАКТНАЯ ФОРМА И КАПЧА ---
    const form = document.getElementById('career-form');
    const captchaQ = document.getElementById('captcha-question');
    const captchaA = document.getElementById('captcha-answer');
    let correctAnswer;

    const generateCaptcha = () => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        correctAnswer = a + b;
        if (captchaQ) captchaQ.innerText = `${a} + ${b}`;
    };
    generateCaptcha();

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (parseInt(captchaA.value) !== correctAnswer) {
                alert('Неверный ответ капчи!');
                generateCaptcha();
                captchaA.value = '';
                return;
            }

            const btn = document.getElementById('submit-btn');
            const loader = document.getElementById('form-loader');
            const btnText = btn.querySelector('span');

            btnText.style.opacity = '0';
            loader.style.display = 'block';
            btn.disabled = true;

            setTimeout(() => {
                document.getElementById('success-msg').classList.add('active');
                form.reset();
                generateCaptcha();
                btnText.style.opacity = '1';
                loader.style.display = 'none';
                btn.disabled = false;
            }, 2000);
        });
    }

    document.getElementById('reset-form')?.addEventListener('click', () => {
        document.getElementById('success-msg').classList.remove('active');
    });

    // --- 7. COOKIE POPUP ---
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieBtn = document.getElementById('cookie-accept');

    if (cookiePopup && !localStorage.getItem('epsilon_cookies_accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 3000);
    }

    cookieBtn?.addEventListener('click', () => {
        localStorage.setItem('epsilon_cookies_accepted', 'true');
        cookiePopup.classList.remove('active');
    });

    // --- 8. ЭФФЕКТ МАГНИТНЫХ КАРТОЧЕК ---
    document.querySelectorAll('.bento__item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            item.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            item.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    // Инициализация иконок
    lucide.createIcons();
});