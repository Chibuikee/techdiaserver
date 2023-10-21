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

function sendingDetails(email) {
  const mailOptions = {
    from: { name: "Techdia", address: process.env.USER },
    // from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: ["sopewenike@yahoo.com"], // list of receivers
    subject: "A new member subscription", // Subject line
    text: "Hello Techdia Admin, I just subscribed to your mail", // plain text body // html body
    html: `<h1>Hello Techdia Admin, I just subscribed to your mail using ${email}. I can't wait to get all the exciting stuffs that you have for me. Thanks</h1>`, // html body
    attachments: [
      {
        filename: "Techdia Logo",
        path: path.join(__dirname, "favicon-32x32.png"),
        contentType: "image/png",
      },
    ],
  };
  return mailOptions;
}

const subscribeUserToEmailAd = asyncHandler(async (req, res) => {
  const { email } = req.params;
  console.log("the email", email);
  if (!email) {
    res.status(401);
    throw new Error("Unauthorized attempt to subsribe to email");
  }

  if (email) {
    const info = await transporter.sendMail(sendingDetails(email));
    console.log("Email sent succesfully.");
    res.status(201).json({ message: "Email sent succesfully." });
  }

  //   res.json({ message: "the user password has been updated!", userAvaible });
});

module.exports = { subscribeUserToEmailAd, transporter };
// module.exports = { callSendMail };
