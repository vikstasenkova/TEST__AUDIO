const play = document.querySelector(".play");
const songs = ["Beyonce", "Dead_Mans_Bones", "Florence", "Dua"];
const names = ["Dont Hurt Yousrlf", "Lose your soul", "Delilah", "Don't Start Now"];

const auther = document.querySelector(".auther");
const audio = document.querySelector("audio");
const picture = document.querySelector(".picture");
const backgroundBlur = document.querySelector(".background-blur");
const nameOfSong = document.querySelector(".nameOfSong");
const next = document.querySelector(".switch.next");
const pre = document.querySelector(".switch.pre");
const progressContainer = document.querySelector('.progress_container');
const mainAudio = document.querySelector("#main-audio");
const progress = document.querySelector(".progress")
let songIndex = 0;

function loadSong(song) {
    auther.innerHTML = song;
    audio.src = `./assets/audio/${song}.mp3`;
    picture.style.backgroundImage = `url(./assets/img/${song}.png)`;
    backgroundBlur.style.backgroundImage = `url(./assets/img/${song}.png)`;
    nameOfSong.innerHTML = names[songIndex];
}
loadSong(songs[songIndex]);

let isPlay = false;

function playAudio() {
        if (isPlay == false){
            audio.play();
            play.classList.add('pause');
            isPlay = true;
        }
        else {
            audio.pause();
            play.classList.remove('pause');
            
            isPlay = false;
            console.log("hi");
        } 
}

play.addEventListener("click", playAudio);


function nextSong() {
    songIndex++;
        if (songIndex > songs.length - 1){
            songIndex = 0;
        }
    loadSong(songs[songIndex]);
    isPlay = false;
    play.classList.toggle('pause');
    playAudio();    
}
next.addEventListener("click", nextSong);

function preSong() {
    songIndex--;
        if (songIndex < 0){
            songIndex = 3;  
        }
    loadSong(songs[songIndex]);
    isPlay = false;
    play.classList.toggle('pause');
    playAudio();
        
}
pre.addEventListener("click", preSong)


mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progress.style.width = `${progressWidth}%`;

    let musicCurrentTime = document.querySelector(".current");
    let musicDuration = document.querySelector(".duration");
    mainAudio.addEventListener("loadeddata", () =>{
                
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
            if(totalSec < 10){
                totalSec = `0${totalSec}`;
            }
        musicDuration.innerText = `${totalMin}:${totalSec}`;    
    });
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
            if(currentSec < 10){
                currentSec = `0${currentSec}`;
            }
        musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
})