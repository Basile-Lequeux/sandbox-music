import React, { useState } from "react";
import RhythmTrack from "./components/RhythmTrack";
import { usePlayerContext } from "./PlayerContext";
import { Header } from "./components/Header";
import CursorStart from "./components/CursorStart";
import { Sidebar } from "./components/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import SideBarSelect from "./components/SideBarSelect";
import { FaRedo } from "react-icons/fa";
import MelodicTrack from "./components/MelodicTrack";
import ModalSave from "./components/ModalSave";
import PanelKeyboard from "./components/PanelKeyboard";

const App = () => {
  const {
    stop,
    cursor,
    handleSetTrack,
    handleChangeInstrument,
    rhythmTrackArray,
    addRhythmTrack,
    deleteOneTrack,
    melodicTrackArray,
    handleSetMelodicTrack,
    initRhythmTrackDefault,
    initMelodicTrackDefault,
    isPlaying,
  } = usePlayerContext();

  const [showPanelKeyboard, setShowPanelKeyboard] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [melodicTrackSelected, setMelodicTrackSelected] = useState();

  const resetTrack = (type) => {
    if (isPlaying) {
      stop()
    }
    if (type === 'rhythm') {
      initRhythmTrackDefault();
    }
    if (type === 'melodic') {
      initMelodicTrackDefault()
    }
  }
  return (
    <div className="App">
      <Flex flexDir="column">
        <Header
          modalIsOpen={modalIsOpen}
          setModalIsOpen={(e) => setModalIsOpen(e)}
        />
        <Box marginTop="81px">
          <CursorStart styles={styles} />
          <Flex>
            <Sidebar>
              {rhythmTrackArray.map((track, index) => (
                <SideBarSelect
                  key={track.id}
                  trackId={track.id}
                  instrument={track.instrument}
                  index={index}
                  deleteOneTrack={deleteOneTrack}
                  length={rhythmTrackArray.length}
                />
              ))}
              <button
                style={{ marginLeft: "25px" }}
                onClick={() => resetTrack('rhythm')}
              >
                <FaRedo color="#e74138" size={"20"} />
              </button>
              <Box
                h="62px"
                cursor={"pointer"}
                onClick={() => addRhythmTrack()}
              />
              {melodicTrackArray.map((track, index) => (
                <SideBarSelect
                  key={track.id}
                  trackId={track.id}
                  instrument={
                    track.instrument === "" ? "synth" : track.instrument
                  }
                  type={"melodic"}
                  index={index}
                  deleteOneTrack={deleteOneTrack}
                  length={melodicTrackArray.length}
                />
              ))}
              <button
                style={{ marginLeft: "25px" }}
                onClick={() => resetTrack('melodic')}
              >
                <FaRedo color="#e74138" size={"20"} />
              </button>
            </Sidebar>
            <Flex flexDir="column">
              <Box>
                {rhythmTrackArray.length > 0 &&
                  rhythmTrackArray.map((track) => (
                    <RhythmTrack
                      key={track.id}
                      trackArray={rhythmTrackArray}
                      handleSetTrack={handleSetTrack}
                      track={track}
                      handleChangeInstrument={handleChangeInstrument}
                    />
                  ))}
              </Box>
              <Box
                borderRight={"1px"}
                flex={1}
                bg={"#3D3D3D"}
                marginTop={"62px"}
              >
                {melodicTrackArray &&
                  melodicTrackArray.map((track) => (
                    <MelodicTrack
                      key={track.id}
                      styles={styles}
                      cursor={cursor}
                      handleSetMelodicTrack={handleSetMelodicTrack}
                      track={track}
                      showPanelKeyboard={showPanelKeyboard}
                      setShowPanelKeyboard={setShowPanelKeyboard}
                      setMelodicTrackSelected={setMelodicTrackSelected}
                    />
                  ))}
              </Box>
            </Flex>
          </Flex>
          <PanelKeyboard
            showPanelKeyboard={showPanelKeyboard}
            setShowPanelKeyboard={setShowPanelKeyboard}
            melodicTrackSelected={melodicTrackSelected}
          />
        </Box>
      </Flex>
      <ModalSave
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
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

  previewMelodicTrack: {
    display: "flex",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    border: "1px solid rgba(0, 0, 0, 0.8)",
    padding: "30px",
    textAlign: "center",
  },
  gridItem: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    border: "1px solid rgba(0, 0, 0, 0.8)",
    padding: "30px",
    textAlign: "center",
  },
  gridItemSpacer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    border: "1px solid rgba(0, 0, 0, 0.8)",
    padding: "30px",
    marginRight: "5px",
    textAlign: "center",
  },
  gridItemColored: {
    backgroundColor: "rgba(217, 65, 57, 0.8)",
    border: "1px solid rgba(0, 0, 0, 0.8)",
    padding: "30px",
    textAlign: "center",
  },
  gridItemColoredSpacer: {
    backgroundColor: "rgba(217, 65, 57, 0.8)",
    border: "1px solid rgba(0, 0, 0, 0.8)",
    padding: "30px",
    marginRight: "5px",
    textAlign: "center",
  },
  gridItemColoredNote: {
    backgroundColor: "rgba(125, 69, 145, 0.8)",
    border: "1px solid rgba(0, 0, 0, 0.8)",
    padding: "30px",
    textAlign: "center",
  },
  gridItemColoredNoteSpacer: {
    backgroundColor: "rgba(125, 69, 145, 0.8)",
    border: "1px solid rgba(0, 0, 0, 0.8)",
    padding: "30px",
    marginRight: "5px",
    textAlign: "center",
  },
  App: {
    backgroundColor: "2196F3",
  },
};

export default App;
