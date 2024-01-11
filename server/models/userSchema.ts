const mongoose = require('mongoose');
import artworkModel from "./artworkSchemas";


const UserSchema = {
    userId: {
        type: String,
        reguired: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
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
    favoriteArtworks: [artworkModel.schema],

}

const User = mongoose.model('user', UserSchema);

export default User;