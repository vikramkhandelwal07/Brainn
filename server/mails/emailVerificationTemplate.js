const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Brainn | OTP Verification</title>
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
				margin-bottom: 25px;
			}
	
			.body {
				font-size: 16px;
				color: #dddddd;
				margin-bottom: 20px;
			}
	
			.otp-box {
				display: inline-block;
				background-color: #8a2be2;
				color: #ffffff;
				font-size: 24px;
				font-weight: bold;
				padding: 12px 24px;
				border-radius: 8px;
				margin: 20px 0;
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
			<div class="message">Verify Your Brainn Account</div>
			<div class="body">
				<p>Hello Learner,</p>
				<p>To complete your registration with <strong>Brainn</strong>, please enter the following One-Time Password (OTP):</p>
				<div class="otp-box">${otp}</div>
				<p>This OTP is valid for the next <strong>5 minutes</strong>.</p>
				<p>If you did not initiate this request, you can safely ignore this email.</p>
			</div>
			<div class="support">
				Need help? Reach us anytime at 
				<a href="mailto:support@brainn.ai">support@brainn.ai</a>
			</div>
		</div>
	</body>
	
	</html>`;
};

module.exports = otpTemplate;
