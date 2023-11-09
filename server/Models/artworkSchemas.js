const mongoose = require('mongoose');

const ArtworkSchema = {
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    dimensions:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    auction:{
        type: Boolean,
        required: true,
    },
    material:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        default: 0,
    },
    artist:{
        name:{
            type: String,
            required: true,
        },
        about:{
            type: String,
        },
        location:{
            type: String,
            required: true,
        }
    }
}

module.exports = mongoose.model('artwork', ArtworkSchema);