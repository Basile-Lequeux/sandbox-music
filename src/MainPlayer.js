import * as Tone from "tone";
import {playRhythmSound} from "./PlaySound";
import SS808C from './sounds/SS80810-C.wav'
import SS808D from './sounds/SS80810-D.wav'
import SS808G from './sounds/SS80810-G.wav'
import SS808CO from './sounds/SS80810COctave.wav'

export class MainPlayer {
    static instance = null;

    static getInstance() {
        if (MainPlayer.instance == null) {
            MainPlayer.instance = new MainPlayer();
        }
        return this.instance;
    }

    constructor() {
        this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
        this.piano = new Tone.Sampler({
            urls: {
                "C4": "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                "A4": "A4.mp3",
            },
            release: 1,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination();
        this.bass = new Tone.Sampler({
            urls: {
                "C2": SS808C,
                "D2": SS808D,
                "G2": SS808G,
                "C3": SS808CO,
            }
        }).toDestination();
        this.gain = new Tone.Gain(0.7);
        this.tick = 0;
        this.initializeTransport();
        this.osc = new Tone.Oscillator().toDestination();
        this.playing = false;
        this.index = 0;
        this.numberOfBeats = 12;
        this.inc = null;
        this.step = 0;
        this.currentCursorStartingPoint = 0;
        this.currentCursorEndingPoint = 12;
    }


    toggle(data, drum) {
        this.playing = !this.playing;
        if (this.playing) {
            Tone.Transport.start();
            this.data = data;
            this.drum = drum;
        } else Tone.Transport.stop();
    }

    setIncrementCursor(func) {
        this.incr = func;
    }

    setData(data, drum) {
        this.data = data;
        this.drum = drum
    }

    setBpm(newBpm) {
        Tone.Transport.bpm.value = newBpm;
    }

    setNumberOfBeat(newNumber) {
        this.numberOfBeats = newNumber;
        this.step = this.currentCursorStartingPoint;
        this.index = this.currentCursorStartingPoint;
        this.incr(this.currentCursorStartingPoint);
    }

    updateSynth() {
        if (this.synth) {
            this.synth.disconnect(this.gain);
            this.synth.dispose();
        }
        this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
        this.synth.connect(this.gain);
    }

    initializeTransport() {
        Tone.Transport.bpm.value = 120;
        Tone.Transport.scheduleRepeat((time) => {
            this.repeat(time);
            this.repeatDrum(time)
            this.index++;
            this.incr(this.step);
            this.#incrementStep();
        }, "8n");
    }

    setStep(value) {
        this.step = value;
        this.index = value;
        this.currentCursorStartingPoint = value;
    }

    setEndingPoint(value) {
        this.currentCursorEndingPoint = value
    }

    #incrementStep() {
        if (this.index % this.currentCursorEndingPoint === 0) {
            this.step = this.currentCursorStartingPoint;
            this.index = this.currentCursorStartingPoint;
        } else {
            this.step = this.index % this.numberOfBeats;
        }
    }

    repeatDrum(time) {
        const beatsDrum = this.drum

        beatsDrum.map((track) => {
            if (track.beats[this.step] && track.beats[this.step].isActive) {
                playRhythmSound(track.instrument, time);
            }
        });
    }

    repeat(time) {
        const beats = this.data[0].beats;

        if (beats[this.step].notes.length > 0) {
            const eightNote = beats[this.step].notes
                .filter((note) => note.duration === 1)
                .map((note) => note.tone);
            const quarterNote = beats[this.step].notes
                .filter((note) => note.duration === 2)
                .map((note) => note.tone);
            const halfNote = beats[this.step].notes
                .filter((note) => note.duration === 3)
                .map((note) => note.tone);
            const note = beats[this.step].notes
                .filter((note) => note.duration === 4)
                .map((note) => note.tone);

            if (this.data[0].instrument === 'piano') {
                this.piano.triggerAttackRelease(eightNote, "8n", time);
                this.piano.triggerAttackRelease(quarterNote, "4n", time);
                this.piano.triggerAttackRelease(halfNote, "3n", time);
                this.piano.triggerAttackRelease(note, "2n", time);
            }
            if (this.data[0].instrument === 'bass') {
                this.bass.triggerAttackRelease(eightNote, "8n", time);
                this.bass.triggerAttackRelease(quarterNote, "4n", time);
                this.bass.triggerAttackRelease(halfNote, "3n", time);
                this.bass.triggerAttackRelease(note, "2n", time);
            }
            if (this.data[0].instrument === 'synth' || this.data[0].instrument === '') {
                this.synth.triggerAttackRelease(eightNote, "8n", time);
                this.synth.triggerAttackRelease(quarterNote, "4n", time);
                this.synth.triggerAttackRelease(halfNote, "3n", time);
                this.synth.triggerAttackRelease(note, "2n", time);
            }

        }
    }

    playNote(duration, note, instrument) {
        const now = Tone.now()

        if (instrument === 'piano') {
            this.piano.triggerAttackRelease(note, '8n', now)
        }
        if (instrument === 'bass') {
            this.bass.triggerAttackRelease(note, '8n', now)
        }
        if (instrument === 'synth' || instrument === '') {
            this.synth.triggerAttackRelease(note, '8n', now)
        }
    }
}
