import {BASE_PATH} from "../../shared/constants/ApiFinanzas.js";
import axios from "axios";
import {useContext, useState} from "react";
import {Contexto} from "../context/Contexto.jsx";
import {useNavigate} from "react-router-dom";

export function useAuthApi() {
    const signInResource = `${BASE_PATH}/api/auth`;
    const signUpResource = `${BASE_PATH}/api/negocio`;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success,setSuccess] = useState(false);
    const {signin} = useContext(Contexto);
    const navigate = useNavigate()
    const signIn = (body) => {
        setLoading(true);
        axios.post(signInResource, body)
            .then((response) => {
                setLoading(false);
                const token = response?.data?.accessToken;
                if (token) {
                    signin(token)
                    console.log("Token: ", token);
                    navigate("/",{replace:true});
                } else {
                    setError("No se pudo obtener el token de acceso");
                }
            })
            .catch((error) => {
                setLoading(false);
                setError(error.message);
            });
    };

    const signUp = (body) => {
        setLoading(true);
        axios.post(signUpResource, body)
            .then(() => {
                setLoading(false);
                setSuccess(true);
            })
            .catch((error) => {
                setLoading(false);
                setError(error.message);
            });
    };

    return { signIn, signUp, loading, error,success,successToFalse:()=>setSuccess(false) };
}