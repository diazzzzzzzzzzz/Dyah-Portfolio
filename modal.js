document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("imageModal");
    if (!modal) return; // supaya tidak error di page tanpa modal

    const modalImg = document.getElementById("modalImg");
    const modalCaption = document.getElementById("modalCaption");
    const closeBtn = document.querySelector(".modal-close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    const images = document.querySelectorAll(".clickable-image");

    let currentIndex = 0;

    function showImage(index) {
        currentIndex = index;

        const img = images[currentIndex];
        modalImg.src = img.src;

        const figure = img.closest("figure");
        const figcaption = figure ? figure.querySelector("figcaption") : null;

        modalCaption.textContent = figcaption
            ? figcaption.textContent
            : img.alt;

        modal.style.display = "flex";
        setTimeout(() => modal.classList.add("show"), 10);
    }

    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            showImage(index);
        });
    });

    function closeModal() {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("show")) return;

        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "Escape") closeModal();
    });

});