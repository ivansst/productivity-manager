const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".video-container video");
  const muteButton = document.querySelector(".mute-picker button");

  //sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //Time Display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  const breakSelect = document.querySelectorAll(".break-select button");
  const outlineLength = outline.getTotalLength();
  let duration = 1500;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  function isMobile() {
    return (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    );
  }

  sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  muteButton.addEventListener("click", function() {
    if (song.muted) {
      song.muted = false;
    } else {
      song.muted = true;
    }
  });

  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      duration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(duration / 60)}:00`;
    });
  });

  breakSelect.forEach(option => {
    option.addEventListener("click", function() {
      duration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(duration / 60)}:00`;
      song.muted = true;
    });
  });

  const checkPlaying = song => {
    if (song.paused && song.muted == true) {
      song.muted = false;
      song.play();
      if (isMobile != true) {
        video.play();
      }
      play.src = "./svg/pause.svg";
    } else {
      song.muted = true;
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = duration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= duration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

window.onload = function() {
  app();
};
