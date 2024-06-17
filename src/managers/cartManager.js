import fs from "fs"
import { stringify } from "querystring"
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
    carts = JSON.parse(cartsJson) || []

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

    //falta logica para hacer que si producto ya esta, solo se sume quantity
    const product = {
        product: pid,
        quantity: 1
    }

    if(pid === product.product){
        product.quantity++
        cart.products.push(product.quantity)
    } else{
        cart.products.push(product)
    }

    await fs.promises.writeFile(path, stringify(carts))

    return cart
}

export default {
    createCart,
    getCartById,
    addProductToCart
}



