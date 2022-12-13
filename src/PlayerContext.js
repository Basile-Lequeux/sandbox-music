import React, {createContext, useContext, useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import PlaySound, {drumKitList} from "./PlaySound";

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
    const [nbrOfBeat, setNbrOfBeat] = useState(12);
    const [nbrOfTrack, setNbrOfTrack] = useState(4);
    const [rhythmTrackArray, setRhythmTrackArray] = useState([]);


    const [intervalId, setIntervalId] = useState(() => {});

    useEffect(() => {
        let length = nbrOfBeat - 1;
        if (cursor > length) {
            setCursor(0);
        }
        rhythmTrackArray.map(track => {
            if (track.notes[cursor] && track.notes[cursor].isActive) {
                PlaySound('rhythm', track.instrument)
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
            const track = {id: uuidv4(), notes: notes, instrument: drumKitList[0].label}
            array.push(track)
        }
        setRhythmTrackArray(array)
    }, [nbrOfTrack, nbrOfBeat]);

    const start = () => {
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

    const handleSetTrack = (track, i) => {
        let prevStateTrackArray = [...rhythmTrackArray];
        const currentTrack = prevStateTrackArray.find(elem => elem.id === track.id);
        const isActive = currentTrack.notes[i].isActive;

        currentTrack.notes[i] = {frequency: 368.7, isActive: !isActive};

        if (!isActive){
            PlaySound('rhythm', currentTrack.instrument)
        }

        setRhythmTrackArray(prevStateTrackArray);
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
        let prevState = [...rhythmTrackArray];
        const index = prevState.findIndex(t => t.id === trackId);

        if (value !== prevState[index].instrument) {
            prevState[index].instrument = value
            setRhythmTrackArray(prevState)
        }


    }

    return (
        <PlayerContext.Provider
            value={{
                isPlaying,
                bpmValue,
                rhythmTrackArray,
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