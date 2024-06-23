import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {useState} from "react";
import {DialogPagar} from "./DialogPagar.jsx";
import {SpinnerDialog} from "../../../../shared/components/SpinnerDialog.jsx";
import {DetallesPago} from "./DetallesPago.jsx";
import {useExportFile} from "../../../../shared/custom-hooks/useExportFile.js";

export function DetallesCreditoAnualidades({creditoData, clienteId}) {
    const [pagarDialogVisible, setPagarDialogVisible] = useState(false)
    const [detallesPagoDialogVisible, setDetallesPagoDialogVisible] = useState(false)
    // eslint-disable-next-line react/prop-types
    const [creditoId,setCreditoId] = useState(creditoData?.id)
    const [cuotaId,setCuotaId] = useState(null)
    const [cuotaSelected,setCuotaSelected] = useState(null)
    const {exportExcel,exportPdf} = useExportFile()

    const termino = [{
        tipoCredito: creditoData?.tipoCredito,
        saldo:"S/"+parseFloat(creditoData?.saldo).toFixed(2),
        saldoRestante:"S/"+parseFloat(creditoData?.saldoRestante).toFixed(2),
        pagoInicial:"S/"+parseFloat(creditoData?.pagoInicial).toFixed(2),
        fechaDesembolso: creditoData?.fechaDesembolso,
        numCuotas: creditoData?.numCuotas
    }]
    const cuotas = creditoData?.cuotas.map((cuota)=>({

        ...cuota,
        amortizacion:"S/"+parseFloat(cuota.amortizacion).toFixed(2),
        interesCompensatorio:"S/"+parseFloat(cuota.interesCompensatorio).toFixed(2),
        interesCompensatorioMora:"S/"+parseFloat(cuota.interesCompensatorioMora).toFixed(2),
        interesMoratorio:"S/"+parseFloat(cuota.interesMoratorio).toFixed(2),
        monto:"S/"+parseFloat(cuota.monto).toFixed(2),

    }))

    const tasac = [
        {
            ...creditoData?.tasaCompensatoria
        }
    ];
    const tasam = [
        {
            ...creditoData?.tasaMoratoria
        }
    ]
    const gracia = () => {
        let response = [{
            numCuotas:" - ",
            tipo:" - ",
            saldoRestante:" - "
        }]
        if (creditoData?.periodoGracia != null)
        {
            response[0].numCuotas = creditoData?.periodoGracia?.numCuotas;
            response[0].tipo = creditoData?.periodoGracia?.tipo;
            response[0].saldoRestante ="S/"+parseFloat(creditoData?.periodoGracia?.saldoRestante).toFixed(2);
        }
        return response;
    }
    const pagoTemplate = (cuota)=>{
        if(cuota.estadoCuota==="PAGADA")
            return(
                <div>
                    <Button label="Ver detalles pago" icon="pi pi-eye" onClick={()=>{
                        setCuotaSelected(cuota)
                        setDetallesPagoDialogVisible(true)
                    }}></Button>
                </div>
            )
        return(
            <Button label="Pagar" onClick={()=> {
                setCuotaId(cuota.id)
                setCreditoId(creditoData.id)
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
    return (
        <div className="w-full">
            <DataTable value={termino} responsiveLayout="stack"  tableStyle={{ minWidth: '2rem'}}>
                <Column field="tipoCredito" header="Tipo de crédito"></Column>
                <Column field="saldo" header="Saldo (S/)"></Column>
                <Column field="pagoInicial" header="Pago inicial (S/)"></Column>
                <Column field="saldoRestante" header="Saldo restante (S/)"></Column>
                <Column field="fechaDesembolso" header="Fecha de desembolso"></Column>
                <Column field="numCuotas" header="Número de cuotas"></Column>

            </DataTable>
            <DataTable value={tasac} className="mt-5" responsiveLayout="stack"  tableStyle={{ minWidth: '2rem'}}>
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
            <DataTable value={gracia()} className="mt-5" responsiveLayout="stack"  tableStyle={{ minWidth: '2rem'}}>
                <Column field="tipo" header="Tipo de periodo de gracia"></Column>
                <Column field="numCuotas" header="Número de cuotas de gracia"></Column>
                <Column field="saldoRestante" header="Saldo restante"></Column>
            </DataTable>
            <h3 className="mt-5">Plan de pagos</h3>
            <DataTable header={headerTable} value={cuotas} responsiveLayout="stack"  tableStyle={{ minWidth: '2rem'}}>
                <Column field="numeroCuota" header="Número de cuota" style={{fontWeight:"bold", backgroundColor:"red",color:"white"}}></Column>
                <Column field="amortizacion" header="Amortización (S/)"></Column>
                <Column field="interesCompensatorio" header="Interés compensatorio (S/)"></Column>
                <Column field="interesCompensatorioMora" header="Interés compensatorio mora (S/)"></Column>
                <Column field="interesMoratorio" header="Interés moratorio (S/)"></Column>
                <Column field="monto" header="Cuota (S/)"></Column>
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