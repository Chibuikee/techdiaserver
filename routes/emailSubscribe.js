const express = require("express");
const { subscribeUserToEmailAd } = require("../controllers/emailSubscription");

const router = express.Router();
// api/password
// api/password/reset/${userAvaible.id}/${token}
// router
//   .route("/forgot")
//   .get((req, res, next) => {
//     // render the view for forget-password
//     res.render("forgot-password");
//   })
//   .post(userForgotPasswordSendMail);
// router.get("/reset/:id/:token", verifyUserPasswordResetToken);
router.post("/subscribe/:email?", subscribeUserToEmailAd);
module.exports = router;
