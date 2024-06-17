import express from "express"
import productRouter from "./router/product.router.js"


const PORT = 8080
const app = express()

app.use(express.json())
//sirve para que pueda leer todo tipo de escritura
app.use(express.urlencoded({extended: true}))
//archivos publicos
app.use(express.static("public"))


app.use("/api", productRouter)

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})