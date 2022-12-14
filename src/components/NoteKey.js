import React, {useState} from 'react';
import * as Tone from 'tone';

export default function NoteKey({
    note
}) {

    const handleClick = () => {
        const synth = new Tone.Synth().toMaster();
        synth.triggerAttackRelease(note + '4', '8n');
    };
    const isBlackKey = note.length > 1

    const styles = {
        key: {
            backgroundColor: "#ddd",
            borderRadius: "5px",
            width: "50px",
            height: "15px",
            display: "inline-block",
            textAlign: "center",
            fontWeight: "bold",
            color: "#555",
        },
        black_key: {
            backgroundColor: "black",
            width: "25px",
            height: "15px",
            display: "inline-block",
            textAlign: "center",
            fontWeight: "bold",
            position: "relative",
            float: "left",
            margin : "0 0 0 2em",
            zIndex:"1",
        },
        white_key: {
            zIndex:"2",
            backgroundColor: "white",
            borderRadius: "5px",
            width: "50px",
            height: "15px",
            display: "inline-block",
            textAlign: "center",
            fontWeight: "bold",
            position: "relative",
            float: "left",
        }
    }

    return (
        <div style={isBlackKey ? styles.black_key : styles.white_key} onClick={handleClick} />

    );
};