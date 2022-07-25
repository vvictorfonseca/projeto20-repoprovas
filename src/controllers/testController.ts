import { Request, Response } from "express";
import testService, { CreateTestData } from "../services/testService.js";

async function createTest(req: Request, res: Response) {
    const test: CreateTestData = req.body

    await testService.createTest(test)
    return res.sendStatus(201)
}

async function getTestsByDiscipline(req: Request, res: Response) {
    const tests = await testService.getTestsByDiscipline();
    return res.status(200).send({tests})
}

async function getTestsByTeacher(req: Request, res: Response) {
    const tests = await testService.getTestsByTeacher();
    return res.status(200).send({tests})
}

export { createTest, getTestsByDiscipline, getTestsByTeacher }