import { Router } from "express";

import validateToken from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signUpchema, signInchema } from "../schemas/userSchema.js";
import { createUser, sendToken, logOut } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(signUpchema), createUser);
userRouter.post("/sign-in", validateSchema(signInchema), sendToken);
userRouter.get("/logout", logOut)

export default userRouter;