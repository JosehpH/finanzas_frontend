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

export function Cuenta() {
    const {orden, cuenta, http, state} = useCuenta();
    const [showDetalles, setShowDetalles] = useState(false);
    const [showOrden, setShowOrden] = useState(false);
    const [creditoSelected, setCreditoSelected] = useState(null);
    const {customerId} = useParams();

    useEffect(() => {
        http.getCuenta(customerId);
    }, [])
    const encabezado = (
        <>
            <h3>Cuenta: test </h3>
            <hr/>
        </>
    );
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
                    style={{backgroundColor:"white",border:" 2px solid blue",color:"blue"}}
                    icon="pi pi-file"
                    label="Ver detalles"
                    onClick={() => {
                        setCreditoSelected(cuenta?.creditos[credito?.index]);
                        setShowDetalles(true);
                    }}></Button>
                <Button
                    style={{backgroundColor:"white",border:" 2px solid green",color:"green"}}
                    icon="pi pi-shopping-cart"
                    label="Ver orden"
                    onClick={() => {
                    http.getOrden(credito.id);
                    setShowOrden(true);
                }}></Button>
            </div>
        )
    }
    return (
        <div className="w-full mt-5 pl-5 pr-5">
            <h3>Límite crediticio: S/ {cuenta?.limiteCrediticio}</h3>
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
        </div>
    );
}