import express from "express";

import authRoutes from "./routes/auth.routes.js";
import viewRoutes from "./routes/view.routes.js";

import { fileURLToPath } from "url";
import path from "path";

const app = express();

// criando a aplicação
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// arquivos públicos: CSS, JS, imagens etc.
app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

// página inicial
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "views", "login.html")
    );
});

// rotas das páginas
app.use(viewRoutes);

// rotas da API
app.use("/api/auth", authRoutes);

export default app;