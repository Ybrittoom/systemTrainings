import pool from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class ProfileService {
    async getProfile(id) {
        const result = await pool.query(`
            select * from users WHERE id_user = $1
        `,
            [id]
        );

        if (result.rows.length === 0) {
            throw new Error("Usuario nao encontrado")
        };

        const user = result.rows[0];

        return {
            name: user.name_user,
            email: user.email_user,
            birth_date: user.birth_date,
            weight: user.weight,
            height: user.height,
            create_at: user.create_at
        }
        
    }

    async updateProfile(id, name, email, birth_date, weight, height) {
        if(!name || !email || !birth_date || !weight || !height) {
            throw new Error("Por favor! Preencha todos os campos")
        }

        const result = await pool.query(`
                update users
                set 
                    name_user = $1,
                    email_user = $2,
                    birth_date = $3,
                    weight = $4,
                    height = $5
                where id_user = $6
                returning name_user, email_user, birth_date, weight, height
            `,
            [
                name,
                email,
                birth_date,
                weight,
                height,
                id
            ]
        );

        if (result.rows.length === 0) {
            throw new Error("Usuario nao encontrado")
        }

        const user = result.rows[0];

        //retornar o usuario atualizado(perfil atualizado)
        return {
            message: "Perfil atualizado com sucesso",
            user: {
                name: user.name_user,
                email: user.email_user,
                birth_date: user.birth_date,
                weight: user.weight,
                height: user.height
            }
        }
    }
}

export default new ProfileService();