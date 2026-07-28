import profileService from "../service/profileService.js";

class ProfileController {
    async getProfile(req, res) {
        try {
            //pegando os dados (id no caso hehe)
            const userId = req.user.id

            const result = await profileService.getProfile(userId);//chamando os parametro hehe

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    };

    async updateProfile(req, res) {
        try {
            //pegando o id atraves do token do middleware
            const userId = req.user.id

            //pegar os novos dados 
            const {
                name,
                email,
                birth_date,
                weight,
                height
            } = req.body

            //bora chamar o service
            const result = await profileService.updateProfile(
                userId,
                name,
                email,
                birth_date,
                weight,
                height
            );
            
            return res.status(201).json(result)
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    };

    async updatePassword(req, res) {
        try {
            const userId = req.user.id
            //pegar o novo dados 
            const {
                password
            } = req.body

            const result = await profileService.updatePassword(userId, password)

            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}

export default new ProfileController();