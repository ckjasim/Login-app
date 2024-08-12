const express = require("express");
const nocache = require("nocache");
const mongosh = require("mongoose");
const session = require("express-session"); 
const path = require("path");

const config = require("./config/config");

const app = express();
app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/assets")));

//SESSION
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

//MONGODB CONNETTIOIN
mongosh
  .connect("mongodb://127.0.0.1:27017/Userdb")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

//FOR USER ROUTE
const userRoute = require("./routers/userrouter");
app.use("/", userRoute);

//FOR ADMIN ROUTE
const adminRoute = require("./routers/adminrouter");
app.use("/admin", adminRoute);

// app.use("/jasim", (req, res) => {
//   res.send("hi jasim");
// });
app.use((req, res) => {
  res.status(404).send("404");
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log("localhost runnning http://localhost:3000");
});
