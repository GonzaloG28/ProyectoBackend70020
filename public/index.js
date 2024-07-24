/* 
const socket = io()

const productsList = document.getElementById("productsList")

const price = document.getElementById("price")
const description = document.getElementById("description")
const title = document.getElementById("title")
const category = document.getElementById("category")
const stock = document.getElementById("stock")
const code = document.getElementById("code")

const addForm = document.getElementById("addForm")
const deleteForm = document.getElementById("deleteForm")


/chequear si recibimos los productos
socket.on("products", (data) =>{
    console.log(data)
    /limpiar DOM antes de leer productos
    productsList.innerHTML= ""

    data.forEach(product => {
        const card = document.createElement("div")
        card.classList.add("card", "m-5")
        card.innerHTML = `
        <div class = "card-body">
            <h5 class = "card-title">${product.title}</h5>
            <p class = "card-text">ID: ${product.id}</p>
            <p class = "card-text">${product.description}</p>
            <p class = "card-text">Precio: $${product.price}</p>
            <p class = "card-text">Categoria: ${product.category}</p>
            <p class = "card-text">Stock: ${product.stock}</p>
            <p class = "card-text">Code: ${product.code}</p>
        </div>
        ` 

        productsList.appendChild(card)
    })
}) */


//push del producto
/* addForm.addEventListener("submit", async(e) =>{
    e.preventDefault()

    await fetch("/realtimeproducts", {
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({title: title.value, price: price.value, description: description.value, category: category.value, stock: stock.value, code: code.value})
    })
}) */


//eliminacion del producto
/* deleteForm.addEventListener("submit", async(e) =>{
    e.preventDefault()

    const id = document.getElementById("id")

    await fetch("/realtimeproducts", {
        method: "DELETE",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({ id: id.value })
    })
}) */