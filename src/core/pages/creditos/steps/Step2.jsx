import {SearchBar} from "../../../../shared/components/SearchBar.jsx";
import {useStep2} from "../custom-hooks/useStep2.js";
import {ProductCardOrden} from "../components/step2/ProductCardOrden.jsx";
import {useContext, useEffect, useState} from "react";
import {SpinnerDialog} from "../../../../shared/components/SpinnerDialog.jsx";
import {OrderItem} from "../components/step2/OrderItem.jsx";
import {StepperContext} from "../context/StepperContext.jsx";
import {Divider} from "primereact/divider";

export function Step2() {
    const {http, products, state, orden} = useStep2()
    const {ordenLocal, setOrdenLocal} = useContext(StepperContext);
    useEffect(() => {
        http.getAll()
    }, [])

    const addProductoToOrden = (id, cantidad) => {
        setOrdenLocal(prevOrdenLocal => {
            const existingProductIndex = prevOrdenLocal.findIndex(item => item.productId === id);

            if (existingProductIndex !== -1) {
                // Producto ya está en el carrito, incrementa la cantidad
                const updatedOrden = [...prevOrdenLocal];
                updatedOrden[existingProductIndex].cantidad += cantidad;
                http.crearOrden(updatedOrden);
                return updatedOrden;
            } else {
                // Producto no está en el carrito, agrégalo
                const updatedOrden = [...prevOrdenLocal, {productId: id, cantidad: cantidad}];
                http.crearOrden(updatedOrden);
                return updatedOrden;
            }
        });
    };
    const removeProductoFromOrden = (id) => {
        setOrdenLocal(prevOrdenLocal => {
            const updatedOrden = prevOrdenLocal.filter(item => item.productId !== id);
            http.crearOrden(updatedOrden);
            return updatedOrden;
        });
    };
    const ordenList = ()=>{
        if(orden==null || orden.items.length===0)
            return (<div style={{textAlign:"center"}}>La orden está vacía, agrega productos</div>)
        else
            return(
                orden?.items?.map((item, index) => (
                    <OrderItem item={item} key={index} deleteItem={removeProductoFromOrden}></OrderItem>))
            )
    }
    return (
        <div className="container-step2 w-full">
            <SearchBar placeholder="Buscar producto" onSearch={http.searchProducts}></SearchBar>
            <div className="flex flex-column w-full md:flex-row lg:flex-row xl:flex-row justify-content-around">
                <div className="step2-productos-search flex flex-column mt-2">
                    {products.map((product, index) => (<ProductCardOrden key={index} product={product}
                                                                         addProductoToOrden={addProductoToOrden}></ProductCardOrden>))}
                </div>
                {(<div className="cart-products flex flex-column w-25rem justify-content-between">
                    <div className="header-cart">
                        <h3>Orden <i className="pi pi-shopping-cart"></i></h3>
                        <hr/>
                    </div>
                    <div className="body-cart">
                        {
                           ordenList()
                        }
                    </div>
                    <div className="footer-cart" style={{fontWeight: "bold"}}><strong
                        className="mr-3">Total: </strong> S/ {parseFloat(orden==null?0:orden.total).toFixed(2)}</div>
                </div>
                    )}
                <SpinnerDialog loading={state.loading}></SpinnerDialog>
            </div>
        </div>
    )
}