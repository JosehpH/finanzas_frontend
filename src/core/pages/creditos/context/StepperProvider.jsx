import {StepperContext} from "./StepperContext.jsx";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
export function StepperProvider({children}){
    const [clienteSelected,setClienteSelected] = useState(null);
    const [tipoCredito,setTipoCredito] = useState(null);
    const [valorFuturoForm,setValorFuturoForm] =useState({
       tasaCompensatoria:{
           periodo:null,
           tasa:null,
           tipo:null,
           periodoCapitalizacion:null
       },
        tasaMoratoria:{
            periodo:null,
            tasa:null,
            tipo:null,
            periodoCapitalizacion:null
        },
        pagoInicial:0,
        fechaDesembolso: new Date(),
        fechaVencimiento: new Date()
    });
    const [anualidadForm,setAnualidadForm] =useState({
        tasaCompensatoria:{
            periodo:null,
            tasa:null,
            tipo:null,
            periodoCapitalizacion:null
        },
        tasaMoratoria:{
            periodo:null,
            tasa:null,
            tipo:null,
            periodoCapitalizacion:null
        },
        pagoInicial:0,
        fechaDesembolso: new Date(),
        numCuotas:0,
        tipoAnualidad:"VENCIDA",
        periodoPago:null,
        gracia:{
            numCuotas:0,
            tipo:null
        }
    });
    return(
        <StepperContext.Provider value={
            {
                clienteSelected,
                setClienteSelected,
                tipoCredito,
                setTipoCredito,
                valorFuturoForm,
                setValorFuturoForm,
                anualidadForm,
                setAnualidadForm
            }
        }>
            {children}
        </StepperContext.Provider>
    )
}