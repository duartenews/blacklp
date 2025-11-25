import './style-lp2.css'

// Countdown Timer Logic
function startCountdown() {
  const timerElement = document.getElementById('countdown-timer');
  const buttonTimers = document.querySelectorAll('.button-timer');
  const topBar = document.querySelector('.top-bar');
  const duration = 8 * 60 * 1000; // 8 minutes in milliseconds
  let endTime = localStorage.getItem('blackFridayEndTime');

  if (!endTime) {
    endTime = Date.now() + duration;
    localStorage.setItem('blackFridayEndTime', endTime);
  }

  function updateTimer() {
    const now = Date.now();
    const remaining = endTime - now;

    if (remaining <= 0) {
      // Countdown expired
      if (timerElement) {
        timerElement.style.display = 'none';
      }
      if (topBar) {
        topBar.innerHTML = 'OFERTA ESPECIAL BLACK';
      }
      buttonTimers.forEach(timer => {
        timer.style.display = 'none';
      });
      return;
    }

    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    timerElement.textContent = timeString;
    buttonTimers.forEach(timer => timer.textContent = `(${timeString})`);
  }

  updateTimer(); // Initial call
  setInterval(updateTimer, 1000);
}

// Start timer when DOM is loaded
document.addEventListener('DOMContentLoaded', startCountdown);

// Video Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openDeviceVideo');
  const closeBtn = document.getElementById('closeVideoModal');
  const modal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('deviceVideoFrame');
  const modalFooter = document.getElementById('videoModalFooter');
  const videoUrl = 'https://www.youtube.com/embed/XT8EobvYMWc?autoplay=1&enablejsapi=1';

  let videoTimer = null;

  if (openBtn && modal && closeBtn && videoFrame && modalFooter) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
      videoFrame.src = videoUrl;

      // Hide footer initially
      modalFooter.classList.add('hidden');

      // Clear any existing timer
      if (videoTimer) {
        clearTimeout(videoTimer);
      }

      // Show footer after 10 seconds
      videoTimer = setTimeout(() => {
        modalFooter.classList.remove('hidden');
      }, 10000);
    });

    const closeModal = () => {
      modal.classList.remove('active');
      videoFrame.src = '';
      modalFooter.classList.add('hidden');

      // Clear timer when closing
      if (videoTimer) {
        clearTimeout(videoTimer);
        videoTimer = null;
      }
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
});

// Botox Bottle Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
  const botoxRight = document.querySelector('.hero-decorative-botox-right');
  const botoxLeft = document.querySelector('.hero-decorative-botox-left');

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const triggerPoint = 100; // Start animation after 100px scroll

    if (scrollY >= triggerPoint) {
      // When scrolled down, add 'scrolled' class to move bottles out
      if (botoxRight) botoxRight.classList.add('scrolled');
      if (botoxLeft) botoxLeft.classList.add('scrolled');
    } else {
      // At top, remove 'scrolled' class to show bottles
      if (botoxRight) botoxRight.classList.remove('scrolled');
      if (botoxLeft) botoxLeft.classList.remove('scrolled');
    }
  };

  // Initial check
  handleScroll();

  // Listen to scroll events
  window.addEventListener('scroll', handleScroll);
});

// Testimonials Data
const testimonials = [
  {
    name: "Dra. Danielle Freitas",
    text: "Tirou um peso das minhas costas.",
    image: "https://secretariaplus.com.br/wp-content/uploads/2025/07/file6.jpg"
  },
  {
    name: "Dra. Fernanda Rabelo",
    text: "Investimos por aqui mais de 20 mil em tráfego e a secretaria plus arrebenta com os leads",
    image: "https://secretariaplus.com.br/wp-content/uploads/2025/07/file2.jpg"
  },
  {
    name: "Dra. Alana Ferri",
    text: "A gente perdia muito paciente pela demora, mas não queria um bot automatico, eu odeio esse tipo de atendimento. A IA deles salvou minha clínica com a humanização.",
    image: "https://secretariaplus.com.br/wp-content/uploads/2025/07/file3.jpg"
  },
  {
    name: "Dra. Adriana Martinuzzo",
    text: "Ela responde igualzinho um humano e gera muita empatia com os pacientes",
    image: "https://secretariaplus.com.br/wp-content/uploads/2025/07/file4.jpg"
  },
  {
    name: "Dra. Tânia Kelly",
    text: "É como se fosse um time comercial que responde rápido e sabe manejar os leads como nem eu mesma fazia. Eu tenho umas 3 SDR e to pagando por meia",
    image: "https://secretariaplus.com.br/wp-content/uploads/2025/07/file5.jpg"
  }
];

// Initialize Testimonials
const track = document.querySelector('.testimonials-track');

function createTestimonialCard(data) {
  return `
    <div class="testimonial-card">
      <div class="testimonial-header">
        <div class="testimonial-user">
          <img src="${data.image}" alt="${data.name}" class="testimonial-avatar">
          <span class="testimonial-name">${data.name}</span>
        </div>
        <span class="testimonial-stars">★★★★★</span>
      </div>
      <p class="testimonial-text">"${data.text}"</p>
    </div>
  `;
}

// Duplicate testimonials to create infinite loop effect
const allTestimonials = [...testimonials, ...testimonials, ...testimonials];
track.innerHTML = allTestimonials.map(createTestimonialCard).join('');

// FAQ Logic
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    // Close other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.toggle-icon').textContent = '+';
      }
    });

    // Toggle current item
    item.classList.toggle('active');
    const icon = item.querySelector('.toggle-icon');
    icon.textContent = item.classList.contains('active') ? '-' : '+';
  });
});

// Testimonials Slider Logic
const testimonialsTrack = document.getElementById('testimonialsTrack');
const nextBtn = document.querySelector('.slider-arrow.next');
const prevBtn = document.querySelector('.slider-arrow.prev');
let currentIndex = 0;
const totalCards = document.querySelectorAll('.testimonial-card').length;

function getCardWidth() {
  const card = document.querySelector('.testimonial-card');
  if (!card) return 300;
  const style = window.getComputedStyle(testimonialsTrack);
  const gap = parseFloat(style.gap) || 30;
  return card.offsetWidth + gap;
}

function slideToNext() {
  const cardWidth = getCardWidth();
  currentIndex = (currentIndex + 1) % totalCards;
  testimonialsTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function slideToPrev() {
  const cardWidth = getCardWidth();
  currentIndex = (currentIndex - 1 + totalCards) % totalCards;
  testimonialsTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

// Manual navigation
if (nextBtn) {
  nextBtn.addEventListener('click', slideToNext);
}

if (prevBtn) {
  prevBtn.addEventListener('click', slideToPrev);
}

// Autoplay every 3 seconds
setInterval(slideToNext, 3000);

// Handle resize to reset position alignment
window.addEventListener('resize', () => {
  const cardWidth = getCardWidth();
  testimonialsTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
});

// Sticky Bar Swap Logic
const topBar = document.querySelector('.top-bar');
const stickyChecksBar = document.getElementById('stickyChecksBar');
const featuresSection = document.querySelector('.features-section');
const plansSection = document.querySelector('.plans-section');

let ticking = false;

function handleStickySwap() {
  if (!featuresSection) return;

  const featuresSectionTop = featuresSection.getBoundingClientRect().top;
  const plansSectionTop = plansSection ? plansSection.getBoundingClientRect().top : Infinity;
  const topBarHeight = topBar ? topBar.offsetHeight : 40;
  const triggerPoint = topBarHeight + 50; // Trigger when section is near top

  // Logic:
  // 1. Default: Show Top Bar
  // 2. Features Section Reached: Show Sticky Checks Bar (Hide Top Bar)
  // 3. Plans Section Reached: Show Top Bar (Hide Sticky Checks Bar)

  if (plansSectionTop <= triggerPoint) {
    // Case 3: Plans Section Reached -> Show Top Bar
    if (topBar) topBar.classList.remove('hidden');
    if (stickyChecksBar) stickyChecksBar.classList.remove('visible');
  } else if (featuresSectionTop <= triggerPoint) {
    // Case 2: Features Section Reached -> Show Sticky Checks Bar
    if (topBar) topBar.classList.add('hidden');
    if (stickyChecksBar) stickyChecksBar.classList.add('visible');
  } else {
    // Case 1: Default -> Show Top Bar
    if (topBar) topBar.classList.remove('hidden');
    if (stickyChecksBar) stickyChecksBar.classList.remove('visible');
  }

  ticking = false;
}

function requestTick() {
  if (!ticking) {
    window.requestAnimationFrame(handleStickySwap);
    ticking = true;
  }
}

// Listen to scroll events with throttling for better mobile performance
window.addEventListener('scroll', requestTick, { passive: true });

// Initial check
handleStickySwap();
