require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const urlsRouter = require("./back-end/routers/urlsRouter") 

app.use(cors({
  origin: "*"
}));

app.use(express.json()) // parses requests as json

app.use("/", express.static(`./front-end/dist`));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "./front-end/dist/index.html");
});

app.use("/api", urlsRouter);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
