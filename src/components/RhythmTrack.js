import {usePlayerContext} from "../PlayerContext";

export default function RhythmTrack({track, styles, handleSetTrack}) {

    const {
        isPlaying,
        cursor,
    } = usePlayerContext();
    const getStyleRow = (index, note) => {
        if (isPlaying) {
            return cursor === index
                ? styles.gridItemColoredSpacer
                : note && note.isActive
                    ? styles.gridItemColoredNoteSpacer
                    : styles.gridItemSpacer
        } else {
            return note && note.isActive ? styles.gridItemColoredNoteSpacer : styles.gridItemSpacer
        }
    }

    const getStyleRow2 = (index, note) => {
        if (isPlaying) {
            return cursor === index
                ? styles.gridItemColored
                : note && note.isActive
                    ? styles.gridItemColoredNote
                    : styles.gridItem
        } else {
            return note && note.isActive
                ? styles.gridItemColoredNote
                : styles.gridItem
        }
    }
    return (
        <div style={styles.gridContainer}>
            {track &&
                track.beats.length !== 0 &&
                track.beats.map((note, index) =>
                    (index + 1) % 4 === 0 ? (
                        <div
                            key={index}
                            style={getStyleRow(index, note)}
                            onClick={() => handleSetTrack(track, index)}
                        />
                    ) : (
                        <div
                            key={index}
                            style={getStyleRow2(index, note)}
                            onClick={() => handleSetTrack(track, index)}
                        />
                    )
                )}
        </div>
    );
}


