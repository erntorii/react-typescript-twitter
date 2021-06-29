import React from "react";
import { auth } from "../firebase";
import Sidebar from "./Sidebar";

const Feed = () => {
  return (
    <div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
      <Sidebar />
    </div>
  );
};

export default Feed;
