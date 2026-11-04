const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section")];
const links = [...document.querySelectorAll(".site-nav a")];
const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries.find((entry) => entry.isIntersecting);
    if (!visible) return;
    links.forEach((link) => link.classList.toggle("active", link.hash === `#${visible.target.id}`));
  },
  { rootMargin: "-35% 0px -55% 0px" },
);
sections.forEach((section) => observer.observe(section));
