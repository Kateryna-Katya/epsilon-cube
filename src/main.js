document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Инициализация плавного скролла Lenis
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Эффект хедера при скролле
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    // 3. Инициализация иконок Lucide (если потребуются)
    lucide.createIcons();

    // 4. Заглушка для предотвращения разрыва слов (text-wrap: balance)
    // Современные браузеры поддерживают это в CSS, но для старых можно добавить логику
    const headings = document.querySelectorAll('h1, h2');
    headings.forEach(h => {
        h.style.textWrap = 'balance';
    });

    console.log('✅ Epsilon-Cube: Base, Header & Footer Ready.');
    // --- ЭТАП 3.1: HERO ANIMATIONS ---

    // 1. Vanta.js WebGL Background Effect
    // Проверяем ширину экрана, на мобильных эффект не инициализируем для производительности
    if (window.innerWidth > 768) {
        VANTA.NET({
            el: "#vanta-canvas",
            mouseControls: true,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x22d3ee, // Наш акцентный цвет
            backgroundColor: 0x0a0c10, // Наш цвет фона
            points: 12.00,
            maxDistance: 22.00,
            spacing: 18.00,
            showDots: false // Линии более стильные
        });
    }

    // 2. GSAP Text Animations
    // Разбиваем текст на символы
    const heroTitle = new SplitType('.hero__title', { types: 'chars' });
    
    const heroTl = gsap.timeline({ delay: 0.5 }); // Небольшая задержка перед стартом

    // Анимация заголовка (посимвольное появление снизу с поворотом)
    heroTl.to(heroTitle.chars, {
        y: 0,
        rotate: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 1,
        ease: 'power4.out',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' // Раскрытие маски
    })
    // Анимация подзаголовка и кнопок (фейд снизу)
    .to('.animate-fade', {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.5'); // Запускаем чуть раньше окончания анимации заголовка

    // Обновляем иконки Lucide, так как добавили новые в Hero
    lucide.createIcons();
    // --- ЭТАП 3.2: ABOUT SECTION ANIMATIONS ---

    // 1. Анимация появления текста (GSAP ScrollTrigger)
    gsap.from(".about__content .reveal-text", {
        scrollTrigger: {
            trigger: ".about",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
    });

    // 2. Анимация карточек (плавное появление с разной задержкой)
    gsap.from(".strategy-card", {
        scrollTrigger: {
            trigger: ".about__visual",
            start: "top 80%",
        },
        scale: 0.9,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)"
    });

    // 3. Анимация счетчиков цифр
    const counters = document.querySelectorAll('.stat-item__num');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-val');
        
        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter,
                start: "top 90%",
            },
            innerText: target,
            duration: 2,
            snap: { innerText: 1 }, // Округление до целого
            ease: "power2.out"
        });
    });

    // Не забываем обновить иконки
    lucide.createIcons();
    // --- ЭТАП 3.3: BENEFITS SPOTLIGHT EFFECT & GSAP ---

    // 1. Трекинг мыши для эффекта Spotlight в Bento Grid
    const bentoItems = document.querySelectorAll('.bento__item');
    
    bentoItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 2. Появление Bento Grid через GSAP
    gsap.from(".animate-bento", {
        scrollTrigger: {
            trigger: ".bento",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out"
    });

    // Обновляем иконки Lucide
    lucide.createIcons();
    // --- ЭТАП 3.4: INNOVATION SLIDER INITIALIZATION ---

    const innovationSwiper = new Swiper('.innovation-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        centeredSlides: false,
        speed: 800,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.inv-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.inv-next',
            prevEl: '.inv-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        }
    });

    // GSAP анимация заголовка секции
    gsap.from(".innovation__header > *", {
        scrollTrigger: {
            trigger: ".innovation",
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    });

    lucide.createIcons();
    // --- ЭТАП 3.5: BLOG SECTION ANIMATIONS ---

    gsap.from(".animate-blog", {
        scrollTrigger: {
            trigger: ".blog__grid",
            start: "top 85%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out"
    });

    // Добавляем микро-инзаимодействие для ссылок "Подробнее"
    const blogLinks = document.querySelectorAll('.blog-card__link');
    blogLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link.querySelector('svg'), { x: 5, duration: 0.3 });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(link.querySelector('svg'), { x: 0, duration: 0.3 });
        });
    });

    lucide.createIcons();
    // --- ЭТАП 4: FORM LOGIC ---

    const form = document.getElementById('career-form');
    const successMsg = document.getElementById('success-msg');
    const resetBtn = document.getElementById('reset-form');
    const phoneInput = document.getElementById('phone-input');
    const captchaQ = document.getElementById('captcha-question');
    const captchaA = document.getElementById('captcha-answer');
    
    let correctAnswer;

    // 1. Генерация капчи
    function generateCaptcha() {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        correctAnswer = a + b;
        captchaQ.innerText = `${a} + ${b}`;
    }
    generateCaptcha();

    // 2. Валидация телефона (только цифры)
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // 3. Обработка отправки (AJAX Simulation)
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Проверка капчи
        if (parseInt(captchaA.value) !== correctAnswer) {
            alert('Неверный ответ на защитный вопрос!');
            generateCaptcha();
            captchaA.value = '';
            return;
        }

        const submitBtn = document.getElementById('submit-btn');
        const loader = document.getElementById('form-loader');
        const btnText = submitBtn.querySelector('span');

        // Визуализация загрузки
        btnText.style.display = 'none';
        loader.style.display = 'block';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Успех!
            successMsg.classList.add('active');
            form.reset();
            generateCaptcha();
            
            // Сброс состояния кнопки
            btnText.style.display = 'block';
            loader.style.display = 'none';
            submitBtn.disabled = false;
        }, 2000);
    });

    // 4. Сброс формы (кнопка "Отправить еще раз")
    resetBtn.addEventListener('click', () => {
        successMsg.classList.remove('active');
    });

    lucide.createIcons();
});