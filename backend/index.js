const express = require("express");
const validator = require("express-validator");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/users");
const gameRouter = require("./routes/games");
const roomRouter = require("./routes/rooms");
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
const allowedOrigins = ["http://localhost:5173", "http://192.168.100.20:5173"];
const options = {
    origin: allowedOrigins
};
app.use(cors(options));

//Use JSON parser
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use("/public", express.static(__dirname + '/images'));

app.use("/users", userRouter);

app.use("/games", gameRouter);

app.use("/rooms", roomRouter);

app.use((req, res, next) => {
    const err = new NotFoundError(req.url);
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.statusCode ?? 500).json({status: err.statusCode ?? 500, error: err.message ?? "Internal server error"});
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})

