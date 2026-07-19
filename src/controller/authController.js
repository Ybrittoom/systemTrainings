import authService from "../service/authService";

class AuthController {
    async login(req, res) {
        try {

            //pega os dados 
            const { email, password } = req.body//desestruturação

            const result = await authService.login(email, password)//chama o service

            return res.status(201).json(result)//devolvendo o resultado
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    async register(res, req) {
        try {
            const { name, email, password } = req.body

            const result = await authService.register(name, email, password)

            return res.status(201).json(result)

        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}

export default new AuthController();