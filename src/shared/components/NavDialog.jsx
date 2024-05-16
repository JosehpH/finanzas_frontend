import {Dialog} from "primereact/dialog";
import {useNavigate} from "react-router-dom";
import {Button} from "primereact/button";

// eslint-disable-next-line react/prop-types
export function NavDialog({success, message, route, icono, color, onClick}) {
    const navigate = useNavigate()
    const headerDialog = (
        <span className={icono} style={{color: color, fontSize: "50px"}}/>
    )
    const footerDialog = (
        <Button label="Ok" icon="pi pi-check" onClick={() => {
            if (route != null)
                navigate(route)
            onClick()
        }} autoFocus/>
    )
    return (
        <Dialog
            header={headerDialog}
            visible={success}
            footer={footerDialog}
            style={{width: '20rem', zIndex: "200"}}
            closable={false}
            draggable={false}
        >
            <p className="m-0">
                {message}
            </p>
        </Dialog>
    )
}