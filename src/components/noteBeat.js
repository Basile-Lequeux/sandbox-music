import React from 'react';
import {usePlayerContext} from "../PlayerContext";

function NoteBeat({
    tone,
    isEven,
    track
}) {
    const {
        handleSetMelodicTrack,
        cursor
    } = usePlayerContext();

    const convertDurationIntoWidth = (duration) => {
        if (duration === -1) {
            return 0
        } else {

            return 63 * duration
        }
    }

    const getStyleNote = (i) => {
        let style = ''
        if (track.beats[i].notes.find(t => t.tone === tone)) {
            style += 'row_note_beat_active'
        } else {
            style += 'row_note_beat'
        }
        if (cursor === i) {
            style += '_cursor'
        }
        return style
    }

    const getWidthNote = (i) => {
        const activeCurrentNote = track.beats[i].notes.find(t => t.tone === tone)
        if (activeCurrentNote) {
            return {width: convertDurationIntoWidth(activeCurrentNote.duration)}
        }
    }

    return (
        <div className={isEven ? "row_note_even" : "row_note_odd"}>
            {track.beats.map((x, i) =>
                <div
                    key={i}
                    className={getStyleNote(i)}
                    style={getWidthNote(i)}
                    onClick={() => handleSetMelodicTrack(track, i, tone)}
                >
                </div>
            )
            }
        </div>
    );
}

export default NoteBeat;