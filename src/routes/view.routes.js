import { Router } from "express"
import { fileURLToPath } from "url"
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const router = Router();

router.get("/login")