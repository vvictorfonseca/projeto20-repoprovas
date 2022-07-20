import { users } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import userRepository from "../repositories/userRepository.js";

const { JWT_SECRET_KEY } = process.env

export type CreateUserData = Omit<users, "id">
export type CreateUserPasswords = CreateUserData & { confirmPassword: string}

async function createUser(user: CreateUserData) {
    const SALT = 10
    const userAlreadyExist = await userRepository.findUserByEmail(user.email)

    if (userAlreadyExist) {
    throw { type: "conflict", message: "Email already registered"}
    }

    const encryptedPassword = bcrypt.hashSync(user.password, SALT)
    user.password = encryptedPassword

    await userRepository.createUser(user)
}

async function loginToken(user: CreateUserData) {

    const userInfo = await userRepository.findUserByEmail(user.email)
    const isCorrectPassword = bcrypt.compareSync(user.password, userInfo.password)

    if (!userInfo) {
        throw { type: "bad_request", message: "Non-existent user" }
    }

    if (!isCorrectPassword) {
        throw { type: "unauthorized", massage: "wrong password" }
    }

    const expiresAt = { expiresIn: 60 * 60 * 24}
    const token = jwt.sign( {id: userInfo.id, email: user.email}, JWT_SECRET_KEY, expiresAt)
    console.log("token", token)

    return token
}

const userService = {
    createUser,
    loginToken
}

export default userService

