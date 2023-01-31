import RhythmTrack from "./components/RhythmTrack";
import {usePlayerContext} from "./PlayerContext";
import {Header} from "./Header";
import {Sidebar} from "./Sidebar";
import {Box, Flex} from "@chakra-ui/react";
import SideBarSelect from "./components/SideBarSelect";
import {FaPlus} from "react-icons/fa";

const App = () => {

    const MAX_RHYTHM_TRACK = 8

    const {
        cursor,
        handleSetTrack,
        handleChangeInstrument,
        rhythmTrackArray,
        addRhythmTrack,
        nbrOfTrack
    } = usePlayerContext();

    return (
        <div className="App">
            <Flex flexDir="column">
                <Header/>
                <Flex>
                    <Sidebar>
                        {rhythmTrackArray.map((track) => (
                            <SideBarSelect
                                handleChangeInstrument={handleChangeInstrument}
                                trackId={track.id}
                                instrument={track.instrument}
                            />
                        ))}
                        {nbrOfTrack < MAX_RHYTHM_TRACK &&
                            <Box
                                bg="rgba(255, 255, 255, 0.8)"
                                h="62px"
                                cursor={'pointer'}
                                onClick={() => addRhythmTrack()}
                            >
                                <Box m="10%" align="center">
                                    <FaPlus
                                        size="30px"
                                    />
                                </Box>
                            </Box>
                        }
                    </Sidebar>
                    <Box borderRight={"1px"} flex={1} bg={"#3D3D3D"}>
                        {rhythmTrackArray.length > 0 &&
                            rhythmTrackArray.map((track) => (
                                <RhythmTrack
                                    key={track.id}
                                    styles={styles}
                                    trackArray={rhythmTrackArray}
                                    cursor={cursor}
                                    handleSetTrack={handleSetTrack}
                                    track={track}
                                    handleChangeInstrument={handleChangeInstrument}
                                />
                            ))}
                    </Box>
                </Flex>
                {/*<Box borderRight={"1px"} flex={1} bg={"#3D3D3D"}>*/}
                {/*    {melodicTrackArray &&*/}
                {/*        melodicTrackArray.map((track) =>*/}
                {/*            <MelodicTrack*/}
                {/*                key={track.id}*/}
                {/*                styles={styles}*/}
                {/*                cursor={cursor}*/}
                {/*                handleSetMelodicTrack={handleSetMelodicTrack}*/}
                {/*                track={track}*/}
                {/*            />*/}
                {/*        )*/}
                {/*    }*/}
                {/*</Box>*/}
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
