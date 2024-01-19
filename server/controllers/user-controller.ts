import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from './../models/userSchema';
import { v4 as uuidv4 } from 'uuid';
import { validateUser } from '../utils/userUtils'
import nodemailer from 'nodemailer';
// import sgMail from '@sendgrid/mail';
// import SMTPTransport = require("nodemailer/lib/smtp-transport");

import dotenv from "dotenv";
import mail = require('@sendgrid/mail');
dotenv.config({ path: '../.env' });

// const SECRET_KEY  = process.env.SECRET_KEY!;


const postRegister = async (req: Request, res: Response): Promise<Response> => {


  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) return res.status(400).json({ error: "Credentials not provided correctly" });

  const user = await User.findOne({ email: email });
  console.log('this is the found user ', user);

  if (user) return res.status(400).json({ error: "Account with this username already exists" });

  try {
    if (password === '') throw new Error();

    const hash = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const newUser = new User({
      ...req.body,
      userId: userId,
      password: hash,
    });
    const { _id } = await newUser.save();

    // console.log('_id:', _id);
    // console.log('SECRET_KEY:', SECRET_KEY);
    const accessToken = jwt.sign({ _id }, process.env.SECRET_KEY!);
    // console.log(accessToken)
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

    const accessToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY!);
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
    // console.log(user);

    return res.status(200).send(user);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error in getUser" });
  }
}

const getUserDetails = async (req: Request, res: Response): Promise<Response> => {
  try {

    const { artistId } = req.query

    const user = await User.findOne({ userId: artistId })

    // console.log(user)
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

// function create_transport(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
//   const smtpConfig: SMTPTransport.Options = {
//       host: process.env.SMTP_HOST,
//       port: parseInt(process.env.SMTP_PORT as string, 10),
//       secure: false, // upgrade later with STARTTLS
//       auth: {
//           user: process.env.SMTP_EMAIL,
//           pass: process.env.PASS,
//       },
//   };
//   const transporter = nodemailer.createTransport(smtpConfig);

//   return transporter;
// }

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST as string,
  port: parseInt(process.env.SMTP_PORT as string, 10),
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL as string,
    pass: process.env.PASS as string,
  },
});

const postMail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {email, subject, message } = req.body;

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: subject,
      message: message
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if(error){
        console.error(error);
      } else {
        console.log("Email Sent!")
      }
    })

    return res.status(200).json({ success: true, message: 'Mail Sent Successfully' });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
    
  }
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  // try {
  //   const { name, email, subject, message, to } = req.body;

  //   const msg = {
  //     to: to,
  //     from: email,
  //     subject: subject,
  //     text: message
  //   };

  //   await sgMail.send(msg);
  //   return res.status(200).send('Message sent successfully');

  // } catch (error) {
  //   console.error('Error sending email:', error);
  //   return res.status(500).send('Internal Server Error');

  // }
}


export default { postRegister, postLogin, getUser, putAddToFav, putRemoveFav, getUserDetails, postMail };
