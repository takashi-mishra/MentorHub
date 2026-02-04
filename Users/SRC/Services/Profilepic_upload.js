const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT
});

module.exports.uploadProfilePic = (file) => {
    return new Promise((resolve, reject) => {
        imagekit.upload(
            {
                file: file.buffer,
                fileName: `profile_${Date.now()}_${file.originalname}`,
                folder: "/profile_pics"
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
    });
};

module.exports.deleteProfilePic = (fileId) => {
    return new Promise((resolve, reject) => {
        imagekit.deleteFile(fileId, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
};
