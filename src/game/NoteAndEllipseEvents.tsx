import React, { useEffect, useRef } from 'react';
import { useMidi } from '../context/useMidi';
import { useEllipseEvents } from '../context/ellipsecontext';
import { useWins } from './gamestate.tsx';

const notesInCMajor = [77, 76, 74, 72, 71, 69, 67, 65, 64, 62, 60, 59, 57, 55, 53, 52, 50, 48, 47, 45, 43];

const yToNote = (y: number): number => {
    const index = (y - 100) / 25;
    return notesInCMajor[index];
};

const NoteAndEllipseEvents: React.FC = () => {
    const { note } = useMidi();
    const { events } = useEllipseEvents();
    const { wins, addWin } = useWins();
    const activeNotes = useRef<Set<number>>(new Set());

    useEffect(() => {
        events.forEach(event => {
            if (event.entered) {
                activeNotes.current.add(event.y);
            } else {
                if (activeNotes.current.has(event.y)) {
                    activeNotes.current.delete(event.y);
                }
            }
        });
    }, [events]);

    useEffect(() => {
        if (note !== null) {
            const correspondingY = Array.from(activeNotes.current).find(y => yToNote(y) === note);
            if (correspondingY !== undefined) {
                addWin();
                activeNotes.current.delete(correspondingY);
            }
        }
    }, [note, addWin]);

    return (
        <div>
            <h2>Note and Ellipse Events</h2>
            <p>Current Note: {note !== null ? note : 'No note being played'}</p>
            <h3>Ellipse Events</h3>
            <ul>
                {events.map((event, index) => (
                    <li key={index}>
                        {event.entered ? 'Entered' : 'Quit'} at y: {event.y} (Note: {yToNote(event.y)})
                    </li>
                ))}
            </ul>
            <h3>Wins: {wins}</h3>
        </div>
    );
};

export default NoteAndEllipseEvents;
