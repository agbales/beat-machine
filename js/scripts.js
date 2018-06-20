// Play
window.addEventListener("keydown", sampleLookup);

function sampleLookup(event) {
  var key = event.key;
  var samples = {
    "r" : { audio: "Snare02.wav", key: "r", height: 0, color: "#e1f7d5" },
    "t" : { audio: "Hat02.wav", key: "t", height: 30, color: "#ffbdbd" },
    "f" : { audio: "Snare01.wav", key: "f", height: 60, color: "#c9c9ff" },
    "g" : { audio: "Hat01.wav", key: "g", height: 90, color: "#f1cbff" },
    "h" : { audio: "Kick01.wav", key: "h", height: 120, color: "#e1f7d5" },
    "v" : { audio: "Snare03.wav", key: "v", height: 150, color: "#ffbdbd" }
  }
  var sample = samples[key];

  if (sample) {
    play(sample);
    add(sample);
  }
}

function play(sample) {
  var source = "./samples/" + sample.audio;
  var audio = new Audio(source);
  audio.play();
}

// Visualize
var blocks = [];

function add(sample) {
  var block = sample;
      block.left = 1000;
      blocks.push(block);
}

var t = setInterval(update,164); // Need to determine BPM ratios

function update() {
  blocks.forEach(function(b, i) {
  	blocks[i].left =  blocks[i].left - 50;
    if (blocks[i].left < 0) {
      console.log('delete', blocks[i])
      blocks.splice(i,1);
    }
  });
  console.log(blocks);
  updateMidiGrid(blocks);
}

function updateMidiGrid(blocks) {
  var canvas = document.getElementById("midi-grid");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  blocks.forEach(function(b){
    ctx.fillStyle = b.color;
    ctx.fillRect(b.left,b.height,30,20);
  });
}
