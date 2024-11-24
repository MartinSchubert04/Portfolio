function downloadCV() {
  const link = document.createElement("a");

  link.href = "./assets/CV.docx";

  link.download = "CV.docx";

  link.click();
}

let lastScrollTop = 0;
const sectionInputs = document.querySelector(".sectionInputs");

// Detecta el evento de desplazamiento
window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // Si se hace scroll hacia abajo, oculta la barra
  if (currentScroll > lastScrollTop) {
    sectionInputs.classList.add("hidden");
  } else {
    sectionInputs.classList.remove("hidden");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Previene un valor negativo
});

// Detecta cuando el mouse entra en la zona de la barra
sectionInputs.addEventListener("mouseenter", function () {
  sectionInputs.classList.remove("hidden");
});

// Detecta cuando el mouse sale de la zona de la barra
sectionInputs.addEventListener("mouseleave", function () {
  sectionInputs.classList.add("hidden");
});

document.querySelectorAll(".radio").forEach((radio) => {
  radio.addEventListener("change", function () {
    const targetId = button.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});
