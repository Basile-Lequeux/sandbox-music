import React from 'react';

export default function Track({
    track,
    styles,
    cursor,
    handleSetTrack
}) {

    return (
        <div style={styles.gridContainer}>
            {track && track.notes.length !== 0 &&
                track.notes.map((note, index) => (
                    <div
                        key={index}
                        style={cursor === index ? styles.gridItemColored : styles.gridItem}
                        onClick={() => handleSetTrack(track.id, index)}
                    >
                        {note && note.instrument ? "♩" : "X"}
                    </div>
                ))}
        </div>
    );
}