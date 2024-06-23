import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import "../AuthForm.css"
import {useNavigate} from "react-router-dom";
import {useAuthApi} from "../custom-hooks/useAuthApi.js";
import {useSignUp} from "../custom-hooks/useSignUp.js";
import {SpinnerDialog} from "../../shared/components/SpinnerDialog.jsx";
import {NavDialog} from "../../shared/components/NavDialog.jsx";
export function SignUp(){
    const navigate = useNavigate();
    const {signUp,loading,error,success,successToFalse}=useAuthApi()
    const {signUpRequest,setters} = useSignUp()
    const toLogin = ()=>navigate("/auth/sign-in");
    return (
        <div className="flex h-full flex-column sign-up">
            <form
                className="auth-form w-27rem mt-4 m-auto pt-2 pb-2 flex flex-column align-items-center justify-content-center">
                <div className="flex flex-column align-items-center mt-2">
                    <div className="w-2">
                        <img src="https://i.postimg.cc/Ls4XtRYj/dar-dinero.png" alt="" style={{width: "100%"}}/>
                    </div>
                    <div>FinApp</div>
                </div>
                <h2>Registrar negocio</h2>
                <div className="flex flex-column gap-2">
                    <label htmlFor="nombre">Nombre del negocio</label>
                    <InputText id="nombre" aria-describedby="username-help" placeholder="Nombre del negocio"
                               onChange={(e) => setters.setNombre(e.target.value)}
                    />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="ruc">RUC</label>
                    <InputText id="ruc" aria-describedby="username-help" placeholder="RUC"
                               onChange={(e) => setters.setRuc(e.target.value)}
                    />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="telefono">Teléfono</label>
                    <InputText id="telefono" aria-describedby="username-help" placeholder="Telefono"
                               onChange={(e) => setters.setTelefono(e.target.value)}
                    />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="direccion">Dirección</label>
                    <InputText id="direccion" aria-describedby="username-help" placeholder="Dirección"
                               onChange={(e) => setters.setDireccion(e.target.value)}
                    />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="email">Email</label>
                    <InputText id="email" aria-describedby="username-help" placeholder="Ingresa tu email"
                               onChange={(e) => setters.setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="password">Contraseña</label>
                    <InputText type="password" id="password" aria-describedby="username-help"
                               placeholder="Ingresa tu contraseña"
                               onChange={(e) => setters.setPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="repeatPassword">Repetir contraseña</label>
                    <InputText type="password" id="repeatPassword" aria-describedby="username-help"
                               placeholder="Repite tu contraseña"
                    />
                </div>
                <p className="m-0 mb-3"><small> Ya tienes una cuenta?</small><strong
                    className="create-account-link" onClick={toLogin}> Iniciar sesión</strong></p>
                {setters.validarCampos() && <p style={{color: "red"}}>Algunos campos están incompletos</p>}
                <div className="card flex justify-content-center">
                    <Button type="button" label="Registrar" onClick={() => {
                        if (!setters.validarCampos())
                            signUp(signUpRequest)
                    }}
                    />
                </div>
            </form>
            <SpinnerDialog loading={loading}></SpinnerDialog>
            <NavDialog
                success={success}
                message="Ha sido registrado correctamente, por favor ingrese sesión para continuar"
                icono="pi pi-check-circle"
                color="green"
                route="/auth/sign-in"
                onClick={()=>successToFalse()}
            />
        </div>
    )
}