const mongoose = require('mongoose');
import artworkModel from "./artworkSchemas";


const UserSchema = {
    email: {
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
    favoriteArtworks :[artworkModel.schema],

}

const User = mongoose.model('user', UserSchema);

export default User;