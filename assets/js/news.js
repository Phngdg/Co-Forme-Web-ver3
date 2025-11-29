document.addEventListener('DOMContentLoaded', () => {

    // hiệu ứng scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

    // menu mobile
    const menuBtn = document.getElementById('mobile-menu');
    const nav = document.querySelector('.navbar_header');
    if (menuBtn) menuBtn.addEventListener('click', () => nav.classList.toggle('active'));
});

// lọc bài viết
function filterNews(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const cards = document.querySelectorAll('.news-card');

    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');

        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';

        setTimeout(() => {
            if (category === 'all' || cardCat === category) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        }, 300);
    });
}
