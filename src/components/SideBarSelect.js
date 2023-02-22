import React, {useEffect, useState} from "react";
import {drumKitList} from "../PlaySound";
import {Box, Flex, Select} from "@chakra-ui/react";
import {FaMinus, FaPlus, FaTrash} from "react-icons/fa";
import '../App.css'
import {usePlayerContext} from "../PlayerContext";

const SideBarSelect = ({
    trackId,
    instrument,
    type = "rhythm",
    index,
    length,
}) => {

    const {
        handleChangeInstrument,
        addRhythmTrack,
        deleteOneTrack,
        nbrOfTrack,
    } = usePlayerContext();

    const [canAddTrack, setCanAddTrack] = useState(true);

    useEffect(() => {
        if (nbrOfTrack > 7) {
            setCanAddTrack(false)
        } else {
            setCanAddTrack(true)
        }
    }, [nbrOfTrack]);

    return (
        <Flex
            h={"50px"}
            justify={'center'}
            alignItems={'center'}
            style={{marginRight: "20px", marginLeft: '23px'}}
        >
            <Box>
                <Select
                    bg={"white"}
                    h={"30px"}
                    onChange={(e) => handleChangeInstrument(trackId, e.target.value)}
                    value={instrument}
                    size={'xs'}
                >
                    {type === "rhythm" &&
                        drumKitList.map((elem, i) => (
                            <option key={i} value={elem.label}>
                                {elem.label}
                            </option>
                        ))}
                    {type === "melodic" && <option value="synth">synth</option>}
                </Select>
            </Box>
            {length >= 2 ? (
                <button
                    className='button_delete_track'
                    onClick={() => deleteOneTrack(index, type)}
                    style={{marginLeft: "5px"}}
                >
                    <FaMinus size={"20"}/>
                </button>
            ) : (
                <div style={{paddingRight: "25px"}}/>
            )}
            {index === (length - 1) && canAddTrack ? (
                <button
                    className='button_add_track'
                    onClick={() => addRhythmTrack()}
                    style={{marginLeft: "7px"}}
                >
                    <FaPlus size={"20"}/>
                </button>
            ) : (
                <div style={{paddingRight: "25px"}}/>
            )}
        </Flex>
    );
};

export default SideBarSelect;
