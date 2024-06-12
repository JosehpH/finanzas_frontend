import {Ripple} from "primereact/ripple";
import {StyleClass} from "primereact/styleclass";
import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {Sidebar} from "primereact/sidebar";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./NavBar.css"
export function SidebarNav() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate()
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
    return (
        <div className="card flex justify-content-start pl-4 pt-4">
            <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
            >
                <div>
                    <img
                        alt="logo"
                        src="https://i.postimg.cc/Ls4XtRYj/dar-dinero.png"
                        height="40"
                        className="mr-2 img-nav-bar"/>
                </div>
                {
                    items.map((i,index)=> (
                        <div className="card flex justify-content-start">
                        <Button
                            className="botones-nav"
                            key={index}
                            onClick={() => i.command()}
                            label={i.label}
                            icon={i.icon}
                            text={true}
                        />
                        </div>
                    ))
                }

            </Sidebar>
            <div className="card flex justify-content-center">
                <Button icon="pi pi-bars" onClick={() => setVisible(true)} style={{backgroundColor: "green"}}/>
            </div>
        </div>
    )
}