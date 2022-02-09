var cc = new AudioContext()

var options = {
    numberOfInputs : 2
}
var mergerNode = new ChannelMergerNode(cc, options);

console.log(cc);
anal = cc.createAnalyser();
anal.fftSize = 64;

var p1 = cc.createStereoPanner()
var p2 = cc.createStereoPanner()
p1.pan.value = 1 // right
p2.pan.value = -1 // left

o1 = cc.createOscillator()
o2 = cc.createOscillator()

o1.frequency.value = 200;
o2.frequency.value = 405;

g1 = cc.createGain();
g2 = cc.createGain();
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

mergerNode.connect(anal);
anal.connect(cc.destination);

const cnvs = document.getElementById('cnvs1');
cnvs.width = window.innerWidth;
cnvs.height = window.innerHeight;
const ct = cnvs.getContext('2d');

const bufferLen = anal.frequencyBinCount;
const data = new Uint8Array(bufferLen);

const barW = (cnvs.width/2)/bufferLen;
let barH;
let xx = 0;

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

    o1.frequency.linearRampToValueAtTime(300, cc.currentTime + 5);
    o2.frequency.linearRampToValueAtTime(305, cc.currentTime + 5); 

    document.getElementById("both").classList.remove("vis");
    document.getElementById("stop").classList.add("vis");
}

function stopboth() {
    g1.gain.value = 0
    g2.gain.value = 0
    o1.frequency.value = 200
    o2.frequency.value = 405

    document.getElementById("stop").classList.remove("vis");
    document.getElementById("right").classList.add("vis");
}


window.addEventListener('click', function() {

    function animate() {
        xx = 0;
        ct.clearRect(0, 0, cnvs.width, cnvs.height);
        anal.getByteFrequencyData(data);
        drawVis(bufferLen, xx, barW, barH, data);
        requestAnimationFrame(animate);
    }
    animate();
});

function drawVis(bufferLen, xx, barW, barH, data) {
    for (let i=0; i < bufferLen; i++){
        barH = data[i]*2.5;
        const red = i * barH/20;
        const green = i/2;
        const blue = barH/2;
        ct.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ct.fillRect(cnvs.width/2 - xx, cnvs.height - barH, barW, barH);
        xx += barW;
    }
    for (let i=0; i < bufferLen; i++){
        barH = data[i]*2.5;
        const red = i * barH/20;
        const green = i/2;
        const blue = barH/2;
        ct.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ct.fillRect(xx, cnvs.height - barH, barW, barH);
        xx += barW;
    }
}