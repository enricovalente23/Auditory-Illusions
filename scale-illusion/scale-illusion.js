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
// C DE C DE
// DO REMI FA MIRE
function playfm1() {
setTimeout(()=>play(3),0) //DO
setTimeout(()=>play(2),300) // SI
setTimeout(()=>play(0),600) // LA
setTimeout(()=>play(-2),900) //    SOL
setTimeout(()=>play(0),1200)// LA
setTimeout(()=>play(2),1500)// SI
setTimeout(()=>play(3),1800) //DO
setTimeout(()=>play(2),2100) // SI
setTimeout(()=>play(0),2400) // LA
setTimeout(()=>play(-2),2700) //    SOL
setTimeout(()=>play(0),3000)// LA
setTimeout(()=>play(2),3300)// SI
}
function playfm2() {
setTimeout(()=>play(-9),0) //DO
setTimeout(()=>play(-7),300) // RE
setTimeout(()=>play(-5),600) // MI
setTimeout(()=>play(-4),900) //    FA
setTimeout(()=>play(-5),1200)// MI
setTimeout(()=>play(-7),1500)// RE
setTimeout(()=>play(-9),1800) //DO
setTimeout(()=>play(-7),2100) // RE
setTimeout(()=>play(-5),2400) // MI
setTimeout(()=>play(-4),2700) //    FA
setTimeout(()=>play(-5),3000)// MI
setTimeout(()=>play(-7),3300)// RE
}

function todo(){
playfm1(); 
playfm2();
}