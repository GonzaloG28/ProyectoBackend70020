import express from "express"
import productRouter from "./router/product.router.js"
import cartRouter from "./router/cart.router.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
//import __dirname from "./dirname.js"
//import viewsRoutes from "./router/views.routes.js"

const PORT = 8080
const app = express()
 
app.use(express.json())
//sirve para que pueda leer todo tipo de escritura
app.use(express.urlencoded({extended: true}))

//app.engine("handlebars", handlebars.engine()) // inicia el motor de la plantilla
//app.set("views", __dirname + "/views") // Indicamos que ruta se encuentran las vistas
//app.set("view engine", "handlebars") // indicamos con que motor vamos a actualizar las vistas


//archivos publicos
app.use(express.static("public"))

//rutas
app.use("/api", productRouter) 
app.use("/api", cartRouter)
//app.use("/", viewsRoutes)


//servidor conectado en puerto 8080
 const serverHttp = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})


export const io = new Server(serverHttp)

io.on("connection", (socket) =>{
    console.log("Nuevo cliente conectado")
})