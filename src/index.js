require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path= require("path")

const https= require("https")
const bodyParser=require("request")
const request = require("request");
const { options } = require("request");
const { response } = require("express");
const res = require("express/lib/response");

const errorController= require("./controllers/errorController")
const router = require('./routes/router');
const authRoute= require("./routes/authRoute");
const { sequelize } = require('./models');
const app = express();

app.use(express.static(path.join(__dirname, "public")));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs")
app.set("views", "views");

app.use(cors({ origin: true, credentials: true }));

app.use('/', router);
app.use(authRoute);

app.get("/newsletter", function(req,res){
  res.render(__dirname+"/views/signup.ejs")
})

app.post("/newsletter", function(req,res){
  const firstName= req.body.inputFirst;
  const lastName= req.body.inputLast;
  const email= req.body.inputEmail
  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  //  const url = "https://us14.api.mailchimp.com/3.0/lists/f7b34d5d3e"; // x= us 14
  const url = "https://us14.api.mailchimp.com/3.0/lists/f7b34d5d3e";
  const options = {
    method: "POST",
    auth: "david:00963476257dc21899ade155ba97831e-us14",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.render(__dirname + "/views/success.ejs");
    } else {
      res.render(__dirname + "/views/failure.ejs");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
})
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
