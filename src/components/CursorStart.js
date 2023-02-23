import { Flex, Text } from "@chakra-ui/react";
import { usePlayerContext } from "../PlayerContext";
import "../App.css";
import React from "react";

export default function CursorStart() {
  const {
    nbrOfBeat,
    handleCursorStart,
    cursor,
    cursorStartingPoint,
    setIsSelectStartPoint,
    isSelectStartPoint,
    cursorEndingPoint,
  } = usePlayerContext();

  const getStyleDotTimeline = (index, isSpacer) => {
    if (isSpacer) {
      return cursor === index
        ? "timeline_dot_spacer_active"
        : "timeline_dot_spacer";
    } else {
      return cursor === index ? "timeline_dot_active" : "timeline_dot";
    }
  };

  const isStartingPoint = (index) => {
    if (cursorStartingPoint === index || cursorEndingPoint === index + 1) {
      return { color: "white", border: "1px solid black" };
    }
  };

  return (
    <Flex>
      <Flex bg="#242424" alignItems={"center"} h={"30px"} w="180px">
        <Text color={"white"} h={"15px"} w={"130px"}>
          Timeline
        </Text>
        <Text
          color={"white"}
          h={"14px"}
          w={"50px"}
          onClick={() => setIsSelectStartPoint(!isSelectStartPoint)}
        >
          {isSelectStartPoint ? "START" : "END"}
        </Text>
      </Flex>
      <Flex>
        {[...Array(nbrOfBeat)].map((x, index) => (
          <div
            key={index}
            className={getStyleDotTimeline(index, (index + 1) % 4 === 0)}
            onClick={() => handleCursorStart(index)}
            style={isStartingPoint(index)}
          >
            {index + 1}
          </div>
        ))}
      </Flex>
    </Flex>
  );
}
