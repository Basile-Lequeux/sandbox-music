import {
  Box,
  Flex,
  Input,
  Text,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import { usePlayerContext } from "./PlayerContext";
import { FaPlay, FaPause, FaFileUpload } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";

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
    nbrOfBeat,
    addMeasure,
    deleteMeasure,
  } = usePlayerContext();

  return (
    <Flex
      textAlign="center"
      bg="#242424"
      justifyContent={"space-between"}
      alignItems={"center"}
      position={"fixed"}
      w={"100%"}
    >
      <Box padding="10px 0 8px 30px" display={"flex"}>
        <Text
          bgGradient="linear(to-r, #434445, #e74138)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
        >
          Melodiv
        </Text>
      </Box>
      <Box padding="10px 0 8px 0" display={"flex"}>
        <Box paddingRight="10px" display={"flex"}>
          {!isPlaying ? (
            <button
              onClick={() => {
                // handleChangePlaying(true);
                start();
              }}
            >
              <FaPlay color="#e74138" size={"25"} />
            </button>
          ) : (
            <button
              onClick={() => {
                // handleChangePlaying(false);
                stop();
              }}
            >
              <FaPause color="#e74138" size={"25"} />
            </button>
          )}
        </Box>
        <InputGroup>
          <InputLeftAddon>BPM</InputLeftAddon>
          <InputLeftElement left={"70"}>
            <FiMinus onClick={decrementCount}></FiMinus>
          </InputLeftElement>

          <Input
            inputMode="none"
            outline={"none"}
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
          <InputRightElement>
            <FiPlus onClick={incrementCount}></FiPlus>
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box padding="10px 0 8px 0" display={"flex"}>
        <InputGroup>
          <InputLeftAddon>Measures</InputLeftAddon>
          <InputLeftElement left={"100px"}>
            <FiMinus onClick={deleteMeasure}></FiMinus>
          </InputLeftElement>
          <Input
            id="countCell"
            type="number"
            bg={"white"}
            w={"100px"}
            value={nbrOfBeat}
            disabled={true}
          />
          <InputRightElement>
            <FiPlus onClick={addMeasure}></FiPlus>
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box padding="10px 30px 8px 0" display={"flex"}>
        <button
          onClick={() => {
            // save file
          }}
        >
          <FaFileUpload color="#e74138" size={"25"} />
        </button>
      </Box>
    </Flex>
  );
};

export default Header;
