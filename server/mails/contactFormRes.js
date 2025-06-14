exports.contactUsEmail = (
  email,
  firstname,
  lastname,
  message,
  phoneNo,
  countrycode
) => {
  return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Brainn | Contact Confirmation</title>
      <style>
        body {
          background-color: #0f0f1c;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 16px;
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
          box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
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
          text-align: left;
        }
        .highlight {
          color: #ffffff;
          font-weight: 600;
        }
        .cta {
          display: inline-block;
          padding: 12px 24px;
          background-color: #8a2be2;
          color: #ffffff;
          text-decoration: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 25px;
          transition: background-color 0.3s ease;
        }
        .cta:hover {
          background-color: #a34ef0;
        }
        .support {
          font-size: 14px;
          color: #aaaaaa;
          margin-top: 25px;
        }
        a {
          color: #8a2be2;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="message">We've received your message!</div>
        <div class="body">
          <p>Hi <span class="highlight">${firstname} ${lastname}</span>,</p>
          <p>Thanks for reaching out to <strong>Brainn</strong> – your AI-powered edtech companion. 🚀</p>
          <p>We're reviewing your message and will get back to you shortly.</p>
          <p><strong>Your Details:</strong></p>
          <ul style="list-style:none; padding-left:0;">
            <li><strong>Name:</strong> ${firstname} ${lastname}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${countrycode} ${phoneNo}</li>
            <li><strong>Message:</strong> ${message}</li>
          </ul>
          <p>Our AI-driven support team is on it. You'll hear from us soon!</p>
        </div>
        <a class="cta" href="https://brainn-ai.vercel.app">Explore Brainn</a>
        <div class="support">
          Need immediate help? Reach us anytime at
          <a href="mailto:support@brainn.ai">support@brainn.ai</a>
        </div>
      </div>
    </body>
    </html>`;
};
