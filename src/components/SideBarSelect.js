import React from "react";
import { drumKitList } from "../PlaySound";
import { Flex, Select } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const SideBarSelect = ({
  trackId,
  instrument,
  handleChangeInstrument,
  deleteOneTrack,
  type = "rhythm",
  index,
  length,
}) => {
  return (
    <Flex
      justify={"center"}
      alignItems={"center"}
      h={"62px"}
      style={{ marginLeft: "30px", marginRight: "20px" }}
    >
      {length >= 2 ? (
        <button
          onClick={() => deleteOneTrack(index, type)}
          style={{ paddingRight: "5px" }}
        >
          <FaTrash color="#e74138" size={"20"} />
        </button>
      ) : (
        <div style={{ paddingRight: "25px" }} />
      )}
      <Select
        bg={"white"}
        h={"30px"}
        onChange={(e) => handleChangeInstrument(trackId, e.target.value)}
        value={instrument}
        placeholder="Select instrument"
        style={{ width: "100px" }}
        size="sm"
      >
        {type === "rhythm" &&
          drumKitList.map((elem, i) => (
            <option key={i} value={elem.label}>
              {elem.label}
            </option>
          ))}
        {type === "melodic" && <option value="piano">piano</option>}
      </Select>
    </Flex>
  );
};

export default SideBarSelect;
