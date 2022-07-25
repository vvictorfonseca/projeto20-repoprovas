import { faker } from "@faker-js/faker";
import bcrypy from "bcrypt";

import prisma from "../../src/config/database.js";

async function createLogin(email = "teste@gmail.com", passwordLenght = 10) {
    const password = faker.internet.password(passwordLenght);
    return {
        email,
        password: password,
        //confirmPassword: password
    }
}

interface login {
    email: string,
    password: string
}

async function createUser(login: login) {
    const user = await prisma.users.create({
        data: {
            email: login.email,
            password: bcrypy.hashSync(login.password, 10)
        }
    });

    return user
}

const authFactory = {
    createLogin,
    createUser
}

export default authFactory