const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Upload=require('express-fileupload');

const userRoutes = require('./router/user');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
dotenv.config()
app.use(Upload());




app.use("/user",userRoutes);
mongoose
  .connect(process.env.MONGO_URL)
  .then(result => {
    app.listen(process.env.PORT);
  })
  .catch(err => {
    console.log(err);
  });
