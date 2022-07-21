import router, { Router } from "express";

import validateToken from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import createTestSchema from "../schemas/testSchema.js";
import { createTest } from "../controllers/testController.js";

const testRouter = Router();

testRouter.post("/create/test/:teacherDisciplineId", validateToken, validateSchema(createTestSchema), createTest)

export default testRouter;