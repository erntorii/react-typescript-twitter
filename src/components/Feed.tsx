import React from "react";
import { auth } from "../firebase";

const Feed = () => {
  return (
    <div>
      <button onClick={() => auth.signOut()}>Sing Out</button>
    </div>
  );
};

export default Feed;
