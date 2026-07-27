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
            user.password_user
        );
        
        if(!correctPassword) {
            throw new Error("Senha Incorreta!!")
        }
        //gerando o token
        const token = jwt.sign(
            //isso é o payload, informaçoes que voce quer guardar
            {id:user.id_user},
            process.env.JWT_SECRET,
            {
                expiresIn:"24h"
            }
        );

        return {
            token,
            user: {
                id: user.id_user,
                name: user.name_user,
                email: user.email_user
            }
        };
    }

    async register(name, email, password, birth_date, weight, height) {//lembra de passar para o controller
        //verificando se os dados foi preenchidos corretamente
        if (!name || !email || !password || !birth_date || !weight || !height) { 
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
                    password_user,
                    birth_date,
                    weight,
	                height
                ) values (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6
                )
                returning id_user, name_user, email_user, birth_date, weight, height
            `,
            [
                name,
                email,
                passwordHash,
                birth_date,
                weight,
                height
            ]
        );

        return {
            message: "Usuario cadastrado com sucesso",
            user: result.rows[0]
        }

    }
}

export default new AuthService();