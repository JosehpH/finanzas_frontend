import {StepperContext} from "./StepperContext.jsx";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
export function StepperProvider({children}){
    const [clienteSelected,setClienteSelected] = useState(null);
    const [tipoCredito,setTipoCredito] = useState(null);
    const [valorFuturoForm,setValorFuturoForm] =useState({
        ordenId:null,
       tasaCompensatoria:{
           periodo:null,
           tasa:"",
           tipo:null,
           periodoCapitalizacion:null
       },
        tasaMoratoria:{
            periodo:null,
            tasa:"",
            tipo:null,
            periodoCapitalizacion:null
        },
        pagoInicial:"",
        fechaDesembolso: new Date(),
        fechaVencimiento: new Date()
    });

    //Para activar el periodo de gracia
    const [checked, setChecked] = useState(false);
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
        pagoInicial:"",
        fechaDesembolso: new Date(),
        numCuotas:0,
        tipoAnualidad:"VENCIDA",
        periodoPago:null,
        gracia:{
            numCuotas:0,
            tipo:null
        },
        ordenId:null
    });
    const [orden,setOrden] = useState(null)
    const [ordenLocal,setOrdenLocal] = useState([])
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
                setAnualidadForm,
                orden,
                setOrden,
                ordenLocal,
                setOrdenLocal,
                checked,
                setChecked
            }
        }>
            {children}
        </StepperContext.Provider>
    )
}