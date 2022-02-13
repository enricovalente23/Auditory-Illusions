var playBTN = document.getElementById("playBTN")
var stopBTN = document.getElementById("stopBTN")
var volumeBTN = document.getElementById("volumeBTN")

var WAVESURFER = WaveSurfer.create({
    container: '#waveform2',
    waveColor: '#ffdefe',
    progressColor: '#ff1496',
    barWidth: 4,
    height: 120,
    responsive: true,
    hideScrollbar: true,
    barRadius: 4,
});

WAVESURFER.load('../../Audio Files/ALO - Speed Of Dreams LOWVOLUME.mp3');



playBTN.onclick = function() {
    WAVESURFER.playPause()
    if(playBTN.src.includes("play.png")){
        playBTN.src = "../../Images/media/pause.png";
    }
    else {
        playBTN.src = "../../Images/media/play.png";
    }
}

stopBTN.onclick = function() {
    WAVESURFER.stop();
    playBTN.src = "../../Images/media/play.png";
}

volumeBTN.onclick = function() {
    WAVESURFER.toggleMute()
    if(volumeBTN.src.includes("volume.png")) {
        volumeBTN.src = "../../Images/media/mute.png"
    }
    else {
        volumeBTN.src = "../../Images/media/volume.png"
    }
}

WAVESURFER.on('finish', function () {
    playBTN.src = "../../Images/media/play.png"
    WAVESURFER.stop();
});