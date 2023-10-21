const asyncHandler = require("express-async-handler");
const path = require("path");
const { transporter } = require("./emailSubscription");

function sendingDetails(name, email, subject, message) {
  const mailOptions = {
    from: { name: "Techdia", address: process.env.USER },
    // from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: ["sopewenike@yahoo.com"], // list of receivers
    subject: subject ? `${subject}` : "Client enquiry", // Subject line
    text: "Hello Techdia Admin, I just subscribed to your mail", // plain text body
    html: message
      ? `<h1>Hello Techdia Admin, my name is ${name}. n/ Enquirie:${message} </h1>`
      : `<h1>Hello Techdia Admin,${email} </h1>`, // html body
    attachments: [
      {
        filename: "Growth-CLUB-site-icon.png",
        path: path.join(__dirname, "Growth-CLUB-site-icon.png"),
        contentType: "image/png",
      },
    ],
  };
  return mailOptions;
}

const sendEnquiriesMail = asyncHandler(async (req, res) => {
  const { email, subject, message, name } = req.body;
  console.log("the email", email, subject, message, name);
  if (!email) {
    res.status(401);
    throw new Error("Unauthorized attempt to subsribe to email");
  }

  if (email) {
    const info = await transporter.sendMail(
      sendingDetails(name, email, subject, message)
    );
    // console.log("Email sent succesfully.", info);
    res.status(201).json({ message: "Email sent succesfully." });
  }

  //   res.json({ message: "the user password has been updated!", userAvaible });
});

module.exports = { sendEnquiriesMail };
