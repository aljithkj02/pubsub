import jwt, { JwtPayload } from 'jsonwebtoken'

export const generateToken = (payload: Object) => {
    return jwt.sign(payload, process.env.JWT_SECRET || 'ram');
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET || 'ram') as JwtPayload;
}