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

module.exports =  { getAllArtwork, addArtwork }