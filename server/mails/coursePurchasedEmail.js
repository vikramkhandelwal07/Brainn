const coursePurchasedEmail = (userName, courseName, courseLink) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Brainn | Course Purchase Confirmation</title>
    </head>
    <body style="margin:0; padding:0; background-color:#0f0f1c; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#ffffff;">
      <div style="max-width:600px; margin:40px auto; background-color:#1a1a2e; padding:30px; border-radius:12px; box-shadow:0 0 10px rgba(138, 43, 226, 0.4);">
        <h2 style="color:#8a2be2; text-align:center;">Congratulations, ${userName}! 🎉</h2>
        <p style="font-size:16px;">You’ve successfully enrolled in <strong style="color:#ffffff;">${courseName}</strong>.</p>
        <p style="font-size:16px;">Welcome to <strong>Brainn</strong> — where smart learning meets AI. We're thrilled to have you onboard!</p>
        <p style="font-size:16px;">Start exploring your course by clicking the button below:</p>
        
        <div style="text-align:center; margin:30px 0;">
          <a href="${courseLink}" style="
            background-color:#8a2be2;
            color:#ffffff;
            text-decoration:none;
            padding:12px 24px;
            border-radius:8px;
            font-weight:bold;
            font-size:16px;
            display:inline-block;
            transition:background-color 0.3s ease;
          ">Start Learning</a>
        </div>

        <p style="font-size:14px; color:#cccccc;">If you face any issues or have questions, reach out to us at <a href="mailto:support@brainn.ai" style="color:#8a2be2;">support@brainn.ai</a>.</p>
        
        <p style="font-size:16px;">Enjoy the journey,<br><strong>Team Brainn</strong></p>
      </div>
    </body>
    </html>
  `;
};

module.exports = coursePurchasedEmail;
