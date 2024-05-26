import React, {createContext, ReactNode, useContext, useState} from 'react';

interface WinsContextType {
    wins: number;
    addWin: () => void;
}

const WinsContext = createContext<WinsContextType | undefined>(undefined);

export const WinsProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [wins, setWins] = useState<number>(0);

    const addWin = () => {
        setWins(prevWins => prevWins + 1);
    };

    return (
        <WinsContext.Provider value={{wins, addWin}}>
            {children}
        </WinsContext.Provider>
    );
};

export const useWins = () => {
    const context = useContext(WinsContext);
    if (!context) {
        throw new Error('useWins must be used within a WinsProvider');
    }
    return context;
};
