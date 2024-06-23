
import {DetallesCreditoValorFuturo} from "./DetallesCreditoValorFuturo.jsx";
import {DetallesCreditoAnualidades} from "./DetallesCreditoAnualidades.jsx";

export function DetallesCredito({creditoData, clienteId}){
    // eslint-disable-next-line react/prop-types
    if(creditoData?.tipoCredito==="VALOR FUTURO")
        return (<DetallesCreditoValorFuturo creditoData={creditoData} clienteId={clienteId}/>)
    else
        return (<DetallesCreditoAnualidades creditoData={creditoData} clienteId={clienteId}/>)
}