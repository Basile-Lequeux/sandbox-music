import React, {createContext, useContext, useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';

export const PlayerContext = createContext()

function usePlayerContext(props) {
    return useContext(PlayerContext)
}

const initialState = {
    instrument: "",
    frequency: 0,
};

const CreatePlayerContextProvider = (props) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [cursor, setCursor] = useState(-1);
    const [bpmValue, setBpmValue] = useState(60);
    const [nbrOfTrack, setNbrOfTrack] = useState(1);
    const [trackArray, setTrackArray] = useState([]);
    const [nbrOfBeat, setNbrOfBeat] = useState(4);


    const [instrument, setInstrument] = useState("triangle");
    const [intervalId, setIntervalId] = useState(() => {});
    const [audioContext, setAudioContext] = useState(() => {});


    useEffect(() => {
        let length = nbrOfBeat - 1;
        if (cursor > length) {
            setCursor(0);
        }
        trackArray.map(track => {
            if (track.notes[cursor] && track.notes[cursor].instrument !== "") {
                playNote(track.notes[cursor].frequency, track.notes[cursor].instrument);
            }
        })

    }, [cursor]);

    useEffect(() => {
        setTrackArray([])
        let prevStateTrackArray = [...trackArray]
        for (let h = 0; h < nbrOfTrack; h++) {
            const notes = []
            for (let i = 0; i < nbrOfBeat; i++) {
                notes.push(initialState)
            }
            const track = {id: uuidv4(), notes: notes}
            prevStateTrackArray.push(track)
        }
        setTrackArray(prevStateTrackArray)
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
        const index = prevStateTrackArray.findIndex(elem => elem.id === trackId);
        const track = prevStateTrackArray.find(elem => elem.id === trackId);

        if (track.notes[i].instrument !== instrument) {
            track.notes[i] = {instrument: instrument, frequency: 293.7};
        } else {
            track.notes[i] = initialState;
        }
        setTrackArray(prevStateTrackArray);
    };

    const playNote = (frequency, type) => {
        let oscillator = null;
        let gain = null;
        console.log(frequency);
        console.log(type);
        oscillator = audioContext.createOscillator();
        gain = audioContext.createGain();
        oscillator.type = type;
        oscillator.connect(gain);
        oscillator.frequency.value = frequency;
        gain.connect(audioContext.destination);
        oscillator.start(0);
        gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1);
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

    return (
        <PlayerContext.Provider
            value={{
                isPlaying,
                bpmValue,
                instrument,
                trackArray,
                cursor,
                nbrOfBeat,

                start,
                stop,
                handleChangePlaying,
                handleChangeBpmValue,
                handleChangeNbrOfBeat,
                handleSetTrack,
                setInstrument

            }}
        >
            {props.children}
        </PlayerContext.Provider>
    )
}

export default CreatePlayerContextProvider

export {usePlayerContext}