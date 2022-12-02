import RhythmTrack from "./components/RhythmTrack";
import { usePlayerContext } from "./PlayerContext";

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
    rhythmTrackArray,
    cursor,
    handleSetTrack,
    nbrOfTrack,
    handleSetNbrOfTrack,
    handleChangeInstrument,
  } = usePlayerContext();

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
        min={40}
        max={400}
        value={bpmValue}
        onChange={(e) => {
          if (
            parseInt(e.target.min) > parseInt(e.target.value) ||
            !e.target.value
          ) {
            handleChangeBpmValue(parseInt(e.target.min));
          } else if (parseInt(e.target.max) < parseInt(e.target.value)) {
            handleChangeBpmValue(parseInt(e.target.max));
          } else {
            handleChangeBpmValue(parseInt(e.target.value));
          }
        }}
      />

      <input
        id="nbrOfMeasure"
        type="number"
        min={4}
        step={4}
        max={20}
        value={nbrOfBeat}
        onChange={(e) => {
          if (parseInt(e.target.min) > parseInt(e.target.value) || !e.target.value) {
            handleChangeNbrOfBeat(parseInt(e.target.min));
          } else if (parseInt(e.target.max) < parseInt(e.target.value)) {
            handleChangeNbrOfBeat(parseInt(e.target.max));
          } else {
            handleChangeNbrOfBeat(parseInt(e.target.value));
          }
        }}
      />

      <input
        id="nbrOfTrack"
        type="number"
        min={1}
        max={20}
        value={nbrOfTrack}
        onChange={(e) => {
          if (
            parseInt(e.target.min) > parseInt(e.target.value) ||
            !e.target.value
          ) {
            handleSetNbrOfTrack(parseInt(e.target.min));
          } else if (parseInt(e.target.max) < parseInt(e.target.value)) {
            handleSetNbrOfTrack(parseInt(e.target.max));
          } else {
            handleSetNbrOfTrack(parseInt(e.target.value));
          }
        }}
      />

      {rhythmTrackArray.length > 0 &&
          rhythmTrackArray.map((track) =>
          <RhythmTrack
            key={track.id}
            styles={styles}
            cursor={cursor}
            handleSetTrack={handleSetTrack}
            track={track}
            handleChangeInstrument={handleChangeInstrument}
          />
        )}
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
  gridItemSpacer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    border: "1px solid rgba(0, 0, 0, 0.8)",
    padding: "30px",
    marginRight: "5px",
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
  gridItemColoredSpacer: {
    backgroundColor: "rgba(255, 69, 145, 0.8)",
    border: "1px solid rgba(0, 0, 0, 0.8)",
    padding: "30px",
    marginRight: "5px",
    fontSize: "30px",
    textAlign: "center",
  },
  gridItemColoredNote: {
    backgroundColor: "rgba(125, 69, 145, 0.8)",
    border: "1px solid rgba(0, 0, 0, 0.8)",
    padding: "30px",
    fontSize: "30px",
    textAlign: "center",
  },
  gridItemColoredNoteSpacer: {
    backgroundColor: "rgba(125, 69, 145, 0.8)",
    border: "1px solid rgba(0, 0, 0, 0.8)",
    padding: "30px",
    marginRight: "5px",
    fontSize: "30px",
    textAlign: "center",
  },
};

export default App;
