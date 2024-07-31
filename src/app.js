import express from "express"
import productRouter from "./router/product.router.js"
import cartRouter from "./router/cart.router.js"
import { connectMongoDB } from "./config/mongoDB.config.js"
import envs from "./config/envs.config.js"


const app = express()

connectMongoDB()
 
app.use(express.json())
//sirve para que pueda leer todo tipo de escritura
app.use(express.urlencoded({extended: true}))


//archivos publicos
app.use(express.static("public"))

//rutas
app.use("/api", productRouter) 
app.use("/api", cartRouter)

app.listen(envs.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${envs.PORT}`)
})

