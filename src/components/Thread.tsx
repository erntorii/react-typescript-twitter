import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../firebase";
import { Avatar } from "@material-ui/core";
import "./Thread.css";
import CommentInput from "./CommentInput";
import Comment from "./Comment";

type COMMENT = {
  id: string;
  avatar: string;
  username: string;
  text: string;
  timestamp: any;
};

const Tweet = () => {
  const { id } = useParams<Record<string, string | undefined>>();
  const history = useHistory();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [timestamp, setTimestamp] = useState<any | null>(null);
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [comments, setComments] = useState<COMMENT[]>([
    {
      id: "",
      avatar: "",
      username: "",
      text: "",
      timestamp: null,
    },
  ]);

  useEffect(() => {
    db.collection("posts")
      .doc(id)
      .get()
      .then((doc) => {
        setText(doc.data()!.text);
        setImage(doc.data()!.image);
        setTimestamp(doc.data()!.timestamp);
        setAvatar(doc.data()!.avatar);
        setUsername(doc.data()!.username);
      })
      .catch((err) => {
        alert(err.mesage);
      });

    db.collection("posts")
      .doc(id)
      .collection("comments")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            username: doc.data().username,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
          }))
        )
      );
  }, [id]);

  return (
    <div className="thread">
      <div className="thread__pageTitle">
        <button onClick={() => history.push("/")}>←</button>
        <h2>Thread</h2>
      </div>
      <div className="thread__box">
        <div className="thread__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="thread__body">
          <div className="thread__header">
            <div className="thread__headerText">
              <h3>
                {username}{" "}
                <span className="thread__headerTime">
                  {new Date(timestamp?.toDate()).toLocaleString()}
                </span>
              </h3>
            </div>
            <div className="thread__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          {image && (
            <div className="thread__tweetImage">
              <img src={image} alt="tweet" />
            </div>
          )}
        </div>
      </div>
      <CommentInput />
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          avatar={comment.avatar}
          username={comment.username}
          text={comment.text}
          timestamp={comment.timestamp}
        />
      ))}
    </div>
  );
};

export default Tweet;
