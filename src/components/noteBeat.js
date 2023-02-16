import React, {useState, useEffect} from 'react';
import {usePlayerContext} from "../PlayerContext";

function NoteBeat({
    tone,
    isEven,
    track
}) {
    const {
        handleSetMelodicTrack,
        changeDurationOfNote,
        cursor
    } = usePlayerContext();

    const [rowNoteStyle, setRowNoteStyle] = useState('');

    useEffect(() => {

    }, [cursor]);

    const convertDurationIntoWidth = (duration) => {
        return 63 * duration
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

    return (
        <div className={isEven ? "row_note_even" : "row_note_odd"}>
            {track.beats.map((x, i) =>
                <div
                    key={i}
                    // className={track.beats[i].notes.find(t => t.tone === tone) ? 'row_note_beat_active' : 'row_note_beat'}
                    className={getStyleNote(i)}
                    style={track.beats[i].notes.find(t => t.tone === tone) && {width: convertDurationIntoWidth(track.beats[i].notes.find(t => t.tone === tone).duration)}}
                    onClick={() => handleSetMelodicTrack(track, i, tone)}
                >
                </div>
            )
            }
        </div>
    );
}

export default NoteBeat;