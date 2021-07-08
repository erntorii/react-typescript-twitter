import React from "react";
import { Avatar } from "@material-ui/core";
import "./Comment.css";

type Props = {
  avatar: string;
  username: string;
  text: string;
  timestamp: any;
};

const Comment = ({ avatar, username, text, timestamp }: Props) => {
  return (
    <div className="comment">
      <div className="comment__avatar">
        <Avatar src={avatar} />
      </div>
      <div className="comment__body">
        <div className="comment__header">
          <div className="comment__headerText">
            <h3>
              {username}{" "}
              <span className="comment__headerTime">
                {new Date(timestamp?.toDate()).toLocaleString()}
              </span>
            </h3>
          </div>
          <div className="comment__headerDescription">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
