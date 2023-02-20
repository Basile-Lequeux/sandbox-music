import React, {useState} from 'react';
import {usePlayerContext} from "../PlayerContext";

function NoteBeat({
    tone,
    isEven,
    track
}) {
    const {
        handleSetMelodicTrack,
        cursor,
        selectNoteKeyBoard
    } = usePlayerContext();

    const [onHover, setOnHover] = useState(false);
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
        } else if(onHover) {
            // return {width: convertDurationIntoWidth(parseInt(selectNoteKeyBoard))}
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
                    onMouseEnter={() => setOnHover(i)}
                    onMouseLeave={() => setOnHover(-1)}
                >
                    {onHover === i &&
                        <>
                            {tone}
                        </>
                    }
                    {onHover !== i && track.beats[i].notes.find(t => t.tone === tone) && track.beats[i].notes.find(t => t.tone === tone).duration > 0 &&
                        <>
                            {tone}
                        </>
                    }
                </div>
            )
            }
        </div>
    );
}

export default NoteBeat;