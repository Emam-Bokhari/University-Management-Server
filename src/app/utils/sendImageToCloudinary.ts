import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import fs from 'fs';

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
) => {
  try {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: config.cloudinary_cloud_name,
      api_key: config.cloudinary_api_key,
      api_secret: config.cloudinary_api_secret,
    });

    // Upload the image
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    });

    // console.log("Upload successful:", uploadResult);
    return uploadResult;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const deleteImageInTemporaryFile = async (path: string) => {
  fs.unlink(path, (err: any) => {
    if (err) {
      throw new Error(err);
    }
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
