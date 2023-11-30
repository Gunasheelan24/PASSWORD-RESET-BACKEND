const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Secret = process.env.NODE_JWT;

let schema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmpassword: {
    type: String,
  },
  ResetPasswordOtp: {
    type: Number,
    default: 0,
  },
});
schema.pre("save", async function () {
  let hashPassword = await bcrypt.hash(this.password, 12);
  this.password = hashPassword;
  this.confirmpassword = undefined;
});

schema.methods.generateJwt = async (id) => {
  let jwtToken = await jwt.sign({ id: id }, Secret);
  return jwtToken;
};

schema.methods.validatePasswordBcrypt = async (plainPassword, hashPassword) => {
  let verifyPassword = await bcrypt.compare(plainPassword, hashPassword);
  return verifyPassword;
};

const signup = model("signup", schema);
exports.signup = signup;
