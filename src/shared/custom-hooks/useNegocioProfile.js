import {BASE_PATH} from "../constants/ApiFinanzas.js";
import {useContext, useState} from "react";
import {Contexto} from "../../auth/context/Contexto.jsx";
import axios from "axios";

export function useNegocioProfile() {
    const resource = `${BASE_PATH}/api/negocio`
    const {token} = useContext(Contexto)
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState(null);
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };

    const getInfoNegocio = () => {
        setLoading(true)
        axios.get(resource, config).then((e) => {
            setData(e.data)
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
            alert(e)
        })
    }
    const updateProfile=(body)=>{
        setLoading(true)
        axios.put(resource,body,config).then((e)=>{
            setLoading(false)
            console.log("updated: ",e)
            setSuccess(true)
        }).catch((e)=>{
            setLoading(false)
        })
    }
    return{data,http:{getInfoNegocio, updateProfile},state:{loading,success,setSuccess}}
}