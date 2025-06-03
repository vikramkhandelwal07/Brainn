const mailSender = require("../utils/sendMail");

exports.contactUsController = async (req, res) => {
  try {
    const { firstName,lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Mail to user (acknowledgement)
    const userMailBody = `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #4CAF50;">Hi ${name},</h2>
        <p>Thank you for contacting us! 🙌</p>
        <p>We’ve received your message and our team will reach out to you shortly.</p>
        <br />
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <br />
        <p>– Team Brainn</p>
      </div>
    `;

    await mailSender(email, "We’ve received your message!", userMailBody);

    // Mail to Brainn team
    const adminMailBody = `
      <div style="font-family: Arial, sans-serif;">
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br />${message}</p>
      </div>
    `;

    await mailSender(
      process.env.BRAINN_CONTACT_EMAIL, 
      `New Contact Inquiry from ${name}`,
      adminMailBody
    );

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error in contactUsController:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
};
