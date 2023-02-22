import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from "react";
import {v4 as uuidv4} from "uuid";
import {drumKitList, DrumPlayer, playMelodicSound, playRhythmSound} from "./PlaySound";
import {MainPlayer} from "./MainPlayer";
import axios from "axios";

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
    const [selectNoteKeyBoard, setSelectNoteKeyBoard] = useState("1");

    const [rhythmTrackArray, setRhythmTrackArray] = useState([]);
    const [melodicTrackArray, setMelodicTrackArray] = useState([]);

    const play = (start) => {
        const mainPlayer = MainPlayer.getInstance();
        if (start) {
            mainPlayer.toggle(melodicTrackArray, rhythmTrackArray);
        } else {
            mainPlayer.toggle();
        }
    };

    useEffect(() => {
        const queryString = window.location.search;
        const searchParams = new URLSearchParams(queryString);
        const value = searchParams.get("q");

        if (value) {
            handleRestoreMusic(value);
        } else {
            initAllTrackDefault()
        }
        const mainPlayer = MainPlayer.getInstance();
        mainPlayer.setIncrementCursor(setCursor);
        const drumPlayer = DrumPlayer.getInstance()
        drumPlayer.init()
    }, []);

    const initAllTrackDefault = () => {
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
                beatArray.push({notes: []});
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
    }

    const start = () => {
        setIsPlaying(true);
        play(true);
    };

    const stop = () => {
        setIsPlaying(false);
        play(false);
    };

    const handleCursorStart = (value) => {
        setCursorStartingPoint(value);
        const mainPlayer = MainPlayer.getInstance();
        mainPlayer.setStep(value);
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
        const mainPlayer = MainPlayer.getInstance();
        mainPlayer.setBpm(value);
    };

    const handleSetNbrOfTrack = (value) => {
        setNbrOfTrack(value);
    };

    const addMeasure = () => {
        let prevStateTrackArray = [...rhythmTrackArray];
        let prevStateMelodicTrackArray = [...melodicTrackArray];
        prevStateTrackArray.map((track) => {
            for (let i = 0; i < 4; i++) {
                track.beats.push({isActive: false});
            }
        });
        prevStateMelodicTrackArray.map((track) => {
            for (let i = 0; i < 4; i++) {
                track.beats.push({notes: []});
            }
        });
        setNbrOfBeat(nbrOfBeat + 4);
        setRhythmTrackArray(prevStateTrackArray);
        setMelodicTrackArray(prevStateMelodicTrackArray);
        const mainPlayer = MainPlayer.getInstance();
        mainPlayer.setNumberOfBeat(nbrOfBeat + 4);
        mainPlayer.setData(prevStateMelodicTrackArray, prevStateTrackArray);
    };

    const deleteMeasure = () => {
        let prevStateTrackArray = [...rhythmTrackArray];
        let prevStateMelodicTrackArray = [...melodicTrackArray];
        if (nbrOfBeat > 4) {
            const offset = nbrOfBeat - 4;
            prevStateTrackArray.map((track) => {
                track.beats.splice(offset, 4);
            });
            prevStateMelodicTrackArray.map((track) => {
                track.beats.splice(offset, 4);
            });
            setNbrOfBeat(offset);
            setRhythmTrackArray(prevStateTrackArray);
            setMelodicTrackArray(prevStateMelodicTrackArray);
            const mainPlayer = MainPlayer.getInstance();
            mainPlayer.setNumberOfBeat(nbrOfBeat - 4);
            mainPlayer.setData(prevStateMelodicTrackArray, prevStateTrackArray);
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

    const deleteOneTrack = (index, type) => {
        if (type === "melodic") {
            let prevStateMelodicArray = [...melodicTrackArray];
            prevStateMelodicArray.splice(index, 1);
            setMelodicTrackArray(prevStateMelodicArray);
        } else {
            let prevStateTrackArray = [...rhythmTrackArray];
            prevStateTrackArray.splice(index, 1);
            setRhythmTrackArray(prevStateTrackArray);
            setNbrOfTrack(prevStateTrackArray.length)
        }
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
        const currentTrack = prevStateMelodicArray.find((elem) => elem.id === track.id);
        const notesArray = currentTrack.beats[i].notes;
        const isActiveTone = notesArray.find((t) => t.tone === tone);

        if (isActiveTone) {
            const currentNote = currentTrack.beats[i].notes.find((t) => t.tone === tone)
            if (currentNote.duration > 1) {
                for (let j = 1; j < currentNote.duration; j++) {
                    const notesArrayP = currentTrack.beats[i + j].notes;
                    const indexP = notesArrayP.findIndex((t) => t.tone === tone);
                    notesArrayP.splice(indexP, 1);
                }
            }
            const index = notesArray.findIndex((t) => t.tone === tone);
            notesArray.splice(index, 1);
        } else {
            const durationNote = parseInt(selectNoteKeyBoard)
            if (durationNote > 1) {
                for (let j = 1; j < durationNote; j++)  {
                    const nextNotesArray = currentTrack.beats[i + j].notes
                    const indexSameTone = nextNotesArray.findIndex(t => t.tone === tone)
                    if (indexSameTone !== -1) {
                        const durationNext = nextNotesArray[indexSameTone].duration
                        nextNotesArray.splice(indexSameTone, 1)
                        for (let k = 1; k < durationNext; k++) {
                            const nextNextNotesArray = currentTrack.beats[i + j + k].notes
                            const nextIndexSameTone = nextNotesArray.findIndex(t => t.tone === tone)
                            nextNextNotesArray.splice(nextIndexSameTone, 1)
                        }

                    }
                    nextNotesArray.push({tone: tone, duration: -1});
                    currentTrack.beats[i + j] = {notes: nextNotesArray};
                }

            }
            notesArray.push({tone: tone, duration: durationNote});
        }
        currentTrack.beats[i] = {notes: notesArray};

        if (!isActiveTone) {
            playMelodicSound(tone);
        }

        setMelodicTrackArray(prevStateMelodicArray);
    };

    const changeDurationOfNote = (trackId, indexOfNote, tone) => {
        let prevStateMelodicArray = [...melodicTrackArray];
        const track = prevStateMelodicArray.find((t) => t.id === trackId);
        const note = track.beats[indexOfNote].notes.find(
            (note) => note.tone === tone
        );
        note.duration = 2;

        setMelodicTrackArray(prevStateMelodicArray);
    };

    const handleRestoreMusic = (id) => {
        axios.get(`https://api-melodiv.onrender.com/${id}`)
            .then(function (response) {
                const data = response.data
                setMelodicTrackArray(data.melodic)
                setRhythmTrackArray(data.rythm)
                setBpmValue(parseInt(data.bpm))
                setNbrOfBeat(parseInt(data.measureNb))
                const mainPlayer = MainPlayer.getInstance()
                mainPlayer.setBpm(parseInt(data.bpm))
                mainPlayer.setNumberOfBeat(parseInt(data.measureNb))
            })
            .catch(function (error) {
                initAllTrackDefault()
                console.log(error);
            });
        //API call & update instance
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
                selectNoteKeyBoard,

                start,
                stop,
                handleChangePlaying,
                handleChangeBpmValue,
                handleSetTrack,
                handleSetNbrOfTrack,
                handleChangeInstrument,
                addRhythmTrack,
                deleteOneTrack,
                addMeasure,
                deleteMeasure,
                handleSetMelodicTrack,
                handleCursorStart,
                changeDurationOfNote,
                setSelectNoteKeyBoard,
                handleRestoreMusic,
            }}
        >
            {props.children}
        </PlayerContext.Provider>
    );
};

export default CreatePlayerContextProvider;

export {usePlayerContext};
