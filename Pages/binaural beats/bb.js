var c = new AudioContext()

var a1 = c.createAnalyser();
a1.fftSize = 2048;
var a2 = c.createAnalyser();
a2.fftSize = 2048;

var p1 = c.createStereoPanner()
var p2 = c.createStereoPanner()
p1.pan.value = 1 // right
p2.pan.value = -1 // left

o1 = c.createOscillator()
o2 = c.createOscillator()

o1.frequency.value = 200
o2.frequency.value = 405

g1 = c.createGain()
g2 = c.createGain()
g1.gain.value = 0
g2.gain.value = 0

o1.connect(g1)
g1.connect(a1)
a1.connect(p1)
p1.connect(c.destination)
o1.start()

o2.connect(g2)
g2.connect(a2)
a2.connect(p2)
p2.connect(c.destination)
o2.start()

var canvasElement = document.querySelector("#canvas");
var ctx = canvasElement.getContext("2d");

var data1 = new Float32Array(2048);
a1.getFloatTimeDomainData(data1);
var data2 = new Float32Array(2048);
a2.getFloatTimeDomainData(data2);

console.log(data1);
console.log(data2);

function play1() {
    g1.gain.value = 0.5

    document.getElementById("right").classList.remove("vis");
    document.getElementById("left").classList.add("vis");

    draw();
}

function play2() {
    g1.gain.value = 0
    g2.gain.value = 0.5

    document.getElementById("left").classList.remove("vis");
    document.getElementById("both").classList.add("vis");

    draw();
}

function both() {
    g1.gain.value = 0.5
    g2.gainvalue = 0.5

    o1.frequency.linearRampToValueAtTime(300, c.currentTime + 5);
    o2.frequency.linearRampToValueAtTime(305, c.currentTime + 5); 

    document.getElementById("both").classList.remove("vis");
    document.getElementById("stop").classList.add("vis");

    draw();
}

function stopboth() {
    g1.gain.value = 0
    g2.gain.value = 0
    o1.frequency.value = 250
    o2.frequency.value = 355

    document.getElementById("stop").classList.remove("vis");
    document.getElementById("right").classList.add("vis");
}

function draw() {
    a1.getFloatTimeDomainData(data1);
    a2.getFloatTimeDomainData(data2);
    ctx.clearRect(0,0,1000,1000);
    ctx.beginPath();
    const h = canvasElement.height;
    ctx.moveTo(0,h/2)
    for(var i=0;i<2048;i++) {
        ctx.lineTo(i, h/2+data1[i]*h/2)
        ctx.lineTo(i, h/2+data2[i]*h/2)
    }
    ctx.stroke()
}
