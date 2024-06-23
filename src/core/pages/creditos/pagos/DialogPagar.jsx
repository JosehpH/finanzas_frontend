import {Dialog} from "primereact/dialog";
import {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {usePagos} from "../custom-hooks/usePagos.js";
import {SpinnerDialog} from "../../../../shared/components/SpinnerDialog.jsx";
import {NavDialog} from "../../../../shared/components/NavDialog.jsx";

export function DialogPagar({visible, onHide, clienteId, creditoId, cuotaId}) {
    const {http, values, states} = usePagos()
    const [metodoPago, setMetodoPago] = useState("")
    useEffect(() => {
        if (creditoId && cuotaId) {
            http.getInfoPago(cuotaId, creditoId);
        }

    }, [creditoId, cuotaId])
    const header = () => (<h2>Pagar cuota</h2>)
    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            header={header}
        >
            <div>
                <div>Fecha de pago: {values.cuotaData?.fechaPago} </div>
            </div>
            <div>
                <div>Monto: S/{parseFloat(values.cuotaData?.cuotaActual).toFixed(2)}</div>
            </div>
            <div className="flex flex-column gap-2">
                <label htmlFor="metodo-pago">Método de pago</label>
                <InputText id="metodo-pago" aria-describedby="username-help" placeholder="Ejm: YAPE, PLIN o Efectivo"
                           value={metodoPago}
                           onChange={(e) => setMetodoPago(e.target.value)}/>
            </div>
            <div className="card flex justify-content-center">
                <Button type="button" label="Pagar" onClick={() => {
                    http.pagar(clienteId, cuotaId, metodoPago, creditoId)
                }}/>
            </div>
            <SpinnerDialog loading={states.loading}></SpinnerDialog>
            <NavDialog
                success={states.succesfully}
                message="La cuota ha sido pagada correctamente"
                icono="pi pi-check-circle"
                color="green"
                route={null}
                onClick={() => {
                    states.setSuccesfully(false);
                    window.location.reload();
                }}
            /> </Dialog>
    )
}