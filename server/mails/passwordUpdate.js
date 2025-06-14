exports.passwordUpdated = (email, name) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Brainn | Password Updated</title>
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
                font-weight: bold;
                color: #ffffff;
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
            <div class="message">Password Successfully Updated</div>
            <div class="body">
                <p>Hello ${name},</p>
                <p>Your password has been successfully updated for the account associated with <span class="highlight">${email}</span>.</p>
                <p>If you did not request this change, please <strong>contact our support team immediately</strong> to secure your account.</p>
            </div>
            <div class="support">
                Need help? Contact us at <a href="mailto:support@brainn.ai">support@brainn.ai</a>
            </div>
        </div>
    </body>
    </html>`;
};
