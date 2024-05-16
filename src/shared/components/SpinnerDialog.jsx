import {Dialog} from "primereact/dialog";
import {ProgressSpinner} from "primereact/progressspinner";

// eslint-disable-next-line react/prop-types
export function SpinnerDialog({loading}) {
    return (
        <>
            <Dialog
                style={{zIndex:"100"}}
                visible={loading}
                content={({hide})=><ProgressSpinner/>}
                onHide={()=>{}}
                className="dialog-spinner"
            />
        </>
    );
}