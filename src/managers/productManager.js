import fs from "fs"
import { v4 as uuid } from "uuid"


const path = "./src/managers/data/products.json"

//iniciamos los productos vacios
let products = []



//agregar un producto
const addProduct = async(product) => {
    try{
        await getProducts()
        const { title, description, code, price, stock, category, thumbnails } = product

        const newProduct = {
            id: uuid(),
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails,
            status: true
        }

        products.push(newProduct)
        await fs.promises.writeFile(path, JSON.stringify(products))

        return newProduct


    }catch(err){
        console.log(err)
    }
}

//leer producto
const getProducts = async(limit) =>{
    try{
        const fileJson = await fs.promises.readFile(path, "utf-8")
        const parseFile = JSON.parse(fileJson)
        products = parseFile || []

        //limita el numero de productos
        if (limit && !isNaN(limit)) {
            products = products.slice(0, limit)
        }

        return products
    } catch(err) {
        console.log(err)
    }
}


//leer producto por id
const getProductById = async(id) => {
    try{
        await getProducts()
        const product = products.find((p) => p.id === id)

        return product
    }catch(err){
        console.log(err)
    }
}


//actualizar un producto
const updateProduct = async(id, productData) => {
    try{
        await getProducts()

        const index = products.findIndex((p) => p.id === id)

        //Excluimos el id del cuerpo de la solicitud
        const { id: _, ...updatedData } = productData

        products[index] = {
            ...products[index],
            ...updatedData
        }

        await fs.promises.writeFile(path, JSON.stringify(products))
        return products[index]

    }catch(err){
        console.log(err)
    }
}


//eliminar producto
const deleteProduct = async(id) =>{
    try{
        await getProducts()

        products = products.filter((p) => p.id !== id)
        await fs.promises.writeFile(path, JSON.stringify(products))

        return products
    }catch(err){
        console.log(err)
    }
}

export default {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}