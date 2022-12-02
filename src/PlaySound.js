import clap from './sounds/clap.wav'
import hihat from './sounds/hihat.wav'
import kick from './sounds/kick.wav'
import openhat from './sounds/openhat.wav'
import * as Tone from 'tone'

export const drumKitList = [
    {label: "clap", value: clap},
    {label: "hihat", value: hihat},
    {label: "openhat", value: openhat},
    {label: "kick", value: kick},
]

export default function PlaySound(type, sound) {
    if (type === "rhythm"){
        playRhythmSound(sound)
    }

}

const playRhythmSound = (sound) => {
    const beat = drumKitList.find(e => e.label === sound).value
    const player = new Tone.Player(beat).toDestination()
    Tone.loaded().then(() => {
        player.start();
    });
}