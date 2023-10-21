const asyncHandler = require("express-async-handler");
const nodeMailer = require("nodemailer");
const path = require("path");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://gmail.com>
    user: "sopewenike@gmail.com", //"REPLACE-WITH-YOUR-GMAIL ADDRESS",
    // user: process.env.USER, //"REPLACE-WITH-YOUR-GMAIL ADDRESS",
    // pass: "kdqzyzwnhvifecjh", //"REPLACE-WITH-YOUR-GMAIL-PASSWORD",
    pass: "kdqz yzwn hvif ecjh", //"REPLACE-WITH-YOUR-GMAIL-PASSWORD",
    // pass: process.env.APP_PASSWORD, //"REPLACE-WITH-YOUR-GMAIL-PASSWORD",
  },
});

const mailOptions = {
  from: { name: "Techdia", address: "sopewenike@gmail.com" },
  // from: `"Techdia👻" sopewenike@gmail.com`, // sender address
  to: ["sopewenike@yahoo.com"], // list of receivers
  subject: "A new member subscription", // Subject line
  text: "Hello Techdia Admin, I just subscribed to your mail", // plain text body
  html: "<h1>Hello Techdia Admin, I just subscribed to your mail. I cant wait to get all the exciting stuffs that you have for me. Thanks</h1>", // html body
  attachments: [
    {
      filename: "Growth-CLUB-site-icon.png",
      path: path.join(__dirname, "Growth-CLUB-site-icon.png"),
      contentType: "image/png",
    },
  ],
};
// async function sendMail(transporter, mailOptions) {
//   await transporter.sendMail(mailOptions);
//   console.log("Email sent succesfully.");
// }

// callSendMail function is for testing purposes only
// function callSendMail() {
//   // trigger for sending mails
//   // sendMail(transporter, mailOptions);
// }

const subscribeUserToEmailAd = asyncHandler(async (req, res) => {
  const { email } = req.params;
  console.log("the email", email);
  if (!email) {
    res.status(401);
    throw new Error("Unauthorized attempt to subsribe to email");
  }

  if (email) {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent succesfully.", info);
    res.status(201).json({ message: "Email sent succesfully." });
  }

  //   res.json({ message: "the user password has been updated!", userAvaible });
});

module.exports = { subscribeUserToEmailAd, transporter };
// module.exports = { callSendMail };
