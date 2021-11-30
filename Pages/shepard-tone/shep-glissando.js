var c = new AudioContext();

var play;
var num_osc = 10; // 10
var osc = []; 
var gain = [];

var a = c.createAnalyser();
a.fftSize = 2048;

var freq = [8000]; // 8000
var lowestFreq = 50; // 50 
var highestFreq = 16000; // 16000

function shepardtone() {

    var canvasElement = document.querySelector('#canvas');
    var ctx = canvasElement.getContext('2d');

    for (i = 1; i <= num_osc; i++) {
    osc[i] = c.createOscillator();
    freq[i] = freq[i - 1] / 2; // highest[1] 8000, lowest[10] 7.81
    osc[i].frequency.value = freq[i]; 

    gain[i] = c.createGain(); 
    gain[i].gain.value = 0; 
    }

    play = setInterval(function() {

        for (i = 1; i <= num_osc; i++) {

            if (freq[i] > 20000) {
                freq[i] = 20;
            } 
            else {
                freq[i] = freq[i] + (freq[i] / 200); // 192
            }

            osc[i].frequency.value = freq[i]; 

            if (lowestFreq < freq[i] < highestFreq) {
                gain[i].gain.value = 0.02; 
            }

            osc[i].connect(gain[i]);
            gain[i].connect(a);
            a.connect(c.destination);

        }

        var data = new Float32Array(2048);
        a.getFloatTimeDomainData(data);
        console.log(data);

        function draw() {
            a.getFloatTimeDomainData(data);
            ctx.clearRect(0,0,1000,1000);
            ctx.beginPath();
            const h = canvasElement.height;
            ctx.moveTo(0,h/2)
            for(var i=0;i<2048;i++) {
                ctx.lineTo(i, h/2+data[i]*h/2)
            }
            ctx.stroke()
        }
        draw();

    }, 100); //update hz every 75ms

    for (i = 1; i <= num_osc; i++) {
        osc[i].start(); 
    } 
}

function stop() {
    clearInterval(play);
    for (i = 1; i <= num_osc; i++) {
        osc[i].stop();
    }
} 