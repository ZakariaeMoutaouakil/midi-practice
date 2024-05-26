import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import MidiComponent from "./midi/midi.tsx";
import {MidiProvider} from "./context/midicontext.tsx";
// import NoteDisplay from "./debug/notedisplay.tsx";
import {EllipseEventsProvider} from "./context/ellipsecontext.tsx";
// import EllipseEventsDisplay from "./debug/ellipse.tsx";
import NoteAndEllipseEvents from "./game/NoteAndEllipseEvents.tsx";
import {WinsProvider} from "./game/gamestate.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MidiProvider>
            <MidiComponent/>
            {/*<NoteDisplay/>*/}
            <EllipseEventsProvider>
                <App/>
                <WinsProvider>
                    <NoteAndEllipseEvents/>
                </WinsProvider>
            </EllipseEventsProvider>
        </MidiProvider>
        {/*<EllipseEventsProvider>*/}
        {/*    <App/>*/}
        {/*    <EllipseEventsDisplay/>*/}
        {/*</EllipseEventsProvider>*/}
        {/*<MidiProvider>*/}
        {/*    <MidiComponent/>*/}
        {/*    <NoteDisplay/>*/}
        {/*</MidiProvider>*/}
    </React.StrictMode>,
)
