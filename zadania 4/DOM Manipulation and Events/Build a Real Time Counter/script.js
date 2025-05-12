document.addEventListener("DOMContentLoaded", function() {
    const textInput = document.getElementById("text-input");
    const charCount = document.getElementById("char-count");
    const maxLength = 50;

    textInput.addEventListener("input", function() {
        const currentLength = textInput.value.length;

        
        charCount.textContent = `Character Count: ${currentLength}/50`;

       
        if (currentLength === maxLength) {
            charCount.classList.add("red");
        } else {
            charCount.classList.remove("red");
        }


        if (currentLength > maxLength) {
            textInput.value = textInput.value.substring(0, maxLength);
        }
    });
});
