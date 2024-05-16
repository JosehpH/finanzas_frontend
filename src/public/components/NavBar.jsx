import {NavLink, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {Contexto} from "../../auth/context/Contexto.jsx";
import "./NavBar.css"
import {Toolbar} from "primereact/toolbar";
import {Menubar} from "primereact/menubar";
import {Badge} from "primereact/badge";
import {Avatar} from "primereact/avatar";
import {InputText} from "primereact/inputtext";
export function NavBar(){
    const {logout} = useContext(Contexto);
    const navigate = useNavigate()

    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: ()=>navigate("/home")
        },
        {
            label: 'Clientes',
            icon: 'pi pi-users',
            command: ()=>navigate("/customers")

        },
        {
            label: 'Productos',
            icon: 'pi pi-box',
            command: ()=>navigate("/products")

        },
        {
            label: 'Créditos',
            icon: 'pi pi-credit-card',
            command: ()=>navigate("/credits")

        }
    ];

    const start = <img alt="logo" src="https://i.postimg.cc/Ls4XtRYj/dar-dinero.png" height="40" className="mr-2 img-nav-bar"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" onClick={logout} />
        </div>
    );
    return (
        <div className="card nav-bar">
            <Menubar model={items} start={start} end={end}/>
        </div>
    )
}