import clap from './sounds/CP-1-Isley.wav'
import hihat from './sounds/CH2Isley.wav'
import kick from './sounds/kick.wav'
import openhat from './sounds/CH6Openish.wav'
import snare from './sounds/S-1-Isley.wav'
import boom from './sounds/boom.wav'
import ride from './sounds/OH1Isley.wav'
import tom from './sounds/tom.wav'
import tink from './sounds/tink.wav'

import * as Tone from 'tone'
import {MainPlayer} from "./MainPlayer";

export const drumKitList = [
    {label: "clap", value: clap},
    {label: "hihat", value: hihat},
    {label: "openhat", value: openhat},
    {label: "kick", value: kick},
    {label: "boom", value: boom},
    {label: "ride", value: ride},
    {label: "tom", value: tom},
    {label: "tink", value: tink},
    {label: "snare", value: snare},
]

export const instrumentKit = [
    {label: "synth", value: "synth"},
    {label: "piano", value: "piano"},
    {label: "808bass", value: "bass"},
]

export const playRhythmSound = (sound, time) => {
    const drumPlayer = DrumPlayer.getInstance()
    drumPlayer.play(sound, time)
}

export const playMelodicSound = (notes) => {
    const mainPlayer = MainPlayer.getInstance()



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
        this.boom = new Tone.Player(boom).toDestination()
        this.tom = new Tone.Player(tom).toDestination()
        this.tink = new Tone.Player(tink).toDestination()
        this.ride = new Tone.Player(ride).toDestination()
    }

    init() {
        this.kick.load(kick)
        this.snare.load(snare)
        // this.snare.volume.value = 10
        this.hihat.load(hihat)
        this.clap.load(clap)
        this.openhat.load(openhat)
        this.boom.load(boom)
        this.tom.load(tom)
        this.tink.load(tink)
        this.ride.load(ride)
    }

    play(beat, time) {
        if (time === 'now') {
            time = Tone.now()
        }
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
        if (beat === 'boom') {
            this.boom.start(time)
        }
        if (beat === 'tom') {
            this.tom.start(time)
        }
        if (beat === 'tink') {
            this.tink.start(time)
        }
        if (beat === 'ride') {
            this.ride.start(time)
        }
    }
}