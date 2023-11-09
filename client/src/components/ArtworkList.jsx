import Artwork from "./Artwork";
// import ArtworkGallery from "../utils/mediaSwiper"


export default function ArtworkList({ artworks }) {
    return (
        <div className="artwork-list-container">
            <Artwork artworks={artworks}/>
        </div>
    )
}