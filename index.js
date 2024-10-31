require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

const connectDB = require("./server/config/db");
const { notFound, errorHandler } = require("./server/middlewares/errorHandler");

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", require("./server/routes/authRoute"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
