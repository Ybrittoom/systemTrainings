//trainingService.js
import pool from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class TrainingService {
    async getTrainings(id) {
        const result = await pool.query(`
        select 
            id_user,
            id_sport,
            title_sport,
            distance_trainings,
            duration_trainings::text, -- O "::text" força o Postgres a devolver uma String (ex: "00:23:00")
            pace_trainings,
            speed_trainings,
            calories_trainings,
            intensity_trainings,
            notes_trainings,
            training_date,
            created_at
        from trainings where id_user = $1    
    `, [
            id
        ]
        );

        //lista vazia é normal
        //o .map() transforma cada linha do banco do mesmo formatinho de objeto

        return result.rows.map((training) => ({
            id_sport: training.id_sport,
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
        }))


    }

    //comando para inserir um treino
    async postTrainings(
        userId,
        title_sport,
        id_sport,
        distance_trainings,
        duration_trainings,
        pace_trainings,
        calories_trainings,
        intensity_trainings,
        notes_trainings,
        training_date
    ) {

        const distance = Number(distance_trainings) || 0;
        const durationMinutes = Number(duration_trainings) || 0;
        const durationInHours = durationMinutes / 60;
        const speed_trainings = durationInHours > 0 ? (distance / durationInHours).toFixed(2) : "0.00";


        if (!title_sport ||
            !id_sport ||
            !distance_trainings ||
            !duration_trainings ||
            !pace_trainings ||
            !calories_trainings ||
            !intensity_trainings ||
            !training_date
        ) {
            throw new Error("Por favor, preencha todos os dados");
        }

        //formatar a duraçao para o banco receber (ex: "00:24:00")
        const formattedDuration = `00:${String(durationMinutes).padStart(2, '0')}:00`;


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
                formattedDuration,
                pace_trainings,
                speed_trainings,
                calories_trainings,
                intensity_trainings,
                notes_trainings,
                training_date
            ]
        );

        const training = result.rows[0];

        return {
            message: "Treino cadastrado com sucesso",
            training: {
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

}

export default new TrainingService();