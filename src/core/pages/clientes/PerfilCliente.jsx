import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Cuenta} from "./components/Cuenta.jsx";
import {useClient} from "./custom-hooks/useClient.js";
import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {AddCuentaDialog} from "./components/AddCuentaDialog.jsx";
import {InputText} from "primereact/inputtext";
import {SpinnerDialog} from "../../../shared/components/SpinnerDialog.jsx";
import {NavDialog} from "../../../shared/components/NavDialog.jsx";

export function PerfilCliente() {
    const navigate = useNavigate();
    const {setters, perfil, http, estado} = useClient();
    const {clienteId} = useParams();
    const [showAperturarCuenta, setShowAperturarCuenta] = useState(false);
    const [editEmail, setEditEmail] = useState(false)
    const [editTelefono, setEditTelefono] = useState(false)


    useEffect(() => {
        http.getClientById(clienteId);
    }, [])

    const CuentaView = () => {
        if (perfil?.cuenta == null) {
            return (
                <div className="card flex flex-column justify-content-center mt-5">
                    <p className="mb-5">El cliente no tiene una cuenta aperturada</p>
                    <Button
                        type="button"
                        label="Aperturar"
                        title="Aperturar cuenta"
                        icon="pi pi-plus"
                        severity="danger"
                        onClick={() => {
                            setShowAperturarCuenta(true);
                        }}
                    />
                </div>
            )
        } else {
            return (<Cuenta customerId={clienteId}></Cuenta>)
        }
    }

    const EditMode = (props) => {
        // eslint-disable-next-line react/prop-types
        const [campoUpdate, setCampoUpdate] = useState(props.value)
        // eslint-disable-next-line react/prop-types
        if (!props.editMode) {
            // eslint-disable-next-line react/prop-types
            return props.children
        }
        return (
            <div className="flex flex-row gap-2">
                <InputText id="nombre" value={campoUpdate}
                           onChange={(e) => setCampoUpdate(e.target.value)}
                />
                <div>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Button icon="pi pi-save" severity="success" onClick={() => {
                        props.onSave(campoUpdate)
                    }}></Button>
                </div>
                <div>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Button icon="pi pi-times" severity="danger" onClick={props.onCancel}></Button>
                </div>
            </div>
        )
    }

    return (
        <div className="page perfil-cliente p-5">
            <div className="header-profile pt-5">Perfil del cliente <hr/></div>
            <div
                className="perfil-cliente-body flex flex-column pt-5  lg:flex-row xl:flex-row align-items-stretch justify-content-around pb-5 ">
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
                        <div className="label-body flex flex-row align-items-center gap-2">
                            <EditMode editMode={editEmail} value={perfil?.email} onCancel={() => setEditEmail(false)}
                                      onSave={(value) => http.editCampoById(clienteId, value, "email")}>
                                <div>{perfil?.email}</div>
                                <div className="card flex justify-content-center">
                                    <Button icon="pi pi-pencil" size="small" onClick={() => setEditEmail(true)}/>
                                </div>
                            </EditMode>

                        </div>
                    </div>
                    <div className="dato-container flex">
                        <div className="label-header">
                            Telefono:
                        </div>
                        <div className="label-body flex flex-row align-items-center gap-2">
                            <EditMode editMode={editTelefono} value={perfil?.telefono}
                                      onCancel={() => setEditTelefono(false)}
                                      onSave={(value) => http.editCampoById(clienteId, value, "telefono")}
                            >
                                <div>{perfil?.telefono}</div>
                                <div className="card flex justify-content-center">
                                    <Button icon="pi pi-pencil" size="small" onClick={() => setEditTelefono(true)}/>
                                </div>
                            </EditMode>
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
                <SpinnerDialog loading={estado.loading}></SpinnerDialog>
                <NavDialog
                    success={estado.success}
                    message="Se han guardado los cambios"
                    icono="pi pi-check-circle"
                    color="green"
                    onClick={() => {
                        estado.setSuccess(false)
                        window.location.reload()
                    }}
                />
            </div>

        </div>
    );
}