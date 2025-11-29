// hiệu ứng scroll
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    
    const menuBtn = document.getElementById('mobile-menu');
    const nav = document.querySelector('.navbar_header');
    if(menuBtn) menuBtn.addEventListener('click', () => nav.classList.toggle('active'));
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');

function openLightbox(element) {
    const img = element.querySelector('img');
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    captionText.innerHTML = img.alt;
    document.body.style.overflow = "hidden"; 
}

function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
}


