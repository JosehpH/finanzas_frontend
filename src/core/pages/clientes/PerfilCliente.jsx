import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Cuenta} from "./components/Cuenta.jsx";
import {useClient} from "./custom-hooks/useClient.js";
import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {AddCuentaDialog} from "./components/AddCuentaDialog.jsx";

export function PerfilCliente() {
    const navigate = useNavigate();
    const {setters,perfil,http, estado} = useClient();
    const {clienteId} = useParams();
    const [showAperturarCuenta,setShowAperturarCuenta] = useState(false);

    useEffect(() => {
        http.getClientById(clienteId);
    }, [])
    const CuentaView = ()=>{
        if(perfil?.cuenta == null){
            return (
                <div className="card flex flex-column justify-content-center mt-5">
                    <p className="mb-5">El cliente no tiene una cuenta aperturada</p>
                    <Button
                        type="button"
                        label="Aperturar"
                        title="Aperturar cuenta"
                        icon="pi pi-plus"
                        severity="danger"
                        onClick={()=>{
                            setShowAperturarCuenta(true);
                        }}
                    />
                </div>
            )
        }
        else{
            return (<Cuenta customerId={clienteId}></Cuenta>)
        }
    }


    return (
        <div className="page perfil-cliente p-5">
            <div className="header-profile pt-5">Perfil del cliente <hr/></div>
            <div className="perfil-cliente-body flex flex-column pt-5  lg:flex-row xl:flex-row align-items-stretch justify-content-around pb-5 ">
                <div className="datos-container">
                    <div className="card-client-image pt-2">
                        <Avatar icon="pi pi-user" size="xlarge"/>
                    </div>
                    <div className="dato-container flex">
                        <div className="label-header">
                            DNI:
                        </div>
                        <div className="label-body">
                            {perfil?.dni}
                        </div>
                    </div>
                    <div className="dato-container flex">
                        <div className="label-header">
                            Nombres:
                        </div>
                        <div className="label-body">
                            {perfil?.nombres}
                        </div>
                    </div>
                    <div className="dato-container flex">
                        <div className="label-header">
                            Apellido Paterno:
                        </div>
                        <div className="label-body">
                            {perfil?.apellidoPaterno}
                        </div>
                    </div>
                    <div className="dato-container flex">
                        <div className="label-header">
                            Apellido Materno:
                        </div>
                        <div className="label-body">
                            {perfil?.apellidoMaterno}
                        </div>
                    </div>
                    <div className="dato-container flex">
                        <div className="label-header">
                            Email:
                        </div>
                        <div className="label-body">
                            {perfil?.email}
                        </div>
                    </div>
                    <div className="dato-container flex">
                        <div className="label-header">
                            Telefono:
                        </div>
                        <div className="label-body">
                            {perfil?.telefono}
                        </div>
                    </div>
                </div>
                {<CuentaView></CuentaView>}
                <AddCuentaDialog
                    loading={estado.loading}
                    setters={setters}
                    success={estado.success}
                    onClose={() => setShowAperturarCuenta(false)}
                    onSend={() => {
                        http.aperturarCuenta(clienteId)
                    }
                    }
                    successToFalse={() => estado.setSuccess(false)}
                    visible={showAperturarCuenta}
                >
                </AddCuentaDialog>
            </div>

        </div>
    );
}