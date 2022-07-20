import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import { signUpchema, signInchema } from "../schemas/userSchema.js";
import { createUser, sendToken } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(signUpchema), createUser);
userRouter.post("/sign-in", validateSchema(signInchema), sendToken);

export default userRouter;