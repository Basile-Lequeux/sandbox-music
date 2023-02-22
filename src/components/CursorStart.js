import {Flex, Text} from "@chakra-ui/react";
import {usePlayerContext} from "../PlayerContext";
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
        cursorEndingPoint
    } = usePlayerContext();

    const getStyleDotTimeline = (index, isSpacer) => {
        if (isSpacer) {
            return cursor === index ? "timeline_dot_spacer_active" : "timeline_dot_spacer";
        } else {
            return cursor === index ? "timeline_dot_active" : "timeline_dot";
        }

    }

    const isStartingPoint = (index) => {
        if (cursorStartingPoint === index || cursorEndingPoint === (index + 1)) {
            return {color: '#61dafb', border: '1px solid #61dafb'}
        }
    }

    return (
        <Flex>
            <Flex bg="#242424" alignItems={"center"} h={"30px"} w="180px">
                <Text
                    color={"white"}
                    h={"15px"}
                    w={"100px"}
                    style={{marginLeft: "30px", marginRight: "15px"}}
                >
                    Timeline
                </Text>
                {isSelectStartPoint &&
                    <Text
                        color={"white"}
                        h={'14px'}
                        onClick={() => setIsSelectStartPoint(false)}
                    >
                        START
                    </Text>
                }
                {!isSelectStartPoint &&
                    <Text
                        color={"white"}
                        h={'14px'}
                        onClick={() => setIsSelectStartPoint(true)}
                    >
                        END
                    </Text>
                }
            </Flex>
            <Flex>
                {[...Array(nbrOfBeat)].map((x, index) =>
                    (index + 1) % 4 === 0 ? (
                        <div
                            key={index}
                            className={getStyleDotTimeline(index, true)}
                            onClick={() => handleCursorStart(index)}
                            style={isStartingPoint(index)}
                        >
                            {index + 1}
                        </div>
                    ) : (
                        <div
                            key={index}
                            className={getStyleDotTimeline(index, false)}
                            onClick={() => handleCursorStart(index)}
                            style={isStartingPoint(index)}
                        >
                            {index + 1}
                        </div>
                    )
                )}
            </Flex>
        </Flex>
    );
}
