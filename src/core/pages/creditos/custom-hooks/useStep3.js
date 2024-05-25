import {BASE_PATH} from "../../../../shared/constants/ApiFinanzas.js";
import axios from "axios";
import {useContext, useState} from "react";
import {Contexto} from "../../../../auth/context/Contexto.jsx";

export function useStep3(){
    const resource =  `${BASE_PATH}/api/cuentas`
    const [loading,setLoading] = useState(false);
    const [creditoData ,setCreditoData] = useState(null);
    const [success, setSuccess] = useState(false);
    const {token} = useContext(Contexto)
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };
    const solicitarCreditoValorFuturo = (clienteId,body)=>{
        const ruta = `${resource}/${clienteId}/solicitar-credito-valor-futuro`
        console.log("BODY: ",body);
        setLoading(true);
        axios.post(ruta,body,config).then((e)=>{
            setLoading(false);
            setSuccess(true);
            console.log("DATA Valor futuro", e);
        }).catch((e)=>{
            console.log("ERROR: ",e);
            setLoading(false);
            alert(e);
        })
    }
    const solicitarCreditoAnualidad = (clienteId,body)=>{
        const ruta = `${resource}/${clienteId}/solicitar-credito-anualidades`
        setLoading(true);
        axios.post(ruta,body,config).then((e)=>{
            setSuccess(true);
            setLoading(false);
        }).catch((e)=>{
            setLoading(false);
            alert(e);
        })
    }

    const vistaPreviaValorFuturo = (body)=>{
        const ruta = `${BASE_PATH}/api/creditos/valor-futuro`;
        //setLoading(true);
        axios.post(ruta,body,{...config,timeout:5000}).then((e)=>{
            //setLoading(false);
            console.log("Resultado: ",e);
            setCreditoData(e.data);
        }).catch((e)=>{
            console.log("Error: ",e);
            //setLoading(false);
        })
    }
    const vistaPreviaAnualidades = (body) =>{
        const ruta = `${BASE_PATH}/api/creditos/anualidades`;
        //setLoading(true);
        axios.post(ruta,body,{...config,timeout:5000}).then((e)=>{
            //setLoading(false);
            console.log(e);
            setCreditoData(e.data);
        }).catch((e)=>{
            //setLoading(false);
            console.log(e);
        })
    }

    return {
        creditoData,
        http:{
            solicitarCreditoValorFuturo,solicitarCreditoAnualidad,
            vistaPreviaValorFuturo,
            vistaPreviaAnualidades},
        state:{
            loading,
            success,
            setSuccess
        }
    }
}