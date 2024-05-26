import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import MidiComponent from "./midi/midi.tsx";
import {MidiProvider} from "./context/midicontext.tsx";
import NoteDisplay from "./debug/notedisplay.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/*<App/>*/}
        <MidiProvider>]
            <MidiComponent/>
            <NoteDisplay/>
        </MidiProvider>
    </React.StrictMode>,
)
