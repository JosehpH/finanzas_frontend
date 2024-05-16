import {Button} from "primereact/button";
import {StepperPanel} from "primereact/stepperpanel";
import {Stepper} from "primereact/stepper";
import {useRef} from "react";
import {Step1} from "../steps/Step1.jsx";
import {Step2} from "../steps/Step2.jsx";
import {Step3} from "../steps/Step3.jsx";
import {Step4} from "../steps/Step4.jsx";
import {Step5} from "../steps/Step5.jsx";
import {StepperProvider} from "../context/StepperProvider.jsx";

export function StepperCredito(){
    const stepperRef = useRef(null);

    return (
        <div className="card flex justify-content-center w-full">
            <StepperProvider>
            <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }} orientation="vertical" linear={true}>
                <StepperPanel header="Seleccionar cliente">
                    <Step1></Step1>
                    <div className="flex pt-4 justify-content-end">
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Seleccionar productos">
                    <Step2></Step2>

                    <div className="flex pt-4 justify-content-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Seleccionar tipo crédito">
                    <Step3></Step3>
                    <div className="flex pt-4 justify-content-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Seleccionar términos del crédito">
                    <Step4></Step4>
                    <div className="flex pt-4 justify-content-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Vista previa del crédito">
                    <Step5></Step5>
                    <div className="flex pt-4 justify-content-start">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                    </div>
                </StepperPanel>
            </Stepper>
            </StepperProvider>
        </div>
    )
}