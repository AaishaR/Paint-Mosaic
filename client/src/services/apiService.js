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

module.exports = { getArtwork, getArtist }