import {Button} from "primereact/button";
import {StepperPanel} from "primereact/stepperpanel";
import {Stepper} from "primereact/stepper";
import {useContext, useRef, useState} from "react";
import {Step1} from "../steps/Step1.jsx";
import {Step2} from "../steps/Step2.jsx";
import {Step3} from "../steps/Step3.jsx";
import {Step4} from "../steps/Step4.jsx";
import {Step5} from "../steps/Step5.jsx";
import {StepperProvider} from "../context/StepperProvider.jsx";
import {StepperContext} from "../context/StepperContext.jsx";
import {useStep3} from "../custom-hooks/useStep3.js";
import {SpinnerDialog} from "../../../../shared/components/SpinnerDialog.jsx";
import {NavDialog} from "../../../../shared/components/NavDialog.jsx";

export function StepperCredito() {
    const stepperRef = useRef(null);
    const {creditoData,http,state} = useStep3();
    const {clienteSelected, orden, tipoCredito, valorFuturoForm, anualidadForm, checked} = useContext(StepperContext);
    const [showDialog,setShowDialog] = useState(false)
    const [message,setMessage] = useState(false)

    const solicitarCredito= ()=>{
        if (tipoCredito.tipo === "ANUALIDADES") {
            let formAnualidadesCopy = {...anualidadForm}
            formAnualidadesCopy.ordenId = orden.id;
            formAnualidadesCopy.fechaDesembolso =formatDate(formAnualidadesCopy.fechaDesembolso);
            if(checked===false)
                formAnualidadesCopy.gracia = null;
            http.solicitarCreditoAnualidad(clienteSelected.id,formAnualidadesCopy);
        } else if (tipoCredito.tipo === "VALOR_FUTURO") {
            let formValorFuturoCopy = {...valorFuturoForm};
            formValorFuturoCopy.ordenId = orden.id;
            formValorFuturoCopy.fechaDesembolso = formatDate(formValorFuturoCopy.fechaDesembolso);
            formValorFuturoCopy.fechaVencimiento =formatDate(formValorFuturoCopy.fechaVencimiento);
            http.solicitarCreditoValorFuturo(clienteSelected.id,formValorFuturoCopy);
        }
    }
    const solicitarVistaPreviaCredito = ()=>{
        if (tipoCredito.tipo === "ANUALIDADES") {
            let formAnualidadesCopy = {...anualidadForm}
            formAnualidadesCopy.ordenId = orden.id;
            formAnualidadesCopy.fechaDesembolso =formatDate(formAnualidadesCopy.fechaDesembolso);
            if(checked===false)
                formAnualidadesCopy.gracia = null;
            http.vistaPreviaAnualidades(formAnualidadesCopy);
        } else if (tipoCredito.tipo === "VALOR_FUTURO") {
            let formValorFuturoCopy = {...valorFuturoForm};
            formValorFuturoCopy.ordenId = orden.id;
            formValorFuturoCopy.fechaDesembolso = formatDate(formValorFuturoCopy.fechaDesembolso);
            formValorFuturoCopy.fechaVencimiento =formatDate(formValorFuturoCopy.fechaVencimiento);
            http.vistaPreviaValorFuturo(formValorFuturoCopy);
        }
    }
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    return (
        <div className="card flex justify-content-center w-full">
            <SpinnerDialog loading={state.loading}></SpinnerDialog>
            <Stepper ref={stepperRef} style={{width: '100%'}} orientation="vertical" linear={true}>
                <StepperPanel header="Seleccionar cliente">
                    <Step1></Step1>
                    <div className="flex pt-4 justify-content-end">
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => {
                            if (clienteSelected != null && clienteSelected.esApto)
                                stepperRef.current.nextCallback()
                            else if (!clienteSelected.esApto) {
                                setShowDialog(true)
                                setMessage("el cliente tiene una deuda pendiente o no ha aperturado su cuenta")
                            }
                            else
                            {
                                setShowDialog(true)
                                setMessage("Selecciona un cliente para continuar")
                            }
                        }}/>
                    </div>
                </StepperPanel>
                <StepperPanel header="Seleccionar productos">
                    <Step2></Step2>

                    <div className="flex pt-4 justify-content-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                onClick={() => stepperRef.current.prevCallback()}/>
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => {
                            if (orden != null && orden?.items?.length > 0 && orden?.total<=clienteSelected.limiteCrediticio)
                                stepperRef.current.nextCallback()
                            else if(orden?.total>clienteSelected.limiteCrediticio) {
                                setShowDialog(true)
                                setMessage("El total de la orden no debe ser mayor que la línea de crédito")
                            }
                            else
                            {
                                setShowDialog(true)
                                setMessage("La orden está vacía")
                            }
                        }}/>
                    </div>
                </StepperPanel>
                <StepperPanel header="Configuración del crédito">
                    <Step3></Step3>
                    <div className="flex pt-4 justify-content-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                onClick={() => stepperRef.current.prevCallback()}/>
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => {
                            solicitarVistaPreviaCredito();
                            stepperRef.current.nextCallback()
                        }}/>
                    </div>
                </StepperPanel>
                <StepperPanel header="Vista previa de las cuotas a pagar">
                    <Step4 creditoData={creditoData}></Step4>
                    <Button label="Confirmar crédito" type="button" onClick={()=>{
                        solicitarCredito()
                    }}></Button>
                    <div className="flex pt-4 justify-content-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                onClick={() => stepperRef.current.prevCallback()}/>
                    </div>
                </StepperPanel>
            </Stepper>
            <NavDialog
                success={state.success}
                message="El crédito ha sido realizado correctamente"
                icono="pi pi-check-circle"
                color="green"
                route={"/customers"}
                onClick={()=>{
                    state.setSuccess(false);
                }}
            >
            </NavDialog>
            <NavDialog
                success={showDialog}
                message={message}
                icono="pi pi-times-circle"
                color="red"
                route={null}
                onClick={()=>{
                    setShowDialog(false);
                }}
            >
            </NavDialog>

        </div>
    )
}