import {useProducts} from "../../productos/custom-hooks/useProducts.js";
import {BASE_PATH} from "../../../../shared/constants/ApiFinanzas.js";
import {useContext} from "react";
import {StepperContext} from "../context/StepperContext.jsx";
import axios from "axios";
import {Contexto} from "../../../../auth/context/Contexto.jsx";

export function useStep2(){
    const {orden,setOrden} = useContext(StepperContext);
    const {getAll,searchProducts,loading,products} = useProducts()
    const {token} = useContext(Contexto)
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };
    const resource = `${BASE_PATH}/api/ordenes`;

    const crearOrden=(listItems)=>{
        axios.post(resource,{items:listItems},config).then((e)=>{
            setOrden(e.data);
        }).catch((e)=>{
            alert("Orden no creada")
        })
    }

    return{http:{getAll,searchProducts,crearOrden},state:{loading},products,orden}
}