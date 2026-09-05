import {getTrainings, postTraining} from "./training.api.js";
import formatDate from "./utils.js";

const token = localStorage.getItem("token");


if(!token) {
    window.location.href = '/login'; //caso nao tiver o token ele vai pro login direto 
}

const elements = {
    //botoes 
    btnAddTreino: document.getElementById("btnAddTreino"),
    btnFecharTreino: document.getElementById("btnFecharTreino"),
    btnCancelarTreino: document.getElementById("btnCancelarTreino"),

    listaTreinos: document.getElementById("listaTreinos"),
    msgVazia: document.getElementById("msgVazia"),
    modalTreino: document.getElementById("modalTreino"),
    formTreino: document.getElementById("formTreino"),
    errorMessage: document.getElementById("errorMessage"),
}


//mostrando a listra de treinos na tela de acordo de um arrey hehehe
function listarTreinos(treinos) {
    elements.listaTreinos.innerHTML = ""

    //caso estiver vazia a lista ele nn mostra nada
    if(treinos.length === 0) {
        elements.msgVazia.hidden = false
        return
    }

    elements.msgVazia.hidden = true;

    //fazendo com que para cada treinos exiba um cardeeeeee
    treinos.forEach((treino) => {
        const card = document.createElement('div')
        card.className = "treino-card"

        card.innerHTML = `
            <h3>${treino.title_sport}</h3>
            <p>Data: ${formatDate(treino.training_date)}</p>
            <p>Distância: ${treino.distance_trainings} km</p>
            <p>Duração: ${treino.duration_trainings}</p>
            <p>Pace: ${treino.pace_trainings} min/km</p>
            <p>Velocidade: ${treino.speed_trainings} km/h</p>
            <p>Calorias: ${treino.calories_trainings} kcal</p>
            <p>Intensidade: ${treino.intensity_trainings}</p>
            ${treino.notes_trainings ? `<p>Notas: ${treino.notes_trainings}</p>` : ""}
        `

        elements.listaTreinos.appendChild(card)
    });
}

//abrir os treinos assim que a pagina carregar
async function carregarTreinos() {
    try {
        const treinos = await getTrainings()
        listarTreinos(treinos)
    } catch (error) {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }
}

carregarTreinos();

//abrir e fechar modais
elements.btnAddTreino.addEventListener("click", () => {
    elements.formTreino.reset() //limpas os campos
    elements.errorMessage.textContent = ""
    elements.modalTreino.style.display = "flex"
})