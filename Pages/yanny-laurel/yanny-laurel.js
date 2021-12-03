var Gain = 10;
var FilterFreq = 1500;
var FilterNum = 4;
var init = false;
var audioCtx, filters, gainNode;
var filterGain = -25;

var onPlay = function()
{
  if (!init)
  {
    if (!createFilters()) {
      alert("Web Audio API is not supported in this browser");
      return;
    }
    init = true;
  }

  onConfig();
};

var onConfig = function() {
  if (!init)
  {
    return;
  }

  filterGain = parseFloat(document.getElementById("filterGain").value);
  updateFilters();
}

var createFilters = function()
{
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  
  if (!AudioContext)
  {
    return false;
  }

  audioCtx = new AudioContext();
  filters = [];

  for (var i = 0; i < FilterNum; i++)
  {
    var f = audioCtx.createBiquadFilter();
    f.type = "highshelf";
    f.Q = Math.SQRT1_2;
    f.frequency.value = FilterFreq;
    f.gain.value = 0;
    filters.push(f);
  }

  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0;

  var audioElem = document.querySelector('audio');
  var source = audioCtx.createMediaElementSource(audioElem);
  var pin = source;

  for (var i = 0; i < FilterNum; i++)
  {
    pin.connect(filters[i]);
    pin = filters[i];
  }

  pin.connect(gainNode);
  pin = gainNode;
  pin.connect(audioCtx.destination);
  return true;
};


var updateFilters = function()
{
  gainNode.gain.value = 0;

  for (var i = 0; i < filters.length; i++)
  {
    filters[i].type = filterGain > 0 ? "lowshelf" : "highshelf";
    filters[i].gain.value = - Math.abs(filterGain) / FilterNum;
  }
  gainNode.gain.value = dbToField(Gain) / Math.sqrt(0.5 + 0.5 * dbToPower(- Math.abs(filterGain)));
};


var dbToPower = function(x)
{
  return Math.exp(x / 10 * Math.LN10);
};


var dbToField = function(x)
{
  return Math.exp(x / 20 * Math.LN10);
};
