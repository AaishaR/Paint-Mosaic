'use strict';

const artworkModel = require('./artworkSchemas');
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/mongooseDb').then(() => {
  console.log("🐸🐸  connected to Mongoooooooseeeee 🐸🐸 ");
})
  .catch((e) => console.log(e));

async function getAllArtwork() {
  return await artworkModel.find();
}

async function addArtwork(artwork) {
  return await artworkModel.create(artwork);
}

async function findAtrist(name) {
  return await artworkModel.find({ "artist.name": name });
}

async function deleteArtwork(id) {
  return await artworkModel.deleteOne({ _id: id });
}


module.exports = { getAllArtwork, addArtwork, findAtrist, deleteArtwork }