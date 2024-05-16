import {Button} from "primereact/button";
import {Avatar} from "primereact/avatar";

// eslint-disable-next-line react/prop-types
export function CardClient({cliente}){
    return (
        <div className="card-client">
            <div className="card-client-image">
                <Avatar icon="pi pi-user" size="xlarge" />
            </div>
            <div className="card-client-body">
                    <div> <strong>DNI: </strong>{cliente.dni}</div>
                    <div> <strong>Nombres: </strong>{cliente.nombres}</div>
                    <div> <strong>Aperllido paterno: </strong>{cliente.apellidoPaterno} </div>
                    <div> <strong>Apellido materno: </strong>{cliente.apellidoMaterno} </div>
                    <div> <strong>Email: </strong>{cliente.email}</div>
                    <div> <strong>Télefono: </strong>{cliente.telefono} </div>
            </div>
            <div className="card-client-footer">
                <Button icon="pi pi-trash" severity="danger" onClick={()=>{
                    //deleteProduct(product.id)
                }} ></Button>
            </div>

        </div>
    )
}