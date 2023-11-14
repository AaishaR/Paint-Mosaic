

export default function Message(props) {

    return (
        <div className="message-container">
            <p>From: {props.msg.sender}</p>
            <p>Message: {props.msg.msg}</p>

        </div>

    )
}