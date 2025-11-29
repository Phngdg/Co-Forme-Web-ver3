document.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('active');

            if (entry.target.querySelector('.stat-number')) {
                runCounter(entry.target);
            }

            observer.unobserve(entry.target); 
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

    function runCounter(container) {
        const numbers = container.querySelectorAll('.stat-number');

        numbers.forEach(num => {
            const target = +(num.getAttribute('data-target') || 0); 
            const duration = 2000;
            const step = target / (duration / 16);

            let current = 0;

            const updateCount = () => {
                current += step;
                if (current < target) {
                    num.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    num.innerText = target + "+";
                }
            };

            updateCount();
        });
    }
    
    const menuBtn = document.getElementById('mobile-menu');
    const nav = document.querySelector('.navbar_header');
    if (menuBtn && nav) menuBtn.addEventListener('click', () => nav.classList.toggle('active'));

    let slideIndex = 1;
    const slides = document.getElementsByClassName("story-slide");
    
    function showSlides(n) {
        if (slides.length === 0) return;
        
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove("active");
        }
        
        const currentSlide = slides[slideIndex - 1];
        currentSlide.style.display = "block";
        currentSlide.classList.add("active");

        const innerSlider = currentSlide.querySelector('.js-comparison-slider');
        if(innerSlider) {
            setTimeout(() => {
                const sliderLine = innerSlider.querySelector('.slider-line');
                const sliderHandle = innerSlider.querySelector('.slider-handle');
                const imgBefore = innerSlider.querySelector('.img-before');
                
                if (sliderLine && sliderHandle && imgBefore) {
                    sliderLine.style.left = '50%';
                    sliderHandle.style.left = '50%';
                    imgBefore.style.clipPath = 'inset(0 50% 0 0)';
                }
            }, 50);
        }
    }
    
    window.moveStory = function(n) {
        showSlides(slideIndex += n);
    }

    showSlides(slideIndex);


    const comparisonContainers = document.querySelectorAll('.js-comparison-slider');

    comparisonContainers.forEach(container => {
        const imgBefore = container.querySelector('.img-before');
        const sliderLine = container.querySelector('.slider-line');
        const sliderHandle = container.querySelector('.slider-handle');
        
        if (!imgBefore || !sliderLine || !sliderHandle) return; 

        let isDragging = false;

        function updateSliderPosition(x) {
            const rect = container.getBoundingClientRect();
            let newX = x - rect.left;

            if (newX < 0) newX = 0;
            if (newX > rect.width) newX = rect.width;

            const percentage = (newX / rect.width) * 100;

            sliderLine.style.left = percentage + '%';
            sliderHandle.style.left = percentage + '%';
            imgBefore.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        }

        container.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            updateSliderPosition(e.clientX);
        });

        function onMouseMove(e) {
            if (!isDragging) return;
            updateSliderPosition(e.clientX);
        }

        function onMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        container.addEventListener('touchstart', (e) => {
            isDragging = true;
            document.addEventListener('touchmove', onTouchMove, { passive: false });
            document.addEventListener('touchend', onTouchEnd);
            updateSliderPosition(e.touches[0].clientX);
        }, { passive: true });

        function onTouchMove(e) {
            if (!isDragging) return;
            updateSliderPosition(e.touches[0].clientX);
        }

        function onTouchEnd() {
            isDragging = false;
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        }
        
        window.addEventListener('resize', () => {
            if(container.offsetParent !== null) {
                updateSliderPosition(container.getBoundingClientRect().left + container.offsetWidth / 2);
            }
        });
    });


    const btnCalcBMI = document.getElementById('btn-calc-bmi');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultInput = document.getElementById('bmi-result');

    if (btnCalcBMI) {
        btnCalcBMI.addEventListener('click', () => {
            const h = parseFloat(heightInput.value);
            const w = parseFloat(weightInput.value);

            if (h > 0 && w > 0) {
                const heightInM = h / 100;
                const bmi = (w / (heightInM * heightInM));
                const roundedBmi = bmi.toFixed(2);
                
                let status = "";
                if (bmi < 18.5) status = " (Gầy)";
                else if (bmi >= 18.5 && bmi <= 24.9) status = " (Bình thường)";
                else if (bmi >= 25 && bmi <= 29.9) status = " (Tiền béo phì)";
                else if (bmi >= 30) status = " (Béo phì)";

                resultInput.value = roundedBmi + status;
            } else {
                alert("Vui lòng nhập Chiều cao và Cân nặng hợp lệ (lớn hơn 0)!");
            }
        });
    }
});