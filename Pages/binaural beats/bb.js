var c = new AudioContext()

var options = {
    numberOfInputs : 2
  }
var mergerNode = new ChannelMergerNode(c, options);

console.log(c);
let analyser = c.createAnalyser();
analyser.fftSize = 64;

var p1 = c.createStereoPanner()
var p2 = c.createStereoPanner()
p1.pan.value = 1 // right
p2.pan.value = -1 // left

o1 = c.createOscillator()
o2 = c.createOscillator()

o1.frequency.value = 200;
o2.frequency.value = 405;

g1 = c.createGain();
g2 = c.createGain();
g1.gain.value = 0;
g2.gain.value = 0;

o1.connect(g1);
g1.connect(p1);

o2.connect(g2);
g2.connect(p2);

o1.start();
o2.start();

p1.connect(mergerNode, 0, 1); 
p2.connect(mergerNode, 0, 0); 

mergerNode.connect(analyser);
analyser.connect(c.destination);

const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

const barWidth = (canvas.width/2)/bufferLength;
let barHeight;
let x = 0;

function play1() {
    g1.gain.value = 0.5

    document.getElementById("right").classList.remove("vis");
    document.getElementById("left").classList.add("vis");
}

function play2() {
    g1.gain.value = 0
    g2.gain.value = 0.5

    document.getElementById("left").classList.remove("vis");
    document.getElementById("both").classList.add("vis");
}

function both() {
    g1.gain.value = 0.5
    g2.gainvalue = 0.5

    o1.frequency.linearRampToValueAtTime(300, c.currentTime + 5);
    o2.frequency.linearRampToValueAtTime(305, c.currentTime + 5); 

    document.getElementById("both").classList.remove("vis");
    document.getElementById("stop").classList.add("vis");
}

function stopboth() {
    g1.gain.value = 0
    g2.gain.value = 0
    o1.frequency.value = 250
    o2.frequency.value = 355

    document.getElementById("stop").classList.remove("vis");
    document.getElementById("right").classList.add("vis");
}


window.addEventListener('click', function() {

    function animate() {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }
    animate();
});

function drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray) {
    for (let i=0; i < bufferLength; i++){
        barHeight = dataArray[i]*2;
        const red = i * barHeight/20;
        const green = i/2;
        const blue = barHeight/2
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
    for (let i=0; i < bufferLength; i++){
        barHeight = dataArray[i]*2;
        const red = i * barHeight/20;
        const green = i/2;
        const blue = barHeight/2
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
}

