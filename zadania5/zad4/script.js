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

const marker2 = L.marker([52.4089, 16.9359], {  // Ostrów Tumski
    icon: createCustomMarker(2, '#3498db')
}).addTo(map).bindPopup(`
    <div class="popup-content">
        <h3>Ostrów Tumski</h3>
        <p>Najstarsza część Poznania z katedrą</p>
        <button class="popup-button" onclick="alert('Zwiedzaj Ostrów Tumski!')">Historia Poznania</button>
    </div>
`, { autoClose: false, closeOnClick: false }).openPopup();

const marker3 = L.marker([52.4026, 16.9544], {  // Jezioro Maltańskie
    icon: createCustomMarker(3, '#27ae60')
}).addTo(map).bindPopup(`
    <div class="popup-content">
        <h3>Jezioro Maltańskie</h3>
        <p>Popularne miejsce rekreacji i sportu</p>
        <button class="popup-button" onclick="alert('Zapraszamy nad Maltę!')">Aktywny wypoczynek</button>
    </div>
`, { autoClose: false, closeOnClick: false }).openPopup();

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