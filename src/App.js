import {useState, useEffect} from "react";
import Track from "./Track";

const initialState = {
    instrument: "",
    frequency: 0,
};

const App = () => {


    const [isPlaying, setIsPlaying] = useState(false);
    const [countCell, setCountCell] = useState(4);
    const [cursor, setCursor] = useState(-1);
    const [instrument, setInstrument] = useState("triangle");
    const [bpmValue, setBpmValue] = useState(60);
    const [intervalId, setIntervalId] = useState(() => {});
    const [audioContext, setAudioContext] = useState(() => {});
    const [trackArray, setTrackArray] = useState([]);


    useEffect(() => {
        let length = trackArray.length - 1;
        if (cursor > length) {
            setCursor(0);
        }
        if (trackArray[cursor] && trackArray[cursor].instrument !== "") {
            playNote(trackArray[cursor].frequency, trackArray[cursor].instrument);
        }
    }, [cursor]);

    useEffect(() => {
        setTrackArray([]);
        for (let i = 0; i < countCell; i++) {
            setTrackArray((trackArray) => [...trackArray, initialState]);
        }
    }, [countCell]);

    const start = () => {
        if (!audioContext) {
            setAudioContext(new AudioContext());
        }
        setCursor(0);
        const delay = 60000 / bpmValue;
        setIntervalId(setInterval(incrementCursor, delay));
    };

    const stop = () => {
        if (intervalId !== (() => {
        })) {
            clearInterval(intervalId);
        }
        setIntervalId(() => {
        });
        setCursor(-1);
    };

    const incrementCursor = () => {
        setCursor((cursor) => cursor + 1);
    };

    const handleSetTrack = (i) => {
        let tempArray = [...trackArray];
        if (trackArray[i].instrument !== instrument) {
            let tempInitialState = {instrument: instrument, frequency: 293.7};
            tempArray[i] = tempInitialState;
            setTrackArray(tempArray);
        } else {
            tempArray[i] = initialState;
            setTrackArray(tempArray);
        }
    };

    const playNote = (frequency, type) => {
        let oscillator = null;
        let gain = null;
        console.log(frequency);
        console.log(type);
        oscillator = audioContext.createOscillator();
        gain = audioContext.createGain();
        oscillator.type = type;
        oscillator.connect(gain);
        oscillator.frequency.value = frequency;
        gain.connect(audioContext.destination);
        oscillator.start(0);
        gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1);
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

            <input
                id="countCell"
                type="number"
                min="4"
                max="20"
                value={countCell}
                onChange={(e) => setCountCell(parseInt(e.target.value))}
            />

           <Track
               styles={styles}
               trackArray={trackArray}
               cursor={cursor}
               handleSetTrack={handleSetTrack}
           />

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
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#2196F3",
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
