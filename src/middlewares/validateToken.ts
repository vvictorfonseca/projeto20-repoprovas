import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken"
import "../config/setUp.js"

const { JWT_SECRET_KEY } = process.env

async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    const token = authorization?.replace("Bearer ", "").trim()

    if (!token) {
        throw { type: "not_found", message: "invalid token" }
    }

    const user = jwt.verify(token, JWT_SECRET_KEY)

    if (!user) {
        throw { type: "not_found", message: "User not found" };
    }

    res.locals.user = user
    
    next()
}

export default validateToken