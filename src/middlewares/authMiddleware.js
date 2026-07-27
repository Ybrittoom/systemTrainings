import jwt from "jsonwebtoken";

try {

    function authMiddleware(req, res, next) {
        //pegar o token no headers
        const token = req.headers.authorization;

        //verificar se veio o token
        if (!token) {
            return res.status(401).json({
                message: "token obrigatorio"
            })
        }

        const jwtToken = token.split(" ")[1];

        const decoded = jwt.verify(
            jwtToken,
            process.env.JWT_SECRET
        )

        //guardar o token
        req.user = decoded

        //liberar
        next()
    }
} catch (error) {
    return res.status(401).json({

        message: "Token inválido"

    });
}


export default authMiddleware();