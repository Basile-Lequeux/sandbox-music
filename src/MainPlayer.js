import * as Tone from "tone";
import snare from './sounds/snare.wav'
import kick from './sounds/kick.wav'
import hihat from './sounds/hihat.wav'
import openhat from './sounds/openhat.wav'
import clap from './sounds/clap.wav'

export class MainPlayer {
    static instance = null;

    static getInstance() {
        if (MainPlayer.instance == null) {
            MainPlayer.instance = new MainPlayer()
        }
        return this.instance
    }

    constructor() {
        this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
        this.gain = new Tone.Gain(0.7);
        this.tick = 0;
        this.initializeTransport();
        this.osc = new Tone.Oscillator().toDestination();
        this.playing = false;
        this.index = 0;
        this.numberOfBeats = 12
        this.inc = null
        this.step = 0
    }

    toggle(data) {
        this.playing = !this.playing;
        if (this.playing) {
            Tone.Transport.start();
            this.data = data
        } else Tone.Transport.stop();
    }

    setIncrementCursor(func) {
        this.incr = func
    }

    setBpm(newBpm) {
        Tone.Transport.bpm.value = newBpm
    }

    setNumberOfBeat(newNumber) {
        this.numberOfBeats = newNumber
    }

    updateSynth() {
        if (this.synth) {
            this.synth.disconnect(this.gain);
            this.synth.dispose();
        }
        this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
        this.synth.connect(this.gain)
    }


    initializeTransport() {
        Tone.Transport.bpm.value = 120
        Tone.Transport.scheduleRepeat((time) => {
            this.repeat(time)
        }, "4n");
    }

    setStep(value) {
        this.step = value
        this.index = value
    }
    #incrementStep() {
        this.step = this.index % this.numberOfBeats;
    }

    repeat(time) {
        const beats = this.data[0].beats
        console.log(this.step)
        if (beats[this.step].tone.length > 0) {
            this.synth.triggerAttackRelease(beats[this.step].tone, "8n", time);
        }
        this.index++;
        this.incr(this.step)
        this.#incrementStep()
    }

}