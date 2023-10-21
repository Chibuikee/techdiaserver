const express = require("express");
const errorHandler = require("./middleware/errorHandler");

const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const { corsOptions } = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
// const { subscribeUserToEmailAd } = require("./controllers/emailSubscription");
// const credentials = require("./middleware/credentials");
// const { object } = require("joi");

// this is used to set the port to the port declared in the env file
const dotenv = require("dotenv").config();

const app = express();
// this is used to set the port to the port declared in the env file
const port = process.env.PORT || 5000;

// use to send data
// app.get("/api/contacts", (req, res) => {
//   res.json({ message: "I just wrote my first API and it works!" });
// });
app.use(logger);

// cors Access-Control-Allow-Credentials
// app.use(credentials);
// cross origin resource sharing
app.use(cors(corsOptions));

// this below means that the url must begin with and end with "/" or /index.html.
// hence when you want different url to leed to the same route
// putting ".html" in a () followed by a ?, makes the .html optional .
// hence navigating to /index works fine as going to index.html
// app.get("^/$|/index(.html)?", (req, res) => {
//   res.download("server.js");
// });

app.use(express.urlencoded({ extended: false }));
// middle ware for transforming message
// to be in the form of a json
app.use(express.json());
app.set("view engine", "ejs"); // Using EJS as the template engine
// You might also set a views directory:
// app.set('views', path.join(__dirname, 'views'));

// middle ware for cookies
app.use(cookieParser());
// middle ware for handling routing
app.use("/api", require("./routes/emailSubscribe"));
// gets clients enquiries and sends to company's email
app.use("/api", require("./routes/enquiries"));

// subscribeUserToEmailAd();
// callSendMail();
// middle ware for handling error code
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Chibuike's server running on port ${port}`);
});
