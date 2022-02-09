
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

// maybe not useful because two blinking dots are not needed, just playTwice()

// function startBlinkTwice()
// {
//   var start = setTimeout(blink, delay)         // after 1 sec
//   start = setTimeout(blink, delay + 100)       // 0.1 sec delay: ON
//   start = setTimeout(blink, delay + 200)       // 0.2 sec delay: OFF
//   start = setTimeout(blink, delay + 300)       // 0.3 sec delay: ON
//   return
// }

function stopBlink()
{
  if (start)
    clearInterval(start);
}

// AUDIO

var c = new AudioContext()
var duration = 0.1

function playNote(n)
{
  var o = c.createOscillator()
  var g = c.createGain()
  o.frequency.value = 440 * Math.pow(2, n / 12)     // all notes multiples of A (440 Hz)
  o.connect(g)
  g.connect(c.destination)
  o.start()
  o.stop(c.currentTime + duration)
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
