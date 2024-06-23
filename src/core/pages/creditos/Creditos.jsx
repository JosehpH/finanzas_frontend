import {SpeedDial} from "primereact/speeddial";
import {useEffect, useState} from "react";
import {NewCreditDialog} from "./components/NewCreditDialog.jsx";
import {StepperProvider} from "./context/StepperProvider.jsx";
import "./Creditos.css"
import {SearchBar} from "../../../shared/components/SearchBar.jsx";
import {useCreditos} from "./custom-hooks/useCreditos.js";
import {SpinnerDialog} from "../../../shared/components/SpinnerDialog.jsx";
import {CreditCard} from "./components/CreditCard.jsx";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {OrderItem} from "./components/step2/OrderItem.jsx";
import {useCuenta} from "../clientes/custom-hooks/useCuenta.js";
import {InputCalendario} from "../../../shared/components/InputCalendario.jsx";
import {Step4} from "./steps/Step4.jsx";
import {DetallesCredito} from "./pagos/DetallesCredito.jsx";
import {useExportFile} from "../../../shared/custom-hooks/useExportFile.js";
export function Creditos(){
    const[stepperVisible,setStepperVisible] = useState(false)
    const {http,creditos,loading,creditoSelected} = useCreditos()
    const {orden,http:httpCuenta,state} = useCuenta()
    const [showOrden, setShowOrden] = useState(false);
    const [showDetalles, setShowDetalles] = useState(false);
    const [dates,setDates] = useState(null);
    const [clienteId, setClienteId] = useState(null)
    const {exportExcel,exportPdf} = useExportFile()
    useEffect(()=>{
        http.getCreditos()
    },[])

    const filterCreditos = (dni)=>{
        // Verificar si dni es una cadena vacía y convertirla a null
        dni = dni === "" ? null : dni;

        // Llamar a la función searchCreditos con los parámetros proporcionados
        http.searchCreditos(dni, dates ? formatDate(dates[0]) : null, dates ? formatDate(dates[1]) : null);
    }
    const creditoData = creditos.map((e, index) => ({
        id: e.creditoId,
        tipoCredito: e.tipoCredito,
        saldo: "S/" + parseFloat(e.saldo).toFixed(2),
        pagoInicial: "S/" + parseFloat(e.pagoInicial).toFixed(2),
        saldoRestante: "S/" + parseFloat(e.saldoRestante).toFixed(2),
        fechaDesembolso: e.fechaDesembolso,
        dni: e.cliente.dni,
        estado:e.estadoCredito,
        ordenId:e.consumoId,
        nombres:e.cliente.nombres,
        index: index,
        clienteId:e.cliente.id
    }))
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const templateEstadoCredito = (credito)=>{
        let color = "";
        if(credito.estado==="ATRASADA") color = "red";
        if(credito.estado==="PENDIENTE") color = "coral";
        if(credito.estado==="PAGADA") color = "grey";
        return (
            <div className="p-2" style={{backgroundColor:color, fontSize:"0.8em", textAlign:"center", color:"white"}}>
                CUOTAS {credito.estado}S
            </div>
        )
    }

    const botonesDetallesTemplate = (credito) => {
        return (
            <div className="flex w-full flex-row justify-content-around">
                <Button
                    style={{backgroundColor:"white",border:" 2px solid blue",color:"blue"}}
                    icon="pi pi-file"
                    label="Ver detalles y/o pagar"
                    onClick={() => {
                        http.getDetallesCreditoById(credito.id)
                        setClienteId(credito.clienteId)
                        setShowDetalles(true)

                    }}></Button>
                <Button
                    style={{backgroundColor:"white",border:" 2px solid green",color:"green"}}
                    icon="pi pi-shopping-cart"
                    label="Ver orden"
                    onClick={() => {
                        httpCuenta.getOrden(credito.id);
                        setShowOrden(true)
                    }}></Button>
            </div>
        )
    }
    //<Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={()=>{exportExcel(creditoData)}} data-pr-tooltip="XLS" />
    const headerTable = (
        <div className="flex align-items-center justify-content-end gap-2">
            <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={()=>{exportPdf(cols,creditoData)}} data-pr-tooltip="PDF" />
        </div>
    );
    const cols = [
        { field: 'id', header: 'ID' },
        { field: 'dni', header: 'DNI' },
        { field: 'nombres', header: 'Nombres' },
        { field: 'tipoCredito', header: 'Tipo de crédito' },
        { field: 'saldo', header: 'Saldo (S/)' },
        { field: 'pagoInicial', header: 'Pago inicial (S/)' },
        { field: 'saldoRestante', header: 'Saldo restante (S/)' },
        { field: 'fechaDesembolso', header: 'Fecha de desembolso' },
        { field: 'estado', header: 'Estado' }
    ];

    return(
        <div className="page productos">
            <div className="header-page-container">
                <h2 className="title-page"> Gestión de créditos</h2>
                <hr/>
            </div>
            <div className="flex flex-row w-full justify-content-around">
                <SearchBar onSearch={filterCreditos} placeholder="Buscar por DNI"></SearchBar>
                <div className="flex flex-row input-calendario-range-container">
                    <InputCalendario placeholder={"Fecha min - Fecha max"} date={dates} setDate={setDates} range={true} hideOnRangeSelection={true}></InputCalendario>
                    <Button onClick={()=>{setDates(null)}} icon={"pi pi-times"}></Button>
                </div>

            </div>
            <div className="flex w-full credits-container p-5 flex-column align-items-center">
                <DataTable value={creditoData}
                           tableStyle={{minWidth: '2rem'}}
                            header={headerTable}
                >
                    <Column field="id" header="ID"></Column>
                    <Column field="dni" header="DNI"></Column>
                    <Column field="nombres" header="Nombres"></Column>
                    <Column field="tipoCredito" header="Tipo de crédito"></Column>
                    <Column field="saldo" style={{fontWeight:"bold"}} header="Saldo (S/)"></Column>
                    <Column field="pagoInicial" header="Pago inicial (S/)"></Column>
                    <Column field="saldoRestante" header="Saldo restante (S/)"></Column>
                    <Column field="fechaDesembolso" header="Fecha de desembolso"></Column>
                    <Column header="Detalles" body={botonesDetallesTemplate}></Column>
                    <Column header="Estado" body={templateEstadoCredito}></Column>
                </DataTable>
            </div>
            <div className="spedd-dial-container">
                <SpeedDial
                    model={null}
                    radius={120}
                    type="quarter-circle"
                    direction="up-left"
                    onClick={() => {setStepperVisible(true)}}
                />
            </div>
            <NewCreditDialog
                visible={stepperVisible}
                onClose={()=>setStepperVisible(false)}
            >
            </NewCreditDialog>
            <SpinnerDialog loading={loading || state.loading}></SpinnerDialog>
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
            <Dialog
                visible={showDetalles}
                onHide={() => setShowDetalles(false)}
                closable={true}
                draggable={false}
                className="detalles-credito-container"
            >
                <DetallesCredito creditoData={creditoSelected} clienteId={clienteId}></DetallesCredito>
            </Dialog>
        </div>
    )
}