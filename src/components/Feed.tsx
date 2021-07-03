import React from "react";
import { auth } from "../firebase";
import TweetBox from "./TweetBox";

const Feed = () => {
  return (
    <div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
      <TweetBox />
    </div>
  );
};

export default Feed;
