var c = new AudioContext();

var attack = 0.01;
var release = 0.2;

function play(n) {
  const o = c.createOscillator();
  const g = c.createGain();
  o.frequency.value = 440*Math.pow(2,n/12);
  o.connect(g);
  g.connect(c.destination);
  const now = c.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(1, now+attack);
  g.gain.linearRampToValueAtTime(0, now+attack+release);
  o.start();
  o.stop(now+attack+release);
}

// C DE C DE
// DO REMI FA MIRE
function playfm1() {
setTimeout(()=>play(3),c.currentTime) //DO
setTimeout(()=>play(-7),c.currentTime+300) // RE
setTimeout(()=>play(0),c.currentTime+600) // LA
setTimeout(()=>play(-4),c.currentTime+900) //    FA
setTimeout(()=>play(0),c.currentTime+1200)// LA
setTimeout(()=>play(-7),c.currentTime+1500)// RE
setTimeout(()=>play(3),c.currentTime+1800) //DO
setTimeout(()=>play(-7),c.currentTime+2100) // RE
setTimeout(()=>play(0),c.currentTime+2400) // LA
setTimeout(()=>play(-4),c.currentTime+2700) //    FA
setTimeout(()=>play(0),c.currentTime+3000)// LA
setTimeout(()=>play(-7),c.currentTime+3300)// RE
}
function playfm2() {
setTimeout(()=>play(-9),c.currentTime) //DO
setTimeout(()=>play(2),c.currentTime+300) // RE
setTimeout(()=>play(-5),c.currentTime+600) // MI
setTimeout(()=>play(-2),c.currentTime+900) //    FA
setTimeout(()=>play(-5),c.currentTime+1200)// MI
setTimeout(()=>play(2),c.currentTime+1500)// RE
setTimeout(()=>play(-9),c.currentTime+1800) //DO
setTimeout(()=>play(2),c.currentTime+2100) // RE
setTimeout(()=>play(-5),c.currentTime+2400) // MI
setTimeout(()=>play(-2),c.currentTime+2700) //    FA
setTimeout(()=>play(-5),c.currentTime+3000)// MI
setTimeout(()=>play(2),c.currentTime+3300)// RE
}

function todo(){
playfm1(); 
playfm2();
}