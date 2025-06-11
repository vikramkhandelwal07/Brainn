// Import the required modules
const express = require("express");
const router = express.Router();

const {
  capturePayments,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/PaymentsRazorPay");
const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");
router.post("/capturePayments", auth, isStudent, capturePayments);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
);

module.exports = router;
