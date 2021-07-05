import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db, storage } from "../firebase";
import firebase from "firebase/app";
import { v4 as uuid } from "uuid";
import { Avatar, Button } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import "./TweetBox.css";

const TweetBox = () => {
  const user = useSelector(selectUser);
  const [tweetMsg, setTweetMsg] = useState("");
  const [tweetImage, setTweetImage] = useState<File | null>(null);
  const [prevImageUrl, setPrevImageUrl] = useState("");

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setTweetImage(e.target.files![0]);
      setPrevImageUrl(URL.createObjectURL(e.target.files![0]));
      e.target.value = "";
    }
  };

  const clearImageHandler = () => {
    setTweetImage(null);
    setPrevImageUrl("");
  };

  const sendTweet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tweetImage) {
      const fileName = uuid() + "_" + tweetImage.name;
      const uploadTweetImg = storage.ref(`images/${fileName}`).put(tweetImage);
      uploadTweetImg.on(
        "state_changed",
        () => {},
        (err) => {
          alert(err.message);
        },
        () => {
          uploadTweetImg.snapshot.ref.getDownloadURL().then((url) => {
            db.collection("posts").add({
              avatar: user.photoUrl,
              username: user.displayName,
              text: tweetMsg,
              image: url,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          });
        }
      );
    } else {
      db.collection("posts").add({
        avatar: user.photoUrl,
        username: user.displayName,
        text: tweetMsg,
        image: "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setTweetMsg("");
    setTweetImage(null);
    setPrevImageUrl("");
  };

  return (
    <div className="tweetBox">
      <form onSubmit={sendTweet}>
        <div className="tweetBox__input">
          <Avatar src={user.photoUrl} />
          <input
            value={tweetMsg}
            onChange={(e) => setTweetMsg(e.target.value)}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        {prevImageUrl && (
          <div className="tweetBox__image">
            <img alt="tweet" src={prevImageUrl} />
            <span onClick={clearImageHandler}>×</span>
          </div>
        )}
        <div className="tweetBox__button">
          <label>
            <ImageIcon className="tweetBox__icon" />
            <input
              className="tweetBox__hiddenInput"
              type="file"
              onChange={onChangeImageHandler}
            />
          </label>
          <Button
            disabled={!tweetMsg}
            type="submit"
            className={
              tweetMsg ? "tweetBox__buttonEnabled" : "tweetBox__buttonDisabled"
            }
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;
