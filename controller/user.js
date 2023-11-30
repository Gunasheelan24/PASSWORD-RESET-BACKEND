const { signup } = require("../model/signup");
const { mail } = require("../controller/NodeMail");

exports.signupUser = async (req, res, next) => {
  try {
    let firstname = req.body.signUp.firstname;
    let lastname = req.body.signUp.lastname;
    let email = req.body.signUp.email;
    let password = req.body.signUp.password;
    let confirmpassword = req.body.signUp.confirmpassword;
    let userCreate = await signup.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      confirmpassword: confirmpassword,
    });
    let jwtToken = await userCreate.generateJwt(userCreate._id);
    res.status(200).json({
      Status: "Success",
      Message: "User Created",
      jwt: jwtToken,
    });
  } catch (error) {
    res.status(404).json({
      Status: "error",
      Message: error,
    });
  }
};

exports.signIn = async (req, res) => {
  const request = req.body.save;
  try {
    const email = request.email;
    const password = request.password;
    let checkUser = await signup.findOne({ email: email });
    if (!checkUser) {
      res.status(404).json({
        Status: "Error",
        Message: "User Not Found",
      });
    } else {
      let orginalPassword = checkUser.password;
      let checkPassword = await checkUser.validatePasswordBcrypt(
        password,
        orginalPassword
      );
      if (checkPassword === true) {
        const jwtToken = await checkUser.generateJwt(checkUser._id);
        res.status(200).json({
          Status: "Success",
          jwtTokenUser: jwtToken,
        });
      } else {
        res.status(404).json({
          Status: "Error",
          Message: "Please Enter Correct Password",
        });
      }
    }
  } catch (error) {
    res.status(404).json({
      Status: "Error",
      Message: error,
    });
  }
};

exports.forgetPassword = async (req, res) => {
  const emailAddress = req.body.value.email;
  try {
    const email = req.body.email;
    const findEmail = await signup.findOne({ email: emailAddress });
    if (!findEmail) {
      res.status(404).json({
        Status: "Error",
        Message: "Please Sigup",
      });
    } else {
      let email = mail(findEmail.email);
      let updatedData = await signup.findByIdAndUpdate(findEmail._id, {
        ResetPasswordOtp: email,
      });
      const saveOtp = res.status(200).json({
        Status: "Success",
        Message: "Email Send Successfull",
      });
    }
  } catch (error) {
    res.status(404).json({
      Status: "Error",
      Message: error,
    });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    let password = req.body.value.password;
    let confirmpassword = req.body.value.confirmpassword;
    let ResetPasswordOtp = req.body.value.otp;
    let getOtp = await signup.findOne({ ResetPasswordOtp: ResetPasswordOtp });
    if (!getOtp) {
      res.status(404).json({
        Status: "Error",
        Message: "Check Your Otp",
      });
    } else {
      getOtp.password = password;
      getOtp.confirmpassword = confirmpassword;
      getOtp.ResetPasswordOtp = 0;
      let finalData = await getOtp.save();
      res.status(200).json({
        Status: "success",
        Message: "Password Changed Success",
      });
    }
  } catch (error) {
    res.status(404).json({
      Status: "error",
      Message: error,
    });
  }
};
