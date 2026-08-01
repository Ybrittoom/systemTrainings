import { Router } from "express"
import { fileURLToPath } from "url"
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const router = Router();

//rota para aparece a pagina de login
router.get("/login", (req, res) => {
    res.sendFile(
        path.join(__dirname, ".." ,"views", "login.html")
    )
})

router.get("/dashboard", (req, res) => {
    res.sendFile(
        path.join(__dirname, ".." , "views", "dashboard.html")
    )
})

//criando a rota /profile


export default router;