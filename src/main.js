document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ПЛАВНЫЙ СКРОЛЛ (LENIS) ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // --- 2. HEADER & MOBILE MENU ---
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

    burger.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // --- 3. HERO BACKGROUND (VANTA) ---
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

    // --- 4. GSAP АНИМАЦИИ ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text
    const heroTitle = new SplitType('.hero__title', { types: 'chars' });
    const heroTl = gsap.timeline({ delay: 0.5 });
    heroTl.to(heroTitle.chars, {
        y: 0, rotate: 0, opacity: 1, stagger: 0.03, duration: 1, ease: 'power4.out'
    }).to('.animate-fade', {
        y: 0, opacity: 1, stagger: 0.2, duration: 0.8
    }, '-=0.5');

    // Reveal elements on scroll
    const revealElements = [".about__content .reveal-text", ".animate-bento", ".animate-blog"];
    revealElements.forEach(selector => {
        gsap.from(selector, {
            scrollTrigger: { trigger: selector, start: "top 90%" },
            y: 40, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out"
        });
    });

    // Stats counter
    document.querySelectorAll('.stat-item__num').forEach(counter => {
        const val = +counter.getAttribute('data-val');
        gsap.to(counter, {
            scrollTrigger: { trigger: counter },
            innerText: val, duration: 2, snap: { innerText: 1 }
        });
    });

    // --- 5. SWIPER (INNOVATION) ---
    new Swiper('.innovation-slider', {
        slidesPerView: 1, spaceBetween: 20, loop: true,
        autoplay: { delay: 4000 },
        pagination: { el: '.inv-pagination', clickable: true },
        navigation: { nextEl: '.inv-next', prevEl: '.inv-prev' },
        breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });

    // --- 6. КОНТАКТНАЯ ФОРМА ---
    const form = document.getElementById('career-form');
    const captchaQ = document.getElementById('captcha-question');
    const captchaA = document.getElementById('captcha-answer');
    let correctAnswer;

    const genCaptcha = () => {
        const a = Math.floor(Math.random() * 10) + 1, b = Math.floor(Math.random() * 10) + 1;
        correctAnswer = a + b;
        if(captchaQ) captchaQ.innerText = `${a} + ${b}`;
    };
    genCaptcha();

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (parseInt(captchaA.value) !== correctAnswer) {
                alert('Ошибка капчи!'); return genCaptcha();
            }
            const btn = document.getElementById('submit-btn');
            btn.disabled = true;
            btn.querySelector('span').style.opacity = '0';
            document.getElementById('form-loader').style.display = 'block';

            setTimeout(() => {
                document.getElementById('success-msg').classList.add('active');
                form.reset(); genCaptcha();
                btn.disabled = false;
                btn.querySelector('span').style.opacity = '1';
                document.getElementById('form-loader').style.display = 'none';
            }, 2000);
        });
    }

    document.getElementById('reset-form')?.addEventListener('click', () => {
        document.getElementById('success-msg').classList.remove('active');
    });

    // --- 7. COOKIE POPUP LOGIC ---
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieBtn = document.getElementById('cookie-accept');

    if (!localStorage.getItem('epsilon_cookies_accepted')) {
        setTimeout(() => cookiePopup.classList.add('active'), 2000);
    }

    cookieBtn.addEventListener('click', () => {
        localStorage.setItem('epsilon_cookies_accepted', 'true');
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

    lucide.createIcons();
});