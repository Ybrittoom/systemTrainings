import "dotenv/config.js";

import app from "./app.js";

const PORT = process.env.PORT || 8081;

app.listen(process.env.PORT || 8081, () => {
    console.log("Servidor rodandooooo");
});