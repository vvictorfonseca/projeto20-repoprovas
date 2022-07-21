import { Request, Response } from "express";
import userService, { CreateUserData, CreateUserPasswords } from "../services/userService.js";

async function createUser(req: Request, res: Response) {
    const userInfo: CreateUserPasswords = req.body
    delete userInfo.confirmPassword
    const user: CreateUserData = userInfo

    await userService.createUser(user)
    return res.sendStatus(201)
}

async function sendToken(req: Request, res: Response) {
    const userInfo: CreateUserPasswords = req.body
    delete userInfo.confirmPassword
    const user: CreateUserData = userInfo

    const token = await userService.loginToken(user)
    return res.status(200).send(token)
}

export { createUser, sendToken }