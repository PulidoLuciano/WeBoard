const express = require("express");
const validator = require("express-validator");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/users");
require("dotenv").config();
const {NotFoundError} = require("./utils/errors");

const app = express();
const port = 3000;

//Connect to MongoDB
main().catch(err => console.log(err));

async function main(){
    await mongoose.connect(process.env.MONGODB);
}

//Allow CORS
const allowedOrigins = ["http://localhost:5173"];
const options = {
    origin: allowedOrigins
};
app.use(cors(options));

//Use JSON parser
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use("/users", userRouter);

app.use((req, res, next) => {
    const err = new NotFoundError(req.url);
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.statusCode).json({status: err.statusCode, error: err.message});
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})

