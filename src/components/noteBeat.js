import React, { Fragment, useState } from "react";
import { usePlayerContext } from "../PlayerContext";

function NoteBeat({ tone, isEven, track }) {
  const { handleSetMelodicTrack, cursor, selectNoteKeyBoard } =
    usePlayerContext();

  const [onHover, setOnHover] = useState(-1);
  const convertDurationIntoWidth = (duration, index) => {
    let width = 0;
    let spacerWidth = 0;

    if (duration === -1) {
      width = 0;
    } else {
      for (let i = 1; i < duration + 1; i++) {
        if ((index + i) % 4 === 0) {
          spacerWidth = 10;
        }
      }
      width = 48 * duration + spacerWidth;
    }
    return width;
  };

  const getStyleNote = (i) => {
    let style = "";
    if ((i + 1) % 4 === 0) {
      if (track.beats[i].notes.find((t) => t.tone === tone)) {
        style += "row_note_beat_spacer_active";
      } else {
        style += "row_note_beat_spacer";
      }
      if (cursor === i) {
        style += "_cursor";
      }
    } else {
      if (track.beats[i].notes.find((t) => t.tone === tone)) {
        style += "row_note_beat_active";
      } else {
        style += "row_note_beat";
      }
      if (cursor === i) {
        style += "_cursor";
      }
    }
    return style;
  };

  const getWidthNote = (i) => {
    const activeCurrentNote = track.beats[i].notes.find((t) => t.tone === tone);

    if (activeCurrentNote) {
      return {
        width: convertDurationIntoWidth(activeCurrentNote.duration, i),
      };
    } else if (onHover) {
      // return {width: convertDurationIntoWidth(parseInt(selectNoteKeyBoard))}
    }
  };

  return (
    <div className={isEven ? "row_note_even" : "row_note_odd"}>
      {track.beats.map((x, i) => (
        <Fragment key={i}>
          <div
            key={i}
            className={getStyleNote(i)}
            style={getWidthNote(i)}
            onClick={() => {
              handleSetMelodicTrack(track, i, tone);
            }}
            onMouseEnter={() => setOnHover(i)}
            onMouseLeave={() => setOnHover(-1)}
          >
            {onHover === i && <Fragment key={i}>{tone}</Fragment>}
            {onHover !== i &&
              track.beats[i].notes.find((t) => t.tone === tone) &&
              track.beats[i].notes.find((t) => t.tone === tone).duration >
                0 && <Fragment key={i}>{tone}</Fragment>}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default NoteBeat;
