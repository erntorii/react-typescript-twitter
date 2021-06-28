import React, { useState } from "react";
import { auth } from "../firebase";
import { Input, Button, Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const ResetPassword = () => {
  const [resetEmail, setResetEmail] = useState("");
  const sendPasswordResetEmail = async () => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        alert("パスワード再設定メールを送信しました。");
        setResetEmail("");
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
  };
  const history = useHistory();

  return (
    <div>
      <h2>Reset Password</h2>
      <Input
        type="text"
        value={resetEmail}
        onChange={(e) => setResetEmail(e.target.value)}
      />
      <Button onClick={sendPasswordResetEmail}>Send</Button>
      <Link onClick={() => history.goBack()} variant="body2">
        Back
      </Link>
    </div>
  );
};

export default ResetPassword;
