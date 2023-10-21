const allowedOrigins = ["https://techdia.vercel.app", "http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    // add during develpment || !origin. remove at production
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // console.log(origin);
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
      throw new Error("Not allowed by CORS");
    }
  },
  optionsSuccessStatus: 200,
};
// res.status(403);
// throw new Error("User don't have permission to update other user contacts");
// const whitelist = ["http://127.0.0.1:3000", "http://localhost:3000"];

module.exports = { corsOptions, allowedOrigins };
