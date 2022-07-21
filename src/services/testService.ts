import { tests } from "@prisma/client";
import testRepository from "../repositories/testRepository.js";

export type CreateTestData = Omit<tests, "id">
export type CreateTestBody = Omit<tests, "id" | "teacherDisciplineId">

async function createTest(test: CreateTestData) {

    console.log("entrou")

    const categoryExist = await testRepository.ensureCategoryExist(test.categoryId)
    const teacherDisciplineExist = await testRepository.ensureTeacherDisciplineExist(test.teacherDisciplineId)
    const testAlreadyExist = await testRepository.findTestByNameAndPdf(test)

    if (!categoryExist) {
        throw { type: "bad_request", message: "Category doesn't exist"};
    }

    if (!teacherDisciplineExist) {
        throw { type: "bad_request", message: "TeacherDiscipline doesn't exist"}
    }

    if (testAlreadyExist.length > 0) {
        throw { type: "conflict", message: "Test already exist"}
    }

    await testRepository.createTest(test)
}

const testService = {
    createTest
}

export default testService