import {useContext, useState} from "react";
import axios from "axios";
import {BASE_PATH} from "../../../../shared/constants/ApiFinanzas.js";
import {Contexto} from "../../../../auth/context/Contexto.jsx";
import {StepperContext} from "../context/StepperContext.jsx";

export function useStep1() {
    const {clienteSelected,setClienteSelected} = useContext(StepperContext);
    const [clients,setClients] = useState([])
    const [loading, setLoading] = useState(false);
    const resource = `${BASE_PATH}/api/clientes`
    const {token} = useContext(Contexto)
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };

    const searchClientByDni = (dni) => {
        const ruta = `${resource}/search-by-dni`
        const configs = {...config,params:{dni:dni}}
        setLoading(true);
        axios.get(ruta,configs).then((e)=>{
            setLoading(false)
            setClienteSelected(e.data)
        }).catch((e)=>{
            setLoading(false)
            alert(e)
        })
    }
    const getClientById=(id)=>{
        const ruta = `${resource}/${id}`
        setLoading(true);
        axios.get(ruta,config).then((e)=>{
            console.log(e)
            setLoading(false)
            setClienteSelected(e.data)
        }).catch((e)=>{
            setLoading(false)
            alert(e)
        })
    }
    return {loading,searchClientByDni,getClientById,clients,clienteSelect:{clienteSelected,setClienteSelected}}
}