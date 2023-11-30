const express = require("express");
const app = express();
const dot = require("dotenv").config({ path: "./config.env" });
const port = process.env.NODE_PORT | 3000;
const {
  signupUser,
  signIn,
  forgetPassword,
  changePassword,
} = require("./controller/user");
const mongo = require("./Database/Connect");

app.use(express.static("dist"));
app.use(express.json());
app.post("/api/signup", signupUser);
app.post("/api/signin", signIn);
app.patch("/api/forgetPassword", forgetPassword);
app.patch("/api/password", changePassword);

app.listen(port, (e) => console.log(`http://localhost:${port}`));
