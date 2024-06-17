import { Router } from "express"
import { checkProductData } from "../middleware/checkProductData.middleware.js"
import productManage from "../managers/productManage.js"


const router = Router()

//Al hacer la solicitud GET trae todos los productos
router.get("/products", async (req, res) =>{
    const products = await productManage.getProducts()
    res.send(products)
})

//Al hacer la solicitud GET trae solo el producto con el id 
router.get("/products/:pid", async (req, res) =>{
    try{
        const { pid } = req.params
        const product = await productManage.getProductById(pid)
        if(!product) return res.status(404).json({ status:"error", msg:"Producto no encontrado"})

        res.status(200).json({status:"ok", product})
    }catch(err){
        console.log(err)
        res.status(500).json({ status:"error", msg:"Error interno del servidor"})
    }
})

//Al hacer la solicitud PUT actualiza el producto
router.put("/products/:pid", async (req, res) =>{
    const { pid } = req.params
    const body = req.body
    const product = await productManage.updateProduct(pid, body)

    res.send(product)
})


//Al hacer la solicitud POST añade un nuevo producto con los datos del body
router.post("/products", checkProductData, async(req, res) =>{
    try{
        const body = req.body
        const product = await productManage.addProduct(body)

        res.status(201).json({ status:"ok", product})
    }catch(err){
        console.log(err)
        res.status(500).json({ status:"error", msg:"Error interno del servidor"})
    }
})

//Al hacer la solicitud DELETE elimina el producto
router.delete("/products/:pid", async(req, res) =>{
    try{
        const { pid } = req.params
        const product = await productManage.getProductById(pid)

        if(!product) return res.status(404).json({ status:"error", msg:"Producto no encontrado"})

        await productManage.deleteProduct(pid)
        res.status(200).json({ status:"ok", msg:`Producto con el ID ${pid} eliminado con exito` })

    }catch(err){
        console.log(err)
        res.status(500).json({ status:"error", msg:"Error interno del servidor"})
    }
})


export default router