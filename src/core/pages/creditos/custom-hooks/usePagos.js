import {BASE_PATH} from "../../../../shared/constants/ApiFinanzas.js";
import {useContext, useState} from "react";
import {Contexto} from "../../../../auth/context/Contexto.jsx";
import axios from "axios";

export function usePagos(){
    const resource = `${BASE_PATH}/api/cuota`
    const {token} = useContext(Contexto)
    const [cuotaData, setCuotaData] = useState(null)
    const [pagoData, setPagoData] = useState(null)
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };
    const [loading, setLoading] = useState(false)
    const [succesfully, setSuccesfully] = useState(false)
    const getInfoPago = (cuotaId,creditoId)=>{
        console.log("cuota id: ",cuotaId, " creditoId: ",creditoId)
        const url = `${resource}/${cuotaId}/${creditoId}`
        setLoading(true)
        axios.get(url,config).then((e)=>{
            setLoading(false)
            console.log("info:",e)
            setCuotaData(e.data);
        }).catch((e)=>{
            alert("ocurrió un error al obtener los detalles de la cuota")
            console.log("Error pago",e)
            setLoading(false)
        })
    }
    const pagar = (clienteId,cuotaId,metodoPago,creditoId)=>{
        const url = `${resource}/${clienteId}/${cuotaId}/${creditoId}/pagar`
        setLoading(true)
        console.log("Metodo pago: ",metodoPago)
        axios.post(url, {metodoPago:metodoPago},config).then((e)=>{
            setSuccesfully(true)
            setLoading(false)
            setPagoData(e.data)
        }).catch((e)=>{
            setLoading(false)
            console.log("ERROR PAGAR: ",e)
            alert(e)
        })
    }
    return {http:{pagar,getInfoPago}, states:{loading,succesfully,setSuccesfully}, values:{cuotaData,pagoData}}
}