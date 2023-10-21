const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  //it has to be "Bearer ", with space after the Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("User is not authorized or token is missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decoded.user);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401);
    throw new Error("jwt token failure, user is not authorized");
  }
});

module.exports = validateToken;

// below code written following tutorial, above refactored.

// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");
// const validateToken = asyncHandler(async (req, res, next) => {
//   let token;
//   let authHeader = req.headers.Authorization || req.headers.authorization;
//   if (authHeader && authHeader.startsWith("Bearer")) {
//     token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         res.status(401);
//         throw new Error("User is not authorized");
//       }
//       req.user = decoded.user;
//       next();
//     });
//     if (!token) {
//       res.status(401);
//       throw new Error("User is not authorized or token is missing");
//     }
//   }
// });
// module.exports = validateToken;
