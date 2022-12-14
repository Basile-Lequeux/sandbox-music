import {
    Box,
    Button,
    Flex,
    Input,
    Text,
} from "@chakra-ui/react";
import {usePlayerContext} from "./PlayerContext";
import {FaPlay, FaPause} from "react-icons/fa";

export const Header = () => {
    const incrementCount = () => {
        const incr = bpmValue + 1;
        handleChangeBpmValue(incr);
    };

    const decrementCount = () => {
        const incr = bpmValue - 1;
        handleChangeBpmValue(incr);
    };

    const {
        handleChangeBpmValue,
        isPlaying,
        bpmValue,
        start,
        stop,
        handleChangePlaying,
        nbrOfBeat,
        handleChangeNbrOfBeat,
        nbrOfTrack,
        handleSetNbrOfTrack,
    } = usePlayerContext();

    return (
        <Flex
            textAlign="center"
            bg="#242424"
            justifyContent="space-between"
        >
            <Box
                marginLeft="35%"
                padding="8px 0 8px 0"
            >
                {!isPlaying ? (
                    <button
                        onClick={() => {
                            handleChangePlaying(true);
                            start();
                        }}
                    >
                        <FaPlay
                            color="tomato"/>
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            handleChangePlaying(false);
                            stop();
                        }}
                    >
                        <FaPause color="tomato"/>
                    </button>
                )}
                <Button bgColor="white" onClick={incrementCount} margin='0 2px 5px 2px'>
                    +
                </Button>
                <Input
                    bg="white"
                    borderRadius="8"
                    w="150px"
                    id="bpm"
                    textAlign={"center"}
                    placeholder="BPM"
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
                <Button bgColor={"white"} onClick={decrementCount} margin='0 2px 5px 2px'>
                    -
                </Button>
            </Box>
            <Box
                padding="8px 0 8px 0"
            >
                <Input
                    id="countCell"
                    type="number"
                    bg={"white"}
                    w={"50px"}
                    min={4}
                    max={100}
                    value={nbrOfBeat}
                    onChange={(e) => {
                        if (
                            parseInt(e.target.min) > parseInt(e.target.value) ||
                            !e.target.value
                        ) {
                            handleChangeNbrOfBeat(parseInt(e.target.min));
                        } else if (parseInt(e.target.max) < parseInt(e.target.value)) {
                            handleChangeNbrOfBeat(parseInt(e.target.max));
                        } else {
                            handleChangeNbrOfBeat(parseInt(e.target.value));
                        }
                    }}
                />

                <Input
                    id="nbrOfTrack"
                    type="number"
                    w={"50px"}
                    bg={"white"}
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
            </Box>

            <Text
                align={"right"}
                bgGradient="linear(to-r, #434445, #e74138)"
                bgClip="text"
                fontSize="4xl"
                fontWeight="extrabold"
                mr={"10"}
            >
                Melodiv
            </Text>
            {/*</Box>*/}
        </Flex>
    );
};
export default Header;
