import React from 'react';
import {usePlayerContext} from "../PlayerContext";

function NoteBeat({
    tone,
    isEven,
    track
}) {
    const {
        handleSetMelodicTrack,
        changeDurationOfNote
    } = usePlayerContext();

    const convertDurationIntoWidth = (duration) => {
        return 28 * duration
    }

    return (
        <div className={isEven ? "row_note_even" : "row_note_odd"}>
            {track.beats.map((x, i) =>
                <div
                    key={i}
                    className={track.beats[i].notes.find(t => t.tone === tone) ? 'row_note_beat_active' : 'row_note_beat'}
                    style={track.beats[i].notes.find(t => t.tone === tone) && {width: convertDurationIntoWidth(track.beats[i].notes.find(t => t.tone === tone).duration)}}
                    onClick={() => handleSetMelodicTrack(track, i, tone)}
                    onDragStart={() => changeDurationOfNote(track.id, i, tone)}
                >
                </div>
            )
            }
        </div>
    );
}

export default NoteBeat;