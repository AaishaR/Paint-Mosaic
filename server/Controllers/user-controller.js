const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/userSchema');
const userModel = require('../models/db')
const SECRET_KEY = 'i-am-really-trying-to-understand-this-shizz';
//process.env.SECRET_KEY || 

const create = async (req, res) => {
  const { username, password, role } = req.body;
  console.log('data that is being sent in: ', req.body);
  const user = await User.findOne({ username: username });
  console.log('this is the found user ', user);
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const { _id } = await newUser.save();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const login = async (req, res) => {
  // console.log(req.body)
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();

    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken, userDetails: user });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

const getUser = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const _id = jwt.verify(authorization, SECRET_KEY)._id;
    const user = await User.findById({ _id });
    if (!user) { 
      res.status(401).send('User does not exists');
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error)
  }
}

const logout = (req, res) => {
  // delete the token client side upon logout.
  // you would invalidate the token here.
};

const addtofav = async (req, res) => {
  // console.log(req.body)
  const { _id, artwork } = req.body;
  try {
    await userModel.addFavoriteArtwork(_id, artwork);
    res.status(200).json({ success: true, message: 'Artwork added to favorites successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const removeFav = async (req, res) => {
  const { _id, artworkId } = req.body;

  try {
    await userModel.removeFavoriteArtwork(_id, artworkId);
    res.status(200).json({ success: true, message: 'Artwork removed from favorites successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const addMsg = async (req, res) => {
  console.log(req.body)
  const { username, recieverName, msg } = req.body;
  try {
    await userModel.addMsgToUser(username, recieverName, msg);
    res.status(200).json({ success: true, message: 'Sent message to the artist successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


module.exports = { create, login, getUser, logout, addtofav, removeFav, addMsg };
