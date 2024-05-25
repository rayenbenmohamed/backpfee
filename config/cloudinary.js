const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload files to Cloudinary
function uploadToCloudinary(fileBuffer, originalFilename) {
  const extension = originalFilename.split('.').pop().toLowerCase();
  const resourceType = 'image';  // Treat all files as images

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
    .end(fileBuffer);
  });
}


// Function to remove files from Cloudinary
function removeFromCloudinary(publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, { resource_type: 'raw' }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

module.exports = { uploadToCloudinary, removeFromCloudinary, cloudinary };
