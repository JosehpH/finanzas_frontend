import {Link, Navigate, Route, Routes} from "react-router-dom";
import {Home} from "../core/pages/home/Home.jsx";
import {NavBar} from "../public/components/NavBar.jsx";
import {Productos} from "../core/pages/productos/Productos.jsx";
import {Clientes} from "../core/pages/clientes/Clientes.jsx";
import {Creditos} from "../core/pages/creditos/Creditos.jsx";

export function CoreRouter(){
    return (
        <>
        <NavBar></NavBar>
        <Routes>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/products" element={<Productos/>}></Route>
            <Route path="/customers" element={<Clientes/>}></Route>
            <Route path="/credits" element={<Creditos/>}></Route>
            <Route path="/*" element={<Navigate to="/home"/>}/>
        </Routes>
    </>);
}