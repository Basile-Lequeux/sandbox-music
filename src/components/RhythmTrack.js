import {usePlayerContext} from "../PlayerContext";
import './RhythmTrack.css'

export default function RhythmTrack({track, handleSetTrack}) {

    const {
        isPlaying,
        cursor,
    } = usePlayerContext();

    const getStyleRow = (index, note) => {
        if (isPlaying) {
            if (cursor === index) {
                return note.isActive ? "grid_item_active_spacer" : "gridItemSpacer"
            } else {
                return note.isActive ? "gridItemColoredNoteSpacer" : "gridItemSpacer"
            }
        } else {
            return note && note.isActive ? "gridItemColoredNoteSpacer" : "gridItemSpacer"
        }
    }

    const getStyleRow2 = (index, note) => {
        if (isPlaying) {
            if (cursor === index) {
                return note.isActive ? "grid_item_active" : "gridItem"
            } else {
                return note.isActive ? "gridItemColoredNote" : "gridItem"
            }
        }
        else {
            return note && note.isActive
                ? "gridItemColoredNote"
                : "gridItem"
        }
    }
    return (
        <div className="gridContainer">
            {track &&
                track.beats.length !== 0 &&
                track.beats.map((note, index) =>
                    (index + 1) % 4 === 0 ? (
                        <div
                            key={index}
                            className={getStyleRow(index, note)}
                            onClick={() => handleSetTrack(track, index)}
                        />
                    ) : (
                        <div
                            key={index}
                            className={getStyleRow2(index, note)}
                            onClick={() => handleSetTrack(track, index)}
                        />
                    )
                )}
        </div>
    );
}


