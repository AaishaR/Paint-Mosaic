

export default function FavItem(props) {

    return (
        <div className="fav-item-container">
            <img src={props.artwork.image}/>
            <p>{props.artwork.description} by {props.artwork.artist.name}</p>
        </div>

    )
}