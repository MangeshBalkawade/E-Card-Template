const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3bucket = process.env.S3BucketName;

// Configure AWS
aws.config.update({
  apiVersion: "2024-06-01",
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  signatureVersion: "v4",
});

const s3 = new aws.S3();

// Define a function to generate dynamic file name and folder structure

const generateS3Key = (req, file, cb) => {
  let folderName = process.env.S3BucketFolder || "";
  let filename = file.originalname;
  let ext = filename.split(".").pop();

  // Generate dynamic file name with timestamp and random number

  let newFileName =
    Date.now() + "-" + Math.floor(Math.random() * 1000) + 1 + "." + ext;

  // Construct the key (file path) with folder structure

  if (folderName !== "") {
    newFileName = folderName + "/" + newFileName;
  }
  cb(null, newFileName);
};
// Define file filter function to allow all file types

const fileFilter = (req, file, cb) => {
  // Accept all files
  cb(null, true);
};

// Initialize multer with S3 storage

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: s3bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: generateS3Key,
    // Use the function to generate dynamic S3 key
  }),
  limits: { fileSize: 1024 * 1024 * 50 },
  // Limit file size to 50MB
});

module.exports = upload;
