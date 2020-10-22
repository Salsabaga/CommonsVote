const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

const govRouter = require("./Routes/routes")

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.use("/", govRouter);

app.set("view engine","ejs");






app.listen(3000,()=>{
    console.log("server is running");
})