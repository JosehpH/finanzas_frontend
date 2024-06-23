import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";

export function CardClientStep1({cliente,children}){
    return (
        <div className="card-client mt-4">
            <div className="card-client-image">
                <Avatar icon="pi pi-user" size="xlarge"/>
            </div>
            <div className="card-client-body">
                <div><strong className="mr-1">DNI: </strong> {cliente.dni}</div>
                <div><strong className="mr-1">Nombres: </strong> {cliente.nombres}</div>
                <div><strong className="mr-1">Aperllido paterno: </strong> {cliente.apellidoPaterno} </div>
                <div><strong className="mr-1">Apellido materno: </strong> {cliente.apellidoMaterno} </div>
                <div><strong className="mr-1">Email: </strong> {cliente.email}</div>
                <div><strong className="mr-1">Télefono: </strong> {cliente.telefono} </div>
                {children}
            </div>
        </div>
    );
}