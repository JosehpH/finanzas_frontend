import {useContext, useState} from "react";
import {BASE_PATH} from "../../../../shared/constants/ApiFinanzas.js";
import {Contexto} from "../../../../auth/context/Contexto.jsx";
import axios from "axios";

export function useClient() {
    const [clientRequest, setClientRequest] = useState({
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        dni: "",
        email: "",
        telefono: "",
    })
    const [aperturarCuentaRequest, setAperturarCuentaRequest] = useState(
        {
            limiteCrediticio: 0
        }
    )
    const setNombre = (value) => setClientRequest((prev) => ({
        ...prev,
        nombres: value
    }))
    const setApellidoPaterno = (value) => setClientRequest((prev) => ({
        ...prev,
        apellidoPaterno: value
    }))
    const setApellidoMaterno = (value) => setClientRequest((prev) => ({
        ...prev,
        apellidoMaterno: value
    }))
    const setDni = (value) => setClientRequest((prev) => ({
        ...prev,
        dni: value
    }))
    const setEmail = (value) => setClientRequest((prev) => ({
        ...prev,
        email: value
    }))
    const setTelefono = (value) => setClientRequest((prev) => ({
        ...prev,
        telefono: value
    }))

    const setLimiteCrediticio = (value) => setAperturarCuentaRequest((prev) => ({
        limiteCrediticio: value
    }))
    const setters = {
        setNombre,
        setApellidoPaterno,
        setApellidoMaterno,
        setDni,
        setEmail,
        setTelefono,
        setLimiteCrediticio
    }


    const [clientes, setClients] = useState([])
    const [perfil, setPerfil] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const resource = `${BASE_PATH}/api/clientes`
    const {token} = useContext(Contexto)
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };

    const postClient = () => {
        setLoading(true)
        axios.post(resource, clientRequest, config).then((e) => {
            setLoading(false)
            setSuccess(true)
            getAllClients()
        }).catch((e) => {
            setLoading(false)
        })
    }
    const getAllClients = () => {
        const url = `${BASE_PATH}/api/clientes/negocio`
        setLoading(true)
        axios.get(url, config).then((e) => {
            setClients(e.data)
            console.log(e)
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
            alert("Error al obtner los clientes")
        })
    }

    const aperturarCuenta = (clienteId) => {
        setLoading(true)
        axios.post(`${resource}/${clienteId}/aperturar-cuenta`, aperturarCuentaRequest, config).then((e) => {
            setLoading(false)
            getAllClients()
            setSuccess(true)
        }).catch((e) => {
            setLoading(false)
            console.log(e)
            alert("Error al aperturar la cuenta")
        })
    }
    const searchClient = (keyword) => {
        const ruta = `${resource}/search`
        const configs = {...config, params: {keyword: keyword}}
        setLoading(true);
        axios.get(ruta, configs).then((e) => {
            setLoading(false)
            setClients(e.data)
        }).catch((e) => {
            setLoading(false)
            alert(e)
        })
    }

    const getClientById = (id) => {
        let cliente = null
        setLoading(true)
        axios.get(`${resource}/${id}`, config).then((e) => {
            setPerfil(e.data)
            setLoading(false);
        }).catch((e) => {
            setLoading(false)
        })
        return cliente
    }
    const editCampoById = (clienteId, campo,nombreCampo)=>{
        const ruta = (`${resource}/${nombreCampo}/${clienteId}`)
        setLoading(true)
        axios.patch(ruta,{[nombreCampo]:campo},config).then((e)=>{
            setLoading(false)
            setSuccess(true)
        }).catch((e)=>{
            setLoading(false)
            console.log("Ruta: ",ruta)
            console.log("Error: ",e)
            alert("Ha ocurrido un error")
        })
    }
    return {
        perfil,
        clientes,
        setters,
        estado: {loading, success, setSuccess},
        http: {postClient, getAllClients, aperturarCuenta, searchClient, getClientById,editCampoById}
    }
}