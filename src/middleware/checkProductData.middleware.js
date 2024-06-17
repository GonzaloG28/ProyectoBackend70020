

//funcion que actualiza el producto con los datos que se modifiquen en el cuerpo de la solicitud
export const checkProductData = async(req, res, next) => {
    try{
        const { title, description, code, price, stock, category, thumbnails } = req.body
        const newProduct = {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails,
        }

        //funcion que verifica que se completen todos los campos
        if(Object.values(newProduct).includes(undefined)){
            return res.status(400).json({ status:"error", msg:"Todos los campos son obligatorios"})
        }
        //permite que continue la ejecucion del endpoint
        next()

    }catch(err){
        console.log(err)
    }
}