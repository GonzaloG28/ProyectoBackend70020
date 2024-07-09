import { Router } from "express"
import productManager from "../managers/productManager.js"
import { io } from "../app.js"

const router = Router()

router.get("/", async(req, res) =>{
    const product = await productManager.getProducts()
    res.render("home", { product })
})

router.get("/realtimeproducts", async (req, res) =>{
    const products = await productManager.getProducts()
    io.on("connection", (Socket) =>{
        console.log("Nuevo cliente conectado en real time products")
        Socket.emit("products", products)
    })

    res.render("realTimeProducts")
})

router.post("/realtimeproducts", async (req, res) =>{
    //await productManager.addProduct(req.body)
    console.log(req.body)
    res.render("realTimeProducts")
})

export default router