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
  menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
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
  if (!menu?.classList.contains("open")) return;

  if (event.key === "Escape") {
    setMenuOpen(false);
    return;
  }

  if (event.key === "Tab") {
    const focusable = menu.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
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
