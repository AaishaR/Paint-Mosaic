
import { Request, Response } from 'express';
import artworkModel from '../models/artworkSchemas';
import dotenv from "dotenv";
dotenv.config({ path: '../.env' });
import { v2 as cloudinary } from 'cloudinary';

const getArtwork = async (req: Request, res: Response): Promise<Response> => {
    try {
        const artwork = await artworkModel.find();
        return res.json(artwork);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
        // res.status(500).json({ e: 'Internal Server Error' });
    }
}

const postArtwork = async (req: Request, res: Response): Promise<Response> => {
    try {
        const artwork = await artworkModel.create(req.body);
        return res.status(201).json({ stauts: 201, message: 'Successfully created artwork', artwork: artwork });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const getArtist = async (req: Request, res: Response): Promise<Response> => {
    try {
        // console.log(req.params.name)
        const artwork = await artworkModel.find({ "artist.name": req.params.name });
        // console.log(artwork);
        return res.status(201).json({ stauts: 201, message: 'got artist', artwork: artwork });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteArt = async (req: Request, res: Response): Promise<Response> => {
    try {
        const artwork = await artworkModel.deleteOne({ _id: req.params.id });
        res.status(201);
        return res.status(201).json({ stauts: 201, message: 'Successfully deleted atwork', artwork: artwork });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadImage = async (req: Request, res: Response): Promise<void> => {
    console.log(process.env.CLOUDINARY_CLOUD_NAME);
    console.log(process.env.CLOUDINARY_API_KEY);
    console.log(process.env.CLOUDINARY_API_SECRET);
    try {
        console.log("Received image upload request");
        if (!req.file) {
            res.status(400).json({ error: "No image uploaded" });
        } else {
            const result = await cloudinary.uploader.upload(req.file.path, {
                quality: "auto",
                fetch_format: "auto",
            })
            const imageUrl = result.url;
            res.json({ imageUrl });
        }
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        res.status(500).json({ error: "Failed to upload image" });
    }
}

export default { getArtwork, postArtwork, getArtist, deleteArt, uploadImage }