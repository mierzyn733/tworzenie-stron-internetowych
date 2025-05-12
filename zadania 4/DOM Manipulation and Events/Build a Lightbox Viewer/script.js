document.addEventListener("DOMContentLoaded", function() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeBtn = document.getElementById("close-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    
    galleryItems.forEach(item => {
        item.addEventListener("click", function() {
            const fullImageSrc = this.src.replace("-thumbnail", "");
            lightboxImage.src = fullImageSrc;
            lightbox.style.display = "flex";
        });
    });

   
    closeBtn.addEventListener("click", function(event) {
        event.stopPropagation();
        lightbox.style.display = "none";
    });

   
    lightbox.addEventListener("click", function() {
        lightbox.style.display = "none";
    });
});