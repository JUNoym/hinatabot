import React from "react"
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoProfile from "../assets/img/no-profile.png"
import HINATA from "../assets/img/wataten.png"


const Chat = (props) => {
    const IsQuestion = (props.type === "question")
    const classes = IsQuestion ? "bot" : "user"

    return (
        <ListItem className={classes}>
            <ListItemAvatar>
                {IsQuestion ? (
                    <Avatar alt="icon" src={HINATA} />
                ) : (
                        <Avatar alt="icon" src={NoProfile} />
                    )}
            </ListItemAvatar>
            <div className="chat-question">{props.text}</div>
        </ListItem>
    )
}

export default Chat