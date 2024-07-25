import mongoose from "mongoose"

//nombre de la coleccion
const cartCollection = "carts"

//Estructura del carrito en la coleccion
const cartSchema = new mongoose.Schema({
    products: {
        //array de los productos, almacena el identificador único de un documento, ref indica la coleccion dond estan estos productos
        type: [{products: {type: mongoose.Schema.Types.ObjectId, ref: "products"}, quantity: Number}],
        default: []
    }
})

cartSchema.pre("findOne", function (){
    this.populate("products.product")
})

//exportacion del modelo
export const cartModel = mongoose.model(cartCollection, cartSchema)