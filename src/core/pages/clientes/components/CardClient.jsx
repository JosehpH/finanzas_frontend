import {Button} from "primereact/button";
import {Avatar} from "primereact/avatar";
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function CardClient({cliente}){
    const navigate = useNavigate()
    return (
        <div className="card-client">
            <div className="card-client-image pt-2">
                <Avatar icon="pi pi-user" size="xlarge" />
            </div>
            <div className="card-client-body">
                    <div> <strong>DNI: </strong>{cliente.dni}</div>
                    <div> <strong>Nombres: </strong>{cliente.nombres}</div>
                    <div> <strong>Aperllido paterno: </strong>{cliente.apellidoPaterno} </div>
                    <div> <strong>Apellido materno: </strong>{cliente.apellidoMaterno} </div>
            </div>
            <div className="card-client-footer pb-3 pt-2">
                <Button icon="pi pi-arrow-right" severity="info" label="ver más" onClick={()=>{
                    // eslint-disable-next-line react/prop-types
                    navigate(`/customers/${cliente.id}`);
                }} ></Button>
            </div>

        </div>
    )
}