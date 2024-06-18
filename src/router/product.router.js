import { Router } from "express"
import { checkProductData } from "../middleware/checkProductData.middleware.js"
import productManager from "../managers/productManager.js"


const router = Router()

//Al hacer la solicitud GET trae todos los productos
router.get("/products", async (req, res) =>{

    try {
        //si req.query.limit esta definido convierte el valor a un numero, y si no, lo establece como indefinido
        const limit = req.query.limit ? parseInt(req.query.limit) : null

        //si limit es distinto a null y no es un numero o es menor a 0 envia el error 400
        if (limit !== null && (isNaN(limit) || limit <= 0)) {
            return res.status(400).send("El parámetro limit debe ser un número positivo")
        }
        //si limit es valido o no se presenta devuelve o el limite de productos o todos los productos
        const products = await productManager.getProducts(limit)
        res.send(products)

    } catch (err) {
        res.status(500).send("Error al obtener los productos")
    }
})

//Al hacer la solicitud GET nos trae el producto por su id
router.get("/products/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productManager.getProductById(pid)
      if (!product) return res.status(404).json({ status: "error", msg: "Producto no encontrado" })
  
      res.status(200).json({ status: "ok", product })
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Error interno del servidor" })
    }
  });



//Al hacer la solicitud PUT actualiza el producto
router.put("/products/:pid", async (req, res) =>{
    const { pid } = req.params
    const body = req.body
    const product = await productManager.updateProduct(pid, body)

    res.send(product)
})


//Al hacer la solicitud POST añade un nuevo producto con los datos del body
router.post("/products", checkProductData, async(req, res) =>{
    try{
        const body = req.body
        const product = await productManager.addProduct(body)

        res.status(201).json({ status:"ok", product, msg:"Producto creado"})
    }catch(err){
        console.log(err)
        res.status(500).json({ status:"error", msg:"Error interno del servidor"})
    }
})

//Al hacer la solicitud DELETE elimina el producto
router.delete("/products/:pid", async(req, res) =>{
    try{
        const { pid } = req.params
        const product = await productManager.getProductById(pid)

        if(!product) return res.status(404).json({ status:"error", msg:"Producto no encontrado"})

        await productManager.deleteProduct(pid)
        res.status(200).json({ status:"ok", msg:`Producto con el ID ${pid} eliminado con exito` })

    }catch(err){
        console.log(err)
        res.status(500).json({ status:"error", msg:"Error interno del servidor"})
    }
})


export default router