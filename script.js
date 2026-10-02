/* ==========================================================
   Yasmin Mohamed — Portfolio
   script.js
   ========================================================== */

/* ----------------------------------------------------------
   1) YOUR LINKS — edit these only
   Leave facebook empty ("") to hide its icon.
   ---------------------------------------------------------- */
const LINKS = {
  linkedin: "https://www.linkedin.com/in/yasmin-mohamed-6a69a3382",
  github: "https://github.com/yasmiiinm2007-lang",
  email: "yasmiiinm2007@gmail.com",
  facebook: ""
};

/* ----------------------------------------------------------
   2) Social icons (hero, about photo hover, footer)
   ---------------------------------------------------------- */
function iconSvg(id) {
  return '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><use href="#' + id + '"/></svg>';
}

function buildSocialLinks() {
  const items = [];
  if (LINKS.facebook) items.push({ label: "Facebook", icon: "fb", url: LINKS.facebook });
  if (LINKS.linkedin) items.push({ label: "LinkedIn", icon: "in", url: LINKS.linkedin });
  if (LINKS.github) items.push({ label: "GitHub", icon: "gh", url: LINKS.github });
  if (LINKS.email) items.push({ label: "Email", icon: "mail", url: "mailto:" + LINKS.email });

  const html = items.map(function (item) {
    const isMail = item.url.indexOf("mailto:") === 0;
    const target = isMail ? "" : ' target="_blank" rel="noopener"';
    return '<a href="' + item.url + '" aria-label="' + item.label + '"' + target + '>' + iconSvg(item.icon) + "</a>";
  }).join("");

  document.querySelectorAll("[data-socials], [data-socials-veil]").forEach(function (el) {
    el.innerHTML = html;
  });
}

/* ----------------------------------------------------------
   3) Contact button + email text
   ---------------------------------------------------------- */
function setupContact() {
  const mailto = "mailto:" + LINKS.email;
  document.getElementById("mailBtn").href = mailto;

  const mailText = document.getElementById("mailTxt");
  mailText.href = mailto;
  mailText.textContent = LINKS.email;
}

/* ----------------------------------------------------------
   4) Scroll progress bar + active menu link
   ---------------------------------------------------------- */
function setupScroll() {
  const bar = document.getElementById("bar");
  const sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  const navLinks = document.querySelectorAll("#links a");

  function onScroll() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + "%";

    let current = "home";
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top < window.innerHeight * 0.38) current = section.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle("on", link.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ----------------------------------------------------------
   5) Mobile menu
   ---------------------------------------------------------- */
function setupMobileMenu() {
  const menu = document.getElementById("mm");

  document.getElementById("burger").addEventListener("click", function () {
    menu.classList.toggle("open");
  });

  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") menu.classList.remove("open");
  });
}

/* ----------------------------------------------------------
   6) About photo — tap to show social icons on touch screens
   (on desktop the hover effect is handled by CSS)
   ---------------------------------------------------------- */
function setupPhoto() {
  const photo = document.getElementById("photo");

  photo.addEventListener("click", function (e) {
    if (e.target.closest("a")) return;
    photo.classList.toggle("open");
  });

  photo.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      photo.classList.toggle("open");
    }
  });
}

/* ----------------------------------------------------------
   Start
   ---------------------------------------------------------- */
buildSocialLinks();
setupContact();
setupScroll();
setupMobileMenu();
setupPhoto();
