import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {SelectorImagenes} from "../../../../shared/components/SelectorImagenes.jsx";
import {useRef} from "react";
import {Button} from "primereact/button";
import {UploadService} from "../../../../shared/services/UploadService.js";
import {SpinnerDialog} from "../../../../shared/components/SpinnerDialog.jsx";
import {NavDialog} from "../../../../shared/components/NavDialog.jsx";


// eslint-disable-next-line react/prop-types
export function AddProductDialog({visible, onHide, onSend,setters,loading,success,onClose,successToFalse}){
    const fileUploadRef = useRef(null);

    const encabezado = (
        <>
            <h3>Agregar producto</h3>
            <hr/>
        </>
    );
    const footer = (
        <>
        </>
    );
    return(
        <>
            <Dialog
                header={encabezado}
                footer={footer}
                visible={visible}
                onHide={onClose}
                closable={true}
                draggable={false}
                style={{width: '29rem', backgroundColor:"white"}}
            >
                <form>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="username">Nombre del producto</label>
                        <InputText id="username" aria-describedby="username-help" placeholder=""
                                   onChange={(e) => setters.setNombre(e.target.value)}/>
                    </div>
                    <div className="flex mt-3 flex-column gap-2">
                        <label htmlFor="username">Descripción del producto</label>
                        <InputTextarea autoResize onChange={(e) => setters.setDescripcion(e.target.value)} rows={5} cols={30}/>
                    </div>
                    <div className="flex mt-3 flex-column gap-2">
                        <label htmlFor="username">Precio</label>
                        <InputText id="username" aria-describedby="username-help" placeholder=""
                                   onChange={(e) => setters.setPrecio(e.target.value)}/>
                    </div>
                    <div className="flex flex-column gap-2 mt-4">
                        <label htmlFor="username">Selecciona imagenes</label>
                        <SelectorImagenes fileUploadRef={fileUploadRef}></SelectorImagenes>
                    </div>
                    <div className="card flex justify-content-center">
                        <Button type="button" label="agregar" onClick={() =>{
                            // eslint-disable-next-line react/prop-types
                             onSend(fileUploadRef.current.getFiles())
                        }}/>
                    </div>
                    <SpinnerDialog loading={loading}></SpinnerDialog>
                    <NavDialog
                        success={success}
                        message="El producto ha sido agregado correctamente"
                        icono="pi pi-check-circle"
                        color="green"
                        route={null}
                        onClick={()=>{
                            successToFalse();
                            onClose();
                            window.location.reload();
                        }}
                    />
                </form>
            </Dialog>
        </>
    )
}