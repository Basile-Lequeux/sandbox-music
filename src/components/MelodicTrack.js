import React from 'react';
import './MelodicTrack.css';
import NoteBeat from "./noteBeat";

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
                    <div className={'melodic_track_frame'}>
                    {/*<div className={"row_note_ghost"}></div>*/}
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
        </>
    );
}