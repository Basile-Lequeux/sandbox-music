import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
  Input,
  Text,
} from "@chakra-ui/react";
import { Track } from "./components/Track";
import { usePlayerContext } from "./PlayerContext";
import * as React from "react";
import { FiMenu } from "react-icons/fi";
import { FaPlay, FaPause } from "react-icons/fa";
import { useState } from "react";

export const Header = () => {
  const incrementCount = () => {
    const incr = bpmValue + 1;
    handleChangeBpmValue(incr);
  };

  const decrementCount = () => {
    const incr = bpmValue - 1;
    handleChangeBpmValue(incr);
  };

  let [count, setCount] = useState(0);

  const {
    handleChangeBpmValue,
    isPlaying,
    bpmValue,
    start,
    stop,
    handleChangePlaying,
    nbrOfBeat,
    handleChangeNbrOfBeat,
    trackArray,
    cursor,
    handleSetTrack,
    nbrOfTrack,
    handleSetNbrOfTrack,
    handleChangeInstrument,
  } = usePlayerContext();
  // const isDesktop = useBreakpointValue({ base: false, lg: true })
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flex={1}
      textAlign={"center"}
      display={"inline-block"}
      flexDirection={"row"}
    >
      <Box
        flex={1}
        // boxShadow="lg"
        bg="#242424"
        as="section"
        pb={{ base: "1", md: "1" }}
        py={{ base: "4", lg: "2" }}
      >
        {!isPlaying ? (
          <button
          p='4'
            onClick={() => {
              handleChangePlaying(true);
              start();
            }}
          >
            <FaPlay color="tomato" />
          </button>
        ) : (
          <button
          p='4'
            onClick={() => {
              handleChangePlaying(false);
              stop();
            }}
          >
            <FaPause color="tomato" />
          </button>
        )}
        <Button p='4' bgColor={"white"} onClick={incrementCount}>
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
        <Button bgColor={"white"} onClick={decrementCount}>
          -
        </Button>
        <Text
          // as='cite'
          align={"right"}
          bgGradient="linear(to-r, #434445, #e74138)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
          mr={"10"}
        >
          Melodiv
        </Text>

        <Input
          id="countCell"
          type="number"
          bg={"white"}
          w={"50px"}
          min={4}
          max={100}
          value={nbrOfBeat}
          onChange={(e) => {
            console.log("beat ", e.target.value);
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
    </Flex>
  );
};
export default Header;
