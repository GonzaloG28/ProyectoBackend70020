
const socket = io()

const productsList = document.getElementById("productsList")
const addForm = document.getElementById("addForm")
const price = document.getElementById("price").value
const description = document.getElementById("description")
const title = document.getElementById("title").value
const deleteForm = document.getElementById("deleteForm")

//chequear si recibimos los productos
socket.on("products", (data) =>{
    console.log(data)
    //limpiar DOM antes de leer productos
    productsList.innerHTML= ""

    data.forEach(product => {
        const card = document.createElement("div")
        card.classList.add("card", "m-5")
        card.innerHTML = `
        <div class = "card-body">
            <h5 class = "card-title">${product.title}</h5>
            <p class = "card-text">ID: ${product.id}</p>
            <p class = "card-text">${product.description}</p>
            <p class = "card-text">$${product.price}</p>
        </div>
        ` 

        productsList.appendChild(card)
    })
})


//push del producto

addForm.addEventListener("submit", async(e) =>{
    e.preventDefault()

    await fetch("/realtimeproducts", {
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({title, price, description})
    })
})