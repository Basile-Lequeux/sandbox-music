import { useState, useEffect } from "react";

const initialState = {
  instrument: "",
  frequency: 0,
};

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const [bpmValue, setBpmValue] = useState(60);
  const [intervalId, setIntervalId] = useState(() => {});

  // document.addEventListener("keydown", function (event) {
  //     var audioId = document.getElementById("" + event.keyCode);
  //     if (audioId == null) {
  //         return;
  //     }
  //     var keypressed = document.getElementById("k" + event.keyCode).classList;

  //     keypressed.add("play");
  //     audioId.currentTime = 0;
  //     audioId.play();
  //     setTimeout(function () {
  //         keypressed.remove("play");
  //     }, 150);
  // });

  useEffect(() => {
    let length = trackArray.length - 1;
    if (cursor > length) {
      setCursor(0);
    }
    if (trackArray[cursor]) {
      playNote(293.7, "triangle");
    }
  }, [cursor]);

  const trackArray = [false, false, false, false];

  const start = () => {
    setCursor(0);
    const delay = 60000 / bpmValue;
    setIntervalId(setInterval(incrementCursor, delay));
  };

  const stop = () => {
    if (intervalId !== (() => {})) {
      clearInterval(intervalId);
    }
    setIntervalId(() => {});
    setCursor(-1);
  };

  const incrementCursor = () => {
    setCursor((cursor) => cursor + 1);
  };

  const setTrack = (i) => {
    const actualGrid = document.getElementById("grid" + i);
    actualGrid.textContent = trackArray[i] ? "" : "♩";

    trackArray[i] = !trackArray[i];
  };

  const context = new AudioContext();
  let oscillator = null;
  let gain = null;

  const playNote = (frequency, type) => {
    oscillator = context.createOscillator();
    gain = context.createGain();
    oscillator.type = type;
    oscillator.connect(gain);
    oscillator.frequency.value = frequency;
    gain.connect(context.destination);
    oscillator.start(0);
    gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
  };

  return (
    <div className="App">
      {!isPlaying ? (
        <button
          onClick={() => {
            setIsPlaying(true);
            start();
          }}
        >
          PLAY
        </button>
      ) : (
        <button
          onClick={() => {
            setIsPlaying(false);
            stop();
          }}
        >
          STOP
        </button>
      )}

      <input
        id="bpm"
        type="number"
        min="40"
        max="220"
        value={bpmValue}
        onChange={(e) => setBpmValue(parseInt(e.target.value))}
      />

      <div style={styles.gridContainer}>
        <div
          style={cursor === 0 ? styles.gridItemColored : styles.gridItem}
          onClick={() => setTrack(0)}
        ></div>
        <div
          style={cursor === 1 ? styles.gridItemColored : styles.gridItem}
          onClick={() => setTrack(1)}
        ></div>
        <div
          style={cursor === 2 ? styles.gridItemColored : styles.gridItem}
          onClick={() => setTrack(2)}
        ></div>
        <div
          style={cursor === 3 ? styles.gridItemColored : styles.gridItem}
          onClick={() => setTrack(3)}
        ></div>
      </div>

      {/* <h1>C major</h1>

            <button onClick={() => {
                playNote(261.6, 'triangle')
            }}> C
            </button>
            <button onClick={() => {
                playNote(293.7, 'triangle')
            }}> D
            </button>
            <button onClick={() => {
                playNote(329.6, 'triangle')
            }}> E
            </button>
            <button onClick={() => {
                playNote(349.2, 'triangle')
            }}> F
            </button>
            <button onClick={() => {
                playNote(392.0, 'triangle')
            }}> G
            </button>
            <button onClick={() => {
                playNote(440.0, 'triangle')
            }}> A
            </button>
            <button onClick={() => {
                playNote(493.9, 'triangle')
            }}> B
            </button>

            <div class="grid-container">
                <div class="grid-item">1</div>
                <div class="grid-item">2</div>
                <div class="grid-item">3</div>
                <div class="grid-item">4</div>
                <div class="grid-item">5</div>
                <div class="grid-item">6</div>
                <div class="grid-item">7</div>
                <div class="grid-item">8</div>
                <div class="grid-item">9</div>
            </div>
            <button id="button_play" onClick={() => clickButtonPlay()}>PLAY</button>


            <div class="container">
                <h1>Beat Box</h1>
                <img src="https://s14.postimg.org/r194s7pld/drumkit2.png"/>
            </div>
            <div class="keys">
                <div class="key" id="k65">
                    A <span class="beats">clap</span>
                </div>
                <div class="key" id="k83">
                    S <span class="beats">hihat</span>
                </div>
                <div class="key" id="k68">
                    D <span class="beats">kick</span>
                </div>
                <div class="key" id="k70">
                    F <span class="beats">openhat</span>
                </div>
                <div class="key" id="k71">
                    G <span class="beats">boom</span>
                </div>
                <div class="key" id="k72">
                    H <span class="beats">ride</span>
                </div>
                <div class="key" id="k74">
                    J <span class="beats">snare</span>
                </div>
                <div class="key" id="k75">
                    K <span class="beats">tom</span>
                </div>
                <div class="key" id="k76">
                    L <span class="beats">tink</span>
                </div>
            </div>

            <audio id="65">
                <source src="https://raw.githubusercontent.com/jayjariwala/JSDrumKit/master/assets/sounds/clap.wav"/>
            </audio>
            <audio id="83">
                <source src="https://raw.githubusercontent.com/jayjariwala/JSDrumKit/master/assets/sounds/hihat.wav"/>
            </audio>
            <audio id="68">
                <source src="https://raw.githubusercontent.com/jayjariwala/JSDrumKit/master/assets/sounds/kick.wav"/>
            </audio>
            <audio id="70">
                <source src="https://raw.githubusercontent.com/jayjariwala/JSDrumKit/master/assets/sounds/openhat.wav"/>
            </audio>
            <audio id="71">
                <source src="https://raw.githubusercontent.com/jayjariwala/JSDrumKit/master/assets/sounds/boom.wav"/>
            </audio>
            <audio id="72">
                <source src="https://raw.githubusercontent.com/jayjariwala/JSDrumKit/master/assets/sounds/ride.wav"/>
            </audio>
            <audio id="74">
                <source src="https://raw.githubusercontent.com/jayjariwala/JSDrumKit/master/assets/sounds/snare.wav"/>
            </audio>
            <audio id="75">
                <source src="https://raw.githubusercontent.com/jayjariwala/JSDrumKit/master/assets/sounds/tink.wav"/>
            </audio>
            <audio id="76">
                <source src="https://raw.githubusercontent.com/jayjariwala/JSDrumKit/master/assets/sounds/tom.wav"/>
            </audio>
        */}
    </div>
  );
};

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "auto auto auto auto",
    backgroundColor: "#2196F3",
    width: "50%",
  },
  gridItem: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    border: "1px solid rgba(0, 0, 0, 0.8)",
    padding: "30px",
    fontSize: "30px",
    textAlign: "center",
  },
  gridItemColored: {
    backgroundColor: "rgba(255, 69, 145, 0.8)",
    border: "1px solid rgba(0, 0, 0, 0.8)",
    padding: "30px",
    fontSize: "30px",
    textAlign: "center",
  },
};

export default App;
