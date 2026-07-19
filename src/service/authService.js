import pool from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthService {
    async login(email, password) { //selecionar o que ela vai pegar para realizar o login
        //procurando usuario
        //result = query usada para buscar usuario
        const result = await pool.query(`
                select * from users WHERE email_user=$1
            `,//enviando o SQL para o PostgreSQL
            //$1 serve para evitar sql injection
            [email] // esse array substitui o $1
        );

        if (result.rows.length === 0){
            throw new Error("Usuario não encontrado!")
        }

        const user = result.rows[0];//pega o primeiro usuario
        //verificando a senha 
        const correctPassword = await bcrypt.compare(//pega a senha digitada e compara com o hash
            password,
            user.password
        );
        
        if(!correctPassword) {
            throw new Error("Senha Incorreta!!")
        }
        //gerando o token
        const token = jwt.sign(
            //isso é o payload, informaçoes que voce quer guardar
            {id:user.id},
            process.env.JWT_SECRET,
            {
                expiresIn:"24h"
            }
        );

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }

    async register(name, email, password) {
        //verificando se os dados foi preenchidos corretamente
        if (!name || !email || !password) { 
            throw new Error("Por favor , preencha todos os dados!")
        };

        //SEGUNDA VALIDAÇAO
        //1 fazer a query SQL 
        //2 verificar se o email ja existe

        const userExists = await pool.query(`
                SELECT id_user
                FROM users
                where email_user = $1
            `,
            [email]
        );

        //verificando agr o email
        if (userExists.rows.length > 0) {
            throw new Error("Email ja cadastrado")
        };

        //CRIPTOGRAFAR SENHA 
        const passwordHash = await bcrypt.hash(password, 10)
        

        //salvando os dados 
        const result = await pool.query(`
                insert into users
                (
                    name_user,
                    email_user,
                    password_user
                ) values (
                    $1,
                    $2,
                    $3
                )
                returning id, name, email 
            `,
            [
                name,
                email,
                passwordHash
            ]
        );

        return {
            message: "Usuario cadastrado com sucesso",
            user: result.rows[0]
        }

    }
}

export default new AuthService();