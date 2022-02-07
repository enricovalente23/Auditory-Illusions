var c = new AudioContext();

var play;
var num_osc = 10; // 10
var osc = []; 
var gain = [];

var a = c.createAnalyser();
a.fftSize = 256;

var freq = [1000]; // 8000
var lowestFreq = 50; // 50 
var highestFreq = 16000; // 16000

function ascendingShepard() {

    if (play) {
        clearInterval(play);
    }

    for (i = 1; i <= num_osc; i++) {
        if (osc[i]) {
            osc[i].stop();  
        }
        osc[i] = c.createOscillator();
        freq[i] = freq[i - 1] / 2; // highest[1] 8000, lowest[10] 7.81
        osc[i].frequency.value = freq[i]; 

        gain[i] = c.createGain(); 
        gain[i].gain.value = 0.2; 
    }

    play = setInterval(function() {
        flag2 = 0;
        for (i = 1; i <= num_osc; i++) {

            if (freq[i] > 20000) {
                freq[i] = 20;
            } 
            else {
                freq[i] = freq[i] + (freq[i] / 200); // 192
            }

            osc[i].frequency.value = freq[i]; 

            osc[i].connect(gain[i]);
            gain[i].connect(a);
            a.connect(c.destination);

        }

    }, 100); // update every 100 ms

    for (i = 1; i <= num_osc; i++) {
        osc[i].start(); 
    } 
}

function Stop() {
    clearInterval(play);
    for (i = 1; i <= num_osc; i++) {
        osc[i].stop();
    }
} 


const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const bufferLength = a.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

const barWidth = (canvas.width/bufferLength)*4;
let barHeight;
let x = 0;

window.addEventListener('click', function() {

    function animate() {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        a.getByteFrequencyData(dataArray);
        drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }
    animate();
});

function drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray) {
    for (let i=0; i < bufferLength; i++){
        barHeight = dataArray[i]*3;
        const red = i * barHeight/30;
        const green = i/2;
        const blue = i * barHeight;
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillRect(canvas.width - x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
}