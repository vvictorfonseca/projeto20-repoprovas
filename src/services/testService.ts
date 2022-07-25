import { tests } from "@prisma/client";
import testRepository from "../repositories/testRepository.js";

export type CreateTestData = Omit<tests, "id">

async function createTest(test: CreateTestData) {

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

async function getTestsByDiscipline() {
    const tests = await testRepository.getTestsByDiscipline()
    return tests
}

async function getTestsByTeacher() {
    const tests = await testRepository.getTestsByTeacher()
    return tests
}

const testService = {
    createTest,
    getTestsByDiscipline,
    getTestsByTeacher
}

export default testService