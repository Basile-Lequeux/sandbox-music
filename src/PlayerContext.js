import React, {createContext, useContext, useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {drumKitList, playMelodicSound, playRhythmSound} from "./PlaySound";

export const PlayerContext = createContext()

function usePlayerContext(props) {
    return useContext(PlayerContext)
}

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
            if (track.beats[cursor] && track.beats[cursor].isActive) {
                playRhythmSound(track.instrument)
            }
        })
    }, [cursor]);

    useEffect(() => {
        const rhythmArray = []

        for (let h = 0; h < nbrOfTrack; h++) {
            const beats = []
            for (let i = 0; i < nbrOfBeat; i++) {
                beats.push({isActive: false})
            }
            const track = {id: uuidv4(), beats: beats, instrument: drumKitList[h].label}
            rhythmArray.push(track)
        }
        setRhythmTrackArray(rhythmArray)
    }, []);

    const start = () => {
        setCursor(0);
        const delay = 60000 / bpmValue;
        setIntervalId(setInterval(incrementCursor, delay));
        setIsPlaying(true)
    };

    const stop = () => {
        if (intervalId !== (() => {})) {
            clearInterval(intervalId);
        } else {
            setIntervalId(() => {});
        }
        setCursor(-1);
        setIsPlaying(false)
    };

    const incrementCursor = () => {
        setCursor((cursor) => cursor + 1);
    };

    const handleSetTrack = (track, i) => {
        let prevStateTrackArray = [...rhythmTrackArray];
        const currentTrack = prevStateTrackArray.find(elem => elem.id === track.id);
        const isActive = currentTrack.beats[i].isActive;

        currentTrack.beats[i] = {isActive: !isActive};

        if (!isActive) {
            playRhythmSound(currentTrack.instrument)
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

    const addMeasure = () => {
        let prevStateTrackArray = [...rhythmTrackArray]
        prevStateTrackArray.map(track => {
            for (let i = 0; i < 4; i++) {
                track.beats.push({isActive: false})
            }
        })
        setNbrOfBeat(nbrOfBeat + 4)
        setRhythmTrackArray(prevStateTrackArray)
    }

    const deleteMeasure = () => {
        let prevStateTrackArray = [...rhythmTrackArray]
        if (nbrOfBeat > 4) {
            const offset = nbrOfBeat - 4
            prevStateTrackArray.map(track => {
                track.beats.splice(offset, 4)
            })
            setNbrOfBeat(offset)
            setRhythmTrackArray(prevStateTrackArray)
        }
    }

    const addRhythmTrack = () => {
        let prevStateTrackArray = [...rhythmTrackArray];
        const beats = []
        for (let i = 0; i < nbrOfBeat; i++) {
            beats.push({isActive: false})
        }
        const track = {id: uuidv4(), beats: beats, instrument: drumKitList[0].label}
        prevStateTrackArray.push(track)
        setNbrOfTrack(prevStateTrackArray.length)
        setRhythmTrackArray(prevStateTrackArray)
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
                handleChangeInstrument,
                addRhythmTrack,
                addMeasure,
                deleteMeasure
            }}
        >
            {props.children}
        </PlayerContext.Provider>
    )
}

export default CreatePlayerContextProvider

export {usePlayerContext}