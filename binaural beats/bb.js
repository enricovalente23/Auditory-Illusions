var c = new AudioContext()

var p1 = c.createStereoPanner()
var p2 = c.createStereoPanner()
p1.pan.value = 1 // right
p2.pan.value = -1 // left

o1 = c.createOscillator()
o2 = c.createOscillator()

// o1.connect(p1)
// p1.connect(c.destination)

// o2.connect(p2)
// p2.connect(c.destination)

o1.frequency.value = 300
o2.frequency.value = 305

g1 = c.createGain()
g2 = c.createGain()
g1.gain.value = 0
g2.gain.value = 0

o1.connect(g1)
g1.connect(p1)
p1.connect(c.destination)
o1.start()

o2.connect(g2)
g2.connect(p2)
p2.connect(c.destination)
o2.start()

function play1() {
    g1.gain.value = 0.5
}

function play2() {
    g2.gain.value = 0.5
}

function stop1() {
    g1.gain.value = 0
}

function stop2() {
    g2.gain.value = 0
}

function both() {
    g1.gain.value = 0.5
    g2.gain.value = 0.5
}

function stopboth() {
    g1.gain.value = 0
    g2.gain.value = 0
}