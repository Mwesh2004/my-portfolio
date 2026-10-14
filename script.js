/* BerylBytes interactions — accessible and resilient */

const glow = document.querySelector(".cursor-glow");
const menu = document.querySelector(".mobile-menu");
const menuButton = document.querySelector(".menu-btn");
const closeButton = document.querySelector(".close-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

if (glow && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

function setMenuOpen(open) {
  if (!menu || !menuButton) return;
  menu.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("menu-open", open);
  if (open) {
    closeButton?.focus();
  } else {
    menuButton.focus();
  }
}

menuButton?.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

closeButton?.addEventListener("click", () => setMenuOpen(false));

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menu?.classList.contains("open")) setMenuOpen(false);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu?.classList.contains("open")) {
    setMenuOpen(false);
  }
});

const revealElements = document.querySelectorAll(
  ".about-cards article, .project, .cap-list > div, .credential, .contact-form"
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

const contactForm = document.querySelector(".contact-form");

contactForm?.addEventListener("submit", () => {
  const button = contactForm.querySelector('button[type="submit"]');
  if (!button) return;
  button.innerHTML = 'Sending… <b aria-hidden="true">↗</b>';
  button.disabled = true;
  button.setAttribute("aria-live", "polite");
});
