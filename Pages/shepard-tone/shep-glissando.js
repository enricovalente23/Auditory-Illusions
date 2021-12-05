var c = new AudioContext();

var play;
var num_osc = 10; // 10
var osc = []; 
var gain = [];

var a = c.createAnalyser();
a.fftSize = 512;

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

        /* var data = new Float32Array(2048);
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
        draw(); */

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


const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const bufferLength = a.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

const barWidth = (canvas.width/2)/bufferLength;
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
        ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
    for (let i=0; i < bufferLength; i++){
        barHeight = dataArray[i]*3;
        const red = i * barHeight/30;
        const green = i/2;
        const blue = i * barHeight;
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
}