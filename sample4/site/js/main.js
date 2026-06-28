/* 髪結び ｜ interactions */
(function () {
  "use strict";

  /* ---------- hamburger / nav drawer ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const overlay = document.querySelector(".nav-overlay");
  const backdrop = document.querySelector(".nav-backdrop");

  function setNav(open) {
    toggle.classList.toggle("open", open);
    overlay.classList.toggle("open", open);
    backdrop.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    overlay.setAttribute("aria-hidden", String(!open));
    backdrop.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", () =>
    setNav(!overlay.classList.contains("open"))
  );

  backdrop.addEventListener("click", () => setNav(false));

  overlay.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setNav(false))
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNav(false);
  });

  /* ---------- reveal on scroll ---------- */
  const targets = document.querySelectorAll(
    ".concept__text, .concept__photo, .concept__sub, .styles__head, .style-card, .gallery__title, .gallery__grid, .menu__head, .menu__list, .info__card, .info__cta, .site-footer"
  );
  targets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add("in"));
  }

  /* ---------- hide reserve bar when footer reserve CTA visible ---------- */
  const bar = document.querySelector(".reserve-bar");
  const footer = document.getElementById("reserve");
  if (bar && footer && "IntersectionObserver" in window) {
    const fo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          bar.style.transform = e.isIntersecting ? "translateY(100%)" : "translateY(0)";
        });
      },
      { threshold: 0.2 }
    );
    fo.observe(footer);
    bar.style.transition = "transform .45s ease";
  }
})();
