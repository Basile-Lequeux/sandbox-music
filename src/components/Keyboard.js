import React from 'react';
import NoteKey from "./NoteKey";

export default function Keyboard(props) {

    const styles = {
        keyBoard: {
            backgroundColor: "#ad2d2d",
            display: "flex",
            flexDirection: "column",
            width: "3%"
        }
    }
    return (
        <div style={styles.keyBoard}>
            <NoteKey note='C'/>
            <NoteKey note='C#'/>
            <NoteKey note='D'/>
            <NoteKey note='D#'/>
            <NoteKey note='E'/>
            <NoteKey note='F'/>
            <NoteKey note='F#'/>
            <NoteKey note='G'/>
            <NoteKey note='G#'/>
            <NoteKey note='A'/>
            <NoteKey note='A#'/>
            <NoteKey note='B'/>
            <NoteKey note='C'/>
        </div>

    );
}