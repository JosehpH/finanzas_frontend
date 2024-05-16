import {useContext, useEffect} from "react";
import {Contexto} from "../context/Contexto.jsx";
import {Navigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function PublicPath ({children}) {
    const {token} = useContext(Contexto);
    useEffect(() => {
        console.log("Public path:",token);
    }, []);
    return (
        <>
            {
                (token==null) ? children : <Navigate to="/home"></Navigate>
            }
        </>
    );
}