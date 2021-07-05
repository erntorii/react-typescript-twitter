import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import TweetBox from "./TweetBox";
import "./Feed.css";
import Post from "./Post";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
      text: "",
      image: "",
      timestamp: null,
      avatar: "",
      username: "",
    },
  ]);

  useEffect(() => {
    const unSub = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.data().id,
            text: doc.data().text,
            image: doc.data().image,
            timestamp: doc.data().timestamp,
            avatar: doc.data().avatar,
            username: doc.data().username,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox />
      {posts.map((post) => (
        <Post
          key={post.id}
          postId={post.id}
          text={post.text}
          image={post.image}
          timestamp={post.timestamp}
          avatar={post.avatar}
          username={post.username}
        />
      ))}
    </div>
  );
};

export default Feed;
