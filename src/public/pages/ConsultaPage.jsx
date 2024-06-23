import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {SpinnerDialog} from "../../shared/components/SpinnerDialog.jsx";
import {useEffect, useState} from "react";
import {useConsulta} from "../custom-hooks/UseConsulta.jsx";
import {useNavigate} from "react-router-dom";

export function ConsultaPage() {
    const navigate = useNavigate()
    const [dni, setDni] = useState(null)
    const [ruc, setRUC] = useState(null)
    const {clienteId, http, states} = useConsulta()
    useEffect(()=>{
        if(clienteId!=null)
            navigate(`/consultas/perfil/${clienteId}`)
    },[clienteId])
    return (
        <div className="flex h-full flex-column sign-in">
            <form className="auth-form w-22rem m-auto mt-8 flex flex-column align-items-center justify-content-center">
                <div className="flex flex-column align-items-center">
                    <div className="w-2">
                        <img src="https://i.postimg.cc/Ls4XtRYj/dar-dinero.png" alt="" style={{width: "100%"}}/>
                    </div>
                    <div>FinApp</div>
                </div>
                <h2>Consultar estado de cuenta</h2>
                <div className="flex flex-column gap-2">
                    <label htmlFor="username">DNI</label>
                    <InputText id="username" aria-describedby="username-help" placeholder="Ingresa tu DNI"
                               value={dni} onChange={(e) => setDni(e.target.value)}/>
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="username">RUC del negocio</label>
                    <InputText id="username" aria-describedby="username-help" placeholder="Ingresa tu DNI"
                               value={ruc} onChange={(e) => setRUC(e.target.value)}/>
                </div>
                <div className="card flex justify-content-center mt-3">
                    <Button type="button" label="Buscar" onClick={() => {
                        http.getIduser(dni, ruc)
                    }}></Button>
                </div>
            </form>
            <SpinnerDialog loading={states.loading}/>
        </div>);
}