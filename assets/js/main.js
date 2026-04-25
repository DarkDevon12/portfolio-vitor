import { projetos } from "./projetos.js";

const navigation = document.querySelector("#navigation");
const backToTopButton = document.querySelector("#backToTopButton");
const toggle = document.querySelector("#sw-checkbox");
const projectsSection = document.querySelector("#projects .wrapper");

const notebook_1 = document.querySelector("#notebook-1");
const notebook_2 = document.querySelector("#notebook-2");
const notebook_2_white = document.querySelector("#notebook-2-white");
const vidro = document.querySelector("#vidro");

window.addEventListener("load", function begin() {
  projetos(projectsSection);
});

window.addEventListener("scroll", onScroll);
onScroll();

window.onload = setTimeout(() => {
  notebook_1.style.opacity = 0;

  notebook_1.style.animation = "none";
  notebook_2.style.animation = "none";
  notebook_2_white.style.animation = "none";
  vidro.style.animation = "none";
}, 4000);

function onScroll() {
  showNavOnScroll();
  showBackToTopButtonOnScroll();

  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(projects);
  activateMenuAtCurrentSection(knowledge);
  activateMenuAtCurrentSection(contact);
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);

  menuElement.classList.remove("active");

  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

openMenu();
function openMenu() {
  const openBtns = document.querySelectorAll(".open");
  openBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.add("menu-expanded");
    });
  });
}

closeMenu();
function closeMenu() {
  const closeBtns = document.querySelectorAll(".close");
  closeBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.remove("menu-expanded");
    });
  });
}

ScrollReveal({
  origin: "bottom",
  distance: "50px",
  duration: 1000,
}).reveal(
  `#home, 
  #home img, 
  #about, 
  #about header, 
  #about p,
  #about img,
  #projects,
  #projects header,
  #projects .card,
  #knowledge,
  #knowledg header,
  #knowledg .card,
  #contact,
  #contact header`
);

toggle.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
});

// ── Certificações ───────────────────────────────────
(function initCertSlider() {
  const thumbs    = Array.from(document.querySelectorAll('.cert-thumb'));
  const mainImg   = document.getElementById('cert-main-img');
  const mainLink  = document.getElementById('cert-main-link');
  const mainTitle = document.getElementById('cert-main-title');
  const mainIssuer= document.getElementById('cert-main-issuer');
  const mainYear  = document.getElementById('cert-main-year');
  const mainCard  = document.querySelector('.cert-main-card');
  const prevBtn   = document.querySelector('.cert-arrow-prev');
  const nextBtn   = document.querySelector('.cert-arrow-next');
  const currentEl = document.getElementById('cert-current');
  const totalEl   = document.getElementById('cert-total');
  const thumbsRow = document.getElementById('cert-thumbs');
 
  if (!thumbs.length) return;
 
  let current = 0;
  const total = thumbs.length;
  if (totalEl) totalEl.textContent = total;
 
  function goTo(index) {
    index = Math.max(0, Math.min(index, total - 1));
    current = index;
 
    const thumb   = thumbs[index];
    const img     = thumb.dataset.img;
    const pdf     = thumb.dataset.pdf;
    const title   = thumb.dataset.title;
    const issuer  = thumb.dataset.issuer;
    const year    = thumb.dataset.year;
 
    // Animação suave
    mainCard.classList.remove('cert-fade');
    void mainCard.offsetWidth;
    mainCard.classList.add('cert-fade');
 
    // Atualiza card principal
    mainImg.src            = img;
    mainImg.alt            = title;
    mainLink.href          = pdf;
    mainTitle.textContent  = title;
    mainIssuer.textContent = issuer;
    mainYear.textContent   = year;
 
    // Contador
    if (currentEl) currentEl.textContent = index + 1;
 
    // Atualiza thumbs
    thumbs.forEach((t, i) => t.classList.toggle('active', i === index));
 
    // Scroll automático para a thumb ativa
    if (thumbsRow) {
      const wrapperEl   = thumbsRow.parentElement;
      const wrapperRect = wrapperEl.getBoundingClientRect();
      const thumbRect   = thumb.getBoundingClientRect();
      const scrollLeft  = thumb.offsetLeft
                        - (wrapperRect.width / 2)
                        + (thumbRect.width / 2);
      wrapperEl.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
 
    // Estado dos botões
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === total - 1;
  }
 
  // Clique nas miniaturas
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => goTo(i));
  });
 
  // Setas
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
 
  // Teclado (← →) quando a seção está visível
  document.addEventListener('keydown', (e) => {
    const section = document.getElementById('certifications');
    if (!section) return;
    const rect    = section.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visible) return;
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });
 
  // Swipe touch
  let touchStartX = 0;
  const stage = document.querySelector('.cert-stage');
  if (stage) {
    stage.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    stage.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });
  }
 
  goTo(0);
})();
 
