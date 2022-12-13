import React from 'react';
import PlaySound, {drumKitList} from "../PlaySound";
import './MelodicTrack.css';
import NoteKey from "./NoteKey";

export default function MelodicTrack({
    track,
    styles,
    cursor,
    handleSetMelodicTrack
}) {

    return (
        <div style={styles.gridContainer}>
            {track && track.notes.length !== 0 &&
                track.notes.map((beat, index) =>
                    <div
                        key={index}
                        style={
                            cursor === index
                                ? styles.gridItemColoredSpacer
                                : beat && beat.isActive
                                    ? styles.gridItemColoredNoteSpacer
                                    : styles.gridItemSpacer
                        }
                        onClick={() => handleSetMelodicTrack(track, index)}
                    >
                    </div>
                )
            }
        </div>
    );
}