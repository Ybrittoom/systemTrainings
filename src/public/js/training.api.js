const API_URL = "http://localhost:8081/apt/auth";

//buscando todos os treinos do usuario logado 
async function getTrainings() {
    const token = localStorage.getItem("token")

    const response = await fetch(`${API_URL}/trainings`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }) 

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar treinos")
    }

    return data;
}

async function postTraining(training) {
    const token = localStorage.getItem("token")

    const response = await fetch(`${API_URL}/trainings-post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(training)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar treino!")
    }

    return data
}

export {getTrainings, postTraining}