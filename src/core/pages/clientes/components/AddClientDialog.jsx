import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {SelectorImagenes} from "../../../../shared/components/SelectorImagenes.jsx";
import {useRef} from "react";
import {Button} from "primereact/button";
import {SpinnerDialog} from "../../../../shared/components/SpinnerDialog.jsx";
import {NavDialog} from "../../../../shared/components/NavDialog.jsx";


// eslint-disable-next-line react/prop-types
export function AddClientDialog({visible, onSend,setters,loading,success,onClose,successToFalse}){

    const encabezado = (
        <>
            <h3>Agregar cliente</h3>
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
                        <label htmlFor="username">Nombres</label>
                        <InputText id="username" aria-describedby="username-help" placeholder=""
                                   onChange={(e) => setters.setNombre(e.target.value)}/>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="username">Apellido paterno</label>
                        <InputText id="username" aria-describedby="username-help" placeholder=""
                                   onChange={(e) => setters.setApellidoPaterno(e.target.value)}/>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="username">Apellido materno</label>
                        <InputText id="username" aria-describedby="username-help" placeholder=""
                                   onChange={(e) => setters.setApellidoMaterno(e.target.value)}/>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="username">DNI</label>
                        <InputText id="username" aria-describedby="username-help" placeholder=""
                                   onChange={(e) => setters.setDni(e.target.value)}/>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="username">email</label>
                        <InputText id="username" aria-describedby="username-help" placeholder=""
                                   onChange={(e) => setters.setEmail(e.target.value)}/>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="username">telefono</label>
                        <InputText id="username" aria-describedby="username-help" placeholder=""
                                   onChange={(e) => setters.setTelefono(e.target.value)}/>
                    </div>
                    <div className="card flex justify-content-center">
                        <Button type="button" label="agregar" onClick={() => {
                            onSend()
                        }}/>
                    </div>
                    <SpinnerDialog loading={loading}></SpinnerDialog>
                    <NavDialog
                        success={success}
                        message="El cliente ha sido registrado correctamente"
                        icono="pi pi-check-circle"
                        color="green"
                        route={null}
                        onClick={() => {
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