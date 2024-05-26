import React from 'react';
import {useEllipseEvents} from '../context/ellipsecontext.tsx';

const EllipseEventsDisplay: React.FC = () => {
    const {events} = useEllipseEvents();

    return (
        <div>
            <h2>Ellipse Events</h2>
            <ul>
                {events.map((event, index) => (
                    <li key={index}>
                        {event.entered ? 'Entered' : 'Quitted'} at y: {event.y}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EllipseEventsDisplay;
