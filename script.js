/* ===================================================
   BERYL PORTFOLIO — script.js
   =================================================== */


/* ── 1. PARTICLES ── */
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');
const COUNT  = 70;
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function isLight() {
  return document.body.classList.contains('light');
}

class Particle {
  constructor() { this.reset(); }

  reset() {
    this.x    = Math.random() * canvas.width;
    this.y    = Math.random() * canvas.height;
    this.r    = Math.random() * 1.5 + 0.3;
    this.vx   = (Math.random() - 0.5) * 0.3;
    this.vy   = (Math.random() - 0.5) * 0.3;
    this.a    = Math.random();
    this.da   = (Math.random() - 0.5) * 0.005;
    this.hue  = Math.random() < 0.5 ? 175 : 200;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.a += this.da;
    if (this.a < 0 || this.a > 1) this.da *= -1;
    if (
      this.x < -10 || this.x > canvas.width  + 10 ||
      this.y < -10 || this.y > canvas.height + 10
    ) this.reset();
  }

  draw() {
    const alpha = isLight() ? this.a * 0.3 : this.a * 0.6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = isLight()
      ? `hsla(${this.hue}, 60%, 40%, ${alpha})`
      : `hsla(${this.hue}, 100%, 70%, ${alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < COUNT; i++) particles.push(new Particle());

function drawConnections() {
  const MAX = 120;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX) {
        const alpha = (1 - dist / MAX) * (isLight() ? 0.08 : 0.18);
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = isLight()
          ? `rgba(10, 122, 106, ${alpha})`
          : `rgba(0, 245, 212, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();


/* ── 2. TYPING ANIMATION ── */
const ROLES = [
  'Freelance Writer ✍️',
  'Content Creator 🎨',
  'SEO Specialist 🔍',
  'Digital Marketer 📢',
  'Academic Writer 📚',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function typeEffect() {
  const current = ROLES[roleIndex];

  if (isDeleting) {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; typeEffect(); }, 1800);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % ROLES.length;
  }

  setTimeout(typeEffect, isDeleting ? 55 : 90);
}
typeEffect();


/* ── 3. DARK / LIGHT TOGGLE ── */
const themeBtn = document.getElementById('theme-btn');

themeBtn.addEventListener('click', function () {
  const body = document.body;
  if (body.classList.contains('dark')) {
    body.classList.replace('dark', 'light');
    themeBtn.textContent = '🌙 Dark';
  } else {
    body.classList.replace('light', 'dark');
    themeBtn.textContent = '☀ Light';
  }
});


/* ── 4. SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.reveal, .reveal-right, .reveal-up, .reveal-card, .stats-col, .contact-info'
).forEach(el => revealObserver.observe(el));


/* ── 5. CONTACT FORM — Formspree handles submission ── */
const contactForm = document.getElementById('contact-form');
const successMsg  = document.getElementById('success-msg');

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = new FormData(contactForm);

  try {
    const response = await fetch('https://formspree.io/f/xwvaygpp', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      successMsg.style.display = 'block';
      contactForm.reset();
      setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
    } else {
      alert('Oops! Something went wrong. Please try emailing me directly at berylmunyao8@gmail.com');
    }
  } catch (error) {
    alert('Oops! Something went wrong. Please try emailing me directly at berylmunyao8@gmail.com');
  }
});


/* ── 6. SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});


/* ── 7. SERVICE CARDS → scroll to contact ── */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
});