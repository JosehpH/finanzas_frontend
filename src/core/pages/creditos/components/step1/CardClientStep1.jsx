import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";

export function CardClientStep1({cliente}){
    return (
        <div className="card-client mt-4">
            <div className="card-client-image">
                <Avatar icon="pi pi-user" size="xlarge"/>
            </div>
            <div className="card-client-body">
                <div><strong>DNI: </strong>{cliente.dni}</div>
                <div><strong>Nombres: </strong>{cliente.nombres}</div>
                <div><strong>Aperllido paterno: </strong>{cliente.apellidoPaterno} </div>
                <div><strong>Apellido materno: </strong>{cliente.apellidoMaterno} </div>
                <div><strong>Email: </strong>{cliente.email}</div>
                <div><strong>Télefono: </strong>{cliente.telefono} </div>
            </div>
        </div>
    );
}