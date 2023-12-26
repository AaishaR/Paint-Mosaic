import FavItem from "./favItem";
import Message from "./message";

export default function UserDetails(props) {

    return (
        <>
            {props.user &&
                <div className='user-container'>
                    <h2>Welcome, {props.user?.username}!</h2>

                    {/* <h3>your messages: </h3>
                <div className="msg-list-container">
                    {props.user?.messages.length ? props.user.messages.map((msg, index) => (
                        <Message key={index} msg={msg} />

                    )) :
                        <p>No new Messages</p>}
                </div> */}

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