const coursePurchasedEmail = (userName, courseName, courseLink) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <h2 style="color: #4CAF50;">Congratulations ${userName}!</h2>
      <p>You’ve successfully enrolled in the course: <strong>${courseName}</strong>.</p>
      
      <p>We're excited to have you on board. Get ready to dive into your learning journey!</p>
      
      <p>
        You can start the course anytime by clicking the button below:
      </p>

      <a href="${courseLink}" style="
        display: inline-block;
        margin-top: 10px;
        padding: 12px 20px;
        background-color: #4CAF50;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      ">
        Start Learning
      </a>

      <p style="margin-top: 30px;">If you have any questions or face any issues, feel free to contact our support team.</p>
      
      <p>Happy learning!<br>Team CollegeClubs</p>
    </div>
  `;
};

module.exports = coursePurchasedEmail; 


