import React from 'react';

export default function Track({
    styles,
    trackArray,
    cursor,
    handleSetTrack
}) {

    return (
        <div style={styles.gridContainer}>
            {trackArray &&
                trackArray.length !== 0 &&
                trackArray.map((note, index) => (
                    <div
                        key={index}
                        style={
                            cursor === index ? styles.gridItemColored : styles.gridItem
                        }
                        onClick={() => handleSetTrack(index)}
                    >
                        {note && note.instrument ? "♩" : "X"}
                    </div>
                ))}
        </div>
    );
}