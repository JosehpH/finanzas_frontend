import {Dialog} from "primereact/dialog";

export function DetallesPago({visible,onHide,montoPagado, fechaPago, metodoPago}){
    const headerTemplate = ()=>(<h2>Detalles Pago</h2>)
    return(
        <Dialog
            visible={visible}
            onHide={onHide}
            header={headerTemplate}
        >
            <div>
                <div>
                    Método de pago: {metodoPago}
                </div>
                <div>
                    Fecha de pago: {fechaPago}
                </div>
                <div>
                    Monto pagado: S/{parseFloat(montoPagado).toFixed(2)}
                </div>
            </div>

        </Dialog>
    )
}