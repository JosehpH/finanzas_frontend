import {SpeedDial} from "primereact/speeddial";
import {useState} from "react";
import {NewCreditDialog} from "./components/NewCreditDialog.jsx";
import {StepperProvider} from "./context/StepperProvider.jsx";

export function Creditos(){
    const[stepperVisible,setStepperVisible] = useState(false)
    return(
        <div className="page productos">
            <div className="header-page-container">
                <h2 className="title-page"> Gestión de créditos</h2>
                <hr/>
            </div>


            <div className="spedd-dial-container">
                <SpeedDial
                    model={null}
                    radius={120}
                    type="quarter-circle"
                    direction="up-left"
                    onClick={() => {setStepperVisible(true)}}
                />
            </div>
            <NewCreditDialog
                visible={stepperVisible}
                onClose={()=>setStepperVisible(false)}
            >
            </NewCreditDialog>

        </div>
    )
}