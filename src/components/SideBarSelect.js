import React from "react";
import { drumKitList } from "../PlaySound";
import { Flex, Select } from "@chakra-ui/react";

const SideBarSelect = ({
  trackId,
  instrument,
  handleChangeInstrument,
  type = "rhythm",
}) => {
  return (
    <Flex
      justify={"center"}
      alignItems={"center"}
      h={"62px"}
      style={{ marginLeft: "30px", marginRight: "20px" }}
    >
      <Select
        bg={"white"}
        h={"30px"}
        w={"100px"}
        onChange={(e) => handleChangeInstrument(trackId, e.target.value)}
        value={instrument}
        placeholder="Select instrument"
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
