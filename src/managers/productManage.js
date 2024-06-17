import fs from "fs"
import { v4 as uuid } from "uuid"

//iniciamos los productos vacios
let products = []
const path = "./src/managers/data/products.json"



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
        console.log(`${err}`)
    }
}

//leer producto
const getProducts = async(limit) =>{
    try{
        const fileJson = await fs.promises.readFile(path, "utf-8")
        const parseFile = JSON.parse(fileJson)
        products = parseFile || []

        return products
    } catch(err) {
        console.log(`${err}`)
    }
}