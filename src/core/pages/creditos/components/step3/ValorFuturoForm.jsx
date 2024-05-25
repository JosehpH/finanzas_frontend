import {Fieldset} from "primereact/fieldset";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {FloatLabel} from "primereact/floatlabel";
import {Dropdown} from "primereact/dropdown";
import {useContext, useState} from "react";
import {StepperContext} from "../../context/StepperContext.jsx";
import {InputCalendario} from "./InputCalendario.jsx";

export function ValorFuturoForm() {
    const {valorFuturoForm, setValorFuturoForm} = useContext(StepperContext);
    const [pagoInicial,setPagoInicial] = useState(valorFuturoForm.pagoInicial);
    const [tasaC,setTasaC] = useState(valorFuturoForm.tasaCompensatoria.tasa);
    const [tasaM,setTasaM] = useState(valorFuturoForm.tasaMoratoria.tasa);

    const tiposTasa = [
        {name: 'EFECTIVA'},
        {name: 'NOMINAL'},
    ];
    const tipoPeriodo = [
        {name: 'DIARIO'},
        {name: 'QUINCENAL'},
        {name: 'MENSUAL'},
        {name: 'BIMESTRAL'},
        {name: 'TRIMESTRAL'},
        {name: 'CUATRIMESTRAL'},
        {name: 'SEMESTRAL'},
        {name: 'ANUAL'},
    ]

    return (
        <form>
            <h4>Crédito tipo valor futuro</h4>
            <hr/>
            <Fieldset legend="Pago inicial">
                <div className="fieldset-container flex gap-3 flex-auto">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="pago-inicial">Valor del pago (S/.)</label>
                        <InputText
                            id="pago-inicial"
                            placeholder="valor"
                            type="text"
                            className="w-11rem"
                            value={pagoInicial}
                            onChange={(e) => {
                                setPagoInicial(e.target.value)
                            }}
                            onBlur={(e)=>{
                                let formCopy = {...valorFuturoForm};
                                formCopy.pagoInicial = pagoInicial;
                                setValorFuturoForm(formCopy);
                            }}
                        />
                    </div>
                </div>
            </Fieldset>
            <Fieldset legend="Fechas" className="mt-5">
                <div className="fieldset-container flex gap-3 w-full flex-column lg:flex-row xl:flex-row">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="pago-inicial">Fecha de desembolso</label>
                        <InputCalendario date={valorFuturoForm.fechaDesembolso} setDate={(value) => {
                            let formCopy = {...valorFuturoForm}
                            formCopy.fechaDesembolso = value
                            console.log(formCopy)
                            setValorFuturoForm(formCopy)
                        }}></InputCalendario>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="pago-inicial">Fecha de vencimiento</label>
                        <InputCalendario date={valorFuturoForm.fechaVencimiento} setDate={(value) => {
                            let formCopy = {...valorFuturoForm}
                            formCopy.fechaVencimiento = value
                            console.log(formCopy)
                            setValorFuturoForm(formCopy)
                        }}></InputCalendario>
                    </div>
                </div>
            </Fieldset>

            <Fieldset legend="Tasa compensatoria"  className=" mt-5">
                <div className="fieldset-container  flex gap-3 w-full flex-column lg:flex-row xl:flex-row">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="valor-tasa">Valor de la tasa (%)</label>
                        <IconField>
                            <InputText
                                id="valor-tasa"
                                placeholder="valor"
                                type="text"
                                className="w-11rem"
                                value={tasaC}
                                onChange={(e) => {
                                    setTasaC(e.target.value)
                                }}
                                onBlur={(e)=>{
                                    let formCopy = {...valorFuturoForm};
                                    formCopy.tasaCompensatoria.tasa = tasaC;
                                    setValorFuturoForm(formCopy);
                                }}

                            />
                        </IconField>

                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="tipo-tasa">Tipo de la tasa</label>
                        <Dropdown
                            id="tipo-tasa"
                            value={{name: valorFuturoForm.tasaCompensatoria.tipo}}
                            onChange={(e) => {
                                let formCopy = {...valorFuturoForm}
                                formCopy.tasaCompensatoria.tipo = e.value.name
                                console.log(formCopy)
                                setValorFuturoForm(formCopy)
                            }}
                            options={tiposTasa} optionLabel="name"
                            placeholder="Tipo de crédito" className="w-full md:w-14rem"/>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="periodo-tasa">Periodo de la tasa</label>
                        <Dropdown
                            id="periodo-tasa"
                            value={{name: valorFuturoForm.tasaCompensatoria.periodo}}
                            onChange={(e) => {
                                let formCopy = {...valorFuturoForm}
                                formCopy.tasaCompensatoria.periodo = e.value.name
                                console.log(formCopy)
                                setValorFuturoForm(formCopy)
                            }}
                            options={tipoPeriodo} optionLabel="name"
                            placeholder="Tipo de crédito" className="w-full md:w-14rem"/>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="periodo-capitalizacion">Periodo de capitalizacion</label>
                        <Dropdown
                            id="periodo-capitalizacion"
                            value={{name: valorFuturoForm.tasaCompensatoria.periodoCapitalizacion}}
                            onChange={(e) => {
                                let formCopy = {...valorFuturoForm}
                                formCopy.tasaCompensatoria.periodoCapitalizacion = e.value.name
                                console.log(formCopy)
                                setValorFuturoForm(formCopy)
                            }}
                            options={tipoPeriodo} optionLabel="name"
                            placeholder="Tipo de crédito" className="w-full md:w-14rem"/>
                    </div>
                </div>
            </Fieldset>
            <Fieldset legend="Tasa moratoria" className="mt-5">
                <div className="fieldset-container  flex gap-3 w-full flex-column lg:flex-row xl:flex-row">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="valor-tasa">Valor de la tasa (%)</label>
                        <IconField>
                            <InputText
                                id="valor-tasa"
                                placeholder="valor"
                                type="text"
                                className="w-11rem"
                                value={tasaM}
                                onChange={(e) => {
                                    setTasaM(e.target.value)
                                }}
                                onBlur={(e)=>{
                                    let formCopy = {...valorFuturoForm};
                                    formCopy.tasaMoratoria.tasa = tasaM;
                                    setValorFuturoForm(formCopy);
                                }}
                            />
                        </IconField>

                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="tipo-tasa">Tipo de la tasa</label>
                        <Dropdown
                            id="tipo-tasa"
                            value={{name: valorFuturoForm.tasaMoratoria.tipo}}
                            onChange={(e) => {
                                let formCopy = {...valorFuturoForm}
                                formCopy.tasaMoratoria.tipo = e.value.name
                                console.log(formCopy)
                                setValorFuturoForm(formCopy)
                            }}
                            options={tiposTasa} optionLabel="name"
                            placeholder="Tipo de crédito" className="w-full md:w-14rem"/>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="periodo-tasa">Periodo de la tasa</label>
                        <Dropdown
                            id="periodo-tasa"
                            value={{name: valorFuturoForm.tasaMoratoria.periodo}}
                            onChange={(e) => {
                                let formCopy = {...valorFuturoForm}
                                formCopy.tasaMoratoria.periodo = e.value.name
                                console.log(formCopy)
                                setValorFuturoForm(formCopy)
                            }}
                            options={tipoPeriodo} optionLabel="name"
                            placeholder="Tipo de crédito" className="w-full md:w-14rem"/>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="periodo-capitalizacion">Periodo de capitalizacion</label>
                        <Dropdown
                            id="periodo-capitalizacion"
                            value={{name: valorFuturoForm.tasaMoratoria.periodoCapitalizacion}}
                            onChange={(e) => {
                                let formCopy = {...valorFuturoForm}
                                formCopy.tasaMoratoria.periodoCapitalizacion = e.value.name
                                console.log(formCopy)
                                setValorFuturoForm(formCopy)
                            }}
                            options={tipoPeriodo} optionLabel="name"
                            placeholder="Tipo de crédito" className="w-full md:w-14rem"/>
                    </div>
                </div>
            </Fieldset>
        </form>
    )
}