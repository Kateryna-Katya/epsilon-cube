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
});