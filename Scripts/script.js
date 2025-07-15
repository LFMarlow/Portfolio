// ====================================
// 1. RÉVÉLATION DES ÉLÉMENTS AU SCROLL
// ====================================

const revealElements = document.querySelectorAll('.reveal-up');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(elem => {
    const elemTop = elem.getBoundingClientRect().top;
    if (elemTop < windowHeight - 100) {
      elem.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ================================
// 2. CERCLES DE COMPÉTENCES (SVG)
// ================================

const skillCircles = document.querySelectorAll('.skill-fg');

function animateSkillCircles() {
  skillCircles.forEach(circle => {
    const rect = circle.parentElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight - 50) {
      let percent = 0;
      if (circle.classList.contains('html')) percent = 80;
      if (circle.classList.contains('css')) percent = 77;
      if (circle.classList.contains('js')) percent = 65;
      if (circle.classList.contains('php')) percent = 75;
      if (circle.classList.contains('csharp')) percent = 85;
      if (circle.classList.contains('aspnet')) percent = 85;
      if (circle.classList.contains('react')) percent = 50;
      if (circle.classList.contains('java')) percent = 50;
      const dashoffset = 283 - (283 * percent) / 100;
      circle.style.strokeDashoffset = dashoffset;
    }
  });
}

window.addEventListener('scroll', animateSkillCircles);
window.addEventListener('load', animateSkillCircles);

// ==========================
// 3. MENU MOBILE (HAMBURGER)
// ==========================

const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navList.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navList.classList.contains('active')) {
      navList.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
});

// ================================
// 4. EFFET 3D TILT SUR LES CARTES
// ================================

// On ajoute un écouteur mousemove à chaque carte contenant data-tilt
const projectCards = document.querySelectorAll('[data-tilt]');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // position X de la souris relative à la carte
    const y = e.clientY - rect.top;  // position Y de la souris relative à la carte
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * 10; // inclinaison max 10°
    const rotateY = ((x - midX) / midX) * -10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

// ==========
// 5. CONTACT
// ==========

emailjs.init("kK092fyJFTs4SjL3H");
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  emailjs.sendForm('service_96b9fs5', 'template_iq0h46f', this)
    .then(() => {
      alert('Message envoyé ! Merci !');
      this.reset();
    }, (err) => {
      console.error('Erreur :', err);
      alert('Oups… une erreur est survenue.');
    });
});

// ======================
// 6. MODE CLAIR / OBSCUR
// ======================

const toggleCheckbox = document.getElementById('toggle-checkbox');
toggleCheckbox.addEventListener('change', () => {
  if (toggleCheckbox.checked) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
});

// Sur la première visite, on peut se baser sur l’heure ou la préférence système
window.addEventListener('load', () => {
  const hour = new Date().getHours();
  // Si entre 18h et 6h, on active le mode sombre par défaut
  if (hour >= 18 || hour < 6) {
    toggleCheckbox.checked = true;
    document.body.classList.add('dark');
  }
});
