import {Contexto} from "./Contexto.jsx";
import {useEffect, useState} from "react";
import {AuthService} from "../service/AuthService.js";
// eslint-disable-next-line react/prop-types
export function Provider({children}){
    const [token,setAuthToken] = useState(new AuthService().getToken());
    const [role,setRole] = useState(new AuthService().getRoleUser());
    const signin = (data)=>{
        new AuthService().setAuthDataToLocalStorage(data);
        setAuthToken(data);
    }
    const logout = ()=>{
        new AuthService().removeAuthDataFromLocalStorage();
        setAuthToken(null);
    }
    return(
        <Contexto.Provider value={{
            token,
            signin,
            logout,
        }}>
            {children}
        </Contexto.Provider>
    )
}