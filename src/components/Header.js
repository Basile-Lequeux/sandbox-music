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
  Link,
} from "@chakra-ui/react";
import { usePlayerContext } from "../PlayerContext";
import { FaPlay, FaPause, FaFileUpload } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdGraphicEq } from "react-icons/md";
import "../App.css";

export const Header = ({ modalIsOpen, setModalIsOpen }) => {
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
        <Link
          bgGradient="linear(to-r, #434445, #e74138)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
          href="https://melodiv.netlify.app/"
        >
          Melodiv
        </Link>
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
        <Flex flexDir={"column"}>
          <div className={"bpm_box"}>
            <span className={"bpm_value"}>{bpmValue}</span>
            BPM
          </div>
          <Box width={"300px"} display={"flex"}>
            <Slider
              defaultValue={bpmValue}
              min={60}
              max={300}
              onChange={(val) => handleChangeBpmValue(val)}
            >
              <SliderTrack>
                <SliderFilledTrack bg="#e74138" />
              </SliderTrack>
              <SliderThumb>
                <Box color="#e74138" as={MdGraphicEq} />
              </SliderThumb>
            </Slider>
          </Box>
        </Flex>
      </Box>
      <Box padding="10px 0 8px 0" display={"flex"}>
        <InputGroup>
          <InputLeftAddon w={'69px'}>Beats</InputLeftAddon>
          <InputLeftElement left={"68px"} className={'elem-hover'} onClick={deleteMeasure}>
            <FiMinus></FiMinus>
          </InputLeftElement>
          <Box
              w={'105px'}
              bg={'white'}
              p={'8px 0 0 0'}
              style={{fontSize:'17px'}}
          >
            {nbrOfBeat}
          </Box>
          <InputRightElement className={'elem-hover'} onClick={addMeasure}>
            <FiPlus></FiPlus>
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box padding="10px 30px 8px 0" display={"flex"}>
        <button
          onClick={() => {
            setModalIsOpen(!modalIsOpen);
          }}
        >
          <FaFileUpload color="#e74138" size={"25"} />
        </button>
      </Box>
    </Flex>
  );
};

export default Header;
