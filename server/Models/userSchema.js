const mongoose = require('mongoose');
const Artwork = require('./artworkSchemas');

const MsgSchema = {
    sender: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
    }
}

const UserSchema = {
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['buyer', 'seller'],
        required: true,
    },
    messages : [MsgSchema],
    favoriteArtworks :[Artwork.schema],

}

module.exports = mongoose.model('user', UserSchema);