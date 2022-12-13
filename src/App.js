import RhythmTrack from "./components/RhythmTrack";
import { usePlayerContext } from "./PlayerContext";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/theme-tools";
import SideBarSelect from "./components/SideBarSelect";

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
      <Flex flexDir="column">
        <Header />
        <Flex>
          <Sidebar>
            {trackArray.map((track) => (
              <SideBarSelect  
              handleChangeInstrument={handleChangeInstrument}
              trackId={track.id}
              instrument = {track.instrument}
              />
            ))}
          </Sidebar>
          <Box borderRight={"1px"} flex={1} bg={"#3D3D3D"}>
            {trackArray.length > 0 &&
              trackArray.map((track) => (
                <Track
                  key={track.id}
                  styles={styles}
                  trackArray={trackArray}
                  cursor={cursor}
                  handleSetTrack={handleSetTrack}
                  track={track}
                  handleChangeInstrument={handleChangeInstrument}
                />
              ))}
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};

const styles = {
  // global: (props: StyleFunctionProps) => ({
  body: {
    color: "black",
    bg: "#242424",
  },
  // }),

  gridContainer: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "#2196F3",
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
  App: {
    backgroundColor: "2196F3",
  },
};

export default App;
