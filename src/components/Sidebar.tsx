import React, { useState } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button, Avatar, Menu, MenuItem } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { auth } from "../firebase";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();
  const location = useLocation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderProfile = () => {
    history.push("/profile");
    setAnchorEl(null);
  };

  const renderSignOut = () => {
    auth.signOut();
    history.push("/");
  };

  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />
      <SidebarOption
        Icon={<HomeIcon />}
        text="Home"
        active={location.pathname === "/"}
        home={true}
      />
      <SidebarOption Icon={<SearchIcon />} text="Explore" />
      <SidebarOption Icon={<NotificationsNoneIcon />} text="Notifications" />
      <SidebarOption Icon={<MailOutlineIcon />} text="Messages" />
      <SidebarOption Icon={<BookmarkBorderIcon />} text="Bookmarks" />
      <SidebarOption Icon={<ListAltIcon />} text="Lists" />
      <SidebarOption Icon={<PermIdentityIcon />} text="Profile" />
      <SidebarOption Icon={<MoreHorizIcon />} text="More" />

      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>

      <div className="sidebar__user">
        <Button
          size="large"
          style={{ justifyContent: "flex-start" }}
          startIcon={<Avatar src={user.photoUrl} />}
          fullWidth
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {user.displayName}
        </Button>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={renderProfile}>Profile</MenuItem>
          <MenuItem onClick={renderSignOut}>Sign Out</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
