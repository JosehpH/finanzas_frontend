import {useContext, useEffect} from "react";
import {Contexto} from "../context/Contexto.jsx";
import {Navigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function PrivatePath ({children}) {
    const {token} = useContext(Contexto);
    return (
        <>
            {(token!=null) ? children : <Navigate to="/auth/sign-in"/>
            }
        </>
    );
}