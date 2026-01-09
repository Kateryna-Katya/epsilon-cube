document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ Epsilon-Cube Engine Started");

    // --- 1. ПЛАВНЫЙ СКРОЛЛ (LENIS) ---
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

    // --- 2. МОБИЛЬНОЕ МЕНЮ (ИСПРАВЛЕНО) ---
    const burger = document.querySelector('.burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    const closeMenu = () => {
        if (burger && mobileMenu) {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (burger) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Закрытие при клике на ссылки в меню
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- 3. ФОН HERO (VANTA.JS) ---
    if (typeof VANTA !== 'undefined' && document.getElementById('vanta-canvas')) {
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

    // --- 4. GSAP АНИМАЦИИ (HERO + ABOUT + BLOG) ---
    gsap.registerPlugin(ScrollTrigger);

    // Анимация заголовка Hero (строго по словам, чтобы не рвать их)
    const title = document.querySelector('.hero__title');
    if (title) {
        const splitTitle = new SplitType(title, { types: 'words' });
        const heroTl = gsap.timeline({ delay: 0.5 });

        heroTl.to(splitTitle.words, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.05,
            ease: "power4.out"
        })
        .to('.animate-fade', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.5");
    }

    // Появление других секций
    gsap.from(".about__content .reveal-text, .animate-bento, .animate-blog", {
        scrollTrigger: {
            trigger: ".about",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
    });

    // --- 5. SWIPER (INNOVATION) ---
    const swiper = new Swiper('.innovation-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '.inv-pagination', clickable: true },
        navigation: { nextEl: '.inv-next', prevEl: '.inv-prev' },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30 },
            1100: { slidesPerView: 3, spaceBetween: 40 }
        }
    });

    // --- 6. КОНТАКТНАЯ ФОРМА И СООБЩЕНИЕ ОБ УСПЕХЕ (ИСПРАВЛЕНО) ---
    const form = document.getElementById('career-form');
    const successMsg = document.getElementById('success-msg');
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
            console.log("🚀 Form submitted");

            // Проверка капчи
            if (parseInt(captchaA.value) !== correctAnswer) {
                alert('Неверный ответ капчи!');
                generateCaptcha();
                captchaA.value = '';
                return;
            }

            const btn = document.getElementById('submit-btn');
            const loader = document.getElementById('form-loader');
            const btnText = btn.querySelector('span');

            // Состояние загрузки
            if (btnText) btnText.style.opacity = '0';
            if (loader) loader.style.display = 'block';
            btn.disabled = true;

            // Имитация отправки (AJAX)
            setTimeout(() => {
                console.log("✅ Show success message");
                if (successMsg) successMsg.classList.add('active');
                
                // Сброс формы
                form.reset();
                generateCaptcha();

                // Возвращаем кнопку в норму через время
                if (btnText) btnText.style.opacity = '1';
                if (loader) loader.style.display = 'none';
                btn.disabled = false;
            }, 1500);
        });
    }

    // Сброс сообщения об успехе
    document.getElementById('reset-form')?.addEventListener('click', () => {
        successMsg.classList.remove('active');
    });

    // --- 7. COOKIE POPUP ---
    const cookiePopup = document.getElementById('cookie-popup');
    if (cookiePopup && !localStorage.getItem('epsilon_accepted')) {
        setTimeout(() => cookiePopup.classList.add('active'), 3000);
    }
    document.getElementById('cookie-accept')?.addEventListener('click', () => {
        localStorage.setItem('epsilon_accepted', 'true');
        cookiePopup.classList.remove('active');
    });

    // --- 8. SPOTLIGHT EFFECT ---
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