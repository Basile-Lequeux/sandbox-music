import clap from './sounds/clap.wav'
import hihat from './sounds/hihat.wav'
import kick from './sounds/kick.wav'
import openhat from './sounds/openhat.wav'

export const drumKitList = [
    {label: "clap", value: clap},
    {label: "hihat", value: hihat},
    {label: "openhat", value: openhat},
    {label: "kick", value: kick},
]


export default function PlaySound(sound) {
    const beat = drumKitList.find(e => e.label === sound).value
    const audio = new Audio(beat)
    audio.play()
}