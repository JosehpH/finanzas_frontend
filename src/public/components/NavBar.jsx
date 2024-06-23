import {useNavigate} from "react-router-dom";
import {useContext, useRef} from "react";
import {Contexto} from "../../auth/context/Contexto.jsx";
import "./NavBar.css"
import {Menubar} from "primereact/menubar";
import {Avatar} from "primereact/avatar";
import {Toast} from "primereact/toast";
import {Menu} from "primereact/menu";
import {Dialog} from "primereact/dialog";

export function NavBar() {
    const {logout} = useContext(Contexto);
    const navigate = useNavigate()
    const menuLeft = useRef(null);
    const toast = useRef(null);
    const items2 = [
        {
            label: 'Perfil',
            icon: 'pi pi-user',
            command: () => {
                navigate("/profile")
            }
        },
        {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: logout
        }

    ];
    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: () => navigate("/home")
        },
        {
            label: 'Clientes',
            icon: 'pi pi-users',
            command: () => navigate("/customers")

        },
        {
            label: 'Productos',
            icon: 'pi pi-box',
            command: () => navigate("/products")

        },
        {
            label: 'Créditos',
            icon: 'pi pi-credit-card',
            command: () => navigate("/credits")

        }
    ];

    const start =<div className="flex flex-row align-items-center" style={{cursor:"pointer", color:"purple", fontWeight:"bold"}} onClick={()=>{
        navigate("/home")
    }}><img alt="logo" src="https://i.postimg.cc/Ls4XtRYj/dar-dinero.png" height="40"
                       className="mr-2 img-nav-bar"></img> FinApp</div> ;
    const end = (
        <div className="card flex justify-content-center">
            <Toast ref={toast}></Toast>
            <Menu model={items2} popup ref={menuLeft} id="popup_menu_left"/>
            <Avatar icon="pi pi-user" style={{backgroundColor: '#2196F3', color: '#ffffff'}} shape="circle"
                    onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup/>
        </div>
    );
    return (
        <div className="card nav-bar">
            <Menubar model={items} start={start} end={end} className="menu-bar"/>
        </div>
    )
}