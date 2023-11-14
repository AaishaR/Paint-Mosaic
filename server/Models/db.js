'use strict';

const artworkModel = require('./artworkSchemas');
const userModel = require('./userSchema');

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/mongooseDb').then(() => {
  console.log("🐸🐸  connected to Mongoooooooseeeee 🐸🐸 ");
})
  .catch((e) => console.error("Error connecting to mongodb:", e));

async function getAllArtwork() {
  return await artworkModel.find();
}

async function addArtwork(artwork) {
  return await artworkModel.create(artwork);
}

async function findArtist(name) {
  return await artworkModel.find({ "artist.name": name });
}

async function deleteArtwork(id) {
  return await artworkModel.deleteOne({ _id: id });
}


async function addMsgToUser(username, recieverName, msg) {
  console.log(username)
  console.log(recieverName)
  console.log(msg)
  try {
    const user = await userModel.findOne({ username: recieverName });
    console.log(user)
    // console.log(user)
    if (!user) {
      console.error('User not found');
      return;
    }
    user.messages.push({ sender: username, msg: msg });
    await user.save();
  } catch (error) {
    console.error(error);
  }
};

async function addFavoriteArtwork(userId, artwork) {
  try {
    const user = await userModel.findById(userId);
    user.favoriteArtworks.push(artwork);
    await user.save();
  } catch (error) {
    console.error(error);
  }
};

async function removeFavoriteArtwork(_id , artworkId) {
  // console.log(_id)
  // console.log(artworkId)
  try {
    const user = await userModel.findById(_id);
    console.log(user)
    if (!user) {
      console.error('User not found');
      return;
    }
    user.favoriteArtworks = user.favoriteArtworks.filter(el => el._id.toString() !== artworkId);
    await user.save();
  } catch (error) {
    console.error(error);
  }
};



module.exports = { getAllArtwork, addArtwork, findArtist, deleteArtwork, addMsgToUser, addFavoriteArtwork, removeFavoriteArtwork }