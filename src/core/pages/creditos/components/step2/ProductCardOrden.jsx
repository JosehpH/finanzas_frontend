import {Button} from "primereact/button";

export function ProductCardOrden({product, addProductoToOrden}){
    const cantidad = 1;
    return (
        <div className=" flex flex-row justify-content-center align-items-center">
            <div className="card-product-image">
                <img alt="Card" src={product.imagenes[0]} className="card-product-header"/>
            </div>
            <div className="card-product-body">
                <h4>{product.nombre}</h4>
                <h5 style={{color:"red"}}>S/ {parseFloat(product.precio).toFixed(2)}</h5>
                <p className="m-0">
                    {product.descripcion}
                </p>
            </div>
            <div className="card-product-footer">
                <Button icon="pi pi-cart-plus" severity={"success"} onClick={()=>{
                    addProductoToOrden(product.id,cantidad)
                }} ></Button>
            </div>

        </div>
    )
}