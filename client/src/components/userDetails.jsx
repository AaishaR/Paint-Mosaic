import FavItem from "./favItem";

export default function UserDetails(props) {

    return (
        <>
            {props.user &&
                <div className='user-container'>
                    <h2>Welcome, {props.user?.username}!</h2>
                    <h3>your liked items: </h3>
                    <div className="fav-list-container">
                        {props.user?.favoriteArtworks.length ? props.user.favoriteArtworks.map((artwork, index) => (
                            <FavItem key={index} artwork={artwork} />
                        )) :
                            <p>You have no items in your favourite list</p>}
                    </div>

                </div>}
        </>

    )
}