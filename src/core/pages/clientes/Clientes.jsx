import {useEffect, useState} from "react";
import {SpeedDial} from "primereact/speeddial";
import "./Clientes.css"
import {useClient} from "./custom-hooks/useClient.jsx";
import {SpinnerDialog} from "../../../shared/components/SpinnerDialog.jsx";
import {AddClientDialog} from "./components/AddClientDialog.jsx";
import {CardClient} from "./components/CardClient.jsx";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {AddCuentaDialog} from "./components/AddCuentaDialog.jsx";
import {SearchBar} from "../../../shared/components/SearchBar.jsx";

export function Clientes() {
    const [formVisible, setFormVisible] = useState(false)
    const {setters, http, estado, clientes} = useClient()
    const [cuentaFormVisible,setCuentaFormVisible] = useState(false)
    const [clienteSelected,setClienteSelected] = useState(null);
    useEffect(() => {
        http.getAllClients()
    }, [])

    const cuentaTemplate=(cliente)=>{
        if(cliente.cuenta==null)
            return (
                <Button
                    type="button"
                    label="Aperturar"
                    title="Aperturar cuenta"
                    icon="pi pi-plus"
                    severity="danger"
                    onClick={()=>{
                        setClienteSelected(cliente.id)
                        setCuentaFormVisible(true);
                    }}
                />)
        else
            return(
                <Button
                    icon="pi pi-credit-card"
                    label="Ver cuenta"
                    severity="success"
                    rounded={true}
                    outlined={true}
                />)

    }

    return (
        <div className="page productos">
            <div className="header-page-container">
                <h2 className="title-page">  Gestión de clientes</h2>
                <hr/>
            </div>
            <SearchBar placeholder="Buscar cliente" onSearch={http.searchClient}></SearchBar>

            <div className="client-container">

                <div className="card mt-5">
                    <DataTable value={clientes} tableStyle={{minWidth: '50rem'}} scrollable={true} scrollHeight="500px">
                        <Column header="Avatar" body={<Avatar icon="pi pi-user" size="xlarge"/>}></Column>
                        <Column field="dni" header="DNI"></Column>
                        <Column field="nombres" header="Nombres"></Column>
                        <Column field="apellidoPaterno" header="Apellido Paterno"></Column>
                        <Column field="apellidoMaterno" header="Apellido Materno"></Column>
                        <Column field="email" header="Emmail"></Column>
                        <Column field="telefono" header="Telefono"></Column>
                        <Column header="Cuenta" body={cuentaTemplate}></Column>
                    </DataTable>
                </div>

                <AddCuentaDialog
                    loading={estado.loading}
                    setters={setters}
                    success={estado.success}
                    onClose={() => setCuentaFormVisible(false)}
                    onSend={() => http.aperturarCuenta(clienteSelected)}
                    successToFalse={() => estado.setSuccess(false)}
                    visible={cuentaFormVisible}
                >
                </AddCuentaDialog>

                <AddClientDialog
                    loading={estado.loading}
                    setters={setters}
                    success={estado.success}
                    onClose={() => setFormVisible(false)}
                    onSend={http.postClient}
                    successToFalse={() => estado.setSuccess(false)}
                    visible={formVisible}
                ></AddClientDialog>

                <SpinnerDialog
                    loading={estado.loading}
                ></SpinnerDialog>

                <div className="spedd-dial-container">
                    <SpeedDial
                        model={null}
                        radius={120}
                        type="quarter-circle"
                        direction="up-left"
                        onClick={() => setFormVisible(true)}
                    />
                </div>


            </div>
        </div>
    );
}