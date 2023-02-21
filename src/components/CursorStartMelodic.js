import React from 'react';
import {usePlayerContext} from "../PlayerContext";
import {Flex, Text} from "@chakra-ui/react";

export default function CursorStartMelodic(props) {
    const {
        nbrOfBeat,
        cursorStartingPoint,
        handleCursorStart,
        cursor
    } = usePlayerContext();

    return (
        <Flex>
            <Flex>
                {[...Array(nbrOfBeat)].map((x, index) =>
                    <div
                        key={index}
                        className={cursor === index ? 'timeline_dot_melodic_active' : 'timeline_dot_melodic'}
                        onClick={() => handleCursorStart(index)}
                    >
                        {index + 1}
                    </div>
                )}
            </Flex>
        </Flex>
    );
}