import {SearchBar} from "../../../../shared/components/SearchBar.jsx";
import {ListBox} from "primereact/listbox";
import {useStep1} from "../custom-hooks/useStep1.js";
import {SpinnerDialog} from "../../../../shared/components/SpinnerDialog.jsx";
import {useEffect, useState} from "react";
import {CardClientStep1} from "../components/CardClientStep1.jsx";

export function Step1(){
    const {loading,searchClientByDni,clienteSelect} = useStep1()

    const ClienteSeleccionado = ()=>{
        if(clienteSelect.clienteSelected==null){
            return (<p>No se ha encontrado</p>)
        }
        return ( <CardClientStep1 cliente={clienteSelect.clienteSelected}></CardClientStep1>)
    }
    return(
        <>
            <SearchBar placeholder={"Ingresar el DNI del cliente"} onSearch={searchClientByDni}></SearchBar>
            <ClienteSeleccionado></ClienteSeleccionado>
            <SpinnerDialog
                loading={loading}
            ></SpinnerDialog>
        </>
    )
}