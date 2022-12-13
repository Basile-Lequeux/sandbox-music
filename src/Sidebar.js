import React, { Children, createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PlaySound from "./PlaySound";
import PropTypes from "prop-types";
import { drumKitList } from "./PlaySound";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
  Input,
  Text,
  Select
} from "@chakra-ui/react";
import Track from "./components/Track";
import { usePlayerContext } from "./PlayerContext";
import { FiMenu } from "react-icons/fi";
import { FaPlay, FaPause } from "react-icons/fa";
// import { useState } from "react";

export const Sidebar = ({children}) => {
    
  return (

    <Flex borderRight={"px"} bg={"#242424"} w="150px"  flexDir={'column'}>
        {children}
    </Flex>
  );
};

export default Sidebar;
