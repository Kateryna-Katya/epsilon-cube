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
});