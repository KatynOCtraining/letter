// Variables
const mobile_media_query = window.matchMedia("(max-width: 400px)");
const tablet_media_query = window.matchMedia(
  "(min-width: 400px) and (max-width: 600px)"
);
const notes = document.querySelectorAll(".js-note");

// Fonction qui réinitialise la taille des notes
function resizeNotes() {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].classList.contains("active")) {
      notes[i].classList.remove("active");
      gsap.set(notes[i], {
        height: "30%",
        clearProps: "all",
      });
    }
  }
}

// Fonction principale qui active toutes les notes
function notesReady() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5,
  });

  for (let i = 0; i < notes.length; i++) {
    notes[i].addEventListener("click", function () {
      if (mobile_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all",
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all",
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 125 + 40 * i + "%",
          });
        }
      } else if (tablet_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all",
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all",
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 80 + 21 * i + "%",
          });
        }
      } else {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all",
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all",
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 70 + 20 * i + "%",
          });
        }
      }
    });
  }
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
  resizeNotes();
};
