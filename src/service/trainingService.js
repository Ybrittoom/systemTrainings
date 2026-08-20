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

        if(result.rows.length === 0 ) {
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
    
}

export default new TrainingService();