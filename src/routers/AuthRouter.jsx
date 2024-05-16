import { Route, Routes} from "react-router-dom";
import {CoreRouter} from "./CoreRouter.jsx";
import {PublicPath} from "../auth/components/PublicPath.jsx";
import {PrivatePath} from "../auth/components/PrivatePath.jsx";
import {SignIn} from "../auth/pages/SignIn.jsx";
import {SignUp} from "../auth/pages/SignUp.jsx";

export  function AuthRouter(){
    return (
        <Routes>
            <Route path="/auth/sign-in" element={<PublicPath><SignIn/></PublicPath>}/>
            <Route path="/auth/sign-up" element={<PublicPath><SignUp/></PublicPath>}/>
            <Route path="/*" element={<PrivatePath><CoreRouter/></PrivatePath>}/>
        </Routes>
    )
}