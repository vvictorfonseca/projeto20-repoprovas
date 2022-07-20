import Joi from "joi";
import { CreateUserPasswords, CreateUserData } from "../services/userService.js";

const signUpchema = Joi.object<CreateUserPasswords>({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
    confirmPassword: Joi.ref('password')
})

const signInchema = Joi.object<CreateUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4)
})

export { signUpchema, signInchema }