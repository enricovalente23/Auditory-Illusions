var v = new AudioContext();

var attack = 0.01;
var release = 0.2;

var attack1 =0.02;
var release1 = 0.4;

var note1 = [];
var note2 = [];

function play(n) {
  const o = v.createOscillator();
  const g = v.createGain();
  o.frequency.value = 440*Math.pow(2, n/12);
  o.connect(g);
  g.connect(v.destination);
  const now = v.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(1, now+attack);
  g.gain.linearRampToValueAtTime(0, now+attack+release);
  o.start();
  o.stop(now+attack+release);
}

function play1(n) {
  const o = v.createOscillator();
  const g = v.createGain();
  o.frequency.value = 440*Math.pow(2,n/12);
  o.connect(g);
  g.connect(v.destination);
  const now = v.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(1, now+attack1);
  g.gain.linearRampToValueAtTime(0, now+attack1+release1);
  o.start();
  o.stop(now+attack1+release1);
}

function playfm1() {

  for (i=0; i < note1.length; i++) {
    clearTimeout(note1[i])
   }
  
    note1 = []
  
  note1.push(setTimeout(()=>play1(3),v.currentTime)) //DO
  note1.push(setTimeout(()=>play(-7),v.currentTime+300)) // RE
  note1.push(setTimeout(()=>play(0),v.currentTime+600)) // LA
  note1.push(setTimeout(()=>play1(-4),v.currentTime+900)) //    FA
  note1.push(setTimeout(()=>play(0),v.currentTime+1200))// LA
  note1.push(setTimeout(()=>play(-7),v.currentTime+1500))// RE
  note1.push(setTimeout(()=>play1(3),v.currentTime+1800)) //    DO
  note1.push(setTimeout(()=>play(-7),v.currentTime+2100)) // RE
  note1.push(setTimeout(()=>play(0),v.currentTime+2400)) // LA
  note1.push(setTimeout(()=>play1(-4),v.currentTime+2700)) //    FA
  note1.push(setTimeout(()=>play(0),v.currentTime+3000))// LA
  note1.push(setTimeout(()=>play(-7),v.currentTime+3300))// RE

}

function playfm2() {
  for (i=0; i < note2.length; i++) {
    clearTimeout(note2[i])
   }
  
    note2 = []
note2.push(setTimeout(()=>play1(-9),v.currentTime))//    DO
note2.push(setTimeout(()=>play(2),v.currentTime+300)) // SI
note2.push(setTimeout(()=>play(-5),v.currentTime+600)) // SOL
note2.push(setTimeout(()=>play1(-2),v.currentTime+900)) //    FA
note2.push(setTimeout(()=>play(-5),v.currentTime+1200))// MI
note2.push(setTimeout(()=>play(2),v.currentTime+1500))// RE
note2.push(setTimeout(()=>play1(-9),v.currentTime+1800))//   DO
note2.push(setTimeout(()=>play(2),v.currentTime+2100)) // RE
note2.push(setTimeout(()=>play(-5),v.currentTime+2400)) // MI
note2.push(setTimeout(()=>play1(-2),v.currentTime+2700)) //    FA
note2.push(setTimeout(()=>play(-5),v.currentTime+3000))// MI
note2.push(setTimeout(()=>play(2),v.currentTime+3300))// RE
}

function resetplay(){ 
  o.frequency.value = 440*Math.pow(2,3/12);
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
  dot.classList.toggle("active-dot1", index == step1)
}

function renderDot2(dot , index) {
  dot.classList.toggle("active-dot2", index == step2)
}

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

function scala1() {
playfm1(); 
updateStep1();
resetStep1();
resetplay();
}

function scala2() {
playfm2(); 
updateStep2();
resetStep2();
}

function insieme() {
playfm1(); 
updateStep1();
resetStep1();
playfm2(); 
updateStep2();
resetStep2();
}

var step3 = 0;
var timer3;
function render3() {
  document.querySelectorAll(".dot3").forEach(renderDot3)
}

function renderDot3(dot , index) {
  dot.classList.toggle("active-dot3", index == step3)
}

function updateStep3() {
  render3()
  step3 += 1;
  if(step3 >= rett3.children.length)
  return;   
}

timer3 = setInterval(updateStep3, 260)

function resetStep3() {
  step3 = 0
  clearInterval(timer3)
  timer3=setInterval(updateStep3, 260)
  render3 ()
}

function insieme() {
  playfm1(); 
  playfm2(); 
  updateStep3();
resetStep3();
}