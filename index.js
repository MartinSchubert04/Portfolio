function downloadCV() {
  const link = document.createElement("a");

  link.href = "./assets/CV.docx";

  link.download = "CV.docx";

  link.click();
}
