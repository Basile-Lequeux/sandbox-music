import React from 'react';
import './MelodicTrack.css';
import NoteBeat from "./noteBeat";
import {Box, Radio, RadioGroup, Stack, Flex} from "@chakra-ui/react";
import {usePlayerContext} from "../PlayerContext";
import {BsMusicNote} from "react-icons/bs"
import CursorStartMelodic from "./CursorStartMelodic";

export default function MelodicTrack({
    track,
    styles,
    showPanelKeyboard,
    setShowPanelKeyboard,
    setMelodicTrackSelected
}) {

    const selectMelodicTrack = () => {
        setShowPanelKeyboard(!showPanelKeyboard)
        setMelodicTrackSelected(track)
    }

    const {
        selectNoteKeyBoard,
        setSelectNoteKeyBoard
    } = usePlayerContext();

    const octave = [
        "C1",
        "C#1",
        "D1",
        "D#1",
        "E1",
        "F1",
        "F#1",
        "G1",
        "G#1",
        "A1",
        "A#1",
        "B1",
        "C2",
        "C#2",
        "D2",
        "D#2",
        "E2",
        "F2",
        "F#2",
        "G2",
        "G#2",
        "A2",
        "A#2",
        "B2",
        "C3",
        "C#3",
        "D3",
        "D#3",
        "E3",
        "F3",
        "F#3",
        "G3",
        "G#3",
        "A3",
        "A#3",
        "B3",
        "C4",
        "C#4",
        "D4",
        "D#4",
        "E4",
        "F4",
        "F#4",
        "G4",
        "G#4",
        "A4",
        "A#4",
        "B4",
        "C5",
        "C#5",
        "D5",
        "D#5",
        "E5",
        "F5",
        "F#5",
        "G5",
        "G#5",
        "A5",
        "A#5",
        "B5",
        "C6",
    ];

    return (
        <>
            <div
                className={'melodic_track_container'}
                // onClick={() => selectMelodicTrack()}
            >
                <Box h='230px'>
                    <Flex flexDir={'column'}>
                        <Box>
                            Choose the duration of the note you will picked
                        </Box>
                        <RadioGroup
                            onChange={setSelectNoteKeyBoard}
                            value={selectNoteKeyBoard}
                            margin='auto'
                        >
                            <Stack direction='row'>
                                <Radio value={'1'}>
                                    <BsMusicNote/>
                                </Radio>
                                <Radio value={'2'}>
                                    <Flex>
                                        <BsMusicNote/>
                                        <BsMusicNote/>
                                    </Flex>
                                </Radio>
                                <Radio value={'3'}>
                                    <Flex>
                                        <BsMusicNote/>
                                        <BsMusicNote/>
                                        <BsMusicNote/>
                                    </Flex>
                                </Radio>
                                <Radio value={'4'}>
                                    <Flex>
                                        <BsMusicNote/>
                                        <BsMusicNote/>
                                        <BsMusicNote/>
                                        <BsMusicNote/>
                                    </Flex>
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </Flex>
                </Box>
                <CursorStartMelodic />
                <div className="scrollable">
                    <div className={'melodic_track_frame'}>
                        {octave.map((tone, i) => (
                            <NoteBeat
                                key={i}
                                tone={tone}
                                isEven={i % 2 === 0}
                                track={track}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}