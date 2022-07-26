import express, {json} from "express";
import "express-async-errors";
import cors from "cors";

import "./config/setUp.js"

import handleErrors from "./middlewares/handleErrorMiddleware.js";

import router from "./routes/index.js";

const app = express();
app.use(cors());
app.use(json());

app.use(router);
app.use(handleErrors)

export default app