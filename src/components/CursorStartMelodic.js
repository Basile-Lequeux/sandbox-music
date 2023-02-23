import React from "react";
import { usePlayerContext } from "../PlayerContext";
import { Flex } from "@chakra-ui/react";

export default function CursorStartMelodic(props) {
  const {
    nbrOfBeat,
    handleCursorStart,
    cursor,
    cursorStartingPoint,
    cursorEndingPoint,
  } = usePlayerContext();

  const getStyleDotTimeline = (index, isSpacer) => {
    if (isSpacer) {
      return cursor === index
        ? "timeline_dot_melodic_spacer_active"
        : "timeline_dot_melodic_spacer";
    } else {
      return cursor === index
        ? "timeline_dot_melodic_active"
        : "timeline_dot_melodic";
    }
  };

  const isStartingPoint = (index) => {
    if (cursorStartingPoint === index || cursorEndingPoint === index + 1) {
      return { color: "white", border: "1px solid black" };
    }
  };

  return (
    <Flex>
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
