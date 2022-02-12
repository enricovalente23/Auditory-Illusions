//2 note
//una un'ottava sotto una un'ottava sopra
//far sentire una in un'orecchia una in un'altra
//sx bassa destra alta
//ma con la velocità posso focalizzarmi su una delle due e qualunque delle due diventa quella alta

// NELLA SX ALTO-BASSO 0/-12 su -1 la 0 sol -1 e -13
// NELLA DESTRE BASSO-ALTO -12/0 su 1
var co = new AudioContext()
var attac =0.02;
var releas = 0.2;

function result(){
  if(document.getElementById('correct').checked){

    document.getElementById("risposta").href="../Octave Illusion/right_answer.html";
  }
else {
  document.getElementById("risposta").href="../Octave Illusion/wrong_answer.html";
}

}


function play_sx_1() {
  const o = co.createOscillator();
  const g = co.createGain();
  var p = co.createStereoPanner()
  o.frequency.value = 440*Math.pow(2,12/12);
  p.pan.value = -1 ;
  o.connect(g);
  g.connect(p);
  p.connect(co.destination);
  const now = co.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(1, now+attac);
  g.gain.linearRampToValueAtTime(0, now+attac+releas);
  o.start();
  o.stop(now+attac+releas);
}

function play_sx_2() {
  const o = co.createOscillator();
  const g = co.createGain();
  var p = co.createStereoPanner()
  o.frequency.value = 440*Math.pow(2,0/12);
  p.pan.value = -1 ;
  o.connect(g);
  g.connect(p);
  p.connect(co.destination);
  const now = co.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(1, now+attac);
  g.gain.linearRampToValueAtTime(0, now+attac+releas);
  o.start();
  o.stop(now+attac+releas);
}

function play_dx_1() {
  const o = co.createOscillator();
  const g = co.createGain();
  var p = co.createStereoPanner()
  o.frequency.value = 440*Math.pow(2,0/12);
  p.pan.value = 1; 
  o.connect(g);
  g.connect(p);
  p.connect(co.destination);
  const now = co.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(1, now+attac);
  g.gain.linearRampToValueAtTime(0, now+attac+releas);
  o.start();
  o.stop(now+attac+releas);
}
function play_dx_2() {
  const o = co.createOscillator();
  const g = co.createGain();
  var p = co.createStereoPanner()
  o.frequency.value = 440*Math.pow(2,12/12);
  p.pan.value = 1; 
  o.connect(g);
  g.connect(p);
  p.connect(co.destination);
  const now = co.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(1, now+attac);
  g.gain.linearRampToValueAtTime(0, now+attac+releas);
  o.start();
  o.stop(now+attac+releas);
}

  
 function playinsieme(){
  
  setTimeout(()=>play_sx_1(),co.currentTime+400)
  setTimeout(()=>play_dx_1(),co.currentTime+400)

  setTimeout(()=>play_sx_2(),co.currentTime+600)
  setTimeout(()=>play_dx_2(),co.currentTime+600)

  setTimeout(()=>play_sx_1(),co.currentTime+800)
  setTimeout(()=>play_dx_1(),co.currentTime+800)

  setTimeout(()=>play_sx_2(),co.currentTime+1000)
  setTimeout(()=>play_dx_2(),co.currentTime+1000)

  setTimeout(()=>play_sx_1(),co.currentTime+1200)
  setTimeout(()=>play_dx_1(),co.currentTime+1200)

  setTimeout(()=>play_sx_2(),co.currentTime+1400)
  setTimeout(()=>play_dx_2(),co.currentTime+1400)

  setTimeout(()=>play_sx_1(),co.currentTime+1600)
  setTimeout(()=>play_dx_1(),co.currentTime+1600)

  setTimeout(()=>play_sx_2(),co.currentTime+1800)
  setTimeout(()=>play_dx_2(),co.currentTime+1800)

  setTimeout(()=>play_sx_1(),co.currentTime+2000)
  setTimeout(()=>play_dx_1(),co.currentTime+2000)

  setTimeout(()=>play_sx_2(),co.currentTime+2200)
  setTimeout(()=>play_dx_2(),co.currentTime+2200)

  setTimeout(()=>play_sx_1(),co.currentTime+2400)
  setTimeout(()=>play_dx_1(),co.currentTime+2400)

  setTimeout(()=>play_sx_2(),co.currentTime+2600)
  setTimeout(()=>play_dx_2(),co.currentTime+2600)

  setTimeout(()=>play_sx_1(),co.currentTime+2800)
  setTimeout(()=>play_dx_1(),co.currentTime+2800)

  setTimeout(()=>play_sx_2(),co.currentTime+3000)
  setTimeout(()=>play_dx_2(),co.currentTime+3000)

  setTimeout(()=>play_sx_1(),co.currentTime+3200)
  setTimeout(()=>play_dx_1(),co.currentTime+3200)

  setTimeout(()=>play_sx_2(),co.currentTime+3400)
  setTimeout(()=>play_dx_2(),co.currentTime+3400)

  setTimeout(()=>play_sx_1(),co.currentTime+3600)
  setTimeout(()=>play_dx_1(),co.currentTime+3600)

  setTimeout(()=>play_sx_2(),co.currentTime+3800)
  setTimeout(()=>play_dx_2(),co.currentTime+3800)

  setTimeout(()=>play_sx_1(),co.currentTime+4000)
  setTimeout(()=>play_dx_1(),co.currentTime+4000)

  setTimeout(()=>play_sx_2(),co.currentTime+4200)
  setTimeout(()=>play_dx_2(),co.currentTime+4200)

  setTimeout(()=>play_sx_1(),co.currentTime+4400)
  setTimeout(()=>play_dx_1(),co.currentTime+4400)

  setTimeout(()=>play_sx_2(),co.currentTime+4600)
  setTimeout(()=>play_dx_2(),co.currentTime+4600)

  setTimeout(()=>play_sx_1(),co.currentTime+4800)
  setTimeout(()=>play_dx_1(),co.currentTime+4800)

  setTimeout(()=>play_sx_2(),co.currentTime+5000)
  setTimeout(()=>play_dx_2(),co.currentTime+5000)

  setTimeout(()=>play_sx_1(),co.currentTime+5200)
  setTimeout(()=>play_dx_1(),co.currentTime+5200)

  setTimeout(()=>play_sx_2(),co.currentTime+5400)
  setTimeout(()=>play_dx_2(),co.currentTime+5400)

  setTimeout(()=>play_sx_1(),co.currentTime+5600)
  setTimeout(()=>play_dx_1(),co.currentTime+5600)

  setTimeout(()=>play_sx_2(),co.currentTime+5800)
  setTimeout(()=>play_dx_2(),co.currentTime+5800)

  setTimeout(()=>play_sx_1(),co.currentTime+6000)
  setTimeout(()=>play_dx_1(),co.currentTime+6000)

  setTimeout(()=>play_sx_2(),co.currentTime+6200)
  setTimeout(()=>play_dx_2(),co.currentTime+6200)

  setTimeout(()=>play_sx_1(),co.currentTime+6400)
  setTimeout(()=>play_dx_1(),co.currentTime+6400)

  setTimeout(()=>play_sx_2(),co.currentTime+6600)
  setTimeout(()=>play_dx_2(),co.currentTime+6600)

  setTimeout(()=>play_sx_1(),co.currentTime+6800)
  setTimeout(()=>play_dx_1(),co.currentTime+6800)

  setTimeout(()=>play_sx_2(),co.currentTime+7000)
  setTimeout(()=>play_dx_2(),co.currentTime+7000)

  setTimeout(()=>play_sx_1(),co.currentTime+7200)
  setTimeout(()=>play_dx_1(),co.currentTime+7200)
  
  setTimeout(()=>play_sx_2(),co.currentTime+7400)
  setTimeout(()=>play_dx_2(),co.currentTime+7400)
  

  setTimeout(()=>play_sx_1(),co.currentTime+7600)
  setTimeout(()=>play_dx_1(),co.currentTime+7600)
  
  setTimeout(()=>play_sx_2(),co.currentTime+7800)
  setTimeout(()=>play_dx_2(),co.currentTime+7800)

  
 setTimeout(()=>play_sx_1(),co.currentTime+8000)
  setTimeout(()=>play_dx_1(),co.currentTime+8000)
  
  setTimeout(()=>play_sx_2(),co.currentTime+8200)
  setTimeout(()=>play_dx_2(),co.currentTime+8200)

  
  setTimeout(()=>play_sx_1(),co.currentTime+8400)
  setTimeout(()=>play_dx_1(),co.currentTime+8400)
  
  setTimeout(()=>play_sx_2(),co.currentTime+8600)
  setTimeout(()=>play_dx_2(),co.currentTime+8600)

  
  setTimeout(()=>play_sx_1(),co.currentTime+8800)
  setTimeout(()=>play_dx_1(),co.currentTime+8800)
  
  setTimeout(()=>play_sx_2(),co.currentTime+9000)
  setTimeout(()=>play_dx_2(),co.currentTime+9000)

  
  setTimeout(()=>play_sx_1(),co.currentTime+9200)
  setTimeout(()=>play_dx_1(),co.currentTime+9200)
  
  setTimeout(()=>play_sx_2(),co.currentTime+9400)
  setTimeout(()=>play_dx_2(),co.currentTime+9400)

  
  setTimeout(()=>play_sx_1(),co.currentTime+9600)
  setTimeout(()=>play_dx_1(),co.currentTime+9600)
  
  setTimeout(()=>play_sx_2(),co.currentTime+9800)
  setTimeout(()=>play_dx_2(),co.currentTime+9800)

  
  setTimeout(()=>play_sx_1(),co.currentTime+10000)
  setTimeout(()=>play_dx_1(),co.currentTime+10000)
  
  setTimeout(()=>play_sx_2(),co.currentTime+10200)
  setTimeout(()=>play_dx_2(),co.currentTime+10200)

  
  setTimeout(()=>play_sx_1(),co.currentTime+10400)
  setTimeout(()=>play_dx_1(),co.currentTime+10400)
  
  setTimeout(()=>play_sx_2(),co.currentTime+10600)
  setTimeout(()=>play_dx_2(),co.currentTime+10600)

  
  setTimeout(()=>play_sx_1(),co.currentTime+10800)
  setTimeout(()=>play_dx_1(),co.currentTime+10800)
  
  setTimeout(()=>play_sx_2(),co.currentTime+11000)
  setTimeout(()=>play_dx_2(),co.currentTime+11000)

  setTimeout(()=>play_sx_1(),co.currentTime+11200)
  setTimeout(()=>play_dx_1(),co.currentTime+11200)
  
  setTimeout(()=>play_sx_2(),co.currentTime+11400)
  setTimeout(()=>play_dx_2(),co.currentTime+11400)

  
  setTimeout(()=>play_sx_1(),co.currentTime+11600)
  setTimeout(()=>play_dx_1(),co.currentTime+11600)
  
  setTimeout(()=>play_sx_2(),co.currentTime+11800)
  setTimeout(()=>play_dx_2(),co.currentTime+11800)

  
  setTimeout(()=>play_sx_1(),co.currentTime+12000)
  setTimeout(()=>play_dx_1(),co.currentTime+12000)
  
  setTimeout(()=>play_sx_2(),co.currentTime+12200)
  setTimeout(()=>play_dx_2(),co.currentTime+12200)

  
  setTimeout(()=>play_sx_1(),co.currentTime+12400)
  setTimeout(()=>play_dx_1(),co.currentTime+12400)

  setTimeout(()=>play_sx_2(),co.currentTime+12600)
  setTimeout(()=>play_dx_2(),co.currentTime+12600)

  setTimeout(()=>play_sx_1(),co.currentTime+12800)
  setTimeout(()=>play_dx_1(),co.currentTime+12800)
  
  setTimeout(()=>play_sx_2(),co.currentTime+13000)
  setTimeout(()=>play_dx_2(),co.currentTime+13000)
  setTimeout(()=>play_sx_1(),co.currentTime+13200)
  setTimeout(()=>play_dx_1(),co.currentTime+13200)
  setTimeout(()=>play_sx_2(),co.currentTime+13400)
  setTimeout(()=>play_dx_2(),co.currentTime+13400)
  setTimeout(()=>play_sx_1(),co.currentTime+13600)
  setTimeout(()=>play_dx_1(),co.currentTime+13600)
  setTimeout(()=>play_sx_2(),co.currentTime+13800)
  setTimeout(()=>play_dx_2(),co.currentTime+13800)

  
  setTimeout(()=>play_sx_1(),co.currentTime+14000)
  setTimeout(()=>play_dx_1(),co.currentTime+14000)
  setTimeout(()=>play_sx_2(),co.currentTime+14200)
  setTimeout(()=>play_dx_2(),co.currentTime+14200)
  setTimeout(()=>play_sx_1(),co.currentTime+14400)
  setTimeout(()=>play_dx_1(),co.currentTime+14400)
  setTimeout(()=>play_sx_2(),co.currentTime+14600)
  setTimeout(()=>play_dx_2(),co.currentTime+14600)
  setTimeout(()=>play_sx_1(),co.currentTime+14800)
  setTimeout(()=>play_dx_1(),co.currentTime+14800)

  setTimeout(()=>play_sx_2(),co.currentTime+15000)
  setTimeout(()=>play_dx_2(),co.currentTime+15000)
  setTimeout(()=>play_sx_1(),co.currentTime+15200)
  setTimeout(()=>play_dx_1(),co.currentTime+15200)
  setTimeout(()=>play_sx_2(),co.currentTime+15400)
  setTimeout(()=>play_dx_2(),co.currentTime+15400)
  setTimeout(()=>play_sx_1(),co.currentTime+15600)
  setTimeout(()=>play_dx_1(),co.currentTime+15600)
  setTimeout(()=>play_sx_2(),co.currentTime+15800)
  setTimeout(()=>play_dx_2(),co.currentTime+15800)

  
  setTimeout(()=>play_sx_1(),co.currentTime+16000)
  setTimeout(()=>play_dx_1(),co.currentTime+16000)
  setTimeout(()=>play_sx_2(),co.currentTime+16200)
  setTimeout(()=>play_dx_2(),co.currentTime+16200)

  
}


 




  