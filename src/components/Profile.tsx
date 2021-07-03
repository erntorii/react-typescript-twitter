import React, { useState } from "react";
import { auth, storage } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUserProfile } from "../features/userSlice";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";

import {
  Avatar,
  IconButton,
  TextField,
  Button,
  Typography,
  Box,
  Container,
  makeStyles,
  Link,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  avatarSize: {
    width: "120px",
    height: "120px",
  },
  hiddenInput: {
    textAlign: "center",
    display: "none",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Profile Settings
        </Typography>
        <form className={classes.form} noValidate>
          <Box textAlign="center">
            <IconButton>
              <label>
                <Avatar className={classes.avatarSize} src={prevAvatarUrl} />
                <input
                  type="file"
                  className={classes.hiddenInput}
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
          <Button
            disabled={!username}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() =>
              updateProfile().then(() => alert("Profile updated."))
            }
          >
            Save
          </Button>
          <Link onClick={() => history.goBack()} variant="body2">
            Back
          </Link>
        </form>
      </div>
    </Container>
  );
};

export default Profile;
