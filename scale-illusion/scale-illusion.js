var c = new AudioContext();

var attack = 0.01;
var release = 0.2;

var attack1 =0.02;
var release1 = 0.4;

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
function play1(n) {
  const o = c.createOscillator();
  const g = c.createGain();
  o.frequency.value = 440*Math.pow(2,n/12);
  o.connect(g);
  g.connect(c.destination);
  const now = c.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(1, now+attack1);
  g.gain.linearRampToValueAtTime(0, now+attack1+release1);
  o.start();
  o.stop(now+attack1+release1);
}


function playfm1() {
setTimeout(()=>play1(3),c.currentTime) //DO
setTimeout(()=>play(-7),c.currentTime+300) // RE
setTimeout(()=>play(0),c.currentTime+600) // LA
setTimeout(()=>play1(-4),c.currentTime+900) //    FA
setTimeout(()=>play(0),c.currentTime+1200)// LA
setTimeout(()=>play(-7),c.currentTime+1500)// RE
setTimeout(()=>play1(3),c.currentTime+1800) //    DO
setTimeout(()=>play(-7),c.currentTime+2100) // RE
setTimeout(()=>play(0),c.currentTime+2400) // LA
setTimeout(()=>play1(-4),c.currentTime+2700) //    FA
setTimeout(()=>play(0),c.currentTime+3000)// LA
setTimeout(()=>play(-7),c.currentTime+3300)// RE

}
function playfm2() {
setTimeout(()=>play1(-9),c.currentTime) //    DO
setTimeout(()=>play(2),c.currentTime+300) // SI
setTimeout(()=>play(-5),c.currentTime+600) // SOL
setTimeout(()=>play1(-2),c.currentTime+900) //    FA
setTimeout(()=>play(-5),c.currentTime+1200)// MI
setTimeout(()=>play(2),c.currentTime+1500)// RE
setTimeout(()=>play1(-9),c.currentTime+1800) //   DO
setTimeout(()=>play(2),c.currentTime+2100) // RE
setTimeout(()=>play(-5),c.currentTime+2400) // MI
setTimeout(()=>play1(-2),c.currentTime+2700) //    FA
setTimeout(()=>play(-5),c.currentTime+3000)// MI
setTimeout(()=>play(2),c.currentTime+3300)// RE
}

function todo(){
playfm1(); 
playfm2();
}


var step1 = 0;
var step2 = 0;
var timer1;
var timer2;



function render1() {
  document.querySelectorAll(".dot1").forEach(renderDot1)
}
function render2() {
  document.querySelectorAll(".dot2").forEach(renderDot2)
}

function renderDot1(dot , index) {
 dot.classList.toggle("active-dot1", index == step1)}

function renderDot2(dot , index) {
 dot.classList.toggle("active-dot2", index == step2)}

function updateStep1() {
  render1()
  step1 += 1;
  if(step1 >= rett1.children.length)
  return;   
}
function updateStep2() {
  render2()
  step2 += 1;
  if(step2 >= rett2.children.length)
  return;   
}



timer1= setInterval(updateStep1, 260)
timer2= setInterval(updateStep2, 260)


function resetStep1() {
  step1 = 0
  clearInterval(timer1)
  timer1=setInterval(updateStep1, 260)
  render1 ()
}
function resetStep2() {
  step2 = 0
  clearInterval(timer2)
  timer2=setInterval(updateStep2, 260)
  render2 ()
}

function scala1(){

playfm1(); 
updateStep1();
resetStep1();

}
function scala2(){

playfm2(); 
updateStep2();
resetStep2();

}
function insieme(){
  playfm1(); 
updateStep1();
resetStep1();
  playfm2(); 
updateStep2();
resetStep2();
}