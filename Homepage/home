import { EffectComposer } from "https://unpkg.com/three@0.120.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://unpkg.com/three@0.120.0/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://unpkg.com/three@0.120.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OrbitControls } from "https://unpkg.com/three@0.120.0/examples/jsm/controls/OrbitControls";
var options = {
  exposure: 2.8,
  bloomStrength: 4,
  bloomThreshold: 0,
  bloomRadius: 0.1,
  color0: [255, 16, 16],
  color1: [61, 48, 0],
};
// var gui = new dat.GUI();

// var bloom = gui.addFolder("Bloom");
// // bloom.add(options, "exposure", 0.0, 5.0).name("exposure").listen();
// bloom.add(options, "bloomStrength", 0.0, 5.0).name("bloomStrength").listen();
// // bloom.add(options, "bloomThreshold", 0.0, 1.0).name("bloomThreshold").listen();
// bloom.add(options, "bloomRadius", 0.1, 2.0).name("bloomRadius").listen();
// bloom.open();
const volume = -12;

let player, loaded, analyser;

let playing = false;
var fftSize = 128 * 8;
var dimension = fftSize;

const vert = `
  varying vec2 vUv;
  varying float freq;
  varying vec3 vposition;
  uniform sampler2D tAudioData;
  uniform float time;

  void main() {
    vUv = uv;
    vec3 newPos = position;
    float f = texture2D( tAudioData, vUv).r;
    // newPos.z += 3.*f;
    // newPos.x = .00001;
    // gl_Position = vec4( newPos, 1.0 );
    vposition = newPos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

const frag = `
  uniform sampler2D tAudioData;
  varying vec2 vUv;
  varying vec3 vposition;
  varying float freq;
  uniform float opacity;

  void main() {
    vec4 txt = texture2D(tAudioData, vUv);
    gl_FragColor = vec4(1. - txt.r);


  }
`;

var scene,
  camera,
  renderer,
  uniforms,
  bloomPass,
  composer,
  controls,
  audiodata,
  sampleObj = [];
var startButton = document.getElementById("runScene");

function init() {
  var container = document.getElementById("world");
	startButton.style.visibility = 'hidden';

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  camera.position.set(0, -4.3, 2.4);

  renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  var renderScene = new RenderPass(scene, camera);

  bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  bloomPass.threshold = options.bloomThreshold;
  bloomPass.strength = options.bloomStrength;
  bloomPass.radius = options.bloomRadius;

  composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  container.appendChild(renderer.domElement);

  Tone.Master.volume.value = volume;
  const player = new Tone.Player('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Yung_Kartz/August_2019/Yung_Kartz_-_05_-_Picture_Perfect.mp3').toDestination();
  player.autostart = true;
  player.loopStart = 1.0;
  player.connect(Tone.Master);
  analyser = new Tone.Analyser("waveform", fftSize);
  player.connect(analyser);

  window.addEventListener("resize", onResize, false);
  startAnimating(60);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function plane() {
  var geometry = new THREE.PlaneBufferGeometry(7, 7, dimension, dimension);
  uniforms = {
    tAudioData: {
      value: new THREE.DataTexture(
        analyser.getValue(),
        dimension,
        dimension,
        THREE.UnsignedByteType,
        THREE.FloatType
      ),
    },
    // gradient: {
    //   type: "t",
    //   value: new THREE.TextureLoader().load(color7),
    // },
    time: {
      value: 0.0,
      type: "f",
    },
    opacity: {
      value: 0.0,
      type: "f",
    },
  };
  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vert,
    fragmentShader: frag,
    // wireframe: true,
  });

  var mesh = new THREE.Mesh(geometry, material);

  // scene.add(mesh);
}
var line;
function circle() {
  var material = new THREE.LineBasicMaterial({ color: 0xffffff });
  var points = [];
  for (let i = 0; i <= 1 * Math.PI; i += (2 * Math.PI) / dimension) {
    const r = 1;
    const x = r * Math.cos(i);
    const y = r * Math.sin(i);
    points.push(new THREE.Vector3(x, y, 0));
  }
  var curve = new THREE.SplineCurve(points);
  var curvepoints = curve.getPoints(50);

  var geometry = new THREE.Geometry().setFromPoints(curvepoints);
  line = new THREE.Line(geometry, material);
  scene.add(line);
}

var stop = false;
var frameCount = 0;
var h = 0;
// var $results = $("#results");
var fps, fpsInterval, startTime, now, then, elapsed;
function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  const values = analyser.getValue();
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % fpsInterval);

    if (sampleObj.length === 40) {
      sampleObj[0].destroy();
      sampleObj = sampleObj.slice(1, sampleObj.length);
    } else {
      const samp = new SampleLine(scene, values);
      samp.init();
      sampleObj.push(samp);
    }

    // Put your drawing code here
  }
  sampleObj.forEach((element) => {
    var color = new THREE.Color(`hsl(${h}, 100%, 100%)`);
    element.animatemesh(h);
    h += 0.01;
    if (h >= 359) {
      h = 0;
    }
  });

  // renderer.render(scene, camera);
  bloomPass.threshold = options.bloomThreshold;
  bloomPass.strength = options.bloomStrength;
  bloomPass.radius = options.bloomRadius;
  composer.render();

  requestAnimationFrame(animate);
}
document.getElementById("runScene").addEventListener("click", init);

class SampleLine {
  constructor(scene, data) {
    this.scene = scene;
    this.data = data;
    this.delta = 1;
  }

  init() {
    var material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      opacity: 1,
      transparent: true,
    });
    var points = [];
    var offset = (2 * Math.PI) / dimension;
    for (let i = 0; i < 2 * Math.PI; i += offset) {
      const r = 1;
      const x = r * Math.cos(i);
      const y = r * Math.sin(i);
      // if (this.data[~~i / offset] === undefined) {
      //   console.log(i / offset, this.data);
      // }
      // console.log(this.data[points.length]);

      if (i === 2 * Math.PI) {
        points.push(new THREE.Vector3(x, y, this.data[0] / 2));
      } else {
        points.push(new THREE.Vector3(x, y, this.data[points.length] / 2));
      }
    }

    var geometry = new THREE.Geometry().setFromPoints(points);
    this.mesh = new THREE.Line(geometry, material);
    scene.add(this.mesh);
  }

  destroy() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    scene.remove(this.mesh);
  }

  animatemesh(h) {
    this.mesh.scale.set(this.delta, this.delta, 1);
    this.mesh.material.opacity = 1 - this.delta / 7;
    this.mesh.material.color = new THREE.Color(
      `hsl(${h}, 100%, ${~~(100 - this.delta * 10)}%)`
    );
    this.delta += 0.09;
  }
}
