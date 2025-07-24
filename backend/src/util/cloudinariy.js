import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("Uploading to Cloudinary from:", localFilePath);
        if (!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
        // file has been uploaded successfull
        console.log("file uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath);
        return {
            url: response.secure_url,
            public_id: response.public_id
        };
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        fs.unlinkSync(localFilePath); // remove the locally saved file as the upload failed
        return null;
    }
};

export default uploadOnCloudinary;