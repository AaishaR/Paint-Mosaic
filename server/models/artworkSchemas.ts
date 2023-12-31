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
    material:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
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

const artworkModel = mongoose.model('artwork', ArtworkSchema);

export default artworkModel;