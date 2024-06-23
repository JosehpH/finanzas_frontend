import {useContext, useState} from "react";
import {BASE_PATH} from "../../../../shared/constants/ApiFinanzas.js";
import {Contexto} from "../../../../auth/context/Contexto.jsx";
import axios from "axios";

export function useCreditos(){
    const [creditos,setCreditos] = useState([])
    const [loading, setLoading] = useState(false);
    const [creditoSelected, setCreditoSelected] = useState(null);
    const resource = `${BASE_PATH}/api/creditos`
    const {token} = useContext(Contexto)
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };

    const getCreditos = () => {
        setLoading(true);
        axios.get(resource+"/",config).then((e)=>{
            setLoading(false)
            setCreditos(e.data)
        }).catch((e)=>{
            setLoading(false)
            alert(e)
        })
    }
    const searchCreditos = (dni,fechaInicio,fechaFinal) => {
        const configs = {...config,params:{dni:dni,fechaInicio:fechaInicio,fechaFinal:fechaFinal}}
        setLoading(true);
        axios.get(resource+"/filter",configs).then((e)=>{
            setLoading(false)
            setCreditos(e.data)
        }).catch((e)=>{
            setLoading(false)
            console.log(e)
            alert(e)
        })
    }

    const getDetallesCreditoById = (creditoId) =>{
        setLoading(true);
        axios.get(resource+"/"+creditoId,config).then((e)=>{
            setLoading(false)
            setCreditoSelected(e.data)
            console.log("Credito selected:", e.data)
        }).catch((e)=>{
            setLoading(false)
            setCreditoSelected(null)
            console.log(e)
            alert(e)
        })
    }


    return {loading,http:{getCreditos,searchCreditos,getDetallesCreditoById},creditos,creditoSelected}
}