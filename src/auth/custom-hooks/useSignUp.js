import {useState} from "react";

export function useSignUp() {
    const [signUpRequest, setSignInRequest] = useState(
        {
            email: "",
            password: "",
            nombre:"",
            ruc:"",
            telefono:"",
            direccion:""
        }
    )
    const setPassword = (password) => {
        setSignInRequest((prev) => ({
            ...prev,
            password: password
        }))
    }
    const setEmail = (email) => {
        setSignInRequest((prev) => ({
            ...prev,
            email: email
        }))
    }
    const setNombre = (nombre) => {
        setSignInRequest((prev) => ({
            ...prev,
            nombre: nombre
        }))
    }
    const setRuc = (ruc) => {
        setSignInRequest((prev) => ({
            ...prev,
            ruc:ruc
        }))
    }
    const setTelefono = (telefono) => {
        setSignInRequest((prev) => ({
            ...prev,
            telefono: telefono
        }))
    }
    const setDireccion = (direccion) => {
        setSignInRequest((prev) => ({
            ...prev,
            direccion: direccion
        }))
    }

    const validarCampos = ()=>{
        return signUpRequest.email === "" || signUpRequest.password === "" || signUpRequest.nombre === "" || signUpRequest.ruc === "" || signUpRequest.telefono === "" || signUpRequest.direccion === "";
    }

    const setters = {
        setPassword,
        setEmail,
        setNombre,
        setRuc,
        setTelefono,
        setDireccion,
        validarCampos
    }

    return {signUpRequest,setters}
}