import React, { useEffect, useState } from 'react';
import { useMidi } from '../context/useMidi';

const MidiComponent: React.FC = () => {
    const { setNote } = useMidi();
    const [midiAccess, setMidiAccess] = useState<MIDIAccess | null>(null);

    useEffect(() => {
        const onMIDISuccess = (midi: MIDIAccess) => {
            setMidiAccess(midi);
            midi.inputs.forEach((input) => {
                (input as unknown as MIDIInput).onmidimessage = handleMIDIMessage;
            });
        };

        const onMIDIFailure = (error: Error) => {
            console.error('Failed to get MIDI access', error);
        };

        const handleMIDIMessage = (event: MIDIMessageEvent) => {
            const data = event.data;
            if (data && data.length >= 3) {
                const [command, note, velocity] = data;
                if (command === 144) {
                    // Note on
                    console.log(`Note on: ${note}, Velocity: ${velocity}`);
                    setNote(note); // Update context
                } else if (command === 128) {
                    // Note off
                    console.log(`Note off: ${note}, Velocity: ${velocity}`);
                    setNote(null); // Clear note in context
                }
            }
        };

        (navigator as Navigator).requestMIDIAccess()
            .then((value: WebMidi.MIDIAccess) => onMIDISuccess(value as unknown as MIDIAccess))
            .catch(onMIDIFailure);

        return () => {
            if (midiAccess) {
                midiAccess.inputs.forEach((input) => {
                    (input as unknown as MIDIInput).onmidimessage = null;
                });
            }
        };
    }, [midiAccess, setNote]);

    return (
        <div>
            <h1>MIDI Component</h1>
            <p>Open the console to see MIDI notes played.</p>
        </div>
    );
};

export default MidiComponent;
