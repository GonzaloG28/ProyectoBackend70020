import express from "express"


const PORT = 8080
const app = express()

app.use(express.json())
//sirve para que pueda leer todo tipo de escritura
app.use(express.urlencoded({extended: true}))
//archivos publicos
app.use(express.static("public"))



app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})