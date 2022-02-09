var c = new AudioContext();

function play(n) {
  const o = c.createOscillator();
  const g = c.createGain();
  o.frequency.value = 440 * Math.pow(2, n / 12);
  o.connect(g);
  g.connect(c.destination);
  const now = c.currentTime;
  g.gain.setValueAtTime(0, now);
  o.start();
  o.stop(now + 1000);
}