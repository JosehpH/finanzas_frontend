import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {SelectorImagenes} from "../../../../shared/components/SelectorImagenes.jsx";
import {useRef} from "react";
import {Button} from "primereact/button";
import {SpinnerDialog} from "../../../../shared/components/SpinnerDialog.jsx";
import {NavDialog} from "../../../../shared/components/NavDialog.jsx";
import {StepperCredito} from "./StepperCredito.jsx";
import {StepperProvider} from "../context/StepperProvider.jsx";


// eslint-disable-next-line react/prop-types
export function NewCreditDialog({visible, onClose}) {
    const encabezado = (
        <>
            <h3>Nuevo crédito</h3>
            <hr/>
        </>
    );
    const footer = (
        <>
        </>
    );
    return (
        <>
            <Dialog
                header={encabezado}
                footer={footer}
                visible={visible}
                onHide={onClose}
                closable={true}
                draggable={false}
                style={{width: '100%', backgroundColor: "white"}}
                maximized={true}
            >
                <StepperProvider>
                    <StepperCredito></StepperCredito>
                </StepperProvider>
            </Dialog>
        </>
    )
}