c = new AudioContext()

var attack = 0.01;
var release = 0.2;

function play(note) {
  const o = c.createOscillator();
  const g = c.createGain();
  o.frequency.value = 440*Math.pow(2,note/12);
  o.connect(g);
  g.connect(c.destination);
  const now = c.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(1, now+attack);
  g.gain.linearRampToValueAtTime(0, now+attack+release);
  o.start();
  o.stop(now+attack+release);
}

function stop() {
    o.stop()
}

function playst() {
    setTimeout(()=>play(-9),c.currentTime)
    setTimeout(()=>play(3),c.currentTime)
    setTimeout(()=>play(-21),c.currentTime)

    setTimeout(()=>play(-8),c.currentTime+300)
    setTimeout(()=>play(4),c.currentTime+300)
    setTimeout(()=>play(-20),c.currentTime+300)

    setTimeout(()=>play(-7),c.currentTime+600)
    setTimeout(()=>play(5),c.currentTime+600)
    setTimeout(()=>play(-19),c.currentTime+600)

    setTimeout(()=>play(-6),c.currentTime+900)
    setTimeout(()=>play(6),c.currentTime+900)
    setTimeout(()=>play(-18),c.currentTime+900)

    setTimeout(()=>play(-5),c.currentTime+1200)
    setTimeout(()=>play(7),c.currentTime+1200)
    setTimeout(()=>play(-17),c.currentTime+1200)

    setTimeout(()=>play(-4),c.currentTime+1500)
    setTimeout(()=>play(8),c.currentTime+1500)
    setTimeout(()=>play(-16),c.currentTime+1500)

    setTimeout(()=>play(-3),c.currentTime+1800)
    setTimeout(()=>play(9),c.currentTime+1800)
    setTimeout(()=>play(-15),c.currentTime+1800)

    setTimeout(()=>play(-2),c.currentTime+2100)
    setTimeout(()=>play(10),c.currentTime+2100)
    setTimeout(()=>play(-14),c.currentTime+2100)

    setTimeout(()=>play(-1),c.currentTime+2400)
    setTimeout(()=>play(11),c.currentTime+2400)
    setTimeout(()=>play(-13),c.currentTime+2400)

    setTimeout(()=>play(0),c.currentTime+2700)
    setTimeout(()=>play(12),c.currentTime+2700)
    setTimeout(()=>play(-12),c.currentTime+2700)

    setTimeout(()=>play(1),c.currentTime+3000)
    setTimeout(()=>play(13),c.currentTime+3000)
    setTimeout(()=>play(-11),c.currentTime+3000)

    setTimeout(()=>play(2),c.currentTime+3300)
    setTimeout(()=>play(14),c.currentTime+3300)
    setTimeout(()=>play(-10),c.currentTime+3300)
}