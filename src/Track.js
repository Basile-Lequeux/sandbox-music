import React from 'react';

export default function Track({
    track,
    styles,
    cursor,
    handleSetTrack,
    handleChangeInstrument
}) {

    return (
        <div style={styles.gridContainer}>
            <div>
                <div value={track.instrument} onChange={(e) => handleChangeInstrument(track.id, e.target.value)}>
                    <select>
                        <option value={"triangle"}>Triangle</option>
                        <option value={"square"}>Square</option>
                        <option value={"sawtooth"}>Sawtooth</option>
                        <option value={"sine"}>Sine</option>
                    </select>
                </div>
            </div>
            {track && track.notes.length !== 0 &&
                track.notes.map((note, index) => (
                    <div
                        key={index}
                        style={cursor === index ? styles.gridItemColored : styles.gridItem}
                        onClick={() => handleSetTrack(track.id, index)}
                    >
                        {note && note.isActive ? "♩" : "X"}
                    </div>
                ))}
        </div>
    );
}