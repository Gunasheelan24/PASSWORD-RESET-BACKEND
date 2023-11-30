const mongoose = require("mongoose");
const DATABASE = process.env.NODE_DATABASE;

mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("Success");
  })
  .catch((err) => {
    console.log(err);
  });

exports.mongo = mongoose;
