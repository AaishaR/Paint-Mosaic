import Message from "./message"

export default function UserDetails(props) {

    // console.log("we here: ", props.user)

    return (
        <>
            {props.user && <div className='user-container'>
                <p>Welcome, {props.user?.username}!</p>
                <h3>your messages: </h3>
                {props.user?.messages.length ? props.user.messages.map((msg, index) => (
                <Message key={index} msg={msg}  />

            )) :
                <p>No new Messages</p>}
                <h3>your liked items: </h3>

            </div>}
        </>

    )
}