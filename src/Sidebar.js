import {
    Flex
} from "@chakra-ui/react";

export const Sidebar = ({children}) => {
    return (
        <Flex borderRight={"px"} bg={"#242424"} w="150px" flexDir={'column'} position={"fixed"}>
            {children}
        </Flex>
    );
};
