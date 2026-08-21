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

    //codigo da inserir um treino
    async postTraining(req, res) {
        try {
            const userId = req.user.id

            const {
                title_sport,
                id_sport,
                distance_trainings,
                duration_trainings,
                pace_trainings,
                speed_trainings,
                calories_trainings,
                intensity_trainings,
                notes_trainings,
                training_date
            } = req.body

            //levando tudo pronto para o service, somente aqui pode acessar o body da req
            const result = await trainingService.postTrainings(
                userId,
                title_sport,
                id_sport,
                distance_trainings,
                duration_trainings,
                pace_trainings,
                speed_trainings,
                calories_trainings,
                intensity_trainings,
                notes_trainings,
                training_date
            )

            res.status(201).json(result)
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}

export default new TrainingController();