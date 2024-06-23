import {Dialog} from "primereact/dialog";
import {StepperProvider} from "../../creditos/context/StepperProvider.jsx";
import {StepperCredito} from "../../creditos/components/StepperCredito.jsx";
import {useCuenta} from "../custom-hooks/useCuenta.js";
import {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Step4} from "../../creditos/steps/Step4.jsx";
import {SpinnerDialog} from "../../../../shared/components/SpinnerDialog.jsx";
import {OrderItem} from "../../creditos/components/step2/OrderItem.jsx";
import {useParams} from "react-router-dom";
import {InputText} from "primereact/inputtext";
import {NavDialog} from "../../../../shared/components/NavDialog.jsx";
import 'jspdf-autotable'; // Si necesitas tablas u otras funcionalidades
// eslint-disable-next-line react/prop-types
export function Cuenta({customerId}) {
    const {orden, cuenta, http, state} = useCuenta();
    const [showDetalles, setShowDetalles] = useState(false);
    const [showOrden, setShowOrden] = useState(false);
    const [creditoSelected, setCreditoSelected] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    useEffect(() => {
        http.getCuenta(customerId);
    }, [])
    const creditoHeader = cuenta?.creditos?.map((e, index) => ({
        id: e.id,
        tipoCredito: e.tipoCredito,
        saldo: "S/" + parseFloat(e.saldo).toFixed(2),
        pagoInicial: "S/" + parseFloat(e.pagoInicial).toFixed(2),
        saldoRestante: "S/" + parseFloat(e.saldoRestante).toFixed(2),
        fechaDesembolso: e.fechaDesembolso,
        index: index
    }))
    const botonesDetallesTemplate = (credito) => {
        return (
            <div className="flex w-full flex-row justify-content-around">
                <Button
                    style={{backgroundColor: "white", border: " 2px solid blue", color: "blue"}}
                    icon="pi pi-file"
                    label="Ver detalles"
                    onClick={() => {
                        setCreditoSelected(cuenta?.creditos[credito?.index]);
                        setShowDetalles(true);
                    }}></Button>
                <Button
                    style={{backgroundColor: "white", border: " 2px solid green", color: "green"}}
                    icon="pi pi-shopping-cart"
                    label="Ver orden"
                    onClick={() => {
                        http.getOrden(credito.id);
                        setShowOrden(true);
                    }}></Button>
            </div>
        )
    }
    const EditMode = (props) => {
        // eslint-disable-next-line react/prop-types
        const [campoUpdate, setCampoUpdate] = useState(props.value)
        // eslint-disable-next-line react/prop-types
        if (!props.editMode) {
            // eslint-disable-next-line react/prop-types
            return props.children
        }
        return (
            <div className="flex flex-row gap-2">
                <InputText id="nombre" value={campoUpdate}
                           onChange={(e) => setCampoUpdate(e.target.value)}
                />
                <div>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Button icon="pi pi-save" severity="success" onClick={() => {
                        props.onSave(campoUpdate)
                    }}></Button>
                </div>
                <div>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Button icon="pi pi-times" severity="danger" onClick={props.onCancel}></Button>
                </div>
            </div>
        )
    }

    return (
        <div id="cuenta-page" className="w-full mt-5 pl-5 pr-5">
            <div className="dato-container flex">
                <div className="label-header">
                    Límite crediticio:
                </div>
                <div className="label-body flex flex-row align-items-center gap-2">
                    <EditMode editMode={showEdit} value={cuenta?.limiteCrediticio} onCancel={() => setShowEdit(false)}
                              onSave={(value) => http.updateLineaCredito(customerId, value)}
                    >
                        <div><strong style={{color: "red"}}>S/ {cuenta?.limiteCrediticio}</strong>
                        </div>
                        <div className="card flex justify-content-center">
                            <Button icon="pi pi-pencil" size="small" onClick={() => setShowEdit(true)}/>
                        </div>
                    </EditMode>
                </div>
            </div>
            <div className="dato-container flex">
                <div className="label-header">
                    Intereses acumulados:
                </div>
                <div className="label-body" >
                    S/ {cuenta?.interesAcumulado}
                </div>
            </div>

            <h4>Creditos</h4>
            <DataTable value={creditoHeader} responsiveLayout="stack"
                       tableStyle={{minWidth: '2rem'}}>
                <Column field="tipoCredito" header="Tipo de crédito"></Column>
                <Column field="saldo" header="Saldo (S/)"></Column>
                <Column field="pagoInicial" header="Pago inicial (S/)"></Column>
                <Column field="saldoRestante" header="Saldo restante (S/)"></Column>
                <Column field="fechaDesembolso" header="Fecha de desembolso"></Column>
                <Column header="Detalles" body={botonesDetallesTemplate}></Column>
            </DataTable>
            <Dialog
                visible={showDetalles}
                onHide={() => setShowDetalles(false)}
                closable={true}
                draggable={false}
                className="detalles-credito-container"
            >
                <Step4 creditoData={creditoSelected}></Step4>
            </Dialog>
            <Dialog
                visible={showOrden}
                onHide={() => setShowOrden(false)}
                closable={true}
                draggable={false}
                className=""
            >
                <div className="cart-products flex flex-column w-25rem">
                    <div className="header-cart">
                        <h3>Orden <i className="pi pi-shopping-cart"></i></h3>
                        <hr/>
                    </div>
                    <div className="body-cart">
                        {
                            orden?.items?.map((item, index) => (
                                <OrderItem item={item} key={index} deleteItem={null}></OrderItem>))
                        }
                    </div>
                    <div className="footer-cart" style={{fontWeight: "bold"}}><strong
                        className="mr-3">Total: </strong> S/ {parseFloat(orden?.total).toFixed(2)}</div>
                </div>
            </Dialog>
            <SpinnerDialog loading={state.loading}></SpinnerDialog>
            <NavDialog
                success={state.success}
                message="Se han guardado los cambios correctamente"
                color="green"
                icono="pi pi-check-circle"
                onClick={() => {
                    state.setSuccess(false)
                    window.location.reload()
                }}
            >
            </NavDialog>
        </div>
    );
}