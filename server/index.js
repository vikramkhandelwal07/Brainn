require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);


app.use(
  cors({
    origin: "http://localhost:5173", // <-- Match this with your frontend port
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
const courseRoutes = require("./routes/course");
const userRoutes = require("./routes/user");
const paymentRoutes = require("./routes/payment");
const profileRoutes = require("./routes/profile");
const contactUsRoutes = require("./routes/contactUs");

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/contact", contactUsRoutes); 

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Connect Cloudinary
cloudinaryConnect();

// Connect MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Health check
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is running...",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
