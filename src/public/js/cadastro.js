import { cadastro } from "./auth.api.js"

const form = document.getElementById("form")

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const name = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const password = document.getElementById("senha").value
    const birth_date = document.getElementById("nascimento").value
    const weight = document.getElementById("peso").value
    const height = document.getElementById("altura").value

    const errorMessage = document.getElementById("errorMessage")

    try {
        const result = await cadastro(
            name,
            email,
            password,
            birth_date,
            weight,
            height
        )
      
        window.location.href = "/login.html"
    } catch (error) {
        errorMessage.textContent = error.message
    }

})