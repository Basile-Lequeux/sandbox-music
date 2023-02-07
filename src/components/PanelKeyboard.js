import React, {useState} from 'react';
import './MelodicTrack.css';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'

const PanelKeyboard = ({
    showPanelKeyboard,
    setShowPanelKeyboard
}) => {

    return (
        <>
            <Drawer
                placement='bottom'
                isOpen={showPanelKeyboard}
                onClose={setShowPanelKeyboard}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>Keyboard</DrawerHeader>
                    <DrawerBody>

                        <div className="piano-keyboard">
                            <div className="white-key"></div>
                            <div className="black-key"></div>
                            <div className="white-key"></div>
                            <div className="black-key"></div>
                            <div className="white-key"></div>
                            <div className="white-key"></div>
                            <div className="black-key"></div>
                            <div className="white-key"></div>
                            <div className="black-key"></div>
                            <div className="white-key"></div>
                            <div className="black-key"></div>
                            <div className="white-key"></div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default PanelKeyboard;