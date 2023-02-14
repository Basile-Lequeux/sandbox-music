import React from 'react';
import './MelodicTrack.css';
import NoteKey from "./NoteKey";
import {FaItunesNote} from "react-icons/fa";

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

    return (
        <>
            <div
                style={styles.previewMelodicTrack}
                onClick={() => selectMelodicTrack()}
            >
                <FaItunesNote
                    size="50px"
                />
            </div>
        </>
    );
}