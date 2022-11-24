import React, {createContext, useContext, useEffect, useState} from "react";


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
    const [nbrOfBeat, setNbrOfBeat] = useState(4);
    const [cursor, setCursor] = useState(-1);
    const [instrument, setInstrument] = useState("triangle");
    const [bpmValue, setBpmValue] = useState(60);
    const [intervalId, setIntervalId] = useState(() => {
    });
    const [audioContext, setAudioContext] = useState(() => {
    });
    const [trackArray, setTrackArray] = useState([]);


    useEffect(() => {
        let length = trackArray.length - 1;
        if (cursor > length) {
            setCursor(0);
        }
        if (trackArray[cursor] && trackArray[cursor].instrument !== "") {
            playNote(trackArray[cursor].frequency, trackArray[cursor].instrument);
        }
    }, [cursor]);

    useEffect(() => {
        setTrackArray([]);
        for (let i = 0; i < nbrOfBeat; i++) {
            setTrackArray((trackArray) => [...trackArray, initialState]);
        }
    }, [nbrOfBeat]);

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

    const handleSetTrack = (i) => {
        let tempArray = [...trackArray];
        if (trackArray[i].instrument !== instrument) {
            let tempInitialState = {instrument: instrument, frequency: 293.7};
            tempArray[i] = tempInitialState;
            setTrackArray(tempArray);
        } else {
            tempArray[i] = initialState;
            setTrackArray(tempArray);
        }
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