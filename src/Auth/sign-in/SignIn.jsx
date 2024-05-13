import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import "../AuthForm.css"
export function SignIn(){
    return (
        <div className="flex sign-in">
            <form className="auth-form w-22rem m-auto mt-8 flex flex-column align-items-center justify-content-center">
                <h1>Iniciar sesión</h1>
                <div className="flex flex-column gap-2">
                    <label htmlFor="username">Email</label>
                    <InputText id="username" aria-describedby="username-help" placeholder="Ingresa tu email"/>
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="username">Password</label>
                    <InputText id="username" aria-describedby="username-help" placeholder="Ingresa tu contraseña"/>
                </div>
                <p className="m-0 mt-2"><small className="recovery-password-link">He olvidado mi contraseña</small></p>
                <p className="m-0 mb-3"><small> No tienes una cuenta?</small><strong
                    className="create-account-link"> Crear una</strong></p>
                <div className="card flex justify-content-center">
                    <Button label="Ingresar"/>
                </div>
            </form>
        </div>
    )
}