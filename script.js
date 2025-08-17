// Typing Effect
const text = ["B.Tech ECE Graduate", "Embedded Systems Engineer", "Programmer"];
let count = 0, index = 0, currentText = "", letter = "";
(function type(){
  if(count === text.length) count = 0;
  currentText = text[count];
  letter = currentText.slice(0, ++index);
  document.getElementById('typing').textContent = letter;
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
scrollBtn.addEventListener("click", () => {
  window.scrollTo({top: 0, behavior: "smooth"});
});

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

document.querySelectorAll(".project-images img").forEach((img, idx, arr) => {
  img.addEventListener("click", () => {
    currentImages = Array.from(img.parentElement.querySelectorAll("img"));
    currentIndex = currentImages.indexOf(img);
    showImage(currentIndex);
    lightbox.style.display = "block";
  });
});

function showImage(index) {
  lightboxImg.src = currentImages[index].src;
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showImage(currentIndex);
});
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showImage(currentIndex);
});
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});
