
function blink()
{
    document.querySelectorAll(".dot").forEach(function(item)
    {
      item.classList.toggle("active")
    })
}

// BLINKING DOT IMAGE

var delay = 1000

function startBlinkOnce()
{
  var start = setTimeout(blink, delay)          // after 1 sec
  start = setTimeout(blink, delay + 100)        // 0.1 sec delay: ON
  return
}

// AUDIO

var C = new AudioContext()
var duration = 0.1

function playNote(n)
{
  var o = C.createOscillator()
  var g = C.createGain()
  o.frequency.value = 440 * Math.pow(2, n / 12)     // all notes multiples of A (440 Hz)
  o.connect(g)
  g.connect(C.destination)
  o.start()
  o.stop(C.currentTime + duration)
}

var N = 36                // sound "beep" frequency
var delaySound = 1100

function playOnce()
{
  var note = setTimeout(() => playNote(N), delaySound)
  return
}

function playTwice()
{
  var note = setTimeout(() => playNote(N), delaySound)
  note = setTimeout(() => playNote(N), delaySound + 150)    // repeating after 0.15 s
  return
}

// BOTH

function blinkOnce()
{
  startBlinkOnce()
  playOnce()
}

function blinkTwice()
{
  startBlinkOnce()
  playTwice()
}
