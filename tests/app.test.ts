import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";

import authFactory from "./factories/authFactory.js";
import testFactory from "./factories/testFactory.js";

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste@gmail.com'`;
    await prisma.$executeRaw`TRUNCATE TABLE tests`;
});

const agent = supertest(app);

describe("POST /signup", () => {
    
    it("return 201 for valid input", async () => {
        const login = await authFactory.createLogin()
        const response = await agent.post("/sign-up").send(login)

        expect(response.status).toEqual(201)
    });

    it("return 409 for duplicate user", async () => {
        const login = await authFactory.createLogin()
        await authFactory.createUser(login)
        const response = await agent.post("/sign-up").send(login)

        expect(response.status).toEqual(409)
    })

    it("return 422 for invalid input", async () => {
        const login = await authFactory.createLogin()
        delete login.password
        const response = await agent.post("/sign-up").send(login)

        expect(response.statusCode).toBe(422)
    })
});

describe("POST /signin", () => {

    it("return token for valid input", async () => {
        const login = await authFactory.createLogin()
        const user = await authFactory.createUser(login)
        
        const response = await agent.post("/sign-in").send({
            email: user.email,
            password: user.password
        })

        const token = response.body.token;

        expect(token).not.toBeNull
    })

    it("return 401 for invalid email or password", async () => {
        const login = await authFactory.createLogin()
        const user = await authFactory.createUser(login)

        const response = await agent.post("/sign-in").send({...login, password: "123456"})

        expect(response.status).toEqual(401)
    })

    it("return 422 for invalid input", async () => {
        const login = await authFactory.createLogin()
        const user = await authFactory.createUser(login)
        delete login.password

        const response = await agent.post("/sign-in").send(login)

        expect(response.status).toEqual(422)
    })
});

describe("POST /create/test", () => {

    it("return 201 for valid input", async () => {
        const login = await authFactory.createLogin()
        await authFactory.createUser(login)

        const responseLogin = await agent.post("/sign-in").send(login);
        const token = responseLogin.body.token;
        console.log("token", token)

        const testData = testFactory.createTestData()
        const response = await agent.post("/create/test").set("Authorization", `Bearer ${token}`).send(testData)

        expect(response.statusCode).toBe(201)
    })

    it("return 422 for invalid input to create new test", async () => {
        const login = await authFactory.createLogin()
        await authFactory.createUser(login)

        const responseLogin = await agent.post("/sign-in").send(login);
        const token = responseLogin.body.token;

        const testData = testFactory.createTestData()
        delete testData.categoryId
        const response = await agent.post("/create/test").set("Authorization", `Bearer ${token}`).send(testData)

        expect(response.status).toEqual(422)
    })

    it("return 401 for no token", async () => {
        const testData = testFactory.createTestData()
        const response = await agent.post("/create/test").send(testData)

        expect(response.status).toEqual(401)
    })

    it("return 404 for invalid token", async () => {
        const login = await authFactory.createLogin()
        await authFactory.createUser(login)

        const responseLogin = await agent.post("/sign-in").send(login);
        const token = responseLogin.body.token;

        const testData = testFactory.createTestData()
        const invalidToken = "invalidToken"
        const response = await agent.post("/create/test").set("Authorization", `Bearer ${invalidToken}`).send(testData)

        expect(response.status).toEqual(404)
    })
});

describe("GET /tests/byDiscipline", () => {

    it("return 200 for receive tests by discicipline", async () => {
        const login = await authFactory.createLogin()
        await authFactory.createUser(login)

        const responseLogin = await agent.post("/sign-in").send(login);
        const token = responseLogin.body.token;

        const response = await agent.get("/tests/byDiscipline").set("Authorization", `Bearer ${token}`)

        expect(response.status).toEqual(200)
    })

    it("return 401 for no token", async () => {
        const response = await agent.get("/tests/byDiscipline")

        expect(response.status).toEqual(401)
    })

    it("return 404 for invalid token", async () => {
        const login = await authFactory.createLogin()
        await authFactory.createUser(login)

        const responseLogin = await agent.post("/sign-in").send(login);
        const token = responseLogin.body.token;

        const testData = testFactory.createTestData()
        const responseTest = await agent.post("/create/test").set("Authorization", `Bearer ${token}`).send(testData)

        const invalidToken = "invalidToken"
        const response = await agent.get("/tests/byDiscipline").set("Authorization", `Bearer ${invalidToken}`);

        expect(response.status).toEqual(404)
    })
});

describe("GET /tests/byTeacher", () => {


    it("return 200 for receive tests by teacher", async () => {
        const login = await authFactory.createLogin()
        await authFactory.createUser(login)

        const responseLogin = await agent.post("/sign-in").send(login);
        const token = responseLogin.body.token;

        const response = await agent.get("/tests/byTeacher").set("Authorization", `Bearer ${token}`)

        expect(response.status).toEqual(200)
    })

    it("return 401 for no token", async () => {
        const response = await agent.get("/tests/byTeacher")

        expect(response.status).toEqual(401)
    })

    it("return 404 for invalid token", async () => {
        const login = await authFactory.createLogin()
        await authFactory.createUser(login)

        const responseLogin = await agent.post("/sign-in").send(login);
        const token = responseLogin.body.token;

        const testData = testFactory.createTestData()
        const responseTest = await agent.post("/create/test").set("Authorization", `Bearer ${token}`).send(testData)

        const invalidToken = "invalidToken"
        const response = await agent.get("/tests/byTeacher").set("Authorization", `Bearer ${invalidToken}`);

        expect(response.status).toEqual(404)
    })
});

afterAll(async () => {
    await prisma.$disconnect
});