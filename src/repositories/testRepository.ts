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
    const teacherDiscipline = await prisma.teachersDisciplines.findUnique({where: {id}})
    return teacherDiscipline
}

async function getTestsByDiscipline() {
    const tests = await prisma.terms.findMany({
        select: {
            number: true,
            disciplines: {
                select: {
                    name: true,
                    teachersDisciplines:{
                        select:{
                            teachers:{
                                select:{
                                    name: true,
                                },
                            },
                            tests: {
                                select: {
                                    name: true,
                                    pfdUrl: true,
                                    categories: {
                                        select:{
                                            name: true
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    })
    return tests
}

async function getTestsByTeacher() {
    const tests = await prisma.teachers.findMany({
        select: {
            name: true,
            teachersDisciplines:{
                select:{
                    disciplines: {
                        select: {
                            name: true,
                            terms: {
                                select:{
                                    number: true
                                },
                            },
                        },
                    },
                    tests: {
                        select:{
                            name: true,
                            pfdUrl: true,
                            categories: {
                                select: {
                                    name: true
                                },
                            },
                        },
                    },
                },
            },
        },
    })

    return tests
}

const testRepository = {
    createTest,
    findTestByNameAndPdf,
    ensureCategoryExist,
    ensureTeacherDisciplineExist,
    getTestsByDiscipline,
    getTestsByTeacher
}

export default testRepository

