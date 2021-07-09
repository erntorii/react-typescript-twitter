import React, { useState } from "react";
import { auth, storage } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUserProfile } from "../features/userSlice";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import "./Profile.css";

import {
  Avatar,
  IconButton,
  TextField,
  Box,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatarSize: {
    width: "120px",
    height: "120px",
  },
  hiddenInput: {
    textAlign: "center",
    display: "none",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [username, SetUsername] = useState(user.displayName);
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [prevAvatarUrl, setPrevAvatarUrl] = useState(user.photoUrl);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      setPrevAvatarUrl(URL.createObjectURL(e.target.files![0]));
      e.target.value = "";
    }
  };

  const updateProfile = async () => {
    let avatarUrl = auth.currentUser?.photoURL ?? "";
    if (avatarImage) {
      auth.currentUser?.photoURL &&
        storage.refFromURL(auth.currentUser?.photoURL).delete();
      const fileName = uuid() + "_" + avatarImage.name;
      await storage.ref(`avatars/${fileName}`).put(avatarImage);
      avatarUrl = await storage.ref(`avatars/${fileName}`).getDownloadURL();
    }
    await auth.currentUser?.updateProfile({
      displayName: username,
      photoURL: avatarUrl,
    });
    dispatch(
      updateUserProfile({
        displayName: username,
        photoUrl: avatarUrl,
      })
    );
  };
  const history = useHistory();

  return (
    <div className="profile">
      <div className="profile__header">
        <button onClick={() => history.goBack()}>←</button>
        <h2>Profile</h2>
      </div>
      <div className="profile__body">
        <Box textAlign="center">
          <IconButton className="profile__iconButton">
            <label>
              <Avatar className={classes.avatarSize} src={prevAvatarUrl} />
              <input
                className={classes.hiddenInput}
                type="file"
                onChange={onChangeImageHandler}
              />
            </label>
          </IconButton>
        </Box>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Username"
          name="username"
          value={username}
          onChange={(e) => SetUsername(e.target.value)}
        />
        <div className="profile__button">
          <button
            className={
              username ? "profile__buttonEnabled" : "profile__buttonDisabled"
            }
            disabled={!username}
            onClick={() =>
              updateProfile().then(() => alert("Profile updated."))
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
