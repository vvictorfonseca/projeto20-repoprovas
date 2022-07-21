import prisma from "../config/database.js";
import { CreateTestData } from "../services/testService.js";

async function createTest(test: CreateTestData) {
    await prisma.tests.create({data: test})
}

async function findTestByNameAndPdf(test: CreateTestData) {
    const testinfo = await prisma.tests.findMany({where: {name: test.name, pfdUrl: test.pfdUrl}})
    return testinfo
}

async function ensureCategoryExist(id: number) {
    const category = await prisma.categories.findUnique({where: {id}})
    return category
}

async function ensureTeacherDisciplineExist(id: number) {
    const teacherDiscipline = await prisma.teachers.findUnique({where: {id}})
    return teacherDiscipline
}

const testRepository = {
    createTest,
    findTestByNameAndPdf,
    ensureCategoryExist,
    ensureTeacherDisciplineExist
}

export default testRepository

