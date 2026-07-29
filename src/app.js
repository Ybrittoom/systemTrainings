import express from "express"
import authRoutes from "./routes/auth.routes.js"
import { fileURLToPath } from "url"
import path from "path";

const app = express();//criando a aplicaçao

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename)

app.use(express.json())

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

app.get("/login", (req, res) => {
    res.sendFile(
        path.join(__dirname, "views", "login.html")
    )
})

app.use("/api/auth", authRoutes);//usando todas as rota do arquivo authRoutes.js

export default app;