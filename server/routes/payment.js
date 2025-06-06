// Import the required modules
const express = require("express");
const router = express.Router();
const { coursePurchasedEmail } = require("../mails/coursePurchasedEmail");
const {
  capturePayments,
  verifySignature,
} = require("../controllers/PaymentsRazorPay");
const { auth, isStudent } = require("../middlewares/auth");

router.post("/capturePayments", auth, isStudent, capturePayments);
router.post("/verifySignature", auth, isStudent, verifySignature);
// router.post("/coursePurchasedEmail", auth, isStudent, coursePurchasedEmail);

module.exports = router;
