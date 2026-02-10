const songs = [
    {
        title: "Death Bed",
        artist: "Powfu",
        src: "Death Bed.mp3"
    },
    {
        title: "Faded",
        artist: "Alan Walker",
        src: "Faded.mp3"
    },
    {
        title: "Song Three",
        artist: "Artist C",
        src: "Without Me.mp3"
    }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

function loadSong(index){
    const song = songs[index];
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;

    document.querySelectorAll("li").forEach(li=>li.classList.remove("active"));
    if(playlistEl.children[index]){
        playlistEl.children[index].classList.add("active");
    }
}

function playPause(){
    if(audio.paused){
        audio.play();
        playBtn.innerText = "⏸";
    } else {
        audio.pause();
        playBtn.innerText = "▶️";
    }
}

function nextSong(){
    currentSong++;
    if(currentSong >= songs.length) currentSong = 0;
    loadSong(currentSong);
    audio.play();
    playBtn.innerText = "⏸";
}

function prevSong(){
    currentSong--;
    if(currentSong < 0) currentSong = songs.length - 1;
    loadSong(currentSong);
    audio.play();
    playBtn.innerText = "⏸";
}

playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", ()=>{
    const {currentTime, duration} = audio;

    const percent = (currentTime / duration) * 100;
    progress.style.width = percent + "%";

    currentTimeEl.innerText = formatTime(currentTime);
    durationEl.innerText = formatTime(duration);
});

function formatTime(time){
    if(isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2,"0");
    return `${min}:${sec}`;
}

progressContainer.addEventListener("click", (e)=>{
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

volume.addEventListener("input", ()=>{
    audio.volume = volume.value;
});

audio.addEventListener("ended", ()=>{
    nextSong(); // autoplay
});

songs.forEach((song, index)=>{
    const li = document.createElement("li");
    li.innerText = song.title + " - " + song.artist;

    li.addEventListener("click", ()=>{
        currentSong = index;
        loadSong(index);
        audio.play();
        playBtn.innerText = "⏸";
    });

    playlistEl.appendChild(li);
});

loadSong(currentSong);