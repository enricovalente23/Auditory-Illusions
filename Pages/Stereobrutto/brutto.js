var playBtn = document.getElementById("playBtn")
var stopBtn = document.getElementById("stopBtn")
var volumeBtn = document.getElementById("volumeBtn")

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#ffdefe',
    progressColor: '#ff1496',
    barWidth: 4,
    height: 120,
    responsive: true,
    hideScrollbar: true,
    barRadius: 4,
});

wavesurfer.load('../../Audio Files/ALO - Speed Of Dreams LOWVOLUME.mp3');



playBtn.onclick = function() {
    wavesurfer.playPause()
    if(playBtn.src.includes("play.png")){
        playBtn.src = "../../Images/media/pause.png";
    }
    else {
        playBtn.src = "../../Images/media/play.png";
    }
}

stopBtn.onclick = function() {
    wavesurfer.stop();
    playBtn.src = "../../Images/media/play.png";
}

volumeBtn.onclick = function() {
    wavesurfer.toggleMute()
    if(volumeBtn.src.includes("volume.png")) {
        volumeBtn.src = "../../Images/media/mute.png"
    }
    else {
        volumeBtn.src = "../../Images/media/volume.png"
    }
}

wavesurfer.on('finish', function () {
    playBtn.src = "../../Images/media/play.png"
    wavesurfer.stop();
});