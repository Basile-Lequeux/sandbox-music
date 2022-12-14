import React, {createContext, useContext, useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {drumKitList, playMelodicSound, playRhythmSound} from "./PlaySound";

export const PlayerContext = createContext()

function usePlayerContext(props) {
    return useContext(PlayerContext)
}


const initStateMelodicArray = {
    frequency: 0,
    isActive: false
}

const CreatePlayerContextProvider = (props) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [cursor, setCursor] = useState(-1);
    const [bpmValue, setBpmValue] = useState(120);
    const [nbrOfBeat, setNbrOfBeat] = useState(12);
    const [nbrOfTrack, setNbrOfTrack] = useState(4);
    const [rhythmTrackArray, setRhythmTrackArray] = useState([]);
    const [melodicTrackArray, setMelodicTrackArray] = useState([]);

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
        melodicTrackArray.map(track => {
            if (track.notes[cursor] && track.notes[cursor].isActive){
                playMelodicSound(track.notes[cursor].frequency)
            }
        })
    }, [cursor]);

    useEffect(() => {
        const rhythmArray = []
        const melodicArray = []

        for (let h = 0; h < nbrOfTrack; h++) {
            const beats = []
            for (let i = 0; i < nbrOfBeat; i++) {
                beats.push({isActive: false})
            }
            const track = {id: uuidv4(), beats: beats, instrument: drumKitList[h].label}
            rhythmArray.push(track)
        }
        setRhythmTrackArray(rhythmArray)


        const initBeatArray = []
        for (let i = 0; i < nbrOfBeat; i++) {
            initBeatArray.push(initStateMelodicArray)
        }
        const initMelodicTrack = {id: uuidv4(), notes: initBeatArray, instrument: 'synth'}
        melodicArray.push(initMelodicTrack)

        setMelodicTrackArray(melodicArray)
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
        }
        setIntervalId(() => {});
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

    const handleSetMelodicTrack = (track, index, note="C4") => {
        let prevStateMelodicTrackArray = [...melodicTrackArray]
        const currentTrack = prevStateMelodicTrackArray.find(elem => elem.id === track.id);
        const isActive = currentTrack.notes[index].isActive;

        if (isActive){
            currentTrack.notes[index] = {frequency: "", isActive: false};
        }
        else {
            currentTrack.notes[index] = {frequency: note, isActive: true};
            playMelodicSound('melodic', note)
        }

        setMelodicTrackArray(prevStateMelodicTrackArray);
    }
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
                melodicTrackArray,

                start,
                stop,
                handleChangePlaying,
                handleChangeBpmValue,
                handleChangeNbrOfBeat,
                handleSetTrack,
                handleSetMelodicTrack,
                handleSetNbrOfTrack,
                handleChangeInstrument,
                addRhythmTrack

            }}
        >
            {props.children}
        </PlayerContext.Provider>
    )
}

export default CreatePlayerContextProvider

export {usePlayerContext}