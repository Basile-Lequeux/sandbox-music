import { Flex, Text } from "@chakra-ui/react";
import { usePlayerContext } from "../PlayerContext";
import "../App.css";
import React from "react";

export default function CursorStart() {
  const { nbrOfBeat, handleCursorStart, cursor } = usePlayerContext();

  return (
    <Flex>
      <Flex bg="#242424" alignItems={"center"} h={"30px"} w="180px">
        <Text
          color={"white"}
          h={"15px"}
          w={"100px"}
          style={{ marginLeft: "30px", marginRight: "20px" }}
        >
          Timeline
        </Text>
      </Flex>
      <Flex>
        {[...Array(nbrOfBeat)].map((x, index) =>
          (index + 1) % 4 === 0 ? (
            <div
              key={index}
              className={
                cursor === index
                  ? "timeline_dot_spacer_active"
                  : "timeline_dot_spacer"
              }
              onClick={() => handleCursorStart(index)}
            >
              {index + 1}
            </div>
          ) : (
            <div
              key={index}
              className={
                cursor === index ? "timeline_dot_active" : "timeline_dot"
              }
              onClick={() => handleCursorStart(index)}
            >
              {index + 1}
            </div>
          )
        )}
      </Flex>
    </Flex>
  );
}
