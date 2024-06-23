import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {useEffect, useState} from "react";
import {DialogPagar} from "./DialogPagar.jsx";
import {usePagos} from "../custom-hooks/usePagos.js";
import {DetallesPago} from "./DetallesPago.jsx";
import {useExportFile} from "../../../../shared/custom-hooks/useExportFile.js";

// eslint-disable-next-line react/prop-types
export function DetallesCreditoValorFuturo({creditoData,clienteId}){
    const [pagarDialogVisible, setPagarDialogVisible] = useState(false)
    const [detallesPagoDialogVisible, setDetallesPagoDialogVisible] = useState(false)

    const [creditoId,setCreditoId] = useState(creditoData.id)
    const [cuotaId,setCuotaId] = useState(null)
    const [cuotaSelected,setCuotaSelected] = useState(null)
    const {exportExcel,exportPdf} = useExportFile()

    const termino = [{
        tipoCredito: creditoData?.tipoCredito,
        saldo:"S/"+parseFloat(creditoData?.saldo).toFixed(2),
        saldoRestante:"S/"+parseFloat(creditoData?.saldoRestante).toFixed(2),
        pagoInicial:"S/"+parseFloat(creditoData?.pagoInicial).toFixed(2),
        fechaDesembolso:creditoData?.fechaDesembolso
    }]
    const cuotas = [
        {
            ...creditoData?.cuota,
            amortizacion:"S/"+parseFloat(creditoData?.cuota.amortizacion).toFixed(2),
            interesCompensatorio:"S/"+parseFloat(creditoData?.cuota.interesCompensatorio).toFixed(2),
            interesCompensatorioMora:"S/"+parseFloat(creditoData?.cuota.interesCompensatorioMora).toFixed(2),
            interesMoratorio:"S/"+parseFloat(creditoData?.cuota.interesMoratorio).toFixed(2),
            monto:"S/"+parseFloat(creditoData?.cuota.monto).toFixed(2),
            saldoFinal: "S/" + parseFloat(creditoData?.saldoRestante-creditoData?.cuota.amortizacion).toFixed(2),
            saldoInicial: "S/" + parseFloat(creditoData?.saldoRestante).toFixed(2),

        }
    ]
    const tasac = [
        {
            ...creditoData?.tasaCompensatoria
        }
    ] ;
    const tasam = [
        {
            ...creditoData?.tasaMoratoria,

        }
    ]
    const pagoTemplate = (cuota)=>{
        if(cuota.estadoCuota==="PAGADA")
            return(
                <div>
                    <Button label="Ver detalles pago" icon="pi pi-eye" onClick={()=>{
                        setCuotaSelected(cuota)
                        console.log("Cuota selected: ",cuota)
                        setDetallesPagoDialogVisible(true)
                    }}></Button>
                </div>
            )
        return(
            <Button label="Pagar" onClick={()=> {
                setCuotaId(cuota.id)

                setPagarDialogVisible(true)
            }}
            >

            </Button>
        )
    }
    const cols = [
        { field: 'numeroCuota', header: 'Número de cuota' },
        { field: 'amortizacion', header: 'Amortización' },
        { field: 'interesCompensatorio', header: 'Interés compensatorio' },
        { field: 'interesMoratorio', header: 'Interés moratorio' },
        { field: 'monto', header: 'Cuota' },
        { field: 'fechaVencimiento', header: 'Fecha de vencimiento' },
        { field: 'estadoCuota', header: 'Estado de pago' }
    ];
    const headerTable = (
        <div className="flex align-items-center justify-content-end gap-2">
            <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={()=>{exportPdf(cols,cuotas)}} data-pr-tooltip="PDF" />
        </div>
    );
    return(
        <div className="w-full">
            <DataTable value={termino} responsiveLayout="stack"  tableStyle={{ minWidth: '2rem'}}>
                <Column field="tipoCredito" header="Tipo de crédito"></Column>
                <Column field="saldo" header="Saldo"></Column>
                <Column field="pagoInicial" header="Pago inicial"></Column>
                <Column field="saldoRestante" header="Saldo restante"></Column>
                <Column field="fechaDesembolso" header="Fecha de desembolso"></Column>
            </DataTable>
            <DataTable value={tasac}  className="mt-5"  responsiveLayout="stack"  tableStyle={{ minWidth: '2rem'}}>
                <Column field="tipo" header="Tipo de tasa compensatoria"></Column>
                <Column field="tasa" header="Tasa (%)"></Column>
                <Column field="periodo" header="Periodo de la tasa"></Column>
                <Column field="periodoCapitalizacion" header="Periodo de capitalización"></Column>
            </DataTable>
            <DataTable value={tasam} className="mt-5" responsiveLayout="stack"  tableStyle={{ minWidth: '2rem'}}>
                <Column field="tipo" header="Tipo de tasa moratoria"></Column>
                <Column field="tasa" header="Tasa (%)"></Column>
                <Column field="periodo" header="Periodo de la tasa"></Column>
                <Column field="periodoCapitalizacion" header="Periodo de capitalización"></Column>
            </DataTable>
            <h3 className="mt-5">PLAN DE PAGOS</h3>
            <DataTable header={headerTable} value={cuotas} responsiveLayout="stack"  tableStyle={{ minWidth: '2rem'}}>
                <Column field="numeroCuota" header="Número de cuota" style={{fontWeight:"bold", backgroundColor:"red",color:"white"}}></Column>
                <Column field="saldoInicial" header="Saldo Inicial"></Column>
                <Column field="interesCompensatorio" header="Interés compensatorio"></Column>
                <Column field="interesCompensatorioMora" header="Interés compensatorio mora"></Column>
                <Column field="interesMoratorio" header="Interés moratorio"></Column>
                <Column field="amortizacion" header="Amortización"></Column>
                <Column field="monto" header="Cuota"></Column>
                <Column field="fechaVencimiento" header="Fecha de vencimiento"></Column>
                <Column field="estadoCuota" header="Estado de pago"></Column>
                <Column header="Pago" body={pagoTemplate}></Column>
            </DataTable>
            <DialogPagar onHide={()=>setPagarDialogVisible(false)}
                         visible={pagarDialogVisible}
                         clienteId={clienteId}
                         creditoId={creditoId}
                         cuotaId={cuotaId}
            />
            <DetallesPago
                onHide={()=>setDetallesPagoDialogVisible(false)}
                visible={detallesPagoDialogVisible}
                fechaPago={cuotaSelected?.fechaPago}
                metodoPago={cuotaSelected?.metodoPago}
                montoPagado={cuotaSelected?.montoPagado}
            >
            </DetallesPago>
        </div>
    );
}