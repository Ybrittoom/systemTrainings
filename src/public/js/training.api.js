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