c = new AudioContext()
var o;
o = c.createOscillator()
o.connect(c.destination)

function play(note) {
    o = c.createOscillator()
    o.frequency.value=440*Math.pow(2,note/12);
    o.connect(c.destination)
    c.resume()
    o.start()
    setTimeout(stop, 200)
}

function stop() {
    o.stop()
}

function playst() {
    setTimeout(()=>play(-9),0)
    setTimeout(()=>play(3),0)
    setTimeout(()=>play(-21),0)

    setTimeout(()=>play(-8),300)
    setTimeout(()=>play(4),300)
    setTimeout(()=>play(-20),300)

    setTimeout(()=>play(-7),600)
    setTimeout(()=>play(5),600)
    setTimeout(()=>play(-19),600)

    setTimeout(()=>play(-6),900)
    setTimeout(()=>play(6),900)
    setTimeout(()=>play(-18),900)

    setTimeout(()=>play(-5),1200)
    setTimeout(()=>play(7),1200)
    setTimeout(()=>play(-17),1200)

    setTimeout(()=>play(-4),1500)
    setTimeout(()=>play(8),1500)
    setTimeout(()=>play(-16),1500)

    setTimeout(()=>play(-3),1800)
    setTimeout(()=>play(9),1800)
    setTimeout(()=>play(-15),1800)

    setTimeout(()=>play(-2),2100)
    setTimeout(()=>play(10),2100)
    setTimeout(()=>play(-14),2100)

    setTimeout(()=>play(-1),2400)
    setTimeout(()=>play(11),2400)
    setTimeout(()=>play(-13),2400)

    setTimeout(()=>play(0),2700)
    setTimeout(()=>play(1),2700)
    setTimeout(()=>play(-1),2700)

    setTimeout(()=>play(1),3000)
    setTimeout(()=>play(13),3000)
    setTimeout(()=>play(-11),3000)

    setTimeout(()=>play(2),3300)
    setTimeout(()=>play(14),3300)
    setTimeout(()=>play(-10),3300)
}