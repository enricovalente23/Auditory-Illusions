var c = new AudioContext();

var one_loop_duration = 5; // millisec
var step_speed = 1000 * one_loop_duration / 12; // sec

var current_step = 0;
var step = [];

var gt = [];

var base = Math.pow(2, 1/12);

function shepardscale() {

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

        if (octave == 12) {
            gt[i].gain.value = 1;
        }
        else if (octave == 0) {
            gt[i].gain.value = current_step/12;
        }
        else if (octave == 24) {
            gt[i].gain.value = 1 - current_step/12;
        }

        tone.connect(gt[i]);

        gt[i].connect(c.destination); 
        tone.start();

        step[i] = tone;
    }

    current_step = (current_step + 1) % 12; // 12 steps in ogni loop
    setTimeout(shepardscale, step_speed); 
}
