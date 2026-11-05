const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    });
  });
}

const observedSections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".site-nav a")];

if ("IntersectionObserver" in window && observedSections.length) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const current = visible.target.id;
    // Las subsecciones de proyectos pertenecen visualmente a Formación.
    const navTarget = ["pcity", "kronos", "traidx"].includes(current) ? "formacion" : current;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${navTarget}`);
    });
  }, { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.35] });

  observedSections.forEach((section) => observer.observe(section));
}
