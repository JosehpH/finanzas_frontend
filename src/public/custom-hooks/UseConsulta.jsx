import {BASE_PATH} from "../../shared/constants/ApiFinanzas.js";
import {useState} from "react";
import axios from "axios";

export function useConsulta(){
    const resource = `${BASE_PATH}/api/clientes/consulta`
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [clienteId, setClienteId] = useState(null)
    const getIduser = (dni,ruc)=>{
        setLoading(true)
        axios.post(resource,{dni:dni,ruc:ruc}).then((e)=>{
            setLoading(false)
            setClienteId(e.data.clienteId)
            console.log("E:",e)
        }).catch((e)=>{
            console.log("Error:",e)
            setClienteId(null)

            alert("No se ha encontrado los datos del cliente")
            setError(true)
            setLoading(false)
        })
    }

    return {states:{loading,error,setError}, http:{getIduser}, clienteId}
}