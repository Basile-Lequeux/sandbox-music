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
    const beat = drumKitList.find(e => e.label === sound).value
    const player = new Tone.Player(beat).toDestination()
    Tone.loaded().then(() => {
        player.start(time);
    });
}

export const playMelodicSound = (notes) => {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now()
    synth.triggerAttackRelease(notes, '8n', now)
}
