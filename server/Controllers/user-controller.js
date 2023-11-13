const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/userSchema');
const SECRET_KEY = process.env.SECRET_KEY || 'i-am-really-trying-to-understand-this-shizz';

const create = async (req, res) => {
  const { username, password, role } = req.body;
  console.log('data that is being sent in: ',req.body);
  const user = await User.findOne({ username: username });
  console.log('this is the found user ',user);
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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

const profile = async (req, res) => {
  try {
    const { _id, firstName, lastName } = req.user;
    const user = { _id, firstName, lastName };
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: 'Resource not found' });
  }
};

const logout = (req, res) => {
  // delete the token client side upon logout.
  // you would invalidate the token here.
};

module.exports = { create, login, profile, logout };
