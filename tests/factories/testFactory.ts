import { faker } from "@faker-js/faker";

function createTestData() {
    return {
        name: faker.lorem.word(),
        pfdUrl: faker.internet.url(),
        categoryId: faker.datatype.number({ min: 1, max: 3 }),
        teacherDisciplineId: faker.datatype.number({ min: 1, max: 6 }),
    }
}

const testFactory = {
    createTestData
}

export default testFactory