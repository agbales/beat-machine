window.addEventListener("keydown", sampleLookup);

function sampleLookup(event) {
  var key = event.key;
  var samples = {
    "f" : "Snare01.wav",
    "h" : "Kick01.wav",
    "g" : "Hat01.wav", 
    "t" : "Hat02.wav",
    "r" : "Snare02.wav",
    "v" : "Snare03.wav"
  }
  var sample = samples[key];
  play(sample);
}

function play(sample) {
  var source = "./samples/" + sample;
  var audio = new Audio(source);
  audio.play();
}
