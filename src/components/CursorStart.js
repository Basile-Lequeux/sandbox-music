import {Flex, Text, Box} from "@chakra-ui/react";
import {usePlayerContext} from "../PlayerContext";
import '../App.css'

export default function CursorStart({styles}) {
    const {nbrOfBeat, cursorStartingPoint, handleCursorStart} =
        usePlayerContext();

    return (
        <Flex flexDir="row" bg={"#3D3D3D"} paddingTop={"35px"}>
            <Flex bg="#242424" justify={"center"} alignItems={"center"} h={"62px"}>
                <Text
                    color={"white"}
                    h={"30px"}
                    w={"100px"}
                    style={{marginLeft: "30px", marginRight: "20px"}}
                >
                    Timeline
                </Text>
            </Flex>
            <Box display={"flex"}>
                {[...Array(nbrOfBeat)].map((x, index) =>
                    (index + 1) % 4 === 0 ? (
                        <div
                            key={index}
                            className={
                                cursorStartingPoint <= index
                                    ? 'timeline_dot_spacer_active'
                                    : 'timeline_dot_spacer'
                            }
                            onClick={() => handleCursorStart(index)}
                        />
                    ) : (
                        <div
                            key={index}
                            className={
                                cursorStartingPoint <= index
                                    ? 'timeline_dot_active'
                                    : 'timeline_dot'
                            }
                            onClick={() => handleCursorStart(index)}
                        />
                    )
                )}
            </Box>
        </Flex>
    );
}
