import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const secretKey = process.env.SECRET_KEY

export const validateJWT = async (req, res, next) => {
    let token = req.header('token') || req.header('Authorization') || req.header('authorization')

    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7).trim()
    }

    try {
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'Access denied',
            })
        }

        const payload = jwt.verify(token, secretKey)

        req.id = payload.id
        return next()
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            ok: false,
            msg: 'Token not valid',
        })
    }
}

export default validateJWT;
