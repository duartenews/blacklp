import './style-lp2.css'

// Countdown Timer Logic
function startCountdown() {
  const timerElement = document.getElementById('countdown-timer');
  const buttonTimers = document.querySelectorAll('.button-timer');
  const topBar = document.querySelector('.top-bar');

  // 8 minutos de contagem
  const duration = 8 * 60 * 1000; // 8 minutes in milliseconds
  let endTime = localStorage.getItem('blackFridayEndTime_v2');

  if (!endTime) {
    endTime = Date.now() + duration;
    localStorage.setItem('blackFridayEndTime_v2', endTime);
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

    if (timerElement) {
      timerElement.textContent = timeString;
    }
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
  const videoUrl = 'https://www.youtube.com/embed/T8kYl8Nliic?autoplay=1&enablejsapi=1';

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
      iframe.setAttribute('playsinline', '');
      iframe.setAttribute('title', 'SecretáriaPlus Player');

      // Replace facade with iframe
      const parent = facade.parentElement;
      if (parent) {
        parent.innerHTML = '';
        parent.appendChild(iframe);
        // Ensure parent maintains layout
        parent.style.display = 'block';

        // Force play once iframe is ready so the visitor doesn't need to click twice
        iframe.addEventListener('load', () => {
          try {
            iframe.contentWindow?.postMessage(JSON.stringify({ method: 'play' }), '*');
          } catch (err) {
            console.error('Failed to trigger Vimeo autoplay', err);
          }
        });
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
if (track) {
  track.innerHTML = allTestimonials.map(createTestimonialCard).join('');
}

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
  // Optimized to avoid reflow: Card width (320px) + Gap (30px) defined in CSS
  return 350;
}

function slideToNext() {
  if (!testimonialsTrack) return;
  const cardWidth = getCardWidth();
  currentIndex = (currentIndex + 1) % totalCards;
  testimonialsTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function slideToPrev() {
  if (!testimonialsTrack) return;
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
  if (!testimonialsTrack) return;
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

// LP3 date-based lote logic & notifications
const LP3_LOTES = [
  {
    id: 1,
    price: '197',
    nextPrice: '297',
    ctaLink: 'https://pay.hub.la/4vKjlCIm6mnGZugbaX4m',
    startDate: new Date('2025-11-20T00:00:00-03:00'),
    endDate: new Date('2025-11-30T23:59:59-03:00')
  },
  {
    id: 2,
    price: '297',
    nextPrice: '397',
    ctaLink: 'https://pay.hub.la/TBDnrhvmPo4DJmJTJziT',
    startDate: new Date('2025-12-01T00:00:00-03:00'),
    endDate: new Date('2025-12-04T23:59:59-03:00')
  },
  {
    id: 3,
    price: '397',
    nextPrice: null,
    ctaLink: 'https://pay.hub.la/V9jpzuZOA63avK45EkAg',
    startDate: new Date('2025-12-05T00:00:00-03:00'),
    endDate: null
  }
];

const LP3_NOTIFICATION_NAMES = [
  'Ana Paula C.', 'Mariana Costa F.', 'Fernanda Lima S.', 'Juliana Martins R.', 'Patrícia Rocha M.', 'Camila Oliveira D.',
  'Bruna Andrade L.', 'Letícia Moura T.', 'Carolina Ribeiro P.', 'Aline Ferreira V.', 'Natália Duarte H.', 'Sabrina Alves G.',
  'Dra. Beatriz A.', 'Dra. Carolina M.', 'Dra. Gabriela S.', 'Dra. Amanda T.', 'Dra. Renata V.', 'Dra. Vanessa R.',
  'Dra. Larissa F.', 'Dra. Daniela P.', 'Dra. Priscila G.', 'Dra. Tatiane C.', 'Dra. Isabela L.', 'Dra. Michele D.',
  'Clínica Bella', 'Clínica Renovare', 'Studio Harmonize', 'Clínica Viddá', 'Clínica Corpo & Face', 'Instituto Leve',
  'Dr. Roberto S.', 'Dr. Fernando L.', 'Dr. Marcelo P.', 'Dr. Henrique A.'
];

const PROGRESS_MINIMUM = 10;
const LOTE1_BASELINE = 85;
const LOTE1_EXTRA_RANGE = 15;
const LOTE1_RAMP_DURATION_MS = 48 * 60 * 60 * 1000; // last 48h before virar
const PROGRESS_UPDATE_INTERVAL_MS = 15000;
const NOTIFICATION_INTERVAL_MS = 75000;

document.addEventListener('DOMContentLoaded', () => {
  initLp3Lotes();
  startLp3Notifications();
});

function initLp3Lotes() {
  const progressBar = document.getElementById('lote-progress-fill');
  const progressText = document.querySelector('.lote-progress-text-inside');
  const priceDisplay = document.getElementById('current-price-display');
  const priceCounter = document.getElementById('price-counter-top');
  const footerText = document.querySelector('.urgency-footer-text');
  const subtitle = document.querySelector('.lote-subtitle-small');
  const planBtn = document.querySelector('.plan-card.featured .plan-btn');
  const topBarFill = document.getElementById('topBarProgressFill');
  const topBarText = document.getElementById('topBarText');
  const remainingCountElements = document.querySelectorAll('.lote-remaining-count');

  function updateView() {
    const now = new Date();
    const activeLote = getActiveLote(now);
    const nextLote = getNextLote(activeLote.id);
    const progress = getProgressPercentage(activeLote, now);
    const deadlineCopy = getLoteDeadlineCopy(activeLote.id);

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
      const { start, end } = getThermometerColors(progress);
      progressBar.style.background = `linear-gradient(90deg, ${start}, ${end})`;
    }

    if (progressText) {
      progressText.textContent = `LOTE ${activeLote.id} finalizando...`;
    }

    remainingCountElements.forEach(el => {
      el.textContent = activeLote.id === 1 ? 'Primeiras 100 vagas' : 'Vagas limitadas';
    });

    if (priceDisplay) {
      priceDisplay.textContent = `12x ${activeLote.price}`;
    }

    if (priceCounter) {
      priceCounter.innerHTML = `<strong>Lote ${activeLote.id}</strong> - acaba ${deadlineCopy}`;
    }

    if (subtitle) {
      if (activeLote.id === 1) {
        subtitle.innerHTML = '<b>Lote 1 válido pelas primeiras 100 vagas ou até 30/11.</b>';
      } else {
        const nextInfo = nextLote
          ? `Assim que esse lote virar, o valor vai para <b>12x ${nextLote.price}</b>.`
          : 'Esse é o último lote disponível.';
        subtitle.innerHTML = `<b>Lote ${activeLote.id}</b> se encerra ${deadlineCopy}. ${nextInfo}`;
      }
    }

    if (footerText) {
      if (nextLote) {
        footerText.innerHTML = `As vagas do Lote ${activeLote.id} podem acabar a qualquer momento e o preço sobe para <strong>12x ${nextLote.price}</strong>.`;
      } else {
        footerText.innerHTML = `Últimas vagas no valor atual de <strong>12x ${activeLote.price}</strong>.`;
      }
    }

    if (planBtn) {
      planBtn.onclick = () => {
        window.location.href = activeLote.ctaLink;
      };
    }

    if (topBarText) {
      topBarText.textContent = `ÚLTIMAS VAGAS DO LOTE R$${activeLote.price}`;
    }

    if (topBarFill) {
      topBarFill.style.width = `${progress}%`;
      const { start, end } = getThermometerColors(progress);
      topBarFill.style.background = `linear-gradient(90deg, ${start}, ${end})`;
    }

    updateLoteTabs(activeLote.id, progress);
  }

  updateView();
  setInterval(updateView, PROGRESS_UPDATE_INTERVAL_MS);
}

function getActiveLote(now = new Date()) {
  for (const lote of LP3_LOTES) {
    if (!lote.endDate || now <= lote.endDate) {
      return lote;
    }
  }
  return LP3_LOTES[LP3_LOTES.length - 1];
}

function getNextLote(currentId) {
  const currentIndex = LP3_LOTES.findIndex(lote => lote.id === currentId);
  if (currentIndex === -1) return null;
  return LP3_LOTES[currentIndex + 1] || null;
}

function getProgressPercentage(lote, now = new Date()) {
  if (!lote) return 0;
  if (!lote.endDate) {
    return 100;
  }

  const start = lote.startDate ? lote.startDate.getTime() : now.getTime();
  const end = lote.endDate.getTime();
  const nowTime = now.getTime();

  if (end <= start) {
    return 100;
  }

  if (lote.id === 1) {
    if (nowTime >= end) {
      return 100;
    }

    const rampStart = Math.max(start, end - LOTE1_RAMP_DURATION_MS);
    if (nowTime <= rampStart) {
      return LOTE1_BASELINE;
    }

    const ratio = (nowTime - rampStart) / (end - rampStart);
    const progress = LOTE1_BASELINE + ratio * LOTE1_EXTRA_RANGE;
    return Math.min(100, Math.max(LOTE1_BASELINE, progress));
  }

  if (nowTime <= start) {
    return PROGRESS_MINIMUM;
  }

  if (nowTime >= end) {
    return 100;
  }

  const progress = ((nowTime - start) / (end - start)) * 100;
  return Math.min(100, Math.max(PROGRESS_MINIMUM, progress));
}

function updateLoteTabs(activeId, activeProgress = 90) {
  const loteTabs = document.querySelectorAll('.lote-tab');
  const lotePrices = document.querySelectorAll('.lote-price-top');
  const loteStatuses = document.querySelectorAll('.lote-status');

  LP3_LOTES.forEach((lote, index) => {
    const tab = loteTabs[index];
    const price = lotePrices[index];
    const status = loteStatuses[index];
    if (!tab || !price || !status) return;

    price.classList.remove('expired');
    resetLoteStatusStyle(status);
    resetLoteTabStyle(tab);

    if (lote.id === activeId) {
      tab.classList.add('active');
      price.classList.add('active');
      status.classList.add('active');
      if (lote.id === 1) {
        status.textContent = 'acabando';
        applyLoteTabGradient(tab, activeProgress);
      } else {
        status.textContent = 'atual';
      }
    } else if (lote.id < activeId) {
      tab.classList.remove('active');
      price.classList.remove('active');
      price.classList.add('expired');
      status.classList.remove('active');
      status.textContent = 'encerrado';
    } else {
      tab.classList.remove('active');
      price.classList.remove('active');
      status.classList.remove('active');
      status.textContent = lote.id === activeId + 1 ? 'próximo' : 'aguarde';
    }
  });
}

function getThermometerColors(percentage) {
  if (percentage < 50) {
    const ratio = percentage / 50;
    const start = `rgb(${Math.round(34 + (212 - 34) * ratio)}, ${Math.round(197 + (175 - 197) * ratio)}, ${Math.round(94 + (140 - 94) * ratio)})`;
    const end = `rgb(${Math.round(52 + (230 - 52) * ratio)}, ${Math.round(211 + (195 - 211) * ratio)}, ${Math.round(153 + (156 - 153) * ratio)})`;
    return { start, end };
  }
  if (percentage < 80) {
    const ratio = (percentage - 50) / 30;
    const start = `rgb(${Math.round(212 + (245 - 212) * ratio)}, ${Math.round(175 + (130 - 175) * ratio)}, ${Math.round(140 + (49 - 140) * ratio)})`;
    const end = `rgb(${Math.round(230 + (255 - 230) * ratio)}, ${Math.round(195 + (165 - 195) * ratio)}, ${Math.round(156 + (79 - 156) * ratio)})`;
    return { start, end };
  }
  const ratio = (percentage - 80) / 20;
  const start = `rgb(${Math.round(245 + (220 - 245) * ratio)}, ${Math.round(130 + (38 - 130) * ratio)}, ${Math.round(49 + (38 - 49) * ratio)})`;
  const end = `rgb(${Math.round(255 + (239 - 255) * ratio)}, ${Math.round(165 + (68 - 165) * ratio)}, ${Math.round(79 + (68 - 79) * ratio)})`;
  return { start, end };
}

function getLoteDeadlineCopy(loteId) {
  if (loteId === 1) {
    return 'ao final das primeiras 100 vagas ou dia 30/11';
  }
  return 'ao final das vagas deste lote';
}

function applyLoteTabGradient(tabElement, progressValue = 90) {
  const { start, end } = getThermometerColors(progressValue);
  tabElement.style.background = `linear-gradient(90deg, ${start}, ${end})`;
  tabElement.style.borderColor = 'transparent';
  tabElement.style.color = '#fff';
  tabElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.35)';
}

function resetLoteStatusStyle(statusElement) {
  statusElement.style.background = '';
  statusElement.style.color = '';
}

function resetLoteTabStyle(tabElement) {
  tabElement.style.background = '';
  tabElement.style.borderColor = '';
  tabElement.style.color = '';
  tabElement.style.boxShadow = '';
}

function startLp3Notifications() {
  const notificationContainer = document.getElementById('sales-notification-container');
  if (!notificationContainer) return;

  const renderNotification = () => {
    if (document.visibilityState === 'hidden') return;

    // limit to 2 notifications
    while (notificationContainer.children.length >= 2) {
      notificationContainer.removeChild(notificationContainer.firstElementChild);
    }

    const name = LP3_NOTIFICATION_NAMES[Math.floor(Math.random() * LP3_NOTIFICATION_NAMES.length)];
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
        <div class="sales-notification-text">Acabou de assinar o plano Black Anual</div>
      </div>
    `;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('hiding');
      setTimeout(() => {
        notification.remove();
      }, 400);
    }, 2800);
  };

  // primeira notificação após alguns segundos
  setTimeout(renderNotification, 5000);
  setInterval(renderNotification, NOTIFICATION_INTERVAL_MS);
}
