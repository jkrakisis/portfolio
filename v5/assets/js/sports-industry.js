const bar = document.querySelector('.progress span');
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
};
addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px' });
document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));

const sportsBackToTop = document.querySelector('.sports-back-to-top');
if (sportsBackToTop) {
  const toggleBackToTop = () => {
    sportsBackToTop.classList.toggle('visible', scrollY > 600);
  };
  addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();
}

const siHeroSlideshow = document.getElementById('siHeroSlideshow');
if (siHeroSlideshow) {
  const slides = siHeroSlideshow.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-slide-dot');
  let siActiveIndex = 0;
  let siTimer;

  const showSiSlide = (index) => {
    slides[siActiveIndex].classList.remove('is-active');
    dots[siActiveIndex].classList.remove('is-active');
    siActiveIndex = index;
    slides[siActiveIndex].classList.add('is-active');
    dots[siActiveIndex].classList.add('is-active');
  };

  const startSiTimer = () => {
    clearInterval(siTimer);
    siTimer = setInterval(() => showSiSlide((siActiveIndex + 1) % slides.length), 4000);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSiSlide(index);
      startSiTimer();
    });
  });

  startSiTimer();
}
