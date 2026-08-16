/* =========================================
   BERYLBYTES INTERACTIONS
========================================= */


/* Cursor glow */

const glow = document.querySelector(".cursor-glow");

window.addEventListener("pointermove", (event) => {

  if (!glow) return;

  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;

});


/* Mobile menu */

const menu = document.querySelector(".mobile-menu");

const menuButton =
  document.querySelector(".menu-btn");

const closeButton =
  document.querySelector(".close-menu");


if (menuButton && menu) {

  menuButton.addEventListener("click", () => {

    menu.classList.add("open");

  });

}


if (closeButton && menu) {

  closeButton.addEventListener("click", () => {

    menu.classList.remove("open");

  });

}


/* Close mobile menu when link is clicked */

document
  .querySelectorAll(".mobile-menu a")
  .forEach((link) => {

    link.addEventListener("click", () => {

      menu?.classList.remove("open");

    });

  });


/* Scroll reveal */

const revealElements =
  document.querySelectorAll(
    ".about-cards article, .project, .cap-list > div, .credential, .contact-form"
  );


const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.08
    }
  );


revealElements.forEach((element) => {

  element.classList.add("reveal");

  revealObserver.observe(element);

});


/* Contact form feedback */

const contactForm =
  document.querySelector(".contact-form");


if (contactForm) {

  contactForm.addEventListener("submit", () => {

    const button =
      contactForm.querySelector(
        'button[type="submit"]'
      );

    if (!button) return;

    button.innerHTML =
      "Sending... <b>↗</b>";

    button.disabled = true;

  });

}