import React from 'react';
import {usePlayerContext} from "../PlayerContext";

function NoteBeat({
    tone,
    isEven,
}) {

    const {
        cursor,
        nbrOfBeat
    } = usePlayerContext();


    return (
        <div className={isEven ? "row_note_even" : "row_note_odd"}>
            {[...Array(nbrOfBeat)].map((x, i) =>
                <div key={i} className='row_note_beat'></div>
            )
            }
        </div>
    );
}

export default NoteBeat;