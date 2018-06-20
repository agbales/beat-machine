// Play
window.addEventListener("keydown", sampleLookup);

function sampleLookup(event) {
  var key = event.key;
  var samples = {
    "f" : { audio: "Snare01.wav", key: "f", height: 0, color: "#FF0000" },
    "h" : { audio: "Kick01.wav", key: "h", height: 40, color: "#FF0000" },
    "g" : { audio: "Hat01.wav", key: "g", height: 80, color: "#FF0000" },
    "t" : { audio: "Hat02.wav", key: "t", height: 120, color: "#FF0000" },
    "r" : { audio: "Snare02.wav", key: "r", height: 160, color: "#FF0000" },
    "v" : { audio: "Snare03.wav", key: "v", height: 200, color: "#FF0000" }
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
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  blocks.forEach(function(b){
    ctx.fillStyle = b.color;
    ctx.fillRect(b.left,b.height,30,20);
  });
}
