// Welcome to Spotify

//initializing variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Obsessed - Riar Saab, Abhijay Sharma", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Bad Guy (DG) - DG IMMORTALS", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Hustlin' - Gminxr, AP Dhillon", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Punja Daab - DG IMMORTALS, Parmish Verma", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Lil Bunty - KR$NA", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Night Changes - One Direction", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Noor E Khuda - Shankar Ehsaan Loy", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "As It Was - Harry Styles", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Prime Time - Qaab, Abix", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Let Somebody Go - Coldplay, Selena Gomez", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"}
]

// Updating song name n logo in the list

songItems.forEach((element, i)=>{
    console.log(element)
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName;
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
});

// Handling Play/Pause buttons

masterPlay.addEventListener('click', function(){
    if(audioElement.paused || audioElement.currentTime == 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', function(){
    // Updating Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', function(){
    audioElement.currentTime = myProgressBar.value * audioElement.duration
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})