require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

//MiddleWares
const {errorHandlerMiddleware} = require("./back-end/middlewares/errorHandler");

//Routers
const urlsRouter = require("./back-end/routers/urlsRouter");
const statsRouter = require("./back-end/routers/statsRouter");
const userManagmentRouter = require("./back-end/routers/userManagmentRouter");

app.use(cors({
  origin: "*"
}));

app.use(express.json()) // parses requests as json

//Home Page
app.use("/", express.static(`./front-end/dist`));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "./front-end/dist/index.html");
});
//404 Not Found- page
app.use("/", express.static(`./front-end/dist`));
app.get("/404/notfound", (req, res) => {
  res.sendFile(__dirname + "/front-end/dist/notFound.html");
});

app.use("/api", urlsRouter);
app.use("/statistic", statsRouter);
app.use("/users", userManagmentRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

