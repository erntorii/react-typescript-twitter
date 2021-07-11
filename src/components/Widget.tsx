import { Search } from "@material-ui/icons";
import { Tweet, Timeline, Share } from "react-twitter-widgets";

import "./Widget.css";

const Widgets = () => (
  <div className="widgets">
    <div className="widgets__input">
      <Search className="widgets__searchIcon" />
      <input placeholder="Search Twitter" type="text" />
    </div>

    <div className="widgets__widgetContainer">
      <h2>What's happening</h2>
      <Tweet tweetId="1402320383932502021" />
      <Timeline
        dataSource={{ sourceType: "profile", screenName: "reactjs" }}
        options={{ height: "400" }}
      />
      <Share
        url="https://qiita.com/reactjs"
        options={{ text: "React Developer" }}
      />
    </div>
  </div>
);

export default Widgets;
