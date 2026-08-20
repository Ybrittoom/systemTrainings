import trainingService from "../service/trainingService.js";

class TrainingController {
    async getTraining(req, res) {
        try {
            //pegando os dados(id)
            const userId = req.user.id

            const result = await trainingService.getTrainings(userId);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
}

export default new TrainingController();