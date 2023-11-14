

export default function UserDetails({userDetails}) {

    return (

        <div className='user-container'>
            <p>account component </p>
            <p>Welcome, {userDetails.username}!</p>
            <h3>your messages: </h3>
            <p>{userDetails.messages}</p>
            <p>liked items:</p>
        </div>

    )
}