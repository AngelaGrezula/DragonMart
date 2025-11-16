let text = document.getElementById('text');
let moon = document.getElementById('moon');
let dragonS = document.getElementById('dragon-s');
let dragonL = document.getElementById('dragon-l');
let cloud1 = document.getElementById('cloud1')
let cloud2 = document.getElementById('cloud2')
let cloud3 = document.getElementById('cloud3')
let cloud4 = document.getElementById('cloud4')

const initialDragonLOffset = 1000;

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    text.style.marginTop = value * .8 + 'px';
    moon.style.marginTop = value * 1.5 + 'px';
    dragonS.style.top = value * -2.5 + 'px';
    dragonL.style.top = initialDragonLOffset + value * -2.5 + 'px';
    cloud1.style.marginLeft = value * 1 + 'px';
    cloud2.style.marginLeft = value * 1 + 'px';
    cloud3.style.marginLeft = value * -1 + 'px';
    cloud4.style.marginLeft = value * -1 + 'px';
})

let slides;
let totalSlides;
let currentIndex = 0;

function moveSlider(direction) {
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    updateSliderClasses();
}

function updateSliderClasses() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next');

        const position = (index - currentIndex + totalSlides) % totalSlides;

        if (position === 0) slide.classList.add('active');
        else if (position === 1) slide.classList.add('next');
        else if (position === totalSlides - 1) slide.classList.add('prev');
    });

    const activeSlide = document.querySelector('.slide-item.active');
    document.getElementById('dragon-specie').textContent = activeSlide.dataset.name;
}

document.addEventListener('DOMContentLoaded', () => {
    slides = Array.from(document.querySelectorAll('.slide-item'));
    totalSlides = slides.length;
    updateSliderClasses();

    document.querySelector('.click-left').onclick = () => moveSlider(-1);
    document.querySelector('.click-right').onclick = () => moveSlider(1);
});