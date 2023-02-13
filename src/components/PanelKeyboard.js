import React, {useState} from 'react';
import './MelodicTrack.css';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Flex,
    Grid,
    GridItem
} from '@chakra-ui/react'
import {usePlayerContext} from "../PlayerContext";
import NoteBeat from "./noteBeat";

const PanelKeyboard = ({
    showPanelKeyboard,
    setShowPanelKeyboard
}) => {

    const {
        cursor,
        nbrOfBeat
    } = usePlayerContext();


    const octave = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    const isBlackKey = (tone) => {
        return tone.length > 1
    }

    return (
        <>
            <Drawer
                placement='bottom'
                isOpen={showPanelKeyboard}
                onClose={setShowPanelKeyboard}
                autoFocus={false}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader borderBottomWidth='1px'>Keyboard</DrawerHeader>
                    <div className='scrollable'>
                        <div className="piano-keyboard">
                            {octave.map((tone, i) =>
                                <div
                                    className={isBlackKey(tone) ? "black-key" : "white-key"}
                                    key={i}
                                >
                                </div>
                            )}
                        </div>
                        <Flex
                            flexDir={'column'}
                        >
                            <div className={"row_note_ghost"}></div>
                            {octave.map((tone, i) =>
                                <NoteBeat
                                    key={i}
                                    tone={tone}
                                    isEven={i % 2 === 0}
                                />
                            )}
                        </Flex>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default PanelKeyboard;