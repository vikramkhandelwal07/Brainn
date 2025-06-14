exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  // Ensure all parameters are properly sanitized and defined
  const safeName = name || "Student";
  const safeAmount = amount || "0";
  const safeOrderId = orderId || "N/A";
  const safePaymentId = paymentId || "N/A";

  return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Brainn | Payment Confirmation</title>
      <style>
        body {
          background-color: #0f0f1c;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #ffffff;
          margin: 0;
          padding: 0;
        }
  
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #1a1a2e;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 0 10px rgba(138, 43, 226, 0.4);
          text-align: center;
        }
  
        .message {
          font-size: 22px;
          font-weight: bold;
          color: #8a2be2;
          margin-bottom: 20px;
        }
  
        .body {
          font-size: 16px;
          color: #dddddd;
          margin-bottom: 20px;
        }
  
        .highlight {
          color: #ffffff;
          font-weight: bold;
        }
  
        .support {
          font-size: 14px;
          color: #aaaaaa;
          margin-top: 30px;
        }
  
        a {
          color: #8a2be2;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="message">Payment Successful!</div>
        <div class="body">
          <p>Hi ${safeName},</p>
          <p>We're thrilled to confirm your payment of <span class="highlight">₹${safeAmount}</span>.</p>
          <p>Your transaction details are as follows:</p>
          <p><strong>Payment ID:</strong> ${safePaymentId}</p>
          <p><strong>Order ID:</strong> ${safeOrderId}</p>
          <p>You now have full access to your chosen course(s). Welcome to the Brainn community 🚀</p>
        </div>
        <div class="support">
          Need help? Reach out at <a href="mailto:support@brainn.ai">support@brainn.ai</a>
        </div>
      </div>
    </body>
    </html>`;
};
