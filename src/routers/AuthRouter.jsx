import { Route, Routes} from "react-router-dom";
import {CoreRouter} from "./CoreRouter.jsx";
import {PublicPath} from "../auth/components/PublicPath.jsx";
import {PrivatePath} from "../auth/components/PrivatePath.jsx";
import {SignIn} from "../auth/pages/SignIn.jsx";
import {SignUp} from "../auth/pages/SignUp.jsx";
import {ConsultaPage} from "../public/pages/ConsultaPage.jsx";
import {PerfilClientePublic} from "../public/pages/PerfilClientePublic.jsx";

export  function AuthRouter(){
    return (
        <Routes>
            <Route path="/auth/sign-in" element={<PublicPath><SignIn/></PublicPath>}/>
            <Route path="/auth/sign-up" element={<PublicPath><SignUp/></PublicPath>}/>
            <Route path="/consultas" element={<PublicPath><ConsultaPage/></PublicPath>}/>
            <Route path="/consultas/perfil/:clienteId" element={<PublicPath><PerfilClientePublic/></PublicPath>}/>
            <Route path="/*" element={<PrivatePath><CoreRouter/></PrivatePath>}/>
        </Routes>
    )
}