
var context1 = new AudioContext()
var context2 = new AudioContext()

var frequenza1 = 880;      // LA5 tone frequency
var frequenza2 = 110;      // LA2 noise frequency
var durata1 = 5;           // 5 seconds tone
var durata2 = 0.06;        // noise duration

function suonatono()
{
    var oscillator1 = context1.createOscillator()
    oscillator1.type = "sine"
    oscillator1.connect(context1.destination)
    oscillator1.frequency.value = frequenza1
    oscillator1.start(context1.currentTime)
    oscillator1.stop(context1.currentTime + durata1)
}

function suonarumore()
{
    var oscillator2 = context2.createOscillator()
    oscillator2.type = "square"         
    oscillator2.connect(context2.destination)
    oscillator2.frequency.value = frequenza2
    oscillator2.start(context2.currentTime)
    oscillator2.stop(context2.currentTime + durata2)
}

ritardoiniziale = 0.5;

function illdisc()
{
  var ideffect = setTimeout(() => suonatono(), ritardoiniziale)         // tone
  ideffect = setTimeout(() => suonarumore(), ritardoiniziale + 800)     // masking noises with random repetitions
  ideffect = setTimeout(() => suonarumore(), ritardoiniziale + 1700)
  ideffect = setTimeout(() => suonarumore(), ritardoiniziale + 2100)
  ideffect = setTimeout(() => suonarumore(), ritardoiniziale + 3900)  
  return
}
