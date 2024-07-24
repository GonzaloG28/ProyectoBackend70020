/* import { Router } from "express"
import productManager from "../managers/productManager.js"
import { io } from "../app.js"

const router = Router()

router.get("/products", async(req, res) =>{
    const product = await productManager.getProducts()
    res.render("index", { product })
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
    await productManager.addProduct(req.body)
    console.log(req.body)
    const product = await productManager.getProducts()
    io.emit("products", product)
    res.render("realTimeProducts")
})


router.delete("/realtimeproducts", async (req, res) =>{
  const { id } = req.body
  await productManager.deleteProduct(id)
  const product = await productManager.getProducts()
  io.emit("products", product)
  res.render("realTimeProducts")
})

export default router */