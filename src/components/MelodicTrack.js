import React from 'react';
import PlaySound, {drumKitList} from "../PlaySound";
import './MelodicTrack.css';
import NoteKey from "./NoteKey";

export default function MelodicTrack({
    track,
    styles,
    cursor,
    handleSetTrack
}) {

    return (
            <div className="keyboard">
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