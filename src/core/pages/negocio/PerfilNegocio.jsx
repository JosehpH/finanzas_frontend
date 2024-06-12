import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useNegocioProfile} from "../../../shared/custom-hooks/useNegocioProfile.js";
import {useEffect, useState} from "react";
import {SpinnerDialog} from "../../../shared/components/SpinnerDialog.jsx";
import {NavDialog} from "../../../shared/components/NavDialog.jsx";

export function PerfilNegocio() {

    const {data,http,state} = useNegocioProfile()
    const [nombre, setNombre] = useState('');
    const [ruc, setRuc] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    useEffect(()=>{
        http.getInfoNegocio()
    },[])
    useEffect(() => {
        if (data) {
            setNombre(data.nombre || '');
            setRuc(data.ruc || '');
            setTelefono(data.telefono || '');
            setDireccion(data.direccion || '');
            setEmail(data.email || '');
        }
    }, [data]);

    return (
        <div className="page  perfil flex flex-column align-items-center">
            <form
                className="perfil-form w-27rem mt-4 m-auto pt-2 pb-5 pb-2 flex flex-column align-items-center justify-content-center">
                <h1>Datos del negocio</h1>
                <div className="flex flex-column gap-2">
                    <label htmlFor="nombre">Nombre del negocio</label>
                    <InputText id="nombre" value={nombre} aria-describedby="username-help"
                               placeholder="Nombre del negocio"
                               onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="ruc">RUC</label>
                    <InputText id="ruc" value={ruc} aria-describedby="username-help" placeholder="RUC"
                               onChange={(e) => setRuc(e.target.value)}
                    />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="telefono">Teléfono</label>
                    <InputText id="telefono" aria-describedby="username-help" placeholder="Telefono"
                               value={telefono}
                               onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="direccion">Dirección</label>
                    <InputText id="direccion" aria-describedby="username-help" placeholder="Dirección"
                               value={direccion}
                               onChange={(e) => setDireccion(e.target.value)}
                    />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="email">Email</label>
                    <InputText id="email" aria-describedby="username-help" placeholder="Ingresa tu email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="card flex pt-5 justify-content-center">
                    <Button type="button" label="Guardar cambios" onClick={() => {
                        http.updateProfile({nombre,ruc,telefono,direccion,email});
                    }}
                    />
                </div>
            </form>
            <SpinnerDialog loading={state.loading}></SpinnerDialog>
            <NavDialog
                success={state.success}
                message="Los datos han sido actualizados correctamente"
                icono="pi pi-check-circle"
                color="green"
                route="/home"
                onClick={()=>state.setSuccess(false)}
            />
        </div>
    );
}