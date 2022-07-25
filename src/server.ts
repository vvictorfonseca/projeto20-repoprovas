import app from "./app.js";

const port: number = +process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})