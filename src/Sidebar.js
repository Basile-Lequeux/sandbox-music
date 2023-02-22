import {
    Flex
} from "@chakra-ui/react";

export const Sidebar = ({children}) => {
    return (
        <Flex bg={"#242424"} w="180px" flexDir={'column'}>
            {children}
        </Flex>
    );
};
