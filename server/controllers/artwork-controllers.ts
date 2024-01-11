
import { Request, Response } from 'express';
import artworkModel from '../models/artworkSchemas';
import { validateUser } from '../utils/userUtils';

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

        const validUser = validateUser(req);

        if (!validUser) return res.status(401).json({ error: "Authentication failed" });

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

export default { getArtwork, postArtwork, getArtist, deleteArt }