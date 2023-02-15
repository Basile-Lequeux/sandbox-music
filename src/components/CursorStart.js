import { Flex, Text, Box } from "@chakra-ui/react";
import { usePlayerContext } from "../PlayerContext";

export default function CursorStart({ styles }) {
  const { nbrOfBeat, cursorStartingPoint, handleCursorStart } =
    usePlayerContext();

  return (
    <Flex flexDir="row" bg={"#3D3D3D"} paddingTop={"70px"}>
      <Flex
        bg="#242424"
        justify={"center"}
        alignItems={"center"}
        h={"62px"}
        position={"fixed"}
      >
        <Text
          color={"white"}
          h={"30px"}
          w={"100px"}
          style={{ marginLeft: "30px", marginRight: "20px" }}
        >
          Timeline
        </Text>
      </Flex>
      <Box display={"flex"} paddingLeft={"150px"}>
        {[...Array(nbrOfBeat)].map((x, index) =>
          (index + 1) % 4 === 0 ? (
            <div
              key={index}
              style={
                cursorStartingPoint <= index
                  ? styles.gridItemColoredSpacer
                  : styles.gridItemSpacer
              }
              onClick={() => {
                handleCursorStart(index);
              }}
            />
          ) : (
            <div
              key={index}
              style={
                cursorStartingPoint <= index
                  ? styles.gridItemColored
                  : styles.gridItem
              }
              onClick={() => {
                handleCursorStart(index);
              }}
            />
          )
        )}
      </Box>
    </Flex>
  );
}
