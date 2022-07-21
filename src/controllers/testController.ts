import { Request, Response } from "express";
import testService, { CreateTestData, CreateTestBody } from "../services/testService.js";

async function createTest(req: Request, res: Response) {
    const testInfo: CreateTestBody = req.body
    const teacherDisciplineId: number = parseInt(req.params.teacherDisciplineId)

    const test: CreateTestData = {...testInfo, teacherDisciplineId}
    await testService.createTest(test)
    return res.sendStatus(201)
}

export { createTest }