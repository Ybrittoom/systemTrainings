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
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer o login")
    }

    return(data);
}

async function cadastro(name, email, password, birth_date, weight, height) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password,
            birth_date,
            height,
            height
        })
    })
    const data = await response.json()
    if(!response.ok) {
        throw new Error(data.message || "Erro ao fazer cadastro")
    }

    return(data)
}

export { login, cadastro };