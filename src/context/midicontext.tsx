import React, { createContext, useState, ReactNode } from 'react';

interface MidiContextType {
    note: number | null;
    setNote: (note: number | null) => void;
}

const MidiContext = createContext<MidiContextType | undefined>(undefined);

export const MidiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [note, setNote] = useState<number | null>(null);
    return (
        <MidiContext.Provider value={{ note, setNote }}>
            {children}
        </MidiContext.Provider>
    );
};

export default MidiContext;
