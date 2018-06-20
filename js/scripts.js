// Play
window.addEventListener("keydown", sampleLookup);

function sampleLookup(event) {
  var key = event.key;
  var samples = {
    "f" : { audio: "Snare01.wav", key: "f" },
    "h" : { audio: "Kick01.wav", key: "h" },
    "g" : { audio: "Hat01.wav", key: "g" },
    "t" : { audio: "Hat02.wav", key: "t" },
    "r" : { audio: "Snare02.wav", key: "r" },
    "v" : { audio: "Snare03.wav", key: "v" }
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
      block.position = {}
      block.position.left = 1000;
      blocks.push(block);
}

var t = setInterval(update,164); //88 bpm?

function update() {
  blocks.forEach(function(b, i) {
  	blocks[i].position.left =  blocks[i].position.left - 50;
    if (blocks[i].position.left < 0) {
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
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(b.position.left,0,30,20);
  });
}
