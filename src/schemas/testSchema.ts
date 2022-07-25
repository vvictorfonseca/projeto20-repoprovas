import Joi from "joi";
import { CreateTestData } from "../services/testService.js";

const createTestSchema = Joi.object<CreateTestData>({
    name: Joi.string().required(),
    pfdUrl: Joi.string().required(),
    categoryId: Joi.number().required(),
    teacherDisciplineId: Joi.number().required()
})

export default createTestSchema