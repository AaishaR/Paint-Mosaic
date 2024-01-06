import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import path from 'path';
import User from './../models/userSchema';
import { validateUser } from '../utils/userUtils'

const SECRET_KEY = process.env.SECRET_KEY!;

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });


const postRegister = async (req: Request, res: Response): Promise<Response> => {

  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ error: "Credentials not provided correctly" });

  const user = await User.findOne({ email: email });
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
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Credentials not provided correctly" })
    const user = await User.findOne({ email });
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
    const validatedUser = await validateUser(req);
    if (!validatedUser || !validatedUser.userId || !validatedUser.user) return res.status(401).json({ error: validatedUser });

    const { user } = validatedUser;
    console.log(user);

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


export default { postRegister, postLogin, getUser, putAddToFav, putRemoveFav };
