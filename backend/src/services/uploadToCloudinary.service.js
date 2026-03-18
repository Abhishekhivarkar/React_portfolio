import cloudinary from "cloudinary";
import { config } from "../configs/env.js";

cloudinary.v2.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (file, folder = "project") => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      return reject(new Error("Invalid file for upload"));
    }

    cloudinary.v2.uploader
      .upload_stream(
        {
          folder,
          resource_type: "auto"
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(file.buffer);
  });
};
