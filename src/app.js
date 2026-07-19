import express from "express"
import authRoutes from "./routes/auth.routes.js"

const app = express();//criando a aplicaçao

app.use(express.json());//sempre que chegar algo ela transforma em objeto json

app.use(authRoutes);//usando todas as rota do arquivo authRoutes.js

export default app;