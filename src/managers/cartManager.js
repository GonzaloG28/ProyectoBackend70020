import fs from "fs"
import { v4 as uuid } from "uuid"

//iniciamos carts vacio
let carts = []
const path = "./src/managers/data/carts.json"


//crear carrito
const createCart = async() =>{
    await getCarts()
    const newCart = {
        id: uuid(),
        products: []
    }

    carts.push(newCart)
    await fs.promises.writeFile(path, JSON.stringify(carts))

    return newCart
}


//leer carritos
const getCarts = async () =>{
    const cartsJson = await fs.promises.readFile(path, "utf-8")
    const parseFile = JSON.parse(cartsJson)
    carts = parseFile || []

    return carts
}


//leer carrito por ID
const getCartById = async(cid) =>{
    await getCarts()
    const cart = carts.find((c) => c.id === cid)

    return cart
}


//añadir producto al carrito
const addProductToCart = async (cid, pid) =>{
    await getCarts()
    const cart = await getCartById(cid)

    //logica para hacer que si producto ya esta, solo se sume quantity
    const ProductExist = cart.products.findIndex(item => item.product === pid)

    if(ProductExist !== -1){

        cart.products[ProductExist].quantity++

    } else{

        const product = {
            product: pid,
            quantity: 1
        }
        cart.products.push(product)
    }

    await fs.promises.writeFile(path, JSON.stringify(carts))

    return cart
}

export default {
    getCarts,
    createCart,
    getCartById,
    addProductToCart
}


