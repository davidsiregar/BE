require('dotenv').config();
const express = require('express');
const cors = require('cors');

const errorController= require("./controllers/errorController")
const router = require('./routes/router');
const authRoute= require("./routes/authRoute");
const { sequelize } = require('./models');
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs")
app.set("views", "views");

app.use(cors({ origin: true, credentials: true }));

app.use('/', router);
app.use(authRoute);

app
app.get("404", errorController.get404)
app.get("500", errorController.get500)

sequelize.authenticate()
.then(function(err){
  console.log("Database connection has been established successfully")
})
.catch(function(err){
  console.log("unable to connect to the database", err)
})

app.listen(process.env.SERVER_PORT, () => {console.log('Server Running')});
