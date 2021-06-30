import React, { useState } from "react";
import { auth, storage } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUserProfile } from "../features/userSlice";
import { v4 as uuid } from "uuid";

import {
  Avatar,
  IconButton,
  TextField,
  Button,
  Typography,
  Container,
} from "@material-ui/core";

const Profile = () => {
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
    let avatarUrl = "";
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

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5">
        Update Profile
      </Typography>
      <IconButton>
        <label>
          <Avatar src={prevAvatarUrl} />
          <input type="file" onChange={onChangeImageHandler} />
        </label>
      </IconButton>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Username"
        name="username"
        value={username}
        onChange={(e) => SetUsername(e.target.value)}
      />
      <Button fullWidth color="primary" onClick={updateProfile}>
        Save
      </Button>
    </Container>
  );
};

export default Profile;
