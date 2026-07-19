import "dotenv/config.js";
import app from "./app.js";//recebendo a aplicaçao

app.listen(8081, () => {
    console.log("o que estamos recebendo: ", process.env.DB_PASSWORD)
    console.log("Servidor rodandooooo")
})