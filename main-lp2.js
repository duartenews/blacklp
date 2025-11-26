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
      buttonTimers.forEach(timer => {
        timer.style.display = 'none';
      });
      return;
    }

    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} `;

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

// Video Facade Handler with Event Delegation
document.addEventListener('click', (e) => {
  const facade = e.target.closest('.video-facade');
  if (facade) {
    const videoId = facade.getAttribute('data-video-id');
    const videoHash = facade.getAttribute('data-video-hash');

    if (videoId && videoHash) {
      // Create iframe
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.src = `https://player.vimeo.com/video/${videoId}?h=${videoHash}&autoplay=1&autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0`;
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.style.aspectRatio = '16/9'; // Ensure correct aspect ratio

      // Replace facade with iframe
      const parent = facade.parentElement;
      if (parent) {
        parent.innerHTML = '';
        parent.appendChild(iframe);
        // Ensure parent maintains layout
        parent.style.display = 'block';
      }
    }
  }
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

// Top Bar Section Observer - 3 States
document.addEventListener('DOMContentLoaded', () => {
  const topBar = document.querySelector('.top-bar');
  const topBarProgressContainer = document.querySelector('.top-bar-progress-container');
  const topBarText = document.getElementById('topBarText');

  if (!topBar || !topBarProgressContainer || !topBarText) return;

  // Set initial state to simple
  const topBarFill = document.getElementById('topBarProgressFill');
  if (topBarFill) topBarFill.style.display = 'none';

  topBar.style.padding = '12px';
  topBar.style.background = 'linear-gradient(90deg, #000 0%, #1a1a1a 50%, #000 100%)';
  topBarText.style.textShadow = 'none';
  topBarText.style.color = 'var(--accent-color)';

  let currentState = 'simple'; // 'simple' or 'progress'

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionClass = entry.target.className;

        if (sectionClass.includes('hero-section') || sectionClass.includes('features-section')) {
          // Simple text state (hero and features)
          if (currentState !== 'simple') {
            if (topBarFill) topBarFill.style.display = 'none';
            topBar.style.padding = '12px';
            topBar.style.background = 'linear-gradient(90deg, #000 0%, #1a1a1a 50%, #000 100%)';
            topBarText.style.textShadow = 'none';
            topBarText.style.color = 'var(--accent-color)';
            currentState = 'simple';
          }
        } else if (sectionClass.includes('plans-section')) {
          // Progress bar state (plans)
          if (currentState !== 'progress') {
            if (topBarFill) topBarFill.style.display = 'block';
            topBar.style.padding = '0';
            topBar.style.background = '#000';
            topBarText.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.8)';
            topBarText.style.color = '#fff';
            currentState = 'progress';
          }
        }
      }
    });
  }, { threshold: 0.3 });

  // Observe sections
  const heroSection = document.querySelector('.hero-section');
  const featuresSection = document.querySelector('.features-section');
  const plansSection = document.querySelector('.plans-section');

  if (heroSection) sectionObserver.observe(heroSection);
  if (featuresSection) sectionObserver.observe(featuresSection);
  if (plansSection) sectionObserver.observe(plansSection);
});

// Black Friday Logic
document.addEventListener('DOMContentLoaded', () => {
  initBlackFridayLogic();
});

function initBlackFridayLogic() {
  // Configuration
  const CONFIG = {
    lote1Max: 200,
    lote2Max: 350,
    startSold: 116,
    phases: [
      { duration: 480, target: 198 },   // 0-8min: Reach ~198 (Lote 1 almost full)
      { duration: 480, target: 348 },  // 8min-16min: Reach ~348 (Lote 2 almost full)
      { duration: Infinity, target: 1000 } // Lote 3: Slow burn
    ],
    lote1Link: 'https://pay.hub.la/checkout/PLACEHOLDER_197',
    lote2Link: 'https://pay.hub.la/checkout/PLACEHOLDER_297',
    names: [
      // 30% Women (12)
      "Ana Paula C.", "Mariana Costa F.", "Fernanda Lima S.", "Juliana Martins R.", "Patrícia Rocha M.", "Camila Oliveira D.",
      "Bruna Andrade L.", "Letícia Moura T.", "Carolina Ribeiro P.", "Aline Ferreira V.", "Natália Duarte H.", "Sabrina Alves G.",

      // 30% Dra. (12)
      "Dra. Beatriz A.", "Dra. Carolina M.", "Dra. Gabriela S.", "Dra. Amanda T.", "Dra. Renata V.", "Dra. Vanessa R.",
      "Dra. Larissa F.", "Dra. Daniela P.", "Dra. Priscila G.", "Dra. Tatiane C.", "Dra. Isabela L.", "Dra. Michele D.",

      // 30% Clinics (12)
      "Clínica Bella", "Clínica Renovare", "Studio Harmonize", "Clínica Viddá", "Clínica Corpo & Face", "Instituto Leve",
      "Clínica Essentia", "Belleforma clinic", "Clínica Vitta Equilibrium", "Harmonie clinic", "Clínica Plenitude", "Facial Concept",

      // 10% Dr. (4)
      "Dr. Roberto S.", "Dr. Fernando L.", "Dr. Marcelo P.", "Dr. Henrique A."
    ]
  };

  // State
  let state = {
    currentSold: CONFIG.startSold,
    startTime: null,
    isActive: false,
    lote: 1,
    maxSold: CONFIG.lote1Max
  };

  // DOM Elements
  const progressBar = document.getElementById('lote-progress-fill');
  const soldCountElement = document.getElementById('lote-sold-count');
  const maxSoldElement = document.getElementById('lote-max-sold');
  const remainingCountElements = document.querySelectorAll('.lote-remaining-count');
  const notificationContainer = document.getElementById('sales-notification-container');
  const plansSection = document.querySelector('.plans-section');
  const planBtn = document.querySelector('.plan-card.featured .plan-btn');

  // Lote Tabs Elements
  const loteTabs = document.querySelectorAll('.lote-tab');
  const lotePrices = document.querySelectorAll('.lote-price-top');
  const loteStatuses = document.querySelectorAll('.lote-status');

  // Load state from local storage
  const savedState = localStorage.getItem('bf_state_v6');
  if (savedState) {
    const parsed = JSON.parse(savedState);
    if (parsed.currentSold >= CONFIG.startSold) {
      state.currentSold = parsed.currentSold;
      state.lote = parsed.currentSold > CONFIG.lote2Max ? 3 : (parsed.currentSold > CONFIG.lote1Max ? 2 : 1);
      state.maxSold = state.lote === 1 ? CONFIG.lote1Max : (state.lote === 2 ? CONFIG.lote2Max : 1000);
    }
  }

  // Update UI
  function updateUI() {
    // Check for Lote Transition
    if (state.currentSold > CONFIG.lote1Max && state.lote === 1) {
      state.lote = 2;
      state.maxSold = CONFIG.lote2Max;
    } else if (state.currentSold > CONFIG.lote2Max && state.lote === 2) {
      state.lote = 3;
      state.maxSold = 1000; // Arbitrary high number for Lote 3
    }

    // Progress Bar with Thermometer Effect
    const percentage = (state.currentSold / state.maxSold) * 100;
    if (progressBar) {
      progressBar.style.width = `${percentage}%`;

      // Thermometer color effect: green -> yellow -> red
      let color1, color2;
      if (percentage < 50) {
        // 0-50%: Green to Yellow
        const ratio = percentage / 50;
        color1 = `rgb(${Math.round(34 + (212 - 34) * ratio)}, ${Math.round(197 + (175 - 197) * ratio)}, ${Math.round(94 + (140 - 94) * ratio)})`;
        color2 = `rgb(${Math.round(52 + (230 - 52) * ratio)}, ${Math.round(211 + (195 - 211) * ratio)}, ${Math.round(153 + (156 - 153) * ratio)})`;
      } else if (percentage < 80) {
        // 50-80%: Yellow to Orange
        const ratio = (percentage - 50) / 30;
        color1 = `rgb(${Math.round(212 + (245 - 212) * ratio)}, ${Math.round(175 + (130 - 175) * ratio)}, ${Math.round(140 + (49 - 140) * ratio)})`;
        color2 = `rgb(${Math.round(230 + (255 - 230) * ratio)}, ${Math.round(195 + (165 - 195) * ratio)}, ${Math.round(156 + (79 - 156) * ratio)})`;
      } else {
        // 80-100%: Orange to Red
        const ratio = (percentage - 80) / 20;
        color1 = `rgb(${Math.round(245 + (220 - 245) * ratio)}, ${Math.round(130 + (38 - 130) * ratio)}, ${Math.round(49 + (38 - 49) * ratio)})`;
        color2 = `rgb(${Math.round(255 + (239 - 255) * ratio)}, ${Math.round(165 + (68 - 165) * ratio)}, ${Math.round(79 + (68 - 79) * ratio)})`;
      }

      progressBar.style.background = `linear-gradient(90deg, ${color1}, ${color2})`;
    }
    if (soldCountElement) soldCountElement.textContent = state.currentSold;
    if (maxSoldElement) maxSoldElement.textContent = state.maxSold;

    // Remaining Count
    const remaining = state.maxSold - state.currentSold;
    remainingCountElements.forEach(el => el.textContent = remaining);

    // Footer Remaining Count
    const footerRemaining = document.getElementById('footer-remaining-count');
    if (footerRemaining) footerRemaining.textContent = remaining;

    // Lote 3 Dynamic "Starts In"
    const lote3Remaining = Math.max(0, CONFIG.lote2Max - state.currentSold);
    const lote3Status = document.querySelector('.lote-col:nth-child(3) .lote-status');
    if (lote3Status && state.lote < 3) lote3Status.innerHTML = `faltam ${lote3Remaining}`;

    // Subtitle Dynamic Text
    const subtitle = document.querySelector('.lote-subtitle-small');
    if (subtitle) {
      let nextLote = "2";
      let nextPrice = "297";
      if (state.lote === 2) { nextLote = "3"; nextPrice = "397"; }

      subtitle.innerHTML = `faltam <b>${remaining}</b> assinaturas para o <b>Lote${nextLote}</b> 12x${nextPrice}`;
    }

    // Price Display Update
    const priceDisplay = document.getElementById('current-price-display');
    const priceCounter = document.getElementById('price-counter-top');
    const footerText = document.querySelector('.urgency-footer-text');

    if (priceDisplay) {
      const currentPrice = state.lote === 1 ? "197" : (state.lote === 2 ? "297" : "397");
      priceDisplay.textContent = `12x ${currentPrice}`;
    }
    if (priceCounter) {
      priceCounter.innerHTML = `<strong>Lote ${state.lote} - Acaba em ${remaining} vagas</strong>`;
    }
    if (footerText) {
      const nextPrice = state.lote === 1 ? "297" : (state.lote === 2 ? "397" : "497");
      footerText.innerHTML = `Acabando as vagas do Lote ${state.lote}, o preço sobe para <strong>12x de ${nextPrice}</strong>`;
    }

    // Button Link
    if (planBtn) {
      planBtn.onclick = () => {
        window.location.href = state.lote === 1 ? CONFIG.lote1Link : CONFIG.lote2Link;
      };
      // Clean button text
      planBtn.innerHTML = `Assinar Agora <span class="arrow-rotate">⬅</span> <span class="button-timer"></span>`;
    }

    // Top Bar Progress Update
    const topBar = document.querySelector('.top-bar');
    const topBarFill = document.getElementById('topBarProgressFill');
    const topBarText = document.getElementById('topBarText');

    if (topBar && topBarFill && topBarText) {
      const currentPrice = state.lote === 1 ? "197" : (state.lote === 2 ? "297" : "397");
      topBarText.textContent = `ÚLTIMAS VAGAS DO LOTE R$${currentPrice}`;

      // Calculate progress percentage (how full the current lote is)
      const percentage = (state.currentSold / state.maxSold) * 100;
      topBarFill.style.width = `${percentage}%`;

      // Apply thermometer color effect
      let color1, color2;
      if (percentage < 50) {
        const ratio = percentage / 50;
        color1 = `rgb(${Math.round(34 + (212 - 34) * ratio)}, ${Math.round(197 + (175 - 197) * ratio)}, ${Math.round(94 + (140 - 94) * ratio)})`;
        color2 = `rgb(${Math.round(52 + (230 - 52) * ratio)}, ${Math.round(211 + (195 - 211) * ratio)}, ${Math.round(153 + (156 - 153) * ratio)})`;
      } else if (percentage < 80) {
        const ratio = (percentage - 50) / 30;
        color1 = `rgb(${Math.round(212 + (245 - 212) * ratio)}, ${Math.round(175 + (130 - 175) * ratio)}, ${Math.round(140 + (49 - 140) * ratio)})`;
        color2 = `rgb(${Math.round(230 + (255 - 230) * ratio)}, ${Math.round(195 + (165 - 195) * ratio)}, ${Math.round(156 + (79 - 156) * ratio)})`;
      } else {
        const ratio = (percentage - 80) / 20;
        color1 = `rgb(${Math.round(245 + (220 - 245) * ratio)}, ${Math.round(130 + (38 - 130) * ratio)}, ${Math.round(49 + (38 - 49) * ratio)})`;
        color2 = `rgb(${Math.round(255 + (239 - 255) * ratio)}, ${Math.round(165 + (68 - 165) * ratio)}, ${Math.round(79 + (68 - 79) * ratio)})`;
      }

      topBarFill.style.background = `linear-gradient(90deg, ${color1}, ${color2})`;
      topBar.classList.remove('hidden');
    }

    // Update Tabs Visuals
    loteTabs.forEach((tab, index) => {
      const loteNum = index + 1;
      if (loteNum < state.lote) {
        // Expired
        tab.classList.remove('active');
        lotePrices[index].classList.remove('active');
        lotePrices[index].classList.add('expired');
        loteStatuses[index].classList.remove('active');
        loteStatuses[index].textContent = "esgotado";
      } else if (loteNum === state.lote) {
        // Active
        tab.classList.add('active');
        lotePrices[index].classList.add('active');
        loteStatuses[index].classList.add('active');
        loteStatuses[index].textContent = "atual";
      } else {
        // Future
        tab.classList.remove('active');
        lotePrices[index].classList.remove('active');
        loteStatuses[index].classList.remove('active');
        // Status set by dynamic logic above
      }
    });

    // Save state
    localStorage.setItem('bf_state_v6', JSON.stringify({ currentSold: state.currentSold, lote: state.lote, maxSold: state.maxSold }));
  }
  // Initial UI Update
  updateUI();

  // Notification Logic
  let summaryCount = 0;
  let clearAllTimeout = null;
  let notificationsStarted = false;

  function showNotification() {
    if (!notificationContainer) return;

    const currentNotifications = notificationContainer.children.length;

    // If we're at max (2), remove the oldest one
    if (currentNotifications >= 2) {
      if (notificationContainer.firstElementChild) {
        notificationContainer.firstElementChild.remove();
      }
      summaryCount++;
    }

    // If we have 1 notification and summaryCount > 0, create a summary as the second
    if (currentNotifications === 1 && summaryCount > 0) {
      const summary = document.createElement('div');
      summary.className = 'sales-notification summary';
      summary.innerHTML = `
        <div class="sales-notification-icon">
          <img src="https://secretariaplus.com.br/wp-content/uploads/2025/01/icon.png" alt="SecretáriaPlus">
        </div>
        <div class="sales-notification-content">
          <div class="sales-notification-header">
            <div class="sales-notification-name">SecretáriaPlus</div>
            <div class="sales-notification-time">Agora</div>
          </div>
          <div class="sales-notification-text">+${summaryCount} ${summaryCount === 1 ? 'nova assinatura' : 'novas assinaturas'} nos últimos segundos</div>
        </div>
      `;
      notificationContainer.appendChild(summary);
    }

    // Create new individual notification with fresh name
    const name = CONFIG.names[Math.floor(Math.random() * CONFIG.names.length)];
    const timeAgo = Math.floor(Math.random() * 2) + 1;

    const notification = document.createElement('div');
    notification.className = 'sales-notification';
    notification.innerHTML = `
      <div class="sales-notification-icon">
        <img src="https://secretariaplus.com.br/wp-content/uploads/2025/01/icon.png" alt="SecretáriaPlus">
      </div>
      <div class="sales-notification-content">
        <div class="sales-notification-header">
          <div class="sales-notification-name">${name}</div>
          <div class="sales-notification-time">agora</div>
        </div>
        <div class="sales-notification-text">Acabou de assinar o Plano Anual</div>
      </div>
    `;

    notificationContainer.appendChild(notification);

    // Clear previous timeout
    if (clearAllTimeout) {
      clearTimeout(clearAllTimeout);
    }

    // Set new timeout to clear ALL notifications after 1.5s
    clearAllTimeout = setTimeout(() => {
      // Get all notifications
      const allNotifications = Array.from(notificationContainer.children);

      // Add hiding class to all
      allNotifications.forEach(notif => {
        notif.classList.add('hiding');
      });

      // Remove all after animation
      setTimeout(() => {
        while (notificationContainer.firstChild) {
          notificationContainer.firstChild.remove();
        }
        summaryCount = 0;
      }, 400); // Wait for fadeOut animation

      clearAllTimeout = null;
    }, 2500);
  }

  // Early notification observer (visual only, before plans section)
  const earlyNotificationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !notificationsStarted) {
        notificationsStarted = true;

        // Start showing notifications (but not counting sales yet)
        const notificationInterval = setInterval(() => {
          if (state.isActive) {
            clearInterval(notificationInterval); // Stop when real sales start
          } else {
            // Random chance to show notification (visual only)
            if (Math.random() < 0.3) {
              showNotification();
            }
          }
        }, 2000); // Show notification every 2 seconds randomly

        earlyNotificationObserver.disconnect();
      }
    });
  }, { threshold: 0.1 });

  // Observe testimonials section for early notifications
  const testimonialsSection = document.querySelector('.testimonials-section');
  if (testimonialsSection) {
    earlyNotificationObserver.observe(testimonialsSection);
  }

  // Sales Logic
  function processSales() {
    if (!state.isActive) return;

    const now = Date.now();
    const elapsedSeconds = (now - state.startTime) / 1000;

    // Determine current phase
    let currentPhase = CONFIG.phases[0];
    let phaseStartTime = 0;

    if (elapsedSeconds > CONFIG.phases[0].duration) {
      if (elapsedSeconds > CONFIG.phases[0].duration + CONFIG.phases[1].duration) {
        currentPhase = CONFIG.phases[2];
      } else {
        currentPhase = CONFIG.phases[1];
        phaseStartTime = CONFIG.phases[0].duration;
      }
    }

    let target = currentPhase.target;

    // Velocity Logic with RANDOMIZATION
    // Phase 1: 116 -> 200 in 480s = 84 sales / 480s = ~0.175 sales/sec
    // Phase 2: 200 -> 350 in 480s = 150 sales / 480s = ~0.31 sales/sec

    let baseChance = 0;
    if (currentPhase === CONFIG.phases[0]) baseChance = 0.175;
    else if (currentPhase === CONFIG.phases[1]) baseChance = 0.31;
    else baseChance = 0.05; // Slow for Lote 3

    // Add randomization: ±30% variance
    const randomFactor = 0.7 + (Math.random() * 0.6); // 0.7 to 1.3

    const chance = baseChance * randomFactor;

    if (Math.random() < chance) {
      incrementSale();
    }
  }

  function incrementSale() {
    if (state.currentSold < 1000) {
      state.currentSold++;
      updateUI();
      showNotification();
    }
  }

  // Scroll Trigger for SALES COUNTING (only when plans section is visible)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !state.isActive) {
        state.isActive = true;
        state.startTime = Date.now();

        setInterval(() => {
          processSales();
        }, 1000); // Check every second

        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  if (plansSection) {
    observer.observe(plansSection);
  }
}
