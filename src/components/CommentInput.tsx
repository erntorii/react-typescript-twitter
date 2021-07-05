import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import { Avatar, Button } from "@material-ui/core";
import "./CommentInput.css";

const CommentInput = () => {
  const { id } = useParams<Record<string, string | undefined>>();
  const user = useSelector(selectUser);
  const [comment, setComment] = useState("");
  const newComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("posts").doc(id).collection("comments").add({
      avatar: user.photoUrl,
      username: user.displayName,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="commentInput">
      <form onSubmit={newComment}>
        <div className="commentInput__input">
          <Avatar src={user.photoUrl} />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tweet your reply"
            type="text"
          />
        </div>
        <Button
          disabled={!comment}
          type="submit"
          className={
            comment
              ? "commentInput__buttonEnabled"
              : "commentInput__buttonDisabled"
          }
        >
          Reply
        </Button>
      </form>
    </div>
  );
};

export default CommentInput;
