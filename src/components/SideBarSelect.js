import React from 'react';
import {drumKitList} from '../PlaySound';
import {
    Box,
    Flex,
    Select
  } from "@chakra-ui/react";

const SideBarSelect = ({trackId, instrument, handleChangeInstrument}) => {
    return (

        <Flex justify={'center'} alignItems={'center'} h={'62px'}>
        <Select 
        bg={'white'}
        h={'30px'}
        w={'100px'}
    onChange={(e) => handleChangeInstrument(trackId, e.target.value)}
    value={instrument}
    placeholder="Select instrument">
        <div
        ></div>
      {drumKitList.map((elem, i) => (
        <option key={i} value={elem.label}>
          {elem.label}
        </option>
      ))}
    </Select>
    </Flex>
    );
};

export default SideBarSelect;