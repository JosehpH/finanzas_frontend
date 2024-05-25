import {VistaCreditoValorFuturo} from "../components/step4/VistaCreditoValorFuturo.jsx";
import {VistaCreditoAnualidades} from "../components/step4/VistaCreditoAnualidades.jsx";

// eslint-disable-next-line react/prop-types
export function Step4({creditoData}){
    // eslint-disable-next-line react/prop-types
    if(creditoData?.tipoCredito==="VALOR FUTURO")
        return (<VistaCreditoValorFuturo creditoData={creditoData}/>)
    else
        return (<VistaCreditoAnualidades creditoData={creditoData}/>)
}