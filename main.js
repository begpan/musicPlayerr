const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

// şarkı sırası index

let index;

//dongu

let loop; true

// karıstırıcı acık mı?

let isShuffleActive=false

//sarkı listesi

const songsList = [
  {
    name: "Do I Wanna Know?",
    link: "assets/Arctic Monkeys - Do I Wanna Know Official Video.mp3",
    artist: "Arctic Monkeys",
    image: "assets/img1.jpeg",
  },
  {
    name: "Paradise",
    link: "assets/Coldplay - Paradise Official Video.mp3",
    artist: "Coldplay",
    image: "assets/img2.jpeg",
  },
  {
    name: "Photography",
    link: "assets/Ed Sheeran - Photograph Official Music Video.mp3",
    artist: "Ed Sheeran",
    image: "assets/img3.jpeg",
  },
  {
    name: "Mary On A Cross",
    link: "assets/Ghost - Mary On A Cross Official Audio.mp3",
    artist: "Ghost",
    image: "assets/img4.jpg",
  },
  {
    name: "Frozen",
    link: "assets/Madonna - Frozen Official Video HD.mp3",
    artist: "Madonna",
    image: "assets/img5.jpg",
  },
  {
    name: "Tell me Why?",
    link: "assets/Supermode - Tell Me Why OFFICIAL VIDEO.mp3",
    artist: "Supermode",
    image: "assets/img6.jpeg",
  },
];

// zaman formatı ayarlama

const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);

  minute = minute < 10 ? "0" + minute : minute;

  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

// sarkıyı calma

//sarkı atama

const setSong = (arrayIndex) => {

    if (loop==false &&isShuffleActive==true){
        arrayIndex=Math.floor(Math.random()*100)%5

    }



  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };

  playListContainer.classList.add("hide");
  audio.play();
  playAudio();

  // playAudio()
};

const playAudio = () => {
  
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

// setSong() ile cal

// sıradakini cal

const nextSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    setSong(index);
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    setSong(randIndex);
  }
};

playListButton.addEventListener('click',() =>{
    playListContainer.classList.remove('hide')
    
})


closeButton.addEventListener('click', () =>{
    playListContainer.classList.add('hide')
})






const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};


setInterval(() => {
    currentTimeRef.innerHTML=timeFormatter(audio.currentTime)
    currentProgress.style.width=(audio.currentTime/audio.duration.toFixed(3))*100 + "%"
}, 1000);


progressBar.addEventListener("click", (event) =>{
    let coordStart =progressBar.getBoundingClientRect().left

    let coordEnd= event.clientX
    let progress =(coordEnd-coordStart)/ progressBar.offsetWidth

    currentProgress.style.width=progressBar * 100+"%"
    audio.currentTime = progress * audio.duration
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
}
)




const previousSong = () => {
  pauseAudio();
  if (index > 0) {
    index -= 1;
  } else {
    index = songsList.length - 1;
  }
  setSong(index);

  playAudio();
};

repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
    console.log("kapatıldı");
  } else {
    repeatButton.classList.add("active");
    console.log("acıldı");
  }
});

shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    isShuffleActive=false
    shuffleButton.classList.remove("active");
    audio.loop = true;
    index=Math.floor(Math.random()*100)%5
    console.log("kapatıldı");
  } else {
    isShuffleActive=true
    shuffleButton.classList.add("active");
    audio.loop= false
    console.log("acıldı");
  }
});

const initializerPlaylist = () => {
  for (let i in songsList) {
    playListSongs.innerHTML += `<li class="playListSongs"
            onclick="setSong(${i})">
        <div class="playlist-image-container">
            <img src="${songsList[i].image}"
            </div>

        <div class="playlist-song-details">
        <span id="playlist-song-name">
        ${songsList[i].name}
        </span>
        <span id="playlist-song-artist-album">
        ${songsList[i].artist}
        </span>
        </div>
        </li>`
  }
  
};



// tiklama yakalama

nextButton.addEventListener("click", nextSong);
pauseButton.addEventListener("click", pauseAudio);
playButton.addEventListener("click", playAudio);
prevButton.addEventListener("click", previousSong);

//sarkı bitişini yakala
audio.onended = () => {
  nextSong();
};

audio.addEventListener('timeupdate',() =>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
    
})



// ekran yuklenildiğinde

window.onload = () => {
  index = 0;
  setSong(index);
};


// durdur ve sarkı listesi oluştur

pauseAudio()
initializerPlaylist()
