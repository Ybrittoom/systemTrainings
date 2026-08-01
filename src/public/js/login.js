import { login } from "./auth.api.js"

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => { //ao clicar em entrar executa essa funçao
    event.preventDefault();

    const email = document.getElementById("emailInput").value
    const password = document.getElementById("senhaInput").value
    const errorMessage = document.getElementById("errorMessage")

    try {
        const result = await login(email, password); //chamando a api (api.js) 
        localStorage.setItem("token", result.token)
        window.location.href = "/dashboard"
    } catch (error) {
        errorMessage.textContent = error.message;

    }
})