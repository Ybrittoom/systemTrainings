import getProfile from "./profile.api";

const user = await getProfile()

const firstLetterUser = document.getElementById("perfil-avatar")
const nameUser = document.getElementById("perfil-nome")

nameUser.textContent = user.name
