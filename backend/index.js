const express = require("express");
const validator = require("express-validator");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hola");
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})