import {Button} from "primereact/button";

export function OrderItem({item, deleteItem}) {
    return (
        <div className="order-item flex flex-row justify-content-center align-items-center mr-3">
            <div className="card-product-image">
                <img alt="Card" src={item.producto.imagenes[0]} className="card-product-header"/>
            </div>
            <div className="card-product-body">
                <h4>{item.producto.nombre}</h4>
                <h5 style={{color: "red"}}>S/ {parseFloat(item.producto.precio).toFixed(2)}</h5>
                <p className="m-0">
                    {item.producto.descripcion}
                </p>
            </div>
            <div className="card-product-footer flex flex-row gap-4 mr-3">
                <div className="flex flex-column align-items-center justify-content-center">
                    <div>cantidad</div>
                    <div>{item.cantidad}</div>
                </div>
                <div className="flex flex-column align-items-center justify-content-center">
                    <div>subtotal</div>
                    <div style={{color:"red", fontWeight:"normal"}}>S/{parseFloat(item.subTotal).toFixed(2)}</div>
                </div>
            </div>
            {deleteItem && (<div className="card flex flex-wrap justify-content-center gap-3 h-1rem">
                <Button severity="danger" icon="pi pi-trash" onClick={()=>{
                    deleteItem(item.producto.id)
                }}></Button>
            </div>)}
        </div>
    )
}