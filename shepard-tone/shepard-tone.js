var c = new AudioContext();

var g = c.createGain();
g.connect(c.destination);

var one_loop_duration = 5; // seconds
var step_speed = 1000 * one_loop_duration / 12; 

var current_step = 0;
var step = [];

var gt = [];

var base = Math.pow(2, 1/12);

function shepardscale () {

    for(i = 0; i < 3; i++) {
      
        if(step[i]) {
            step[i].stop()
        }

        tone = c.createOscillator();

        var octave = 0;
        
        if (i == 1) {
            octave = 12;
        }
        if (i == 2) {
            octave = 24;
        }

        freq = 440*Math.pow(base, current_step + octave);
        tone.frequency.value = freq; 

        gt[i] = c.createGain();
        gt[i].gain.value = 1;

        if (octave == 0) {
            gt[i].gain.linearRampToValueAtTime(1, one_loop_duration);
        }
        if (octave == 24) {
            gt[i].gain.linearRampToValueAtTime(0, one_loop_duration);
        }

        tone.connect(gt[i]);

        gt[i].connect(c.destination); 
        tone.start();

        step[i] = tone;
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