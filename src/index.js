import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CreatePlayerContextProvider from "./PlayerContext";
import { ChakraProvider } from '@chakra-ui/react' //CSS Framework
import * as Tone from "tone";


//prevent bug browser audio context
document.documentElement.addEventListener('mousedown', () => {
    Tone.start()
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider> 
    <CreatePlayerContextProvider>
        <App/>
    </CreatePlayerContextProvider>
    </ChakraProvider>

);
