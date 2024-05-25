import {Card} from 'primereact/card';
import {Button} from 'primereact/button';

// eslint-disable-next-line react/prop-types
export function ProductCard({product,deleteProduct}) {

    return (
            <div className="card-product">
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
                    <Button icon="pi pi-trash" severity="danger" onClick={()=>{
                        deleteProduct(product.id)
                    }} ></Button>
                </div>

            </div>
    )
}