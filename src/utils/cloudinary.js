import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const resposne = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("File is uploaded on cloudinary", resposne.url)  
        return response;  
    } catch (error) {
        fs.unlinkSync(localFilePath)  // remove te locally saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}