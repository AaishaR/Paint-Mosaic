const url = 'http://localhost:3000'

//fetching all artwork from backend
async function getArtwork() {
    try {
        const data = await fetch(`${url}/artwork`);
        const response = await data.json();
        return response;
    } catch (e) {
        console.log(e);
    }
}


//fetch all work by one artist for artist profile
async function getArtist(name) {
    // console.log('here')
    try {
        const data = await fetch(`${url}/artwork/artist/${name}`);
        const response = await data.json();
        // console.log(response, '🐸🐸 ' )
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function cloudinaryUpload(data) {
    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/ddyh3rk7s/upload", {
            method: 'POST',
            body: data
        });

        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const cloudinaryData = await response.json();

        return cloudinaryData.secure_url;

    } catch (err) {
        console.error('An Error Occurred While Uploading:', err);
        // Alert.alert('An Error Occurred While Uploading');
        throw err;
    }
}



module.exports = { getArtwork, getArtist, cloudinaryUpload }