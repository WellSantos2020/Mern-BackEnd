
const express = require("express");
const app = express();
const db = require('./keys').mongoURI;
const mongoose = require("mongoose");
const passport = require('passport');
const bodyParser = require("body-parser");
const cors = require("cors");


mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true})
    .then(() => console.log('Connection to Mongo DB established'))
    .catch(err => console.log(err));


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

app.use(passport.initialize());require('./passport')
app.use(passport.session());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use('/cities', require('./routes/cities'))
app.use('/itineraries', require('./routes/itineraries'))
app.use('/activities',require('./routes/activities'))
app.use('/users',require('./routes/user'))
app.use('/auth',require('./routes/auth'))
app.use('/comments',require('./routes/comments'))

