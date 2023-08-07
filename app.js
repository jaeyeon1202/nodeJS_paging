const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.set("views", __dirname+"/src/views");
app.set("view engine", "ejs");

const router = require("./src/routers/router")(app);
app.use("/", router);

app.get("/", (req,res)=>{res.send("기본연결");})

app.listen(3000, ()=>{console.log("3000서버 연결")})