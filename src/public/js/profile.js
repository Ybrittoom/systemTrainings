import getProfile from "./profile.api.js";

const user = await getProfile()

const firstLetterUser = document.getElementById("perfil-avatar")
const nameUser = document.getElementById("perfil-nome")
const perfilEmail = document.getElementById("perfil-email")
const perfilPeso = document.getElementById("perfil-peso")
const perfilAltura = document.getElementById("perfil-altura")
const perfilNascimento = document.getElementById("perfil-nascimento")

console.log(perfilAltura)
window.alert(perfilAltura)

nameUser.textContent = user.name
perfilEmail.textContent = user.email
perfilPeso.textContent = user.weight
perfilAltura.textContent = user.height
perfilNascimento.textContent = user.birth_date

