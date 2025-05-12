// Mapping keys to drum pad IDs
const keyToPad = {
    'Q': 'Q',
    'W': 'W',
    'E': 'E',
    'A': 'A',
    'S': 'S',
    'D': 'D',
    'Z': 'Z',
    'X': 'X',
    'C': 'C'
};

// Audio clips associated with each pad
const audioClips = {
    'Q': 'Heater 1',
    'W': 'Heater 2',
    'E': 'Heater 3',
    'A': 'Heater 4',
    'S': 'Clap',
    'D': 'Open-HH',
    'Z': "Kick-n'-Hat",
    'X': 'Kick',
    'C': 'Closed-HH'
};

// Function to play audio and display text
function playAudioAndDisplayText(padId) {
    const audioElement = document.getElementById(`${padId}-audio`);
    audioElement.play();
    document.getElementById('display').innerText = audioClips[padId];
}

// Add event listeners for drum pads
const pads = document.querySelectorAll('.drum-pad');
pads.forEach(pad => {
    pad.addEventListener('click', () => {
        const padId = pad.id;
        playAudioAndDisplayText(padId);
    });
});

// Add event listeners for keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    if (keyToPad[key]) {
        playAudioAndDisplayText(keyToPad[key]);
    }
});
