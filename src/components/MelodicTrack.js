import React from 'react';
import './MelodicTrack.css';
import NoteBeat from "./noteBeat";
import {Box, Radio, RadioGroup, Stack} from "@chakra-ui/react";
import {usePlayerContext} from "../PlayerContext";

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
                <Box>
                    Change duration
                    <RadioGroup onChange={setSelectNoteKeyBoard} value={selectNoteKeyBoard}>
                        <Stack direction='row'>
                            <Radio value={'1'}>Eight note</Radio>
                            <Radio value={'2'}>Quarter note</Radio>
                            <Radio value={'3'}>3 note</Radio>
                            <Radio value={'4'}>4 note</Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
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