var c = new AudioContext();

var one_loop_duration = 5; /* arbitrary duration [millisec] */
var step_speed = 1000 * one_loop_duration / 12; /* needed at the end, see setTimeout [sec] */

var current_step = 0;
var step = []; /* empty array, the for loop wil fill it at each iteration w/ 3 notes belonging to 3 diff octaves (es. A4, A5, A6) */

var gt = []; /* will be filled at each iteraton w/ 3 diff gains for the 3 notes mentioned above */

var base = Math.pow(2, 1/12);

/* NB. the shepard scale will eventually be composed of 12 steps (12 half tones of the piano keyboard), and each */
/* step will  contain 3 tones, corresponding to the same note picked in 3 different consecutive octaves */

function shepard() {

    for(i = 0; i < 3; i++) {
      
        if(step[i]) {
            step[i].stop()
        } /* stop the oscillator if present, the note will be replaced with the one coming next ( + half a tone) */

        tone = c.createOscillator();

        var octave = 0; /* the note will belong to the lowest octave defined (es. A4) */
        
        if (i == 1) {
            octave = 12; /* the note will be chosen from the middle octave (es. A5) */
        }
        if (i == 2) {
            octave = 24; /* (es. A6) */
        }

        freq = 440*Math.pow(base, current_step + octave); /* define the freq for each of the 3 notes, it's a double exp. */ 
                                                        /* The first note defined has freq 440 -> 440* (2^(1/2))^(0+0) = 440*1 */
                                                        /* The second: 440* (2^(1/2))^(0+12) and the third: 440* (2^(1/2))^(0+24) */
                                                        /* Then, when the step is updated, the first will be 440* (2^(1/2))^(1+0) and so on */
        tone.frequency.value = freq;

        gt[i] = c.createGain();
        gt[i].gain.value = 0; /* set each gain at 0 at first */

        if (i == 1) {
            gt[i].gain.value = 1; /* if the tone belongs to the middle octave, assign gain=1 */
        }
        else if (i == 0) {
            gt[i].gain.value = current_step/12; /* for the lowest octave, the gain will ascend ALONG THE 12 STEPS */         
        }
        else if (i == 2) {
            gt[i].gain.value = 1 - current_step/12; /* for the highest octave, the gain will descend along the 12 steps */
        }

        tone.connect(gt[i]); /* connect the note to the assigned gain */

        gt[i].connect(c.destination); 
        tone.start();

        step[i] = tone; /* each step will contain 3 notes and will be updated every time the current_step is updated, going up of half a tone */
    }

    current_step = (current_step + 1) % 12; /* the variable has range [1, 12] (12 half-tones of a piano keyboard: it's therefore employed in the for */  
                                            /* loop to build the shep scale) */
    setTimeout(shepard, step_speed); 
}