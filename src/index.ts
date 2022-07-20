import express, {json} from "express";
import "express-async-errors";
import cors from "cors";

import "./config/setUp.js"

import handleErrors from "./middlewares/handleErrorMiddleware.js";

import router from "./routes/index.js";

const app = express();
app.use(cors({ credentials: true, origin: ["http://localhost:5000"] }));
app.use(json());

app.use(router);
app.use(handleErrors)

const port: number = +process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})

export default app