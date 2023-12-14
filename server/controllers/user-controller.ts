import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import path from 'path';
import User from './../models/userSchema';
// const userModel = require('../models/db')
const SECRET_KEY = 'i-am-really-trying-to-understand-this-shizz';
//process.env.SECRET_KEY || 

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });


const postRegister = async (req: Request, res: Response): Promise<Response> => {

  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ error: "Credentials not provided correctly" });

  // const { username, password, role } = req.body;

  // console.log('data that is being sent in: ', req.body);

  const user = await User.findOne({ username: username });
  console.log('this is the found user ', user);

  if (user) return res.status(400).json({ error: "Account with this username already exists" });

  try {
    if (password === '') throw new Error();

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const { _id } = await newUser.save();

    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    return res.status(201).json({ accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const postLogin = async (req: Request, res: Response): Promise<Response> => {
  // console.log(req.body)
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Credentials not provided correctly" })
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User does not exists" });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) return res.status(401).json({ error: "Incorrect password" });

    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    return res.status(200).json({ accessToken, userDetails: user });
    // res.status(200).send({ accessToken, userDetails: user });
  } catch (error) {
    return res.status(500).send({ error: '500', message: 'Username or password is incorrect' });
  }
};

const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send('Authorization header is missing');
    }
    const _id = (jwt.verify(authorization, SECRET_KEY) as JwtPayload)._id;

    const user = await User.findById({ _id });
    if (!user) {

      return res.status(401).send('User does not exists');
    }
    return res.status(200).send(user);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error in getUser" });
  }
}

const putAddToFav = async (req: Request, res: Response): Promise<Response> => {
  // console.log(req.body)
  try {
    const { _id, artwork } = req.body;
    const user = await User.findById(_id);
    user.favoriteArtworks.push(artwork);
    await user.save();
    // await userModel.addFavoriteArtwork(_id, artwork);
    return res.status(200).json({ success: true, message: 'Artwork added to favorites successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const putRemoveFav = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { _id, artworkId } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      console.error('User not found');
      return res.status(400).json({ error: "User does not exists" });
    }
    user.favoriteArtworks = user.favoriteArtworks.filter((el: { _id: { toString: () => any; }; }) => el._id.toString() !== artworkId);
    await user.save();
    // await userModel.removeFavoriteArtwork(_id, artworkId);
    return res.status(200).json({ success: true, message: 'Artwork removed from favorites successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const putAddMsg = async (req: Request, res: Response): Promise<Response> => {
  // console.log(req.body)
  try {
    const { username, recieverName, msg } = req.body;
    const user = await User.findOne({ username: recieverName });
    if (!user) {
      console.error('User not found');
      return res.status(400).json({ error: "User does not exists" });
    }
    user.messages.push({ sender: username, msg: msg });
    await user.save();
    // await userModel.addMsgToUser(username, recieverName, msg);
    return res.status(200).json({ success: true, message: 'Sent message to the artist successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


export default { postRegister, postLogin, getUser, putAddToFav, putRemoveFav, putAddMsg };
