import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import "../AuthForm.css"
import {useNavigate} from "react-router-dom";
import {useSignIn} from "../custom-hooks/useSignIn.js";
import {useAuthApi} from "../custom-hooks/useAuthApi.js";
import {SpinnerDialog} from "../../shared/components/SpinnerDialog.jsx";
export function SignIn(){
    const navigate = useNavigate();
    const {setEmail,setPassword,signInRequest} = useSignIn();
    const {signIn,loading,error}=useAuthApi()
    const toRegister = ()=>navigate("/auth/sign-up");

    return (
        <div className="flex h-full flex-column sign-in">
            <form className="auth-form w-22rem m-auto mt-8 flex flex-column align-items-center justify-content-center">
                <h1>Iniciar sesión</h1>
                <div className="flex flex-column gap-2">
                    <label htmlFor="username">Email</label>
                    <InputText id="username" aria-describedby="username-help" placeholder="Ingresa tu email" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="username">Password</label>
                    <InputText type="password" id="username" aria-describedby="username-help" placeholder="Ingresa tu contraseña" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <p className="m-0 mt-2"><small className="recovery-password-link">He olvidado mi contraseña</small></p>
                <p className="m-0 mb-3"><small> No tienes una cuenta?</small><strong
                    className="create-account-link" onClick={toRegister}> Crear una</strong></p>
                <div className="card flex justify-content-center">
                    <Button type="button" label="Ingresar" onClick={()=>signIn(signInRequest)}/>
                </div>
            </form>
          <SpinnerDialog loading={loading}/>

        </div>
    )
}