/* ==========================================================================
   Gobi Ravisankar — Freelance Portfolio
   Vanilla JS interactions
   ========================================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ------------------------------------------------------------------ */
  /* Mobile navigation toggle                                           */
  /* ------------------------------------------------------------------ */

  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function closeNav() {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function openNav() {
    navMenu.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.contains("open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close mobile menu whenever a nav link is used
    navMenu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Sticky header background on scroll                                 */
  /* ------------------------------------------------------------------ */

  var header = document.getElementById("site-header");

  function handleHeaderScroll() {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  if (header) {
    handleHeaderScroll();
    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  }

  /* ------------------------------------------------------------------ */
  /* Back-to-top button                                                 */
  /* ------------------------------------------------------------------ */

  var backToTop = document.getElementById("backToTop");

  function handleBackToTop() {
    if (window.scrollY > 480) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  if (backToTop) {
    handleBackToTop();
    window.addEventListener("scroll", handleBackToTop, { passive: true });
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Active navigation state via IntersectionObserver                   */
  /* ------------------------------------------------------------------ */

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".nav-link")
  );
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = "#" + entry.target.id;
            navLinks.forEach(function (link) {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === id
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Scroll reveal animations                                           */
  /* ------------------------------------------------------------------ */

  var revealEls = Array.prototype.slice.call(
    document.querySelectorAll(".reveal")
  );

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }
})();
