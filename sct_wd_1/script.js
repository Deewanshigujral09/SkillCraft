const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".side-navbar a");
const sideNav = document.getElementById("sideNav");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });

  if (window.scrollY > 100) {
    sideNav.classList.add("scrolled");
  } else {
    sideNav.classList.remove("scrolled");
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: "smooth",
      });
    }
  });
});
