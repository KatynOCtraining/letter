// Variables
const mobile_media_query = window.matchMedia("(max-width: 400px)");
const tablet_media_query = window.matchMedia(
  "(min-width: 400px) and (max-width: 600px)"
);

// Fonction principale qui active le contenu
function notesReady() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5,
  });
}

// Fonction qui configure le papier de l'enveloppe
function setUpPaper() {
  const arr = [0, 0, 100, 0, 50, 61];
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath:
      "polygon(" +
      arr[0] +
      "%" +
      arr[1] +
      "%," +
      arr[2] +
      "%" +
      arr[3] +
      "%," +
      arr[4] +
      "%" +
      arr[5] +
      "%)",
    onComplete: notesReady,
  });
}

// Fonction qui démarre la transition du papier supérieur
function envelopeTransition() {
  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: setUpPaper,
  });
  const upPaperElement = document.querySelector(".js-up-paper");
  if (upPaperElement) {
    upPaperElement.removeEventListener("click", envelopeTransition);
    upPaperElement.classList.remove("cursor");
  }
}

// Fonction qui permet de découper l'autocollant
function cutSticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");
  const stickerElement = document.querySelector(".js-sticker");
  if (stickerElement) {
    stickerElement.removeEventListener("click", cutSticker);
  }
  const upPaperElement = document.querySelector(".js-up-paper");
  if (upPaperElement) {
    upPaperElement.addEventListener("click", envelopeTransition);
    upPaperElement.classList.add("cursor");
  }
}

const stickerElement = document.querySelector(".js-sticker");
if (stickerElement) {
  stickerElement.addEventListener("click", cutSticker);
}

window.onresize = function (event) {
  // No resize handling needed
}; // Obtenez l'élément de la lettre
const letter = document.querySelector(".envelop__content");

// Obtenez l'élément de la modale
const modal = document.getElementById("myModal");

// Obtenez l'élément de l'image à afficher dans la modale
const modalImg = document.getElementById("img01");

// Ajoutez un écouteur d'événements au clic sur la lettre
letter.addEventListener("click", function () {
  // Affichez la modale
  modal.style.display = "block";
  // Définissez l'image source de la modale sur l'image de la lettre
  modalImg.src = this.querySelector("img").src;

  // Ajoutez une classe pour masquer l'enveloppe
  document.querySelector(".envelop").classList.add("hidden");
});

// Obtenez l'élément pour fermer la modale
const span = document.getElementsByClassName("close")[0];

// Ajoutez un écouteur d'événements au clic sur le bouton de fermeture
span.addEventListener("click", function () {
  // Fermez la modale lorsque l'utilisateur clique sur le bouton de fermeture
  modal.style.display = "none";

  // Supprimez la classe pour afficher à nouveau l'enveloppe
  document.querySelector(".envelop").classList.remove("hidden");
});
