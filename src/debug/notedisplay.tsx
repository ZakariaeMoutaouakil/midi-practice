import React from 'react';
import {useMidi} from '../context/useMidi.ts';

const NoteDisplay: React.FC = () => {
    const {note} = useMidi();

    return (
        <div>
            <h2>Current Note</h2>
            <p>{note !== null ? `Note: ${note}` : 'No note being played'}</p>
        </div>
    );
};

export default NoteDisplay;
