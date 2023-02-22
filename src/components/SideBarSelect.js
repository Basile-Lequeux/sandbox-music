import React, { useEffect, useState } from "react";
import { drumKitList, instrumentKit } from "../PlaySound";
import { Box, Flex, Select } from "@chakra-ui/react";
import { FaMinus, FaPlus } from "react-icons/fa";
import "../App.css";
import { usePlayerContext } from "../PlayerContext";

const SideBarSelect = ({
  trackId,
  instrument,
  type = "rhythm",
  index,
  length,
}) => {
  const { handleChangeInstrument, addRhythmTrack, deleteOneTrack, nbrOfTrack } =
    usePlayerContext();

  const [canAddTrack, setCanAddTrack] = useState(true);

  useEffect(() => {
    if (nbrOfTrack > 7) {
      setCanAddTrack(false);
    } else {
      setCanAddTrack(true);
    }
  }, [nbrOfTrack]);

  return (
    <Flex h={"50px"} justify={"center"} alignItems={"center"}>
      <Box
        paddingLeft={"20px"}
        paddingRight={"20px"}
        minW={"130px"}
        w={"130px"}
      >
        <Select
          bg={"white"}
          h={"30px"}
          onChange={(e) => handleChangeInstrument(type, trackId, e.target.value)}
          value={instrument}
          size={"xs"}
        >
          {type === "rhythm" &&
            drumKitList.map((elem, i) => (
              <option key={i} value={elem.label}>
                {elem.label}
              </option>
            ))}
          {type === "melodic" &&
            instrumentKit.map((elem, i) => (
              <option key={i} value={elem.value}>
                {elem.label}
              </option>
            ))}
        </Select>
      </Box>
      <Flex w={"50px"} justifyContent={"center"}>
        {length >= 2 ? (
          <button
            className="button_delete_track"
            onClick={() => deleteOneTrack(index, type)}
            style={{ marginLeft: "5px" }}
          >
            <FaMinus size={"15"} />
          </button>
        ) : (
          <div style={{ paddingRight: "25px" }} />
        )}
        {index === length - 1 && canAddTrack && type !== "melodic" ? (
          <button
            className="button_add_track"
            onClick={() => addRhythmTrack()}
            style={{ marginLeft: "7px" }}
          >
            <FaPlus size={"15"} />
          </button>
        ) : (
          <div style={{ paddingRight: "25px" }} />
        )}
      </Flex>
    </Flex>
  );
};

export default SideBarSelect;
