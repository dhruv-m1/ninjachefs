/*
    * Centeralised Data and State Managment for Recipes using Context API
*/

import React, {useContext, useRef, useState} from 'react';

const DialogContext = React.createContext();

export const useDialogs = () => {

    return useContext(DialogContext);

}

export const DialogProvider = ({children}) => {

    const dialog = {};

    let setDisplay, setType;

    [dialog.display, setDisplay] = useState(false);
    [dialog.type, setType] = useState("");

    dialog.message = useRef("Loading...");
    dialog.title = useRef("NinjaChefs + AI");

    const pendingResolution = useRef(undefined);

    dialog.showAuth = () => {

        setType('auth');
        setDisplay(true);

    }

    dialog.showMessage = (title, message) => {

        dialog.message.current = message;
        dialog.title.current = title;

        setType('message');
        setDisplay(true);
        
    }

    dialog.showLoading = (message) => {

        dialog.message.current = message;
        
        setType('loading');
        setDisplay(true);
        
    }

    dialog.awaitConfirmation = (title, message) => {

        return new Promise(resolve => {

            pendingResolution.current = resolve;

            dialog.message.current = message;
            dialog.title.current = title;

            setType('confirm');
            setDisplay(true);

        })
        
    }

    dialog.close = (result = undefined) => {

        setType('none');
        setDisplay(false);

        if (result !== undefined && pendingResolution.current !== undefined) {
            pendingResolution.current(result);
            pendingResolution.current = undefined;
        }

    }

    return (
        <DialogContext.Provider value={dialog}>
            {children}
        </DialogContext.Provider>
    )

}