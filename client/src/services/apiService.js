// const url = 'http://localhost:3000'
const url = 'https://paint-mosaic.vercel.app'

//fetching all artwork from backend
async function getArtwork() {
    try {
        const data = await fetch(`${url}/artwork`, {
            method: 'GET',
            mode:'no-cors',
        });
        const response = await data.json();
        return response;
    } catch (e) {
        console.log(e);
    }
}


//fetch all work by one artist for artist profile
async function getArtist(artistId) {
    // console.log('here')
    try {
        const data = await fetch(`${url}/artwork/artist/${artistId}`, {
            method: 'GET',
            mode:'no-cors',
        });
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
            body: data,
            mode:'no-cors',
        });

        // console.log(response)
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

async function postArtWork(data, token){
    try {
        const response = await fetch(`${url}/artwork`, {
            method: 'POST',
            mode:'no-cors',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${token}`,
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}



module.exports = { getArtwork, getArtist, cloudinaryUpload, postArtWork }