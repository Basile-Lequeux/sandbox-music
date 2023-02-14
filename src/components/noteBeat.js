import React from 'react';
import {usePlayerContext} from "../PlayerContext";

function NoteBeat({
    tone,
    isEven,
    track
}) {
    console.log("-> track", track);

    const {
        cursor,
        nbrOfBeat,
        handleSetMelodicTrack
    } = usePlayerContext();

    return (
        <div className={isEven ? "row_note_even" : "row_note_odd"}>
            {track.beats.map((x, i) =>
                <div
                    key={i}
                    className={track.beats[i].tone.find(t => t === tone) ? 'row_note_beat_active' : 'row_note_beat'}
                    onClick={() => handleSetMelodicTrack(track, i, tone)}
                >
                </div>
            )
            }
        </div>
    );
}

export default NoteBeat;