import Grid from "./Grid";
import {useState} from "react";


function App() {
    const [isPlaying, setIsPlaying] = useState(false);

    const [cursor, setCursor] = useState(0);

    return (
        <div className="App">
            <Grid
                cursor={cursor}
                isPlaying={isPlaying}
            />

            <button className="button_play"
                    onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? "STOP" : "PLAY"}
            </button>
            <button className="button_play"
                    onClick={() => setCursor(cursor+1)}> +
            </button>
        </div>
    );
}

export default App;
