const mongoose = require('mongoose');

const MsgSchema = {
    sender: {
        type: String,
        required: true,
    },
    msg: {
        text: {
            type: String
        },
        images: {
            type: String
        }
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
    messages : [MsgSchema]

}



module.exports = mongoose.model('user', UserSchema);