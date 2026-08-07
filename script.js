"use strict";

/* ==========================================
GET ELEMENTS
========================================== */

const loader = document.getElementById("loader");

const settingsBtn = document.getElementById("settingsBtn");
const settingsPopup = document.getElementById("settingsPopup");
const closePopup = document.getElementById("closePopup");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const muteBtn = document.getElementById("muteBtn");

const volumeSlider = document.getElementById("volumeSlider");
const musicSelect = document.getElementById("musicSelect");
const languageSelect = document.getElementById("languageSelect");
const particlesToggle = document.getElementById("particlesToggle");

const music1 = document.getElementById("music1");
const music2 = document.getElementById("music2");

const scrollTop = document.getElementById("scrollTop");

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

let currentMusic = music1;

let particlesEnabled = true;

/* ==========================================
LOADER
========================================== */

window.addEventListener("load", () => {

setTimeout(() => {

loader.style.opacity = "0";

loader.style.pointerEvents = "none";

setTimeout(() => {

loader.remove();

},600);

},1200);

});

/* ==========================================
SETTINGS POPUP
========================================== */

settingsBtn.onclick = () => {

settingsPopup.classList.add("show");

}

closePopup.onclick = () => {

settingsPopup.classList.remove("show");

}

window.onclick = (e)=>{

if(e.target===settingsPopup){

settingsPopup.classList.remove("show");

}

}

/* ==========================================
MUSIC
========================================== */

currentMusic.volume=.6;

playBtn.onclick=()=>{

currentMusic.play();

}

pauseBtn.onclick=()=>{

currentMusic.pause();

}

muteBtn.onclick=()=>{

currentMusic.muted=!currentMusic.muted;

muteBtn.innerText=currentMusic.muted?"Unmute":"Mute";

}

volumeSlider.oninput=()=>{

currentMusic.volume=volumeSlider.value/100;

localStorage.setItem("volume",volumeSlider.value);

}
/* ==========================================
MUSIC SELECT
========================================== */

musicSelect.onchange = () => {

currentMusic.pause();

currentMusic.currentTime = 0;

if (musicSelect.value === "1") {

currentMusic = music1;

} else {

currentMusic = music2;

}

currentMusic.volume = volumeSlider.value / 100;

currentMusic.play();

};

/* ==========================================
SAVE VOLUME
========================================== */

const savedVolume = localStorage.getItem("volume");

if (savedVolume) {

volumeSlider.value = savedVolume;

music1.volume = savedVolume / 100;

music2.volume = savedVolume / 100;

}

/* ==========================================
LANGUAGE
========================================== */

languageSelect.onchange = () => {

if (languageSelect.value === "ar") {

toastShow("تم تغيير اللغة للعربية");

} else {

toastShow("Language Changed To English");

}

};

/* ==========================================
PARTICLES
========================================== */

particlesToggle.onclick = () => {

const particles = document.getElementById("particles");

particlesEnabled = !particlesEnabled;

particles.style.display = particlesEnabled ? "block" : "none";

particlesToggle.innerText = particlesEnabled
? "✨ Particles ON"
: "✨ Particles OFF";

};

/* ==========================================
SCROLL TO TOP
========================================== */

window.addEventListener("scroll", () => {

if (window.scrollY > 300) {

scrollTop.classList.add("show");

} else {

scrollTop.classList.remove("show");

}

});

scrollTop.onclick = () => {

window.scrollTo({

top: 0,

behavior: "smooth"

});

};

/* ==========================================
TOAST FUNCTION
========================================== */

function toastShow(text) {

toastText.innerText = text;

toast.classList.add("show");

setTimeout(() => {

toast.classList.remove("show");

}, 2500);

}
/* ==========================================
LIGHTBOX
========================================== */

const galleryImages = document.querySelectorAll(".gallery-item img");

galleryImages.forEach((img) => {

img.addEventListener("click", () => {

lightbox.style.display = "flex";

lightboxImage.src = img.src;

document.body.style.overflow = "hidden";

});

});

closeLightbox.onclick = () => {

lightbox.style.display = "none";

document.body.style.overflow = "auto";

};

lightbox.onclick = (e) => {

if (e.target === lightbox) {

lightbox.style.display = "none";

document.body.style.overflow = "auto";

}

};

/* ==========================================
SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

link.addEventListener("click", function(e){

e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth",

block:"start"

});

}

});

});

/* ==========================================
ORDER BUTTONS
========================================== */

const orderButtons = document.querySelectorAll(".order-btn");

orderButtons.forEach(btn=>{

btn.addEventListener("click",(e)=>{

e.preventDefault();

toastShow("Order feature coming soon.");

});

});

/* ==========================================
SOCIAL CARDS
========================================== */

const socialCards = document.querySelectorAll(".social-card");

socialCards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-8px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});
/* ==========================================
WHITE PARTICLES
========================================== */

const particlesContainer = document.getElementById("particles");

function createParticle() {

if (!particlesEnabled) return;

const p = document.createElement("span");

const size = Math.random() * 4 + 2;

p.style.position = "absolute";
p.style.width = size + "px";
p.style.height = size + "px";
p.style.background = "#ffffff";
p.style.borderRadius = "50%";
p.style.left = Math.random() * window.innerWidth + "px";
p.style.top = window.innerHeight + "px";
p.style.opacity = Math.random();
p.style.boxShadow = "0 0 12px #ffffff";

particlesContainer.appendChild(p);

let y = window.innerHeight + 20;
const speed = Math.random() * 2 + 1;

const move = setInterval(() => {

y -= speed;

p.style.top = y + "px";

if (y < -20) {

clearInterval(move);
p.remove();

}

}, 16);

}

setInterval(createParticle, 150);

/* ==========================================
SAVE SETTINGS
========================================== */

window.addEventListener("beforeunload", () => {

localStorage.setItem("selectedMusic", musicSelect.value);
localStorage.setItem("language", languageSelect.value);
localStorage.setItem("particles", particlesEnabled);

});

window.addEventListener("load", () => {

const savedMusic = localStorage.getItem("selectedMusic");
const savedLang = localStorage.getItem("language");
const savedParticles = localStorage.getItem("particles");

if (savedMusic) {

musicSelect.value = savedMusic;
currentMusic = savedMusic === "1" ? music1 : music2;

}

if (savedLang) {

languageSelect.value = savedLang;

}

if (savedParticles === "false") {

particlesEnabled = false;
particlesContainer.style.display = "none";
particlesToggle.innerText = "✨ Particles OFF";

}

});

/* ==========================================
WELCOME TOAST
========================================== */

setTimeout(() => {

toastShow("Welcome To KON ART");

}, 1800);
settingsBtn.addEventListener("click", function () {
    settingsPopup.classList.add("show");
});

closePopup.addEventListener("click", function () {
    settingsPopup.classList.remove("show");
});

/* ==========================================
END
========================================== */