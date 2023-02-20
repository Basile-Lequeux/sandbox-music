import {
  Box,
  Flex,
  Input,
  Text,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  InputLeftElement,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { usePlayerContext } from "./PlayerContext";
import { FaPlay, FaPause, FaFileUpload } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import './App.css'
export const Header = () => {

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
      zIndex={100}
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
      </Box>
      <Flex flexDir={'column'}>
        <div className={'bpm_box'}>
          <span className={'bpm_value'}>
            {bpmValue}
          </span>
          BPM
        </div>
        <Box padding="10px 0 8px 0" width={'300px'} display={"flex"}>
          <Slider defaultValue={bpmValue} min={60} max={300} onChange={(val) => handleChangeBpmValue(val)}>
            <SliderTrack>
              <SliderFilledTrack/>
            </SliderTrack>
            <SliderThumb/>
          </Slider>
        </Box>

      </Flex>
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
