var c = new AudioContext();
var g = c.createGain();
g.connect(c.destination);

var min_freq = 10;
var max_freq = 40000;
var seconds_per_loop = 5;

var step_speed = 1000 * seconds_per_loop / 12;
var base = Math.pow(2, 1/12)
var current_step = 0;
var step = [];

function shepardscale () {

    cont = 0;

    for(i = 0; cont < 3; i+12) {
      
        if(step[i]) step[i].stop();

        tone = c.createOscillator();
        freq = 440 * Math.pow(base, current_step+i);
        tone.frequency.value = freq; 

        tone.connect(g);
        tone.start();

        step[i] = tone;
        cont++;
    }

    current_step = (current_step + 1) % 12; // 12 steps in ogni loop
    setTimeout(shepardscale, step_speed); 
}

setVolume(0); // Initialize volume to match range input
var playing = false;

function start() {
    if(!playing) {
        playing = true;
        shepardscale();
    }
}

function setVolume(volume) {
    g.gain.value = volume / 100 / 12;
}