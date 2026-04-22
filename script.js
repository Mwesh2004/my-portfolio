// ===== TYPING ANIMATION =====
const subtitle = document.getElementById("subtitle");
const roles = [
  "Freelance Writer ✍️",
  "Content Creator 🎨",
  "SEO Specialist 🔍",
  "Digital Marketer 📢"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    subtitle.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    subtitle.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === currentRole.length) {
    setTimeout(() => isDeleting = true, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeEffect, isDeleting ? 60 : 100);
}
typeEffect();


// ===== SCROLL REVEAL =====
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));


// ===== DARK/LIGHT MODE TOGGLE =====
const toggleBtn = document.getElementById("toggle-btn");
toggleBtn.addEventListener("click", function () {
  document.body.classList.toggle("light-mode");
  toggleBtn.textContent = document.body.classList.contains("light-mode")
    ? "🌙 Dark Mode"
    : "☀️ Light Mode";
});


// ===== CONTACT FORM =====
const form = document.getElementById("contact-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  alert(`Thanks ${name}! 🎉 Your message has been received. I'll get back to you soon!`);
  form.reset();
});


// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ===== SERVICE CARD HOVER SOUND EFFECT =====
document.querySelectorAll(".service-card").forEach(card => {
  card.addEventListener("click", function () {
    const service = this.querySelector("h4").textContent;
    alert(`You selected: ${service} 💼\nLet's work together! Reach out via the contact section.`);
  });
});