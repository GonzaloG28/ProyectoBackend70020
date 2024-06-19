import { Router } from "express"
import cartManager from "../managers/cartManager.js"
import productManager from "../managers/productManager.js"


const router = Router()

//Crear carrito
router.post("/carts", async(req, res) =>{
    try{
        const cart = await cartManager.createCart()
        res.status(201).json({ status:"ok", cart})

    }catch(err){
        console.log(err)
        res.status(500).json({ status:"error", msg:"Error interno del servidor"})
    }
})

//obtener un carrito
router.get("/carts/:cid", async(req, res) =>{
    try{
        const { cid } = req.params
        const cart = await cartManager.getCartById(cid)

        if(!cart) return res.status(404).json({ status:"error", msg:"Carrito no encontrado"})

        res.status(200).json({ status:"ok", cart})

    }catch(err){
        console.log(err)
        res.status(500).json({ status:"error", msg:"Error interno del servidor"})
    }
})


//agregar producto al carrito
router.post("/carts/:cid/product/:pid", async(req, res) =>{
    try{
        const { cid, pid } = req.params

        //verificar si el carrito existe
        const ExistCart = await cartManager.getCartById(cid)
        if(!ExistCart) return res.status(404).json({ status:"error", msg:"Carrito no encontrado"})

        //verificar si el producto existe
        const ExistProduct = await productManager.getProductById(pid)
        if(!ExistProduct) return res.status(404).json({ status:"error", msg:"Producto no encontrado"})

        //agregar producto al carrito
        const cart = await cartManager.addProductToCart(cid, pid)

        res.status(201).json({ status:"ok", cart})
    }catch(err){
        console.log(err)
        res.status(500).json({ status:"error", msg:"Error interno del servidor"})
    }
})


export default router
