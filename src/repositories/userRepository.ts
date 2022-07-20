import prisma from "../config/database.js";
import { CreateUserData } from "../services/userService.js";

async function createUser(user: CreateUserData) {
    return  await prisma.users.create({data: user})
}

async function findUserByEmail(email: string) {
    const user = await prisma.users.findFirst({where: {email}})
    return user
}

const userRepository = {
    createUser,
    findUserByEmail
}

export default userRepository