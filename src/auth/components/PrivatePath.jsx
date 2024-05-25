import {useContext, useEffect} from "react";
import {Contexto} from "../context/Contexto.jsx";
import {Navigate} from "react-router-dom";
import {useJwt} from "../custom-hooks/useJwt.js";

// eslint-disable-next-line react/prop-types
export function PrivatePath ({children}) {
    const {token} = useContext(Contexto);
    const {isTokenExpired} = useJwt();
    return (
        <>
            {(token!=null && !isTokenExpired(token)) ? children : <Navigate to="/auth/sign-in"/>
            }
        </>
    );
}