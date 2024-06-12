import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {SelectorImagenes} from "../../../../shared/components/SelectorImagenes.jsx";
import {useRef} from "react";
import {Button} from "primereact/button";
import {SpinnerDialog} from "../../../../shared/components/SpinnerDialog.jsx";
import {NavDialog} from "../../../../shared/components/NavDialog.jsx";


// eslint-disable-next-line react/prop-types
export function AddCuentaDialog({visible, onSend,setters,loading,success,onClose,successToFalse}){

    const encabezado = (
        <>
            <h3>Aperturar cuenta</h3>
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
                        <label htmlFor="username">Límite crediticio (S/.)</label>
                        <InputText id="username" aria-describedby="username-help" placeholder=""
                                   onChange={(e) => setters.setLimiteCrediticio(e.target.value)}/>
                    </div>

                    <div className="card flex justify-content-center">
                        <Button type="button" label="aperturar" onClick={() => {
                            onSend()
                        }}/>
                    </div>
                    <SpinnerDialog loading={loading}></SpinnerDialog>
                    <NavDialog
                        success={success}
                        message="Se ha aperturado la cuenta correctamente"
                        icono="pi pi-check-circle"
                        color="green"
                        route={null}
                        onClick={() => {
                            successToFalse();
                            window.location.reload()
                            onClose();
                        }}
                    />
                </form>
            </Dialog>
        </>
    )
}