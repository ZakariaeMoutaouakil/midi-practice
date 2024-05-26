import React, { createContext, ReactNode, useContext, useState } from 'react';

interface EllipseEvent {
    y: number;
    entered: boolean;
}

interface EllipseEventsContextType {
    events: EllipseEvent[];
    addEvent: (event: EllipseEvent) => void;
}

const EllipseEventsContext = createContext<EllipseEventsContextType | undefined>(undefined);

export const EllipseEventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<EllipseEvent[]>([]);

    const addEvent = (event: EllipseEvent) => {
        setEvents(prevEvents => [...prevEvents, event]);
    };

    return (
        <EllipseEventsContext.Provider value={{ events, addEvent }}>
            {children}
        </EllipseEventsContext.Provider>
    );
};

export const useEllipseEvents = () => {
    const context = useContext(EllipseEventsContext);
    if (!context) {
        throw new Error('useEllipseEvents must be used within an EllipseEventsProvider');
    }
    return context;
};
