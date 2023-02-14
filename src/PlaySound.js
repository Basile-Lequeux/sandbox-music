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

export const playMelodicSound = (notes) => {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now()
    synth.triggerAttackRelease(notes, '8n', now)
}


export const mainPlayern = (stop = false) => {

    if (stop) {
        Tone.Transport.stop();
    } else {
        const osc = new Tone.Oscillator().toDestination();
    // repeated event every 8th note
        Tone.Transport.scheduleRepeat((time) => {
            // use the callback time to schedule events
            osc.start(time).stop(time + 0.1);
        }, "8n");
    // transport must be started before it starts invoking events
        Tone.Transport.start();
    }

    class Instrument {
        constructor() {
            this.synth = null;
            this.gain = new Tone.Gain(0.7);
            this.gain.toMaster();
            this.tick = 0;
            this.setNotes(4);
            this.initializeTransport();
        }

        setNotes(octave) {
            this.notes = "CDEFGAB".split('').map(n => `${n}${octave}`);
        }

        initializeTransport() {
            Tone.Transport.scheduleRepeat(time => {
                let note = this.notes[(this.tick * 2) % this.notes.length];
                if (this.synth) this.synth.triggerAttackRelease(note, "8n", time);
                this.tick++;
            }, "4n");
        }

        toggle() {
            this.playing = !this.playing;
            if (this.playing) Tone.Transport.start();
            else Tone.Transport.stop();
        }

        update(synthType, oscillatorType, oscillatorPartials, envelope) {
            this._updateSynthType(synthType, envelope);
            this._updateOscillatorType(oscillatorType, oscillatorPartials);
        }

        _updateSynthType(synthType, envelope) {
            // If we have already defined the synth
            if (this.synth) {
                this.synth.disconnect(this.gain);
                this.synth.dispose();
            }
            // The new Synth!
            let settings = this.defaultSettings[synthType] || {};
            settings.envelope = Object.assign(settings.envelope, envelope);
            this.synth = new Tone[synthType](settings);
            this.synth.connect(this.gain);
        }

        _updateOscillatorType(oscillatorType, oscillatorPartials) {
            let partials = oscillatorPartials === 'none' ? '' : oscillatorPartials;
            this.synth.oscillator.type = `${oscillatorType}${partials}`;
        }

        get defaultSettings() {
            return {
                Synth: {
                    oscillator: { type: "triangle" },
                    envelope: {
                        attack: 0.005,
                        decay: 0.1,
                        sustain: 0.3,
                        release: 1
                    }
                },
                AMSynth: {
                    harmonicity: 3,
                    detune: 0,
                    oscillator: {
                        type: "sine"
                    },
                    envelope: {
                        attack: 0.01,
                        decay: 0.01,
                        sustain: 1,
                        release: 0.5
                    },
                    modulation: {
                        type: "square"
                    },
                    modulationEnvelope: {
                        attack: 0.5,
                        decay: 0,
                        sustain: 1,
                        release: 0.5
                    }
                },
                FMSynth: {
                    harmonicity: 3,
                    modulationIndex: 10,
                    detune: 0,
                    oscillator: {
                        type: "sine"
                    },
                    envelope: {
                        attack: 0.01,
                        decay: 0.01,
                        sustain: 1,
                        release: 0.5
                    },
                    modulation: {
                        type: "square"
                    },
                    modulationEnvelope: {
                        attack: 0.5,
                        decay: 0,
                        sustain: 1,
                        release: 0.5
                    }
                }
            };
        }
    }

    let $octave = document.querySelector("#octave");
    let $synthType = document.querySelector("#synth-type");
    let $oscillatorType = document.querySelector("#oscillator-type");
    let $oscillatorPartials = document.querySelector("#oscillator-partials");
    let $toggle = document.querySelector('#toggle');
    let $envelopeAttack = document.querySelector('#envelope-attack');
    let $envelopeDecay = document.querySelector('#envelope-decay');
    let $envelopeSustain = document.querySelector('#envelope-sustain');
    let $envelopeRelease = document.querySelector('#envelope-release');
    let inst = new Instrument();

    let steps = [0, 0.001, 0.005, 0.01, 0.05, 0.1, 0.125, 0.25, 0.5, 0.75, 1];

    $envelopeAttack.addEventListener('change', update);
    $envelopeDecay.addEventListener('change', update);
    $envelopeSustain.addEventListener('change', update);
    $envelopeRelease.addEventListener('change', update);

    $toggle.addEventListener('click', e => {
        inst.toggle();
        if ($toggle.className.match('is-success')) {
            $toggle.classList.remove('is-success');
            $toggle.classList.add('is-danger');
        } else {
            $toggle.classList.add('is-success');
            $toggle.classList.remove('is-danger');
        }
        $toggle.classList.toggle('active');
    });

    update();

    $octave.addEventListener("change", () => inst.setNotes($octave.value));
    $synthType.addEventListener("change", update);
    $oscillatorType.addEventListener("change", update);
    $oscillatorPartials.addEventListener("change", update);

    function update() {
        let envelope = {
            attack: steps[parseInt($envelopeAttack.value)],
            decay: steps[parseInt($envelopeDecay.value)],
            sustain: steps[parseInt($envelopeSustain.value)],
            release: steps[parseInt($envelopeRelease.value)]
        };
        document.querySelector('label[for="envelope-attack"] span')
            .innerText = envelope.attack;
        document.querySelector('label[for="envelope-decay"] span')
            .innerText = envelope.decay;
        document.querySelector('label[for="envelope-sustain"] span')
            .innerText = envelope.sustain;
        document.querySelector('label[for="envelope-release"] span')
            .innerText = envelope.release;
        inst.update(
            $synthType.value,
            $oscillatorType.value,
            $oscillatorPartials.value,
            envelope
        );
    }



}
