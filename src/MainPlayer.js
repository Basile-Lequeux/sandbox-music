import * as Tone from "tone";
import snare from './sounds/snare.wav'

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
        this.sampler = new Tone.Sampler({
            urls: {
                A4: snare
            }
        }).toDestination()
        this.gain = new Tone.Gain(0.7);
        this.tick = 0;
        this.initializeTransport();
        this.osc = new Tone.Oscillator().toDestination();
        this.playing = false;
        this.index = 0;
        this.numberOfBeats = 12
        this.inc = null
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
            // this.synth.triggerAttackRelease(['C4', 'D4'], "8n", time);
            // this.osc.start(time).stop(time + 0.1);
        }, "4n");
    }

    repeat(time) {
        let step = this.index % this.numberOfBeats;
        const notes = this.data[0].beats
        this.incr(step)

        for (let i = 0; i < notes.length; i++) {
            if (notes[step].isActive) {
                this.sampler.triggerAttackRelease('A4', '8n', time);
            }
        }
        this.index++;
    }
}