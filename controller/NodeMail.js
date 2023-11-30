const nodeMailer = require("nodemailer");
const otp = require("otp-generator");

const mailSend = (userEmail) => {
  const Otp = otp.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "gunasheelan1624@gmail.com",
      pass: "ydqlntebpfmnogxj",
    },
  });
  const mailOption = {
    from: "gunasheelan1624@gmail.com",
    to: userEmail,
    subject: "password reset",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mail</title>
    <script
      src="https://kit.fontawesome.com/62aa6bd613.js"
      crossorigin="anonymous"
    ></script>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    <style>
      #color-bg {
        background-color: #03191e !important;
        height: 100vh;
      }
      .colors {
        color: #a9fbd7;
      }
      #color {
        color: #cfee9e !important;
      }
      #start-color {
        color: #54577c;
      }
      #img-fl {
        border-radius: 20px;
        width: 100px;
      }
      #flex-inner {
        display-flex;
        flex-flow:column;
        gap:5px
      }
    </style>
  </head>
  <body>
    <div id="color-bg">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 p-5 d-flex gap-5">
            <div id="flex-inner">
              <h1 class="colors">PASSWORD RESET</h1>
              <p class="text-dark h5" id="color">
                We’ve received your request to reset your password. Please click
                the link below to complete the reset.
              </p>
              <p id="value-int">Your Otp Is: ${Otp}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`,
  };
  transporter.sendMail(mailOption);
  return Otp;
};

exports.mail = mailSend;
