import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";
import { Avatar, Button } from "@material-ui/core";
import "./TweetBox.css";

const TweetBox = () => {
  const user = useSelector(selectUser);
  const [tweetImage, setTweetImage] = useState("");
  const [tweetMsg, setTweetMsg] = useState("");

  const sendTweet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("posts").add({
      username: "happystark",
      displayName: "Atharva Deosthale",
      avatar:
        "https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-1/c0.33.200.200a/p200x200/51099653_766820610355014_8315780769297465344_o.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=c1qBHkwAgVsAX8KynKU&_nc_ht=scontent-bom1-1.xx&oh=340b05bea693dd1671296e0c2d004bb3&oe=5F84CA62",
      verified: true,
      text: tweetMsg,
      image: tweetImage,
    });

    setTweetMsg("");
    setTweetImage("");
  };

  return (
    <div className="tweetBox">
      <form onSubmit={sendTweet}>
        <div className="tweetBox__input">
          <Avatar src="https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-1/c0.33.200.200a/p200x200/51099653_766820610355014_8315780769297465344_o.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=c1qBHkwAgVsAX8KynKU&_nc_ht=scontent-bom1-1.xx&oh=340b05bea693dd1671296e0c2d004bb3&oe=5F84CA62" />
          <input
            value={tweetMsg}
            onChange={(e) => setTweetMsg(e.target.value)}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <input
          placeholder="Optional: Enter image URL"
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          type="text"
          className="tweetBox__imageInput"
        />
        <Button type="submit" className="tweetBox__button">
          Tweet
        </Button>
      </form>
    </div>
  );
};

export default TweetBox;
