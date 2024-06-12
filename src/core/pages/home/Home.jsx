import "./Home.css"
import { useNegocioProfile} from "../../../shared/custom-hooks/useNegocioProfile.js";
import {SpinnerDialog} from "../../../shared/components/SpinnerDialog.jsx";
import {useEffect} from "react";
export function Home(){
    const {data,http,state} = useNegocioProfile()

    useEffect(()=>{
        http.getInfoNegocio()
    },[])

    return (
        <div className="page inicio flex w-full flex-column align-items-center justify-content-around">
            <div className="container-bienvenida flex w-full flex-column align-items-center">
                Bienvenido a tu cuenta, <strong>{data?.nombre}</strong>
                <sub>RUC: {data?.ruc}</sub>
            </div>
            <div
                className="p-5 estadisticas-container flex w-full flex-column md:flex-row lg:flex-row xl:flex-row align-content-around justify-content-around">
                <div className="estadistica">
                    <div className="estadistica-title">
                        Número de clientes activos
                    </div>
                    <div className="estadistica-body">
                        <i className="pi pi-users" style={{fontSize: "2.0rem"}}/> {data?.clientesActivos}
                    </div>
                </div>
                <div className="estadistica">
                    <div className="estadistica-title">
                        Total de créditos otorgados
                    </div>
                    <div className="estadistica-body">
                        <i className="pi pi-credit-card" style={{fontSize: "2.0rem"}}/> {data?.creditosOtorgados}
                    </div>
                </div>
                <div className="estadistica">
                    <div className="estadistica-title">
                        Cuotas pendientes de pago
                    </div>
                    <div className="estadistica-body">
                        <i className="pi pi-clock" style={{fontSize: "2.0rem"}}/> {data?.creditosPendientesPago}

                    </div>
                </div>
                <div className="estadistica">
                    <div className="estadistica-title">
                        Cuotas con pago atrasado
                    </div>
                    <div className="estadistica-body">
                        <i className="pi pi-clock" style={{fontSize: "2.0rem"}}/> {data?.creditosPagoAtrasado}

                    </div>
                </div>
            </div>
            <div className="productos-populares-container mt-5">
                <div className="productos-populares-title">Productos más vendidos</div>
                <div className="productos-populares-body">

                </div>
            </div>
            <SpinnerDialog loading={state.loading}></SpinnerDialog>
        </div>
    )

}