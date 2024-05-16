import {useContext, useState} from "react";
import {BASE_PATH} from "../../../../shared/constants/ApiFinanzas.js";
import {Contexto} from "../../../../auth/context/Contexto.jsx";
import axios from "axios";
import {UploadService} from "../../../../shared/services/UploadService.js";

export function useProducts() {
    const resource = `${BASE_PATH}/api/products`
    const {token} = useContext(Contexto)
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };
    const [productRequest, setProductRequest] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
    })
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const setNombre = (value) => setProductRequest((prev) => ({
        ...prev,
        nombre: value
    }))
    const setPrecio = (value) => setProductRequest((prev) => ({
        ...prev,
        precio: value
    }))
    const setDescripcion = (value) => setProductRequest((prev) => ({
        ...prev,
        descripcion: value
    }))

    const setters = {
        setNombre,
        setPrecio,
        setDescripcion,
    }

    const postProduct =  async(files) => {
        const uploadService = new UploadService()
        console.log("files",files)
        const onProgess = (progress) => {}
        setLoading(true)

        const urls = [];
        for (const file of files) {
            let url = await uploadService.getUrlUploadFile(file,onProgess())
            urls.push(url)
        }
        console.log("files: ",files)
        console.log("urls: ",urls)

        let requestBody = {
            nombre:productRequest.nombre,
            descripcion:productRequest.descripcion,
            precio:productRequest.precio,
            imagenes:urls
        }

        axios.post(resource, requestBody, config).then((e) => {
            setLoading(false)
            setSuccess(true)
            console.log(e.data)
        }).catch((e) => {
            setLoading(false)
            console.log(e)
        })
    }
    const getAll = () => {
        setLoading(true)
        axios.get(resource, config).then((e) => {
            setProducts(e.data)
            console.log(e)
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
            alert("Error al obtner los productos")
        })
    }
    const deleteProduct = (idProduct)=>{
        console.log("Entro")
        setLoading(true)
        axios.delete(`${resource}/${idProduct}`,config).then((e)=>{
            setLoading(false)
            setSuccess(true)
            getAll()
        }).catch((e)=>{
            setLoading(false)
        })

    }

    const searchProducts = (keyword) => {
      const ruta = `${resource}/search`
        const configs = {...config,params:{keyword:keyword}}
        setLoading(true);
        axios.get(ruta,configs).then((e)=>{
            setLoading(false)
            setProducts(e.data)
        }).catch((e)=>{
            setLoading(false)
            alert(e)
        })
    }

    return {setters, searchProducts,postProduct, products, getAll, loading, success, successToFalse: () => setSuccess(false),deleteProduct}
}