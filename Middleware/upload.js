const multer = require('multer');
const { uploadToCloudinary } = require('../config/cloudinary');

// Set up Multer storage configuration
const storage = multer.memoryStorage(); 

// Set up Multer configuration
const multerUpload = multer({ storage: storage });

// Middleware function to upload files to Cloudinary
const upload = async (req, res, next) => {
    console.log(req.file);  // Check the output of req.file
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }

        console.log('Uploading file to Cloudinary');
        const result = await uploadToCloudinary(req.file.buffer, req.file.originalname); // Include originalname here
        req.cloudinaryUrl = result.secure_url;
        next();
    } catch (error) {
        console.error('Upload failed', error);
        res.status(400).json({ message: error.message });
    }
};



module.exports = { multerUpload, upload };
