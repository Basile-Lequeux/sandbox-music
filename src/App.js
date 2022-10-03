import { useState, useEffect } from "react";

const initialState = {
  instrument: "",
  frequency: 0,
};

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const [instrument, setInstrument] = useState("triangle");
  const [bpmValue, setBpmValue] = useState(60);
  const [intervalId, setIntervalId] = useState(() => {});
  const [trackArray, setTrackArray] = useState([
    { instrument: instrument, frequency: 293.7 },
    initialState,
    initialState,
    initialState,
  ]);

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
    if (trackArray[cursor] && trackArray[cursor].instrument !== "") {
      playNote(trackArray[cursor].frequency, trackArray[cursor].instrument);
    }
  }, [cursor]);

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
    let tempArray = trackArray;
    if (trackArray[i].instrument !== instrument) {
      let tempInitialState = { instrument: instrument, frequency: 293.7 };
      tempArray[i] = tempInitialState;
      setTrackArray(tempArray);
    } else {
      tempArray[i] = initialState;
      setTrackArray(tempArray);
    }
  };

  const context = new AudioContext();

  const playNote = (frequency, type) => {
    let oscillator = null;
    let gain = null;
    console.log(frequency);
    console.log(type);
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
        {trackArray &&
          trackArray.length !== 0 &&
          trackArray.map((note, index) => (
            <div
              key={index}
              style={
                cursor === index ? styles.gridItemColored : styles.gridItem
              }
              onClick={() => setTrack(index)}
            >
              {note && note.instrument ? "♩" : ""}
            </div>
          ))}
      </div>
      <div value={instrument} onChange={(e) => setInstrument(e.target.value)}>
        <select>
          <option value={"triangle"}>Triangle</option>
          <option value={"square"}>Square</option>
          <option value={"sawtooth"}>Sawtooth</option>
          <option value={"sine"}>Sine</option>
        </select>
      </div>
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
