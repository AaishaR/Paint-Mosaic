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

module.exports = { getArtwork }