// Inicjalizacja mapy Poznania
const map = L.map('map').setView([52.4064, 16.9252], 13);

// Dodanie warstwy OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Funkcja tworząca niestandardowe markery
function createCustomMarker(iconNumber, color = '#ff5252') {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}">${iconNumber}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });
}

// Tablica do przechowywania markerów
let markers = [];
let markerCounter = 3; // Startujemy od 4, bo 3 już mamy

// Dodanie 3 markerów w Poznaniu
const marker1 = L.marker([52.4064, 16.9252], {  // Stary Rynek
    icon: createCustomMarker(1, '#e74c3c')
}).addTo(map).bindPopup(`
    <div class="popup-content">
        <h3>Stary Rynek</h3>
        <p>Serce Poznania z pięknymi kolorowymi kamieniczkami</p>
        <button class="popup-button" onclick="alert('Witaj na Starym Rynku w Poznaniu!')">Poznańska atrakcja</button>
    </div>
`, { autoClose: false, closeOnClick: false }).openPopup();
markers.push(marker1);

const marker2 = L.marker([52.4089, 16.9359], {  // Ostrów Tumski
    icon: createCustomMarker(2, '#3498db')
}).addTo(map).bindPopup(`
    <div class="popup-content">
        <h3>Ostrów Tumski</h3>
        <p>Najstarsza część Poznania z katedrą</p>
        <button class="popup-button" onclick="alert('Zwiedzaj Ostrów Tumski!')">Historia Poznania</button>
    </div>
`, { autoClose: false, closeOnClick: false }).openPopup();
markers.push(marker2);

const marker3 = L.marker([52.4026, 16.9544], {  // Jezioro Maltańskie
    icon: createCustomMarker(3, '#27ae60')
}).addTo(map).bindPopup(`
    <div class="popup-content">
        <h3>Jezioro Maltańskie</h3>
        <p>Popularne miejsce rekreacji i sportu</p>
        <button class="popup-button" onclick="alert('Zapraszamy nad Maltę!')">Aktywny wypoczynek</button>
    </div>
`, { autoClose: false, closeOnClick: false }).openPopup();
markers.push(marker3);

// Dodanie obszaru (polygon) - Stare Miasto
const polygon = L.polygon([
    [52.408, 16.930],  // NW
    [52.408, 16.935],  // NE
    [52.404, 16.935],  // SE
    [52.404, 16.930]   // SW
], {
    className: 'polygon-area'
}).addTo(map).bindPopup('<b>Historyczne centrum Poznania</b><br>Obszar Starego Miasta');

// Funkcja kopiowania współrzędnych do schowka
map.on('click', function(e) {
    const coords = `Lat: ${e.latlng.lat.toFixed(5)}, Lng: ${e.latlng.lng.toFixed(5)}`;
    
    // Aktualizacja formularza współrzędnymi
    document.getElementById('latitude').value = e.latlng.lat.toFixed(5);
    document.getElementById('longitude').value = e.latlng.lng.toFixed(5);
    
    // Tworzymy tymczasowy element do kopiowania
    const textArea = document.createElement('textarea');
    textArea.value = coords;
    document.body.appendChild(textArea);
    textArea.select();
    
    // Kopiujemy do schowka
    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'Skopiowano' : 'Błąd kopiowania';
        document.querySelector('.coordinates-info').textContent = `${msg}: ${coords}`;
        
        // Dodajemy animację potwierdzenia
        const info = document.querySelector('.coordinates-info');
        info.style.backgroundColor = successful ? '#2ecc71' : '#e74c3c';
        info.style.color = 'white';
        
        setTimeout(() => {
            info.style.backgroundColor = 'white';
            info.style.color = 'black';
        }, 2000);
    } catch (err) {
        document.querySelector('.coordinates-info').textContent = 'Błąd: ' + err;
    }
    
    // Usuwamy tymczasowy element
    document.body.removeChild(textArea);
    
    // Dodajemy animowany marker w miejscu kliknięcia
    const tempMarker = L.marker(e.latlng, {
        icon: createCustomMarker('✓', '#9b59b6'),
        className: 'temp-marker'
    }).addTo(map);
    
    // Usuwamy marker po 3 sekundach
    setTimeout(() => {
        map.removeLayer(tempMarker);
    }, 3000);
});

// Dodanie kontrolki skali
L.control.scale({imperial: false}).addTo(map);

// Obsługa formularza
document.getElementById('markerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Pobranie wartości z formularza
    const latInput = document.getElementById('latitude');
    const lngInput = document.getElementById('longitude');
    const titleInput = document.getElementById('title');
    const descInput = document.getElementById('description');
    const buttonTextInput = document.getElementById('buttonText');
    const buttonAlertInput = document.getElementById('buttonAlert');
    const colorInput = document.getElementById('markerColor');
    
    const lat = parseFloat(latInput.value);
    const lng = parseFloat(lngInput.value);
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const buttonText = buttonTextInput.value.trim();
    const buttonAlert = buttonAlertInput.value.trim();
    const color = colorInput.value;
    
    // Walidacja danych
    let isValid = true;
    
    // Walidacja szerokości geograficznej
    if (isNaN(lat)) {
        document.getElementById('latitudeError').textContent = 'Wartość musi być liczbą';
        document.getElementById('latitudeError').style.display = 'block';
        isValid = false;
    } else if (lat < -90 || lat > 90) {
        document.getElementById('latitudeError').textContent = 'Nieprawidłowa wartość (zakres: -90 do 90)';
        document.getElementById('latitudeError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('latitudeError').style.display = 'none';
    }
    
    // Walidacja długości geograficznej
    if (isNaN(lng)) {
        document.getElementById('longitudeError').textContent = 'Wartość musi być liczbą';
        document.getElementById('longitudeError').style.display = 'block';
        isValid = false;
    } else if (lng < -180 || lng > 180) {
        document.getElementById('longitudeError').textContent = 'Nieprawidłowa wartość (zakres: -180 do 180)';
        document.getElementById('longitudeError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('longitudeError').style.display = 'none';
    }
    
    // Walidacja tytułu
    if (!title) {
        document.getElementById('titleError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('titleError').style.display = 'none';
    }
    
    // Jeśli dane są nieprawidłowe, przerwij
    if (!isValid) return;
    
    // Tworzenie nowego markera
    markerCounter++;
    const newMarker = L.marker([lat, lng], {
        icon: createCustomMarker(markerCounter, color)
    }).addTo(map);
    
    // Tworzenie zawartości popup
    let popupContent = `<div class="popup-content"><h3>${title}</h3>`;
    
    if (description) {
        popupContent += `<p>${description}</p>`;
    }
    
    if (buttonText) {
        const alertText = buttonAlert || `Witamy w ${title}!`;
        popupContent += `<button class="popup-button" onclick="alert('${alertText.replace(/'/g, "\\'")}')">${buttonText}</button>`;
    }
    
    popupContent += '</div>';
    
    newMarker.bindPopup(popupContent, { 
        autoClose: false, 
        closeOnClick: false 
    }).openPopup();
    
    // Dodanie markera do tablicy
    markers.push(newMarker);
    
    // Dodanie markera do listy
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span class="marker-number">${markerCounter}</span>
        <strong>${title}</strong> - ${lat.toFixed(5)}, ${lng.toFixed(5)}
    `;
    
    listItem.addEventListener('click', function() {
        map.setView([lat, lng], 15);
        newMarker.openPopup();
    });
    
    document.getElementById('markersList').appendChild(listItem);
    
    // Resetowanie formularza
    this.reset();
    document.getElementById('markerColor').value = '#ff5252';
    document.getElementById('colorPreview').style.backgroundColor = '#ff5252';
});

// Obsługa przycisku czyszczenia formularza
document.getElementById('clearForm').addEventListener('click', function() {
    document.getElementById('markerForm').reset();
    document.getElementById('markerColor').value = '#ff5252';
    document.getElementById('colorPreview').style.backgroundColor = '#ff5252';
    document.querySelectorAll('.error').forEach(el => {
        el.style.display = 'none';
    });
});

// Aktualizacja podglądu koloru
document.getElementById('markerColor').addEventListener('input', function() {
    document.getElementById('colorPreview').style.backgroundColor = this.value;
});

// Dodanie przykładowych markerów do listy
const initialMarkers = [
    {title: 'Stary Rynek', lat: 52.4064, lng: 16.9252, num: 1},
    {title: 'Ostrów Tumski', lat: 52.4089, lng: 16.9359, num: 2},
    {title: 'Jezioro Maltańskie', lat: 52.4026, lng: 16.9544, num: 3}
];

initialMarkers.forEach(marker => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span class="marker-number">${marker.num}</span>
        <strong>${marker.title}</strong> - ${marker.lat.toFixed(5)}, ${marker.lng.toFixed(5)}
    `;
    
    listItem.addEventListener('click', function() {
        map.setView([marker.lat, marker.lng], 15);
        markers[marker.num-1].openPopup();
    });
    
    document.getElementById('markersList').appendChild(listItem);
});