import {BASE_PATH} from "../../../../shared/constants/ApiFinanzas.js";
import {useContext, useState} from "react";
import {Contexto} from "../../../../auth/context/Contexto.jsx";
import axios from "axios";

export function useCuenta(){
    const resource = `${BASE_PATH}/api/cuentas`
    const {token} = useContext(Contexto)
    const [cuenta,setCuenta] = useState(null);
    const [loading,setLoading] = useState(false);
    const [orden, setOrden] = useState(null);
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };

    const getCuenta = (clientId)=>{
        const url = `${resource}/${clientId}`;
        setLoading(true)
        axios.get(url,config).then((e)=>{
            setLoading(false)
            setCuenta(e.data);
            console.log("Cuenta: ",e);
        }).catch((e)=>{
            setLoading(false)
            alert("Error al obtener la cuenta")
            console.log(e)
        })
    }
    const getOrden = (creditoId) =>{
        const url = `${BASE_PATH}/api/ordenes/${creditoId}`;
        setLoading(true)
        axios.get(url,config).then((e)=>{
            setLoading(false)
            setOrden(e.data);
        }).catch((e)=>{
            setLoading(false)
            alert("Error al obtener la orden")
            console.log(e)
        })

    }
    return {orden,cuenta,http:{getCuenta,getOrden},state:{loading}}
}