import {Dropdown} from "primereact/dropdown";
import {useContext, useState} from "react";
import {SpinnerDialog} from "../../../../shared/components/SpinnerDialog.jsx";
import {StepperContext} from "../context/StepperContext.jsx";
import {AnualidadesForm} from "../components/step3/AnualidadesForm.jsx";
import {ValorFuturoForm} from "../components/step3/ValorFuturoForm.jsx";

export function Step3() {
    const {tipoCredito,setTipoCredito}=useContext(StepperContext)
    const [loading, setLoading] = useState(null);
    const tipos = [
        {name: 'Estilo anualidades', tipo: 'ANUALIDADES'},
        {name: 'Estilo valor futuro', tipo: 'VALOR_FUTURO'},
    ];

    const FormCredito = ()=>{
        if(tipoCredito==null)
            return (<></>)
        else if(tipoCredito.tipo ==='ANUALIDADES')
            return (<AnualidadesForm></AnualidadesForm>)
        else
            return (<ValorFuturoForm></ValorFuturoForm>)
    }

    return (
        <div className="card flex flex-column justify-content-center">
            <Dropdown
                value={tipoCredito}
                onChange={(e) => {
                    setLoading(true)
                    setTipoCredito(e.value);
                    setTimeout(()=>setLoading(false),500);
                }}
                options={tipos} optionLabel="name"
                placeholder="Tipo de crédito" className="w-full md:w-14rem"/>

            <SpinnerDialog loading={loading}></SpinnerDialog>
            <FormCredito></FormCredito>
        </div>
    )
}