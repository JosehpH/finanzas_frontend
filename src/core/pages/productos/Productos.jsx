import {SpeedDial} from "primereact/speeddial";
import {useEffect, useState} from "react";
import {AddProductDialog} from "./components/AddProductDialog.jsx";
import {useProducts} from "./custom-hooks/useProducts.js";
import "./Productos.css"
import {ProductCard} from "./components/ProductCard.jsx";
import {SpinnerDialog} from "../../../shared/components/SpinnerDialog.jsx";
import {NavDialog} from "../../../shared/components/NavDialog.jsx";
import {SearchBar} from "../../../shared/components/SearchBar.jsx";

export function Productos() {
    const [formVisible, setFormVisible] = useState(false)
    const {
        searchProducts,
        setters,
        postProduct,
        products,
        getAll,
        loading,
        success,
        successToFalse,
        deleteProduct
    } = useProducts()

    useEffect(() => {
        getAll()
    }, [])

    return (
        <div className="page productos">
            <div className="header-page-container">
                <h2 className="title-page"> Gestión de productos</h2>
                <hr/>
            </div>

            <SearchBar placeholder="Buscar producto" onSearch={searchProducts}></SearchBar>
            <div className="products-container mt-5 pl-5 pr-5">
                {
                    products.map((product, i) => (
                        <ProductCard key={i} product={product} deleteProduct={deleteProduct}/>
                    ))
                }
            </div>
            <SpinnerDialog
                loading={loading}
            ></SpinnerDialog>
            <div className="spedd-dial-container">
                <SpeedDial
                    model={null}
                    radius={120}
                    type="quarter-circle"
                    direction="up-left"
                    onClick={() => setFormVisible(true)}
                />
            </div>


            <AddProductDialog
                visible={formVisible}
                onHide={() => {
                }}
                setters={setters}
                onSend={postProduct}
                onClose={() => setFormVisible(false)}
                loading={loading}
                success={success}
                successToFalse={successToFalse}
            />


        </div>

    );
}