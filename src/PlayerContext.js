import React, {createContext, useContext, useEffect, useState, useRef} from "react";
import {v4 as uuidv4} from "uuid";
import {drumKitList, playMelodicSound, playRhythmSound} from "./PlaySound";
import {MainPlayer} from "./MainPlayer";

export const PlayerContext = createContext();

function usePlayerContext(props) {
    return useContext(PlayerContext);
}

const CreatePlayerContextProvider = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [cursor, setCursor] = useState(-1);
    const [cursorStartingPoint, setCursorStartingPoint] = useState(0);
    const [bpmValue, setBpmValue] = useState(120);
    const [nbrOfBeat, setNbrOfBeat] = useState(12);
    const [nbrOfTrack, setNbrOfTrack] = useState(4);

    const [rhythmTrackArray, setRhythmTrackArray] = useState([]);
    const [melodicTrackArray, setMelodicTrackArray] = useState([]);

    const play = (start) => {
        const mainPlayer = MainPlayer.getInstance()
        if (start) {
            mainPlayer.toggle(rhythmTrackArray);
        } else {
            mainPlayer.toggle();
        }
    }

    useEffect(() => {
        const rhythmArray = [];
        const melodicArray = [];
        let beats = [];
        for (let h = 0; h < nbrOfTrack; h++) {
            beats = [];
            for (let i = 0; i < nbrOfBeat; i++) {
                beats.push({isActive: false});
            }
            const rhythmTrack = {
                id: uuidv4(),
                beats: beats,
                instrument: drumKitList[h].label,
            };
            rhythmArray.push(rhythmTrack);
        }
        const initBeatsArray = () => {
            const beatArray = [];
            for (let i = 0; i < nbrOfBeat; i++) {
                beatArray.push({isActive: false, tone: []});
            }
            return beatArray;
        };
        const melodicTrack = {
            id: uuidv4(),
            beats: initBeatsArray(),
            instrument: "",
        };
        melodicArray.push(melodicTrack);
        setRhythmTrackArray(rhythmArray);
        setMelodicTrackArray(melodicArray);
        const mainPlayer = MainPlayer.getInstance()
        mainPlayer.setIncrementCursor(setCursor)

    }, []);
    const start = () => {
        setIsPlaying(true);
        play(true)
    };

    const stop = () => {
        setIsPlaying(false);
        play(false)
    };

    const handleSetTrack = (track, i) => {
        let prevStateTrackArray = [...rhythmTrackArray];
        const currentTrack = prevStateTrackArray.find(
            (elem) => elem.id === track.id
        );
        const isActive = currentTrack.beats[i].isActive;

        currentTrack.beats[i] = {isActive: !isActive};

        setRhythmTrackArray(prevStateTrackArray);
    };

    const handleChangePlaying = () => {
        setIsPlaying(!isPlaying);
    };

    const handleChangeBpmValue = (value) => {
        setBpmValue(value);
        const mainPlayer = MainPlayer.getInstance()
        mainPlayer.setBpm(value)
    };

    const handleChangeNbrOfBeat = (value) => {
        setNbrOfBeat(value);
        const mainPlayer = MainPlayer.getInstance()
        mainPlayer.setNumberOfBeat(value)
    };

    const handleSetNbrOfTrack = (value) => {
        setNbrOfTrack(value);
    };

    const addMeasure = () => {
        let prevStateTrackArray = [...rhythmTrackArray];
        prevStateTrackArray.map((track) => {
            for (let i = 0; i < 4; i++) {
                track.beats.push({isActive: false});
            }
        });
        setNbrOfBeat(nbrOfBeat + 4);
        setRhythmTrackArray(prevStateTrackArray);
    };

    const deleteMeasure = () => {
        let prevStateTrackArray = [...rhythmTrackArray];
        if (nbrOfBeat > 4) {
            const offset = nbrOfBeat - 4;
            prevStateTrackArray.map((track) => {
                track.beats.splice(offset, 4);
            });
            setNbrOfBeat(offset);
            setRhythmTrackArray(prevStateTrackArray);
        }
    };

    const addRhythmTrack = () => {
        let prevStateTrackArray = [...rhythmTrackArray];
        const beats = [];
        for (let i = 0; i < nbrOfBeat; i++) {
            beats.push({isActive: false});
        }
        const track = {
            id: uuidv4(),
            beats: beats,
            instrument: drumKitList[0].label,
        };
        prevStateTrackArray.push(track);
        setNbrOfTrack(prevStateTrackArray.length);
        setRhythmTrackArray(prevStateTrackArray);
    };

    const handleChangeInstrument = (trackId, value) => {
        let prevState = [...rhythmTrackArray];
        const index = prevState.findIndex((t) => t.id === trackId);

        if (value !== prevState[index].instrument) {
            prevState[index].instrument = value;
            setRhythmTrackArray(prevState);
        }
    };

    const handleSetMelodicTrack = (track, i, tone) => {
        let prevStateMelodicArray = [...melodicTrackArray];
        const currentTrack = prevStateMelodicArray.find(
            (elem) => elem.id === track.id
        );
        const isActive = currentTrack.beats[i].isActive;
        const toneArray = currentTrack.beats[i].tone;
        const isActiveTone = toneArray.find((t) => t === tone);
        if (isActiveTone) {
            const index = toneArray.findIndex((t) => t === tone);
            toneArray.splice(index, 1);
        } else toneArray.push(tone);

        currentTrack.beats[i] = {isActive: !isActive, tone: toneArray};

        if (!isActiveTone) {
            playMelodicSound(toneArray);
        }

        setMelodicTrackArray(prevStateMelodicArray);
    };


    return (
        <PlayerContext.Provider
            value={{
                isPlaying,
                bpmValue,
                rhythmTrackArray,
                cursor,
                cursorStartingPoint,
                nbrOfBeat,
                nbrOfTrack,
                melodicTrackArray,

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
                deleteMeasure,
                handleSetMelodicTrack,
                setCursorStartingPoint,
            }}
        >
            {props.children}
        </PlayerContext.Provider>
    );
};

export default CreatePlayerContextProvider;

export {usePlayerContext};
