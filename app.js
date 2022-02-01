require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8080;
// DB
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((error) => console.log(error));

//MiddleWares
const { errorHandlerMiddleware } = require('./back-end/middlewares/errorHandler');
const { checkTokenAuth, loginauth } = require('./back-end/middlewares/validator');

//Routers
const userEntryRouter = require('./back-end/routers/usersEntry');
const urlsRouter = require('./back-end/routers/urlsRouter');
const statsRouter = require('./back-end/routers/statsRouter');
const userManagmentRouter = require('./back-end/routers/userManagmentRouter');

app.set('trust proxy', 'loopback');
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json()); // parses requests as json
app.use(cookieParser());

//Login Page
app.use('/', express.static(`./front-end/dist`));
app.get('/', loginauth, (req, res) => {
  res.sendFile(__dirname + '/front-end/dist/login.html');
});

//Home Page
app.get('/home', checkTokenAuth, (req, res) => {
  res.sendFile(__dirname + '/front-end/dist/home.html');
});

//404 Not Found- page
app.get('/404/notfound', (req, res) => {
  res.sendFile(__dirname + '/front-end/dist/notFound.html');
});

app.use('/entry', userEntryRouter);
app.use('/api', urlsRouter);
app.use('/statistic', statsRouter);
app.use('/users', userManagmentRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
