

export default function UserDetails(props) {

    return (

        <div className='user-container'>
            <p>account component </p>
            <p>Welcome, {props.user.username}!</p>
            <h3>your messages: </h3>
            <p>{props.user.messages}</p>
            <p>liked items:</p>
        </div>

    )
}