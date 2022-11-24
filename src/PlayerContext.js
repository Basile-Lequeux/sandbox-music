import React, {createContext, useContext, useEffect, useState} from "react";


export const PlayerContext = createContext()

function usePlayerContext(props) {
    return useContext(PlayerContext)
}

const CreatePlayerContextProvider = (props) => {

    const [test, setTest] = useState(0);


    return (
        <PlayerContext.Provider
            value={{
                test
            }}
        >
            {props.children}
        </PlayerContext.Provider>
    )
}

export default CreatePlayerContextProvider

export {usePlayerContext}