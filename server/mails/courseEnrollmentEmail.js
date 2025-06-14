exports.courseEnrollmentEmail = (courseName, name) => {
  return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Brainn | Course Enrollment Confirmation</title>
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
          font-weight: bold;
          color: #ffffff;
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
        <div class="message">You're enrolled! 🎉</div>
        <div class="body">
          <p>Hello <span class="highlight">${name}</span>,</p>
          <p>Welcome to <strong>Brainn</strong> — your AI-powered learning journey starts now!</p>
          <p>You’ve successfully enrolled in the course: <span class="highlight">"${courseName}"</span>.</p>
          <p>Head over to your dashboard to begin exploring content, activities, and insights tailored just for you.</p>
        </div>
        <a class="cta" href="https://brainn-ai.vercel.app/dashboard">Go to Dashboard</a>
        <div class="support">
          Need help or have questions? Reach out at <a href="mailto:support@brainn.ai">support@brainn.ai</a><br>
          We're here for your learning success 🚀
        </div>
      </div>
    </body>
    </html>`;
};
