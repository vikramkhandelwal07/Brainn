const cloudinary = require("cloudinary").v2;

// image upload
exports.imageUploadCloudinary = async (file, folder, height, quality) => {
  const options = { folder };
  if (height) options.height = height;
  if (quality) options.quality = quality;
  options.resource_type = "image";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

// video upload
exports.videoUploadCloudinary = async (file, folder) => {
  const options = {
    folder,
    resource_type: "video",
  };

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
