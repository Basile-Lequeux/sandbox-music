import React from 'react';
import * as Tone from 'tone'

const Sequencer = () => {

    const onStep = (time, step) => {
        console.log("-> step", step);
    };

    const loop = new Tone.Sequence(onStep, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], '16n');

    const start = () => loop.start(0);
    const stop = () => loop.stop();
    const toggleStep = (stepIndex) => loop.toggleStep(stepIndex);

    Tone.Transport.start();
};

export default Sequencer;