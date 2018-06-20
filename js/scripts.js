(function() {

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
      highlightKeyboard(sample.key);
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
    // width of #midi-grid... update whole array on resize ... proportion
    block.left = 300;
    blocks.push(block);
    updateMidiGrid(blocks);
  }

  var t = setInterval(update, 100); // Need to determine BPM ratios

  function update() {
    // append
    updateMidiGrid(blocks);
    // update for next render
    blocks.forEach(function(b, i) {
    	blocks[i].left =  blocks[i].left - 5;
      if (blocks[i].left < 0) {
        console.log('delete', blocks[i])
        blocks.splice(i,1);
      }
    });
    console.log(blocks);
  }

  function updateMidiGrid(blocks) {
    var canvas = document.getElementById("midi-grid");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    blocks.forEach(function(b){
      ctx.fillStyle = b.color;
      ctx.fillRect(b.left,b.height,20,20);
    });

    updateMidiBarLines();
  }

  var bars = [400, 300, 200, 100];

  function updateMidiBarLines() {
    var canvas = document.getElementById("midi-grid");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 1;

    bars.forEach(function(b, i) {
      bars[i] = bars[i] - 5;
      if (b > 0) {
        ctx.beginPath();
        ctx.moveTo(b,0);
        ctx.lineTo(b,175);
        ctx.stroke();
      } else {
        console.log("under 0: adding new bar")
        var newBar = 400;
        bars.unshift(newBar);
        bars.pop();
        console.log(bars)
      }
    });
  }

  function highlightKeyboard(key) {
    console.log("key", key);
    document.getElementById(key).classList.add('flash-key');
    setTimeout(function() {
      document.getElementById(key).classList.remove('flash-key');
    }, 100);
  }
})();
