import React from "react";
import { Avatar } from "@material-ui/core";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  Publish,
  Repeat,
} from "@material-ui/icons";
import "./Post.css";

type Props = {
  postId: string;
  text: string;
  image: string;
  timestamp: any;
  avatar: string;
  username: string;
};

const Post = ({ text, image, timestamp, avatar, username }: Props) => {
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={avatar} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {username}{" "}
              <span className="post__headerTime">
                {new Date(timestamp?.toDate()).toLocaleString()}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{text}</p>
          </div>
        </div>
        {image && (
          <div className="post__tweetImage">
            <img src={image} alt="tweet" />
          </div>
        )}
        <div className="post__footer">
          <ChatBubbleOutline fontSize="small" />
          <Repeat fontSize="small" />
          <FavoriteBorder fontSize="small" />
          <Publish fontSize="small" />
        </div>
      </div>
    </div>
  );
};

export default Post;
