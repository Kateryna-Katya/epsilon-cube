document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ПЛАВНЫЙ СКРОЛЛ ---
    const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // --- 2. HEADER & MENU ---
    const header = document.querySelector('.header');
    const burger = document.querySelector('.burger');
    const mobileMenu = document.getElementById('mobile-menu');

    window.addEventListener('scroll', () => {
        header.classList.toggle('header--scrolled', window.scrollY > 50);
    });

    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // --- 3. ИНИЦИАЛИЗАЦИЯ SWIPER (БЕЗ GSAP) ---
    // Инициализируем сразу, без условий появления
    const innovationSwiper = new Swiper('.innovation-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        watchSlidesProgress: true,
        autoplay: { delay: 4000 },
        pagination: { el: '.inv-pagination', clickable: true },
        navigation: { nextEl: '.inv-next', prevEl: '.inv-prev' },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30 },
            1100: { slidesPerView: 3, spaceBetween: 40 }
        }
    });

    // --- 4. GSAP АНИМАЦИИ (ТОЛЬКО ГДЕ НУЖНО) ---
    gsap.registerPlugin(ScrollTrigger);

    // Анимация текста в Hero
    const heroTitle = new SplitType('.hero__title', { types: 'chars' });
    gsap.to(heroTitle.chars, {
        y: 0, opacity: 1, stagger: 0.02, duration: 0.8, ease: 'power3.out'
    });

    // Появление карточек блога (Инсайты)
    gsap.from(".animate-blog", {
        scrollTrigger: {
            trigger: ".blog__grid",
            start: "top 85%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6
    });

    // --- 5. ФОРМА И КАПЧА ---
    const form = document.getElementById('career-form');
    const captchaQ = document.getElementById('captcha-question');
    let correctAnswer;

    const genCaptcha = () => {
        const a = Math.floor(Math.random() * 10) + 1, b = Math.floor(Math.random() * 10) + 1;
        correctAnswer = a + b;
        if (captchaQ) captchaQ.innerText = `${a} + ${b}`;
    };
    genCaptcha();

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const ans = document.getElementById('captcha-answer').value;
            if (parseInt(ans) !== correctAnswer) {
                alert('Ошибка проверки!'); return genCaptcha();
            }
            
            const btn = document.getElementById('submit-btn');
            btn.disabled = true;
            document.getElementById('form-loader').style.display = 'block';

            setTimeout(() => {
                document.getElementById('success-msg').classList.add('active');
                form.reset(); genCaptcha();
                btn.disabled = false;
                document.getElementById('form-loader').style.display = 'none';
            }, 1500);
        });
    }

    // --- 6. COOKIE POPUP ---
    const cookiePopup = document.getElementById('cookie-popup');
    if (cookiePopup && !localStorage.getItem('epsilon_accepted')) {
        setTimeout(() => cookiePopup.classList.add('active'), 2000);
    }
    document.getElementById('cookie-accept')?.addEventListener('click', () => {
        localStorage.setItem('epsilon_accepted', 'true');
        cookiePopup.classList.remove('active');
    });

    // Включаем иконки
    lucide.createIcons();
});