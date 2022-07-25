import router, { Router } from "express";

import validateToken from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import createTestSchema from "../schemas/testSchema.js";
import { createTest, getTestsByDiscipline, getTestsByTeacher } from "../controllers/testController.js";

const testRouter = Router();

testRouter.post("/create/test", validateToken, validateSchema(createTestSchema), createTest)
testRouter.get("/tests/byDiscipline", validateToken, getTestsByDiscipline)
testRouter.get("/tests/byTeacher", validateToken, getTestsByTeacher)

export default testRouter;