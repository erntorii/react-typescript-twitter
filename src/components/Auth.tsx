import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Container,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { auth, provider } from "../firebase";
import firebase from "firebase/app";
import "firebase/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Auth = () => {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);

  const signInEmail = async () => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
  };
  const signUpEmail = async () => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
  };

  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };
  const signInAnonymous = async () => {
    await auth.signInAnonymously().catch((err) => alert(err.message));
  };

  const session = async () => {
    await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  };
  const local = async () => {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  };
  !isRemember ? session() : local();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? "Sign in" : "Sign up"}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={() => setIsRemember(!isRemember)}
              />
            }
            label="Remember me"
          />
          <Button
            disabled={email === "" || password === ""}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={isLogin ? signInEmail : signUpEmail}
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signInGoogle}
          >
            SignIn with Google
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signInAnonymous}
          >
            SignIn as a Guest
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Create new account ?" : "Back to Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Auth;
