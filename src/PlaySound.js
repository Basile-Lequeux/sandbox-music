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

export const playRhythmSound = (sound) => {
    const beat = drumKitList.find(e => e.label === sound).value
    const player = new Tone.Player(beat).toDestination()
    Tone.loaded().then(() => {
        player.start();
    });
}

export const playMelodicSound = (note) => {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now()
    synth.triggerAttack(note, now)
    synth.triggerRelease(now + 0.5)
}