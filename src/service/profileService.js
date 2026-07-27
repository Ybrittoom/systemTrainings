import pool from "../config/database";
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
        
    }
}