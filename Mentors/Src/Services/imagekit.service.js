const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});

/**
 * Upload file to ImageKit
 */
const uploadFile = (file, folder) => {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file.buffer,
        fileName: `${Date.now()}_${file.originalname}`,
        folder,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
};

/**
 * Delete file from ImageKit (optional cleanup)
 */
const deleteFile = (fileId) => {
  return imagekit.deleteFile(fileId);
};

module.exports = { uploadFile, deleteFile };
