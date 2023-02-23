import React from 'react';
import './MelodicTrack.css';
import NoteBeat from "./noteBeat";
import {Box, Radio, RadioGroup, Stack, Flex, Card, CardBody} from "@chakra-ui/react";
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

    const notesPanel = () => {
        const arr = []
        const limit = track.instrument === 'bass' ? 4 : 7
        const octave = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
        for (let i = 1; i < limit; i++) {
            octave.map(o => arr.push(o + i))
        }
        return arr
    }

    return (
        <>
            <div
                className={'melodic_track_container'}
                // onClick={() => selectMelodicTrack()}
            >
                <Box h='230px'>
                    <Flex
                        flexDir={'column'}
                        w={'345px'}
                        p={'12px'}
                    >
                        <Card bg={'rgba(255, 255, 255, 0.02)'}>
                            <CardBody>
                        <Box>
                            Choose the duration of the note you will pick
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

                            </CardBody>
                        </Card>
                    </Flex>
                </Box>
                <CursorStartMelodic />
                <div className="scrollable">
                    <div className={'melodic_track_frame'}>
                        {notesPanel().map((tone, i) => (
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