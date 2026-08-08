import {getProfile, editProfile } from "./profile.api.js";
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


//CODIGO DO MODAL
const elements = {
    //messagem de erro
    erroMessage: document.getElementById("errorMessage"),

    //formulario
    form: document.getElementById("form"),

    idModal: document.getElementById("modalOverlay"),
    buttonEditProfile: document.getElementById("btnEditarPerfil"),
    buttonCloseModal: document.getElementById("btnFechar"),
    
    //campos e inputs
    nameInput: document.getElementById("editNome"),
    emailInput: document.getElementById('editEmail'),
    weightInput: document.getElementById('editPeso'),
    heightInput: document.getElementById('editAltura'),
    birthDate: document.getElementById('editNascimento'),
}

//fechar e abrir modal
elements.buttonEditProfile?.addEventListener('click', () => {
    elements.idModal.style.display = "block"
})

elements.buttonCloseModal.addEventListener('click', () => {
    elements.idModal.style.display = "none"
})


elements.form.addEventListener('submit', async (event) => {
    event.preventDefault()

    try {
        const result = await editProfile(
            elements.nameInput.value,
            elements.emailInput.value,
            elements.weightInput.value,
            elements.heightInput.value,
            elements.birthDate.value
        ) 
        
    } catch (error) {
        elements.erroMessage.textContent = error.message
    }
})
