import express from "express"
import authRoutes from "./routes/auth.routes.js"
import { fileURLToPath } from "url"
import path from "path";

const app = express();//criando a aplicaçao

const __filename = fileURLToPath(import.meta.url);

const __dirname = pathth.dirname(__filename)

app.use(
    express.static(
        path.join(__dirname, "../public")
    )
);//sempre que chegar algo ela transforma em objeto json

app.use(authRoutes);//usando todas as rota do arquivo authRoutes.js

export default app;