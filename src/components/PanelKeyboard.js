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
import {playMelodicSound} from "../PlaySound";

const PanelKeyboard = ({
    showPanelKeyboard,
    setShowPanelKeyboard,
    melodicTrackSelected
}) => {

    const {
        cursor,
        nbrOfBeat
    } = usePlayerContext();


    const octave = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5']

    const isBlackKey = (tone) => {
        return tone.length > 2
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
                                    onClick={() => playMelodicSound(tone)}
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
                                    track={melodicTrackSelected}
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