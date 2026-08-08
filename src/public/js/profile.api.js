const API_URL = "http://localhost:8081/api/auth";

async function getProfile() {
    const token = localStorage.getItem("token")

    const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: {
           //ao invez de mandar o body, apenas mandar a autorizaçao 
            Authorization: `Bearer ${token}`
        }
    });

    return await response.json();
}

//CRIAR A FUNÇAO PUTPROFILE AQUI
async function editProfile(
    name,
    email,
    weight,
    height,
    birth_date
) {
    const token = localStorage.getItem("token")

    const response = await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            email,
            weight,
            height,
            birth_date
        })
    })

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message || "Erro ao atualizar perfil")
    }

    return data

}

export {getProfile, editProfile}