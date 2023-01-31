import React from 'react';
import './MelodicTrack.css';
import NoteKey from "./NoteKey";
import {FaItunesNote} from "react-icons/fa";

export default function MelodicTrack({
    track,
    styles,
    cursor,
    handleSetMelodicTrack
}) {

    return (
        <>
            <div style={styles.previewMelodicTrack}>
                <FaItunesNote
                    size="50px"
                />
                {/*{track && track.beats.length !== 0 &&*/}
                {/*    track.beats.map((beat, index) =>*/}
                {/*        <div*/}
                {/*            key={index}*/}
                {/*            style={*/}
                {/*                cursor === index*/}
                {/*                    ? styles.gridItemColoredSpacer*/}
                {/*                    : beat && beat.isActive*/}
                {/*                        ? styles.gridItemColoredNoteSpacer*/}
                {/*                        : styles.gridItemSpacer*/}
                {/*            }*/}
                {/*            onClick={() => handleSetMelodicTrack(track, index)}*/}
                {/*        >*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*}*/}
            </div>
        </>
    );
}