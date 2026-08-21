import { Router } from "express";
import AuthController from "../controller/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import profileController from "../controller/profileController.js";
import trainingController from "../controller/trainingController.js";

const router = Router();

//rotas publicas(sem middleware)
router.post("/login", AuthController.login);
router.post("/register", AuthController.register)

//rotas do profile, necessita de middlware
router.get("/profile", authMiddleware ,profileController.getProfile)
router.put("/profile", authMiddleware, profileController.updateProfile)
//rota para mudar senha 
router.put("/password", authMiddleware, profileController.updatePassword)

//rota para treinos
router.get("/trainings", authMiddleware, trainingController.getTraining)
router.post("/trainings-post", authMiddleware, trainingController.postTraining)

export default router;