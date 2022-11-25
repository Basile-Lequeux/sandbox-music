import {useState, useEffect} from "react";
import Track from "./Track";
import {usePlayerContext} from "./PlayerContext";


const App = () => {


    const {
        isPlaying,
        bpmValue,
        start,
        stop,
        handleChangePlaying,
        handleChangeBpmValue,
        nbrOfBeat,
        handleChangeNbrOfBeat,
        trackArray,
        cursor,
        handleSetTrack,
        nbrOfTrack,
        handleSetNbrOfTrack,
        handleChangeInstrument
    } = usePlayerContext()


    return (
        <div className="App">
            {!isPlaying ? (
                <button
                    onClick={() => {
                        handleChangePlaying(true);
                        start();
                    }}
                >
                    PLAY
                </button>
            ) : (
                <button
                    onClick={() => {
                        handleChangePlaying(false);
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
                onChange={(e) => handleChangeBpmValue(parseInt(e.target.value))}
            />

            <input
                id="countCell"
                type="number"
                min="4"
                max="20"
                value={nbrOfBeat}
                onChange={(e) => handleChangeNbrOfBeat(parseInt(e.target.value))}
            />

            <input
                id="nbrOfTrack"
                type="number"
                min="1"
                max="4"
                value={nbrOfTrack}
                onChange={(e) => handleSetNbrOfTrack(parseInt(e.target.value))}
            />

            {trackArray.length > 0 && trackArray.map(track => (
                    <Track
                        key={track.id}
                        styles={styles}
                        trackArray={trackArray}
                        cursor={cursor}
                        handleSetTrack={handleSetTrack}
                        track={track}
                        handleChangeInstrument={handleChangeInstrument}
                    />
                ))
            }
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
