import * as Tone from "tone";

export class MainPlayer {

    static instance = null;

    static getInstance() {
        if (MainPlayer.instance == null) {
            MainPlayer.instance = new MainPlayer()
        }
        return this.instance
    }
    constructor() {
        this.synth = null;
        this.gain = new Tone.Gain(0.7);
        this.tick = 0;
        this.initializeTransport();
        this.osc = new Tone.Oscillator().toDestination();
        this.playing = false;
    }
    toggle() {
        this.playing = !this.playing;
        if (this.playing) Tone.Transport.start();
        else Tone.Transport.stop();
    }

    setBpm(newBpm) {
        Tone.Transport.bpm.value = newBpm
    }

    initializeTransport() {
        Tone.Transport.bpm.value = 120
        Tone.Transport.scheduleRepeat((time) => {
            this.osc.start(time).stop(time + 0.1);
        }, "4n");
    }
}