import pool from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class TrainingService {
    async getTrainings(id) {
        const result = await pool.query(`
            select * from trainings where id_user = $1    
        `,
            [
                id
            ]
        );

        if (result.rows.length === 0) {
            throw new Error("Treinos de usuario nao encontrado")
        }

        const training = result.rows[0];

        return {
            title_sport: training.title_sport,
            distance_trainings: training.distance_trainings,
            duration_trainings: training.duration_trainings,
            pace_trainings: training.pace_trainings,
            speed_trainings: training.speed_trainings,
            calories_trainings: training.calories_trainings,
            intensity_trainings: training.intensity_trainings,
            notes_trainings: training.notes_trainings,
            training_date: training.training_date,
            created_at: training.created_at
        }
    }

    //comando para inserir um treino
    async postTraining(
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
    ) {
        if (!title_sport || !id_sport || !distance_trainings || !duration_trainings || !pace_trainings || !speed_trainings || !calories_trainings || !intensity_trainings || !notes_trainings || !training_date) {
            throw new Error("Por favor, preencha todos os dados")
        }

        const result = await pool.query(`
            insert into trainings (
                id_user,
                id_sport,
                title_sport,
                distance_trainings,
                duration_trainings,
                pace_trainings,
                speed_trainings,
                calories_trainings,
                intensity_trainings,
                notes_trainings,
                training_date
            ) values (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
            )
                returning *
            `,
            [
                userId,
                id_sport,
                title_sport,
                distance_trainings,
                duration_trainings,
                pace_trainings,
                speed_trainings,
                calories_trainings,
                intensity_trainings,
                notes_trainings,
                training_date
            ]
        );
    }

}

export default new TrainingService();