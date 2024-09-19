// Get elements from the DOM
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const progressBar = document.getElementById('progress-bar');
const progressValue = document.getElementById('progress-value');
const durationValue = document.getElementById('duration-value');
const playlistToggle = document.getElementById('playlist-toggle');
const playlistPanel = document.getElementById('playlist-panel');
const closePanel = document.getElementById('close-panel');
const songName = document.getElementById('songName');
const playlist = document.getElementById('playlist');
const players = document.getElementById('Player');

let audio = new Audio();
let isPlaying = false;
let playlistData = [];
let currentSongIndex = -1;

// Function to format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Function to load and display the playlist
function loadPlaylist() {
    fetch('playlist.json')
        .then(response => response.json())
        .then(data => {
            playlistData = data;
            playlist.innerHTML = ''; // Clear existing playlist items

            data.forEach((song, index) => {
                const li = document.createElement('li');
                li.textContent = `${song.title} by ${song.artist}`;
                li.dataset.index = index; // Store the index for later use
                li.className = 'bg-white border border-gray-200 p-2 rounded-lg mb-2 cursor-pointer hover:bg-gray-100';
                li.addEventListener('click', () => {
                    loadSong(index);
                    playlistPanel.classList.add('hidden');
                    players.classList.remove('hidden');
                });
                playlist.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading playlist:', error));
}

// Function to load and play a selected song
function loadSong(index) {
    if (index >= 0 && index < playlistData.length) {
        const song = playlistData[index];
        audio.src = song.url;

        // Set up event listener for loadedmetadata
        audio.addEventListener('loadedmetadata', () => {
            progressBar.max = audio.duration;
            durationValue.textContent = formatTime(audio.duration);
        }, { once: true });

        audio.play();
        isPlaying = true;
        playButton.classList.add('hidden');
        pauseButton.classList.remove('hidden');
        songName.textContent = ` ${song.title} by ${song.artist}`;
        currentSongIndex = index;
    }
}

playButton.addEventListener('click', () => {
    if (!isPlaying && currentSongIndex >= 0) {
        audio.play();
        isPlaying = true;
        playButton.classList.add('hidden');
        pauseButton.classList.remove('hidden');
    }
});

pauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playButton.classList.remove('hidden');
        pauseButton.classList.add('hidden');
    }
});



prevButton.addEventListener('click', () => {
    if (playlistData.length > 0) {
        if (currentSongIndex > 0) {
            loadSong(currentSongIndex - 1);
        } else {
            // Loop back to the last song if at the beginning
            loadSong(playlistData.length - 1);
        }
    }
});

nextButton.addEventListener('click', () => {
    if (playlistData.length > 0) {
        if (currentSongIndex < playlistData.length - 1) {
            loadSong(currentSongIndex + 1);
        } else {
            // Optionally, loop to the first song
            loadSong(0);
        }
    }
});

progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
});



playlistToggle.addEventListener('click', () => {
    playlistPanel.classList.toggle('hidden');
    players.classList.toggle('hidden');
});

closePanel.addEventListener('click', () => {
    playlistPanel.classList.add('hidden');
    players.classList.remove('hidden');
});

// Load the playlist when the page loads
window.addEventListener('load', loadPlaylist);

// Update progress bar and time display
audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime;
    progressValue.textContent = formatTime(audio.currentTime);
});

// Hide controls and playlist when no song is playing
audio.addEventListener('pause', () => {
    if (audio.currentTime === 0) {
        playButton.classList.remove('hidden');
        pauseButton.classList.add('hidden');
        songName.textContent = 'No audio playing';
    }
});
