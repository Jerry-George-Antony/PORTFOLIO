// Typing Effect
const text = ["B.Tech ECE Graduate", "Embedded Systems Engineer", "Programmer"];
let count = 0, index = 0, currentText = "", letter = "";
(function type(){
  if(count === text.length) count = 0;
  currentText = text[count];
  letter = currentText.slice(0, ++index);
  const typingEl = document.getElementById('typing');
  if (typingEl) typingEl.textContent = letter;
  if(letter.length === currentText.length){
    count++;
    index = 0;
    setTimeout(type, 1200);
  } else {
    setTimeout(type, 120);
  }
})();

// Scroll-to-top button
const scrollBtn = document.getElementById("scrollTop");
if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  });
  scrollBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") window.scrollTo({top: 0, behavior: "smooth"});
  });
}

// Expand/Collapse Project Images
document.querySelectorAll(".project-header").forEach(header => {
  header.addEventListener("click", () => {
    const images = header.parentElement.querySelector(".project-images");
    const arrow = header.querySelector(".arrow");
    if (images.style.display === "block") {
      images.style.display = "none";
      arrow.style.transform = "rotate(0deg)";
    } else {
      images.style.display = "block";
      arrow.style.transform = "rotate(180deg)";
    }
  });
});

// Lightbox for project images
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;
let currentImages = [];

document.querySelectorAll(".project-images img").forEach(img => {
  img.addEventListener("click", () => {
    currentImages = Array.from(img.parentElement.querySelectorAll("img"));
    currentIndex = currentImages.indexOf(img);
    showImage(currentIndex);
    lightbox.style.display = "block";
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function showImage(index) {
  lightboxImg.src = currentImages[index].src;
}

if (nextBtn) nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showImage(currentIndex);
});
if (prevBtn) prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showImage(currentIndex);
});
if (closeBtn) closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");
});

// Hamburger / Sidebar Toggle (mobile)
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeSidebarBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");

function openMenu() {
  sidebar.classList.add("open");
  sidebar.setAttribute("aria-hidden", "false");
  if (window.innerWidth <= 768) {
    hamburger.style.display = "none"; // hide hamburger
    document.body.style.overflow = "hidden"; // prevent background scroll
  }
}
function closeMenu() {
  sidebar.classList.remove("open");
  sidebar.setAttribute("aria-hidden", "true");
  if (window.innerWidth <= 768) {
    hamburger.style.display = "block"; // show hamburger
    document.body.style.overflow = ""; // restore scroll
  }
}

if (hamburger) {
  hamburger.addEventListener("click", openMenu);
  hamburger.addEventListener("keypress", (e) => { if (e.key === "Enter") openMenu(); });
}
if (closeSidebarBtn) {
  closeSidebarBtn.addEventListener("click", closeMenu);
  closeSidebarBtn.addEventListener("keypress", (e) => { if (e.key === "Enter") closeMenu(); });
}
if (overlay) overlay.addEventListener("click", closeMenu);

// Auto close sidebar when clicking a link (mobile only)
document.querySelectorAll(".sidebar nav a").forEach(link => {
  link.addEventListener("click", () => {
    if(window.innerWidth <= 768){
      closeMenu();
    }
  });
});

// --- Scroll Reveal (adds nice, lightweight fade/slide in) ---
const toReveal = [];
// Mark items for reveal without editing your HTML
document.querySelectorAll("header.banner, section, .project-card").forEach(el => {
  el.classList.add("reveal");
  toReveal.push(el);
});

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  }, { threshold: 0.15 });

  toReveal.forEach(el => io.observe(el));
} else {
  // Fallback: show all if IO not supported
  toReveal.forEach(el => el.classList.add("in-view"));
}
