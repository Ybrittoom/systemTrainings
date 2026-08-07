import getProfile from "./profile.api.js";
import formatDate from "./utils.js"

const user = await getProfile()

const firstLetterUser = document.getElementById("perfil-avatar")
const nameUser = document.getElementById("perfil-nome")
const perfilEmail = document.getElementById("perfil-email")
const perfilPeso = document.getElementById("perfil-peso")
const perfilAltura = document.getElementById("perfil-altura")
const perfilNascimento = document.getElementById("perfil-nascimento")


nameUser.textContent = user.name
perfilEmail.textContent = user.email
perfilPeso.textContent = user.weight
perfilAltura.textContent = user.height
perfilNascimento.textContent = formatDate(user.birth_date)

//mostrando a primeira letra do nome do usuario
//showing the first letter of the username
firstLetterUser.textContent = user.name.charAt(0).toUpperCase()
