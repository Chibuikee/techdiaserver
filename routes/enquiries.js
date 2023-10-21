const express = require("express");
const { sendEnquiriesMail } = require("../controllers/sendEnquiries");

const router = express.Router();
router.post("/send-enquiries", sendEnquiriesMail);
module.exports = router;
