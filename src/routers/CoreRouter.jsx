import { Navigate, Route, Routes} from "react-router-dom";
import {Home} from "../core/pages/home/Home.jsx";
import {NavBar} from "../public/components/NavBar.jsx";
import {Productos} from "../core/pages/productos/Productos.jsx";
import {Clientes} from "../core/pages/clientes/Clientes.jsx";
import {Cuenta} from "../core/pages/clientes/components/Cuenta.jsx";
import {PerfilNegocio} from "../core/pages/negocio/PerfilNegocio.jsx";
import {Creditos} from "../core/pages/creditos/Creditos.jsx";
import {PerfilCliente} from "../core/pages/clientes/PerfilCliente.jsx";

export function CoreRouter() {
    return (
        <>
            <NavBar></NavBar>
            <Routes>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/products" element={<Productos/>}></Route>
                <Route path="/customers" element={<Clientes/>}></Route>
                <Route path="/credits" element={<Creditos/>}></Route>
                <Route path="/profile" element={<PerfilNegocio/>}></Route>
                <Route path="/customers/account/:customerId" element={<Cuenta/>}></Route>
                <Route path="/customers/:clienteId" element={<PerfilCliente/>}></Route>
                <Route path="/*" element={<Navigate to="/home"/>}/>
            </Routes>
        </>);
}