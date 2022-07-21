import Joi from "joi";
import { CreateTestBody } from "../services/testService.js";

const createTestSchema = Joi.object<CreateTestBody>({
    name: Joi.string().required(),
    pfdUrl: Joi.string().required(),
    categoryId: Joi.number().required()
})

export default createTestSchema