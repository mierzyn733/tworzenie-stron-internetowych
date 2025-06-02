function addBox() {
    const container = document.querySelector('.container');
    const newBox = document.createElement('div');
    newBox.className = 'box';
    newBox.textContent = 'Nowy element';
    container.appendChild(newBox);
    console.log('Dodano nowy element');
}