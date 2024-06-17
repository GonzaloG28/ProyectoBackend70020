import express from "express"


const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))



app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})