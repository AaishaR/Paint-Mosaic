const mongoose = require('mongoose');
import artworkModel from "./artworkSchemas";

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
    favoriteArtworks :[artworkModel.schema],

}

const User = mongoose.model('user', UserSchema);

export default User;