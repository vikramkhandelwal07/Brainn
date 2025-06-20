import { toast } from "react-hot-toast";
import { studentEndpoints } from "./api";
import { apiConnector } from "./apiConnector";
import BrainnLogo from "../assets/Brainn.png";
import { setPaymentLoading } from "../slices/courseSlice";
import { resetCart } from "../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");

  try {
    // Load the script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("RazorPay SDK failed to load");
      return;
    }

    // Initiate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    console.log("PRINTING orderResponse", orderResponse);

    // Access data.data instead of data.message
    const paymentData = orderResponse.data.data;

    // Options for Razorpay
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
      currency: paymentData.currency,
      amount: `${paymentData.amount}`,
      order_id: paymentData.id,
      name: "Brainn",
      description: "Thank You for Purchasing the Course",
      image: BrainnLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        console.log("Payment successful, response:", response);
        // Verify payment and then send success email
        verifyPayment(
          { ...response, courses },
          token,
          navigate,
          dispatch,
          paymentData.amount
        );
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops, payment failed");
      console.log(response.error);
    });
  } catch (error) {
    console.log("PAYMENT API ERROR.....", error);
    toast.error("Could not make Payment");
  }
  toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    console.log("Sending payment success email with:", {
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
      amount: amount,
    });

    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount: amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("Payment success email sent successfully");
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR", error);
    // Don't throw error here to prevent breaking the flow
  }
}

// Verify payment
async function verifyPayment(bodyData, token, navigate, dispatch, amount) {
  const toastId = toast.loading("Verifying Payment");
  dispatch(setPaymentLoading(true));
  try {
    console.log("Verifying payment with bodyData:", bodyData);
    console.log(
      "Token being sent:",
      token ? "Token exists" : "Token is missing"
    );

      const verificationData = {
      razorpay_order_id: bodyData.razorpay_order_id,
      razorpay_payment_id: bodyData.razorpay_payment_id,
      razorpay_signature: bodyData.razorpay_signature,
      courses: Array.isArray(bodyData.courses)
        ? bodyData.courses
        : [bodyData.courses],
    };

    console.log("Sending verification data:", verificationData);

    const response = await apiConnector(
      "POST",
      COURSE_VERIFY_API,
      verificationData,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    );

    console.log("Verification response:", response.data);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    console.log("Payment verified successfully");
    toast.success("Payment Successful, you are added to the course");

    // Send payment success email after successful verification
    await sendPaymentSuccessEmail(
      {
        razorpay_order_id: bodyData.razorpay_order_id,
        razorpay_payment_id: bodyData.razorpay_payment_id,
      },
      amount,
      token
    );

    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR", error);
    console.log("Error response:", error.response?.data);

    // Show specific error message from backend
    const errorMessage =
      error.response?.data?.message || "Could not verify Payment";
    toast.error(errorMessage);
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
