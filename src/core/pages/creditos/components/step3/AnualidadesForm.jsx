import {Fieldset} from "primereact/fieldset";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {FloatLabel} from "primereact/floatlabel";
import {Dropdown} from "primereact/dropdown";
import {useContext, useState} from "react";
import {StepperContext} from "../../context/StepperContext.jsx";
import {InputCalendario} from "../../../../../shared/components/InputCalendario.jsx";
import {InputSwitch} from "primereact/inputswitch";

export function AnualidadesForm() {
    const {anualidadForm, setAnualidadForm, checked,setChecked, disableCapitalizacion,setDisableCapitalizacion,
        disableCapitalizacion2,setDisableCapitalizacion2} = useContext(StepperContext);
    const [pagoInicial,setPagoInicial] = useState(anualidadForm.pagoInicial);
    const [tasaC,setTasaC] = useState(anualidadForm.tasaCompensatoria.tasa);
    const [tasaM,setTasaM] = useState(anualidadForm.tasaMoratoria.tasa);
    const [numCuotas, setNumCuotas] = useState(anualidadForm.numCuotas);
    const [numCuotasGracia, setNumCuotasGracia] = useState(anualidadForm.gracia.numCuotas);

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
    const tipoGracia = [
        {
            name:"TOTAL"
        },
        {
            name:"PARCIAL"
        }
    ]

    return (
        <form className="w-6">
            <h4>Crédito tipo Anualidades vencidas</h4>
            <hr/>
            <Fieldset legend="Pago inicial">
                <div className="fieldset-container flex gap-3 w-full flex-column lg:flex-row xl:flex-row">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="pago-inicial">Valor del pago (S/.)</label>
                        <IconField>
                            <InputIcon className="pi pi-money-bill"> </InputIcon>
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
                                    let formCopy = {...anualidadForm};
                                    formCopy.pagoInicial = pagoInicial;
                                    setAnualidadForm(formCopy);
                                }}
                            />
                        </IconField>
                    </div>
                </div>
            </Fieldset>
            <Fieldset legend="Fechas" className="mt-5">
                <div className="fieldset-container  flex gap-3 w-full flex-column lg:flex-row xl:flex-row">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="pago-inicial">Fecha de desembolso</label>
                        <InputCalendario date={anualidadForm.fechaDesembolso} setDate={(value) => {
                            let formCopy = {...anualidadForm}
                            formCopy.fechaDesembolso = value
                            console.log(formCopy)
                            setAnualidadForm(formCopy)
                        }}></InputCalendario>
                    </div>
                </div>
            </Fieldset>
            <Fieldset legend="Anualidad" className="mt-5">
                <div className="fieldset-container flex gap-3 w-full flex-column lg:flex-row xl:flex-row">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="num-cuotas">Número de cuotas</label>
                        <InputText
                            id="num-cuotas"
                            placeholder="valor"
                            type="number"
                            className="w-11rem"
                            value={numCuotas}
                            onChange={(e) => {
                                setNumCuotas(e.target.value)
                            }}
                            onBlur={(e)=>{
                                let formCopy = {...anualidadForm};
                                formCopy.numCuotas = e.target.value;
                                setAnualidadForm(formCopy);
                            }}
                        />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="num-cuotas">Periodo de cuotas</label>
                        <Dropdown
                            id="periodo-cuota"
                            value={{name: anualidadForm.periodoPago}}
                            onChange={(e) => {
                                let formCopy = {...anualidadForm}
                                formCopy.periodoPago = e.value.name
                                console.log(formCopy)
                                setAnualidadForm(formCopy)
                            }}
                            options={tipoPeriodo} optionLabel="name"
                            placeholder="Seleccionar" className="w-full md:w-14rem"/>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="tipo-anualidad">Tipo de anualidad</label>
                        <InputText
                            id="tipo-anualidad"
                            placeholder="valor"
                            type="text"
                            className="w-11rem"
                            value="VENCIDA"
                            readOnly={true}
                        />
                    </div>
                </div>
            </Fieldset>
            <Fieldset legend="Periodo de gracia" className="mt-5">
                <div className="fieldset-container  flex gap-3 w-full flex-column lg:flex-row xl:flex-row">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="num-cuotas-gracia">Habilitar</label>
                        <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />

                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="num-cuotas-gracia">Número de cuotas de gracia</label>
                        <InputText
                            id="num-cuotas"
                            placeholder="valor"
                            type="text"
                            className="w-11rem"
                            disabled={!checked}
                            value={numCuotasGracia}
                            onChange={(e) => {
                                setNumCuotasGracia(e.target.value)
                            }}
                            onBlur={(e)=>{
                                let formCopy = {...anualidadForm};
                                formCopy.gracia.numCuotas = e.target.value;
                                setAnualidadForm(formCopy);
                            }}
                        />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="num-cuotas">Tipo de gracia</label>
                        <Dropdown
                            id="periodo-cuota"
                            disabled={!checked}
                            value={{name: anualidadForm.gracia.tipo}}
                            onChange={(e) => {
                                let formCopy = {...anualidadForm}
                                formCopy.gracia.tipo = e.value.name
                                console.log(formCopy)
                                setAnualidadForm(formCopy)
                            }}
                            options={tipoGracia} optionLabel="name"
                            placeholder="Seleccionar" className="w-full md:w-14rem"/>
                    </div>
                </div>
            </Fieldset>

            <Fieldset legend="Tasa compensatoria" className="mt-5">
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
                                    let formCopy = {...anualidadForm};
                                    formCopy.tasaCompensatoria.tasa = tasaC;
                                    setAnualidadForm(formCopy);
                                }}
                            />
                        </IconField>

                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="tipo-tasa">Tipo de la tasa</label>
                        <Dropdown
                            id="tipo-tasa"
                            value={{name: anualidadForm.tasaCompensatoria.tipo}}
                            onChange={(e) => {
                                let formCopy = {...anualidadForm}
                                formCopy.tasaCompensatoria.tipo = e.value.name
                                if(e.value.name==="EFECTIVA"){
                                    setDisableCapitalizacion(true)
                                    formCopy.tasaCompensatoria.periodoCapitalizacion = null
                                }else if(e.value.name==="NOMINAL"){
                                    setDisableCapitalizacion(false)
                                    formCopy.tasaCompensatoria.periodoCapitalizacion = "DIARIO"
                                }
                                console.log(e.value)
                                setAnualidadForm(formCopy)
                            }}
                            options={tiposTasa} optionLabel="name"
                            placeholder="Tipo de tasa" className="w-full md:w-14rem"/>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="periodo-tasa">Periodo de la tasa</label>
                        <Dropdown
                            id="periodo-tasa"
                            value={{name: anualidadForm.tasaCompensatoria.periodo}}
                            onChange={(e) => {
                                let formCopy = {...anualidadForm}
                                formCopy.tasaCompensatoria.periodo = e.value.name
                                console.log(formCopy)
                                setAnualidadForm(formCopy)
                            }}
                            options={tipoPeriodo} optionLabel="name"
                            placeholder="periodo" className="w-full md:w-14rem"/>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="periodo-capitalizacion">Periodo de capitalizacion</label>
                        <Dropdown
                            disabled={disableCapitalizacion}
                            id="periodo-capitalizacion"
                            value={{name: anualidadForm.tasaCompensatoria.periodoCapitalizacion}}
                            onChange={(e) => {
                                let formCopy = {...anualidadForm}
                                formCopy.tasaCompensatoria.periodoCapitalizacion = e.value.name
                                console.log(formCopy)
                                setAnualidadForm(formCopy)
                            }}
                            options={tipoPeriodo} optionLabel="name"
                            placeholder="periodo" className="w-full md:w-14rem"/>
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
                                    let formCopy = {...anualidadForm};
                                    formCopy.tasaMoratoria.tasa = tasaM;
                                    setAnualidadForm(formCopy);
                                }}
                            />
                        </IconField>

                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="tipo-tasa">Tipo de la tasa</label>
                        <Dropdown
                            id="tipo-tasa"
                            value={{name: anualidadForm.tasaMoratoria.tipo}}
                            onChange={(e) => {
                                let formCopy = {...anualidadForm}
                                formCopy.tasaMoratoria.tipo = e.value.name
                                if(e.value.name==="EFECTIVA"){
                                    setDisableCapitalizacion2(true)
                                    formCopy.tasaMoratoria.periodoCapitalizacion = null
                                }else if(e.value.name==="NOMINAL"){
                                    setDisableCapitalizacion2(false)
                                    formCopy.tasaMoratoria.periodoCapitalizacion = "DIARIO"
                                }
                                console.log(formCopy)
                                setAnualidadForm(formCopy)
                            }}
                            options={tiposTasa} optionLabel="name"
                            placeholder="Tipo de tasa" className="w-full md:w-14rem"/>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="periodo-tasa">Periodo de la tasa</label>
                        <Dropdown
                            id="periodo-tasa"
                            value={{name: anualidadForm.tasaMoratoria.periodo}}
                            onChange={(e) => {
                                let formCopy = {...anualidadForm}
                                formCopy.tasaMoratoria.periodo = e.value.name
                                console.log(formCopy)
                                setAnualidadForm(formCopy)
                            }}
                            options={tipoPeriodo} optionLabel="name"
                            placeholder="periodo" className="w-full md:w-14rem"/>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="periodo-capitalizacion">Periodo de capitalizacion</label>
                        <Dropdown
                            disabled={disableCapitalizacion2}
                            id="periodo-capitalizacion"
                            value={{name: anualidadForm.tasaMoratoria.periodoCapitalizacion}}
                            onChange={(e) => {
                                let formCopy = {...anualidadForm}
                                formCopy.tasaMoratoria.periodoCapitalizacion = e.value.name
                                console.log(formCopy)
                                setAnualidadForm(formCopy)
                            }}
                            options={tipoPeriodo} optionLabel="name"
                            placeholder="periodo" className="w-full md:w-14rem"/>
                    </div>
                </div>
            </Fieldset>
        </form>
    )
}