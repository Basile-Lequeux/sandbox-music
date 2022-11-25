import React, {createContext, useContext, useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import PlaySound from "./PlaySound";

export const PlayerContext = createContext()

function usePlayerContext(props) {
    return useContext(PlayerContext)
}

const initialState = {
    instrument: "",
    frequency: 0,
    isActive: false
};

const CreatePlayerContextProvider = (props) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [cursor, setCursor] = useState(-1);
    const [bpmValue, setBpmValue] = useState(120);
    const [nbrOfBeat, setNbrOfBeat] = useState(4);
    const [nbrOfTrack, setNbrOfTrack] = useState(1);
    const [trackArray, setTrackArray] = useState([]);


    const [intervalId, setIntervalId] = useState(() => {});
    const [audioContext, setAudioContext] = useState(() => {});


    useEffect(() => {
        let length = nbrOfBeat - 1;
        if (cursor > length) {
            setCursor(0);
        }
        trackArray.map(track => {
            if (track.notes[cursor] && track.notes[cursor].isActive) {
                PlaySound(track.instrument)
            }
        })

    }, [cursor]);

    useEffect(() => {
        const array = []
        for (let h = 0; h < nbrOfTrack; h++) {
            const notes = []
            for (let i = 0; i < nbrOfBeat; i++) {
                notes.push(initialState)
            }
            const track = {id: uuidv4(), notes: notes, instrument: "clap"}
            array.push(track)
        }
        setTrackArray(array)
    }, [nbrOfTrack, nbrOfBeat]);

    const start = () => {
        if (!audioContext) {
            setAudioContext(new AudioContext());
        }
        setCursor(0);
        const delay = 60000 / bpmValue;
        setIntervalId(setInterval(incrementCursor, delay));
    };

    const stop = () => {
        if (intervalId !== (() => {
        })) {
            clearInterval(intervalId);
        }
        setIntervalId(() => {
        });
        setCursor(-1);
    };

    const incrementCursor = () => {
        setCursor((cursor) => cursor + 1);
    };

    const handleSetTrack = (trackId, i) => {
        let prevStateTrackArray = [...trackArray];
        const track = prevStateTrackArray.find(elem => elem.id === trackId);
        const isActive = track.notes[i].isActive;

        track.notes[i] = {frequency: 368.7, isActive: !isActive};

        setTrackArray(prevStateTrackArray);
    };


    const handleChangePlaying = () => {
        setIsPlaying(!isPlaying)
    }

    const handleChangeBpmValue = (value) => {
        setBpmValue(value)
    }

    const handleChangeNbrOfBeat = (value) => {
        setNbrOfBeat(value)
    }

    const handleSetNbrOfTrack = (value) => {
        setNbrOfTrack(value)
    }

    const handleChangeInstrument = (trackId, value) => {
        let prevState = [...trackArray];
        const index = prevState.findIndex(t => t.id === trackId);

        if (value !== prevState[index].instrument) {
            prevState[index].instrument = value
            setTrackArray(prevState)
        }


    }

    return (
        <PlayerContext.Provider
            value={{
                isPlaying,
                bpmValue,
                trackArray,
                cursor,
                nbrOfBeat,
                nbrOfTrack,

                start,
                stop,
                handleChangePlaying,
                handleChangeBpmValue,
                handleChangeNbrOfBeat,
                handleSetTrack,
                handleSetNbrOfTrack,
                handleChangeInstrument

            }}
        >
            {props.children}
        </PlayerContext.Provider>
    )
}

export default CreatePlayerContextProvider

export {usePlayerContext}