var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var start = "Click to Start...";
var audio_playing = false;

canvas.addEventListener("click", function () {
  var audio = document.getElementById("myAudio");

  if(audio_playing){

    audio.pause();
    audio_playing = false;
  }
  else{

    audio.play();
    audio_playing = true;
  }
});

ctx.font = "50px Arial";
ctx.fillStyle = "white";
ctx.textAlign = "center";

var x = canvas.width / 2;
var y = canvas.height / 2;

ctx.fillText(start, x, y);


