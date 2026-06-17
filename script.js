/* ===========================
   NAV — scroll state & mobile toggle
=========================== */
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.innerHTML = open ? '&#10005;' : '&#9776;';
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.innerHTML = '&#9776;';
    document.body.style.overflow = '';
  });
});

/* ===========================
   SCROLL REVEAL — fade-in sections
=========================== */
const animatedEls = [
  '.section-label',
  '.section-title',
  '.section-sub',
  '.problem-grid',
  '.persona-card',
  '.situacao-card',
  '.solucao-grid',
  '.app-showcase',
  '.aprendizado-card',
  '.hero-stats',
];

function addFadeClasses() {
  animatedEls.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('fade-in');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function observeFadeEls() {
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

addFadeClasses();
observeFadeEls();

/* ===========================
   APP MOCKUP — live sensor simulation
=========================== */
const tempVal = document.getElementById('temp-val');
const humidVal = document.getElementById('humid-val');

function randomBetween(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

function updateSensors() {
  if (!tempVal || !humidVal) return;

  const temp = randomBetween(21, 28);
  const humid = randomBetween(60, 78);

  tempVal.textContent = temp + '°C';
  humidVal.textContent = humid + '%';

  const tempFill = document.querySelector('.temp-fill');
  const humidFill = document.querySelector('.humid-fill');

  if (tempFill) tempFill.style.width = ((temp / 40) * 100) + '%';
  if (humidFill) humidFill.style.width = humid + '%';

  // Dynamic alert based on humidity
  const alertEl = document.querySelector('.app-alert');
  if (alertEl) {
    if (parseFloat(humid) > 72) {
      alertEl.textContent = '⚠️ Lote B: umidade elevada (' + humid + '%). Ventilação recomendada.';
      alertEl.className = 'app-alert warning';
    } else {
      alertEl.textContent = '✅ Todos os lotes dentro dos parâmetros normais.';
      alertEl.className = 'app-alert ok';
      alertEl.style.background = '#e8f5e9';
      alertEl.style.color = '#1b5e20';
      alertEl.style.borderLeft = '3px solid #4caf50';
    }
  }
}

setInterval(updateSensors, 3500);

/* ===========================
   STAT COUNTER — animate numbers on scroll
=========================== */
function animateCounter(el, target, suffix = '', duration = 1200) {
  const isFloat = target.toString().includes('.');
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = start + (parseFloat(target) - start) * ease;

    el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.stat-num');
      if (numEl && !numEl.dataset.animated) {
        numEl.dataset.animated = 'true';
        const raw = numEl.textContent.trim();
        const suffix = raw.replace(/[\d.]/g, '');
        const num = parseFloat(raw.replace(/[^\d.]/g, ''));
        animateCounter(numEl, num, suffix);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(el => statsObserver.observe(el));

/* ===========================
   SMOOTH ACTIVE NAV LINK
=========================== */
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + id ? '#1a5e20' : '';
        link.style.fontWeight = link.getAttribute('href') === '#' + id ? '700' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ===========================
   SITUAÇÃO CARDS — expand on click
=========================== */
document.querySelectorAll('.situacao-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
    if (card.classList.contains('expanded')) {
      card.style.boxShadow = '0 20px 60px rgba(26, 94, 32, 0.15)';
      card.style.borderColor = '#a5d6a7';
    } else {
      card.style.boxShadow = '';
      card.style.borderColor = '';
    }
  });
});

/* ===========================
   APP INSPEÇÃO button feedback
=========================== */
const btnInspecao = document.querySelector('.app-btn-inspecao');
if (btnInspecao) {
  btnInspecao.addEventListener('click', () => {
    const original = btnInspecao.textContent;
    btnInspecao.textContent = '✓ Inspeção registrada!';
    btnInspecao.style.background = '#2e7d32';
    setTimeout(() => {
      btnInspecao.textContent = original;
      btnInspecao.style.background = '';
    }, 2000);
  });
    }
  
