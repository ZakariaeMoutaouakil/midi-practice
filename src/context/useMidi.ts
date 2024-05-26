import { useContext } from 'react';
import MidiContext from '../context/midicontext';

export const useMidi = () => {
    const context = useContext(MidiContext);
    if (!context) {
        throw new Error('useMidi must be used within a MidiProvider');
    }
    return context;
};
