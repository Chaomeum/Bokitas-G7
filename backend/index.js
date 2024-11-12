require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

const connectDB = require("./server/config/db");
const { notFound, errorHandler } = require("./server/middlewares/errorHandler");

connectDB();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", require("./server/routes/authRoute"));
app.use("/api/product", require("./server/routes/productRoute"));
app.use("/api/category", require("./server/routes/categoryRoute"));
app.use("/api/post", require("./server/routes/postRoute"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
