import React from "react";
import { drumKitList } from "./PlaySound";

export default function Track({
  track,
  styles,
  cursor,
  handleSetTrack,
  handleChangeInstrument,
}) {
  return (
    <div style={styles.gridContainer}>
      <div>
        <div
          value={track.instrument}
          onChange={(e) => handleChangeInstrument(track.id, e.target.value)}
        >
          <select>
            {drumKitList.map((elem, i) => (
              <option key={i} value={elem.label}>
                {elem.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {track &&
        track.notes.length !== 0 &&
        track.notes.map((note, index) => (
          <div
            key={index}
            style={
                cursor === index
                ? styles.gridItemColored
                : note && note.isActive
                ? styles.gridItemColoredNote
                : styles.gridItem
            }
            onClick={() => handleSetTrack(track.id, index)}
          />
        ))}
    </div>
  );
}
