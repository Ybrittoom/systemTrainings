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

export default getProfile