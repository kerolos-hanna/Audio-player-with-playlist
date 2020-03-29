var play = document.querySelector('#play');
var pause = document.querySelector('#pause');
var stop = document.querySelector('#stop');
var backward = document.querySelector('#backward');
var forward = document.querySelector('#forward');
var song_range = document.querySelector('#song-range');
var vol_range = document.querySelector('#vol');
var vol_up = document.querySelector('#vol-up');
var vol_down = document.querySelector('#vol-down');
var vol_mute = document.querySelector('#vol-mute');
var start = document.querySelector('#start');
var end = document.querySelector('#end');
var songs = document.querySelectorAll('a');
var audio = document.querySelector('audio');
var audioSrc = document.querySelectorAll('audio source');
var len = audioSrc.length;
var volPres = document.querySelector('#volPres');
// console.log("len = ",len)
localStorage.index = 0;
var current = localStorage.index;
vol_range.value = 100;
song_range.value = 0;
volPres.textContent = vol_range.value + "%";

window.onload = function () {

  /*handle volume up&down click */
  // console.log(this.vol_down);
  // console.log(this.vol_range.value)
  var vol_arr = [this.vol_up, this.vol_down];
  vol_arr.forEach(item => {
    item.addEventListener('click', function () {
      vol_up.style.display = "none";
      vol_down.style.display = "none";
      vol_mute.style.display = "inline-block";
      audio.volume = 0;
      vol_range.value = audio.volume;
      volPres.textContent = "0%"
    })
  });

  /*handle volume up&down click */
  vol_mute.addEventListener('click', function () {
    vol_up.style.display = "inline-block";
    vol_down.style.display = "none";
    vol_mute.style.display = "none";
    vol_range.value = 100;
    volPres.textContent = "100%"
    audio.volume = parseFloat(vol_range.value / 100);
  })

  /*handle song ended */
  audio.addEventListener('ended', function (e) {
    current = localStorage.index;
    songs[current].style.color = "black";
    if(current == 5){
      pause_fun();
    }
    else{
      current++;
      localStorage.index = current;
      songs[current].style.color = "salmon";
      run(audioSrc[current]);
    }
  })

  /*handle song range change */
  song_range.addEventListener('change', function () {
    audio.currentTime = song_range.value;
  })

  /*handle volume range change */
  vol_range.addEventListener('change', function (e) {
    var volume = e.target.value;
    audio.volume = parseFloat(volume / 100);
    volPres.textContent = e.target.value + "%";
    if (e.target.value >= 50) {
      vol_up.style.display = "inline-block";
      vol_down.style.display = "none";
      vol_mute.style.display = "none";
    } else if (e.target.value == 0) {
      vol_up.style.display = "none";
      vol_down.style.display = "none";
      vol_mute.style.display = "inline-block";
    } else {
      vol_up.style.display = "none";
      vol_down.style.display = "inline-block";
      vol_mute.style.display = "none";
    }
  })

  /*handle forward button*/
  forward.addEventListener('click', function () {
    current = localStorage.index;
    songs[current].style.color = "black";
    current++;
    if (current > len - 1) {
      current = 0;
    }
    localStorage.index = current;
    console.log(localStorage.index);
    console.log(audioSrc[current]);
    songs[current].style.color = "salmon";
    run(audioSrc[current]);
  })

  /*handle backward button*/
  backward.addEventListener('click', function () {
    current = localStorage.index;
    songs[current].style.color = "black";
    current--;
    if (current < 0) {
      current = len - 1;
    }
    localStorage.index = current;
    console.log(localStorage.index);
    console.log(audioSrc[current]);
    songs[current].style.color = "salmon";
    run(audioSrc[current]);
  })

  /*handle play button*/
  play.addEventListener('click', function () {
    play.style.display = "none";
    pause.style.display = "inline-block";
    songs[localStorage.index].style.color = "salmon";
    console.dir(audio)
    end.textContent = parseInt(audio.duration / 60) + ":" + Math.round(audio.duration % 60);
    song_range.max = Math.round(audio.duration);
    songRange();
    audio.play();
  });

  /*handle pause button*/
  pause.addEventListener('click', pause_fun)

  /*handle stop button*/
  stop.addEventListener('click', function () {
    play.style.display = "inline";
    pause.style.display = "none";
    songs[localStorage.index].style.color = "black";
    audio.pause();
    audio.currentTime = 0;
  })


  songs.forEach((element, index) => {
    element.addEventListener('click', function (e) {
      console.log(e.target.dataset.playTrack); //get the id number of track
      console.log(audioSrc[e.target.dataset.playTrack - 1].dataset.trackNumber);
      console.log(audioSrc[e.target.dataset.playTrack - 1]);
      /*save the pres index*/
      songs[localStorage.index].style.color = "black";
      localStorage.index = e.target.dataset.playTrack - 1;
      // console.log("local = ", localStorage.index);
      songs[e.target.dataset.playTrack - 1].style.color = "salmon";
      run(audioSrc[e.target.dataset.playTrack - 1]);
    })
  });
}

function run(music) {
  audio.src = music.src;
  // console.log(music.src)
  // console.dir(audio)
  console.log(localStorage.index);
  play.style.display = "none";
  pause.style.display = "inline-block";
  songRange();
  audio.load();
  audio.play();
}

function songRange() {
  audio.onloadedmetadata = function () {
    end.textContent = parseInt(audio.duration / 60) + ":" + Math.round(audio.duration % 60);
    song_range.max = Math.round(audio.duration);
  }
  setInterval(function () {
    var currentTime = audio.currentTime;
    var min = parseInt(currentTime / 60);
    var second = parseInt(currentTime % 60);
    start.textContent = min + ":" + second;
    song_range.value = Math.round(currentTime);
  }, 1000)
}

function pause_fun() {
  play.style.display = "inline-block";
  pause.style.display = "none";
  audio.pause();
}