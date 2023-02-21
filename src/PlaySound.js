import clap from './sounds/clap.wav'
import hihat from './sounds/hihat.wav'
import kick from './sounds/kick.wav'
import openhat from './sounds/openhat.wav'
import snare from './sounds/snare.wav'
import * as Tone from 'tone'

export const drumKitList = [
    {label: "clap", value: clap},
    {label: "hihat", value: hihat},
    {label: "openhat", value: openhat},
    {label: "kick", value: kick},
    {label: "snare", value: snare},
]

export const playRhythmSound = (sound, time) => {
    const drumPlayer = DrumPlayer.getInstance()
    drumPlayer.play(sound, time)
}

export const playMelodicSound = (notes) => {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now()
    synth.triggerAttackRelease(notes, '8n', now)
}

export class DrumPlayer {

    static instance = null;

    static getInstance() {
        if (DrumPlayer.instance == null) {
            DrumPlayer.instance = new DrumPlayer();
        }
        return this.instance;
    }
    constructor() {
        this.kick = new Tone.Player(kick).toDestination()
        this.snare = new Tone.Player(snare).toDestination()
        this.hihat = new Tone.Player(hihat).toDestination()
        this.clap = new Tone.Player(clap).toDestination()
        this.openhat = new Tone.Player(openhat).toDestination()
    }

    init() {
        this.kick.load(kick)
        this.snare.load(snare)
        this.hihat.load(hihat)
        this.clap.load(clap)
        this.openhat.load(openhat)
    }

    play(beat, time) {
        if (beat === 'kick') {
            this.kick.start(time)
        }
        if (beat === 'clap') {
            this.clap.start(time)
        }
        if (beat === 'snare') {
            this.snare.start(time)
        }
        if (beat === 'hihat') {
            this.hihat.start(time)
        }
        if (beat === 'openhat') {
            this.openhat.start(time)
        }
    }
}