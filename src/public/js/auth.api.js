 const API_URL = "http://localhost:8081/api/auth";

async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, { //fazendo uma requisiçao HTTP
        method: "POST", //usando o endpoint POST /login
        headers: { //enviando os json
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ //corpo da requisiçao e transformando o objeto em JSON
            email,
            password
        })
    })
    return await response.json();
}

export { login };