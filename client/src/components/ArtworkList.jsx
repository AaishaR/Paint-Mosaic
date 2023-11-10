

export default function ArtworkList({ artworks }) {
    return (
        <div className="artwork-list-container">
            {artworks.length ? artworks.map((artwork) => (
                <div key={artwork._id} className="artwork-slide">
                    <div className="img-space">
                        <img className="artwork-img" src={artwork.image} alt="artwork" />
                    </div>
                    <div className="details-container">
                        <div className="artist-details">
                            <p>{artwork.artist.name}</p>
                            <p>{artwork.title}</p>
                            <div className="sub-artist-details">
                                <p>{artwork.category}</p>
                                <p>{artwork.material}</p>
                                <p>{artwork.dimensions}</p>
                            </div>

                        </div>

                        <div className="artwork-detials">
                            <div className="pricing-container">
                                <p>{artwork.price}</p>
                                <button>Add to Cart</button>
                                <button>Bid</button>
                            </div>
                            <p>{artwork.description}</p>
                        </div>
                    </div>
                </div>
            )) :
                <p>There are no art pieces available yet</p>}
        </div>
    )
}