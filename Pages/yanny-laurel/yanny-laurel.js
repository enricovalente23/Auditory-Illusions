import * as Tone from 'tone'

function play() {
var audio = new Audio('https://upload.wikimedia.org/wikipedia/en/transcoded/8/8b/YannyLaurel.ogg/YannyLaurel.ogg.mp3');
  audio.play();
}

const sampler = new Tone.Sampler({
	baseUrl: "https://upload.wikimedia.org/wikipedia/en/transcoded/8/8b/YannyLaurel.ogg/YannyLaurel.ogg.mp3",
}).toDestination();

Tone.loaded().then(
  () =>
  {
	sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 4);
})

document.querySelector('button')?.addEventListener('click', async () => {
	await Tone.start()
	console.log('Audio is ready')
})

const player = new Tone.Player({
	url: "https://upload.wikimedia.org/wikipedia/en/transcoded/8/8b/YannyLaurel.ogg/YannyLaurel.ogg.mp3",
	autostart: true,
});
const filter = new Tone.Filter(400, 'lowpass').toDestination();

// connect the player to the feedback delay and filter in parallel
player.connect(filter);

function playLOW() {
  player.play();
}

