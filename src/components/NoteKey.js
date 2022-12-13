import React, {useState} from 'react';
import * as Tone from 'tone';

export default function NoteKey({
    note
}) {

    const handleClick = () => {
        const synth = new Tone.Synth().toMaster();
        synth.triggerAttackRelease(note + '4', '8n');

    };

    return (
        <div className="key" onClick={handleClick}>
            {note}
        </div>

    );
};