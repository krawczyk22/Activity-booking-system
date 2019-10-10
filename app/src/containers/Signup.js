import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Signup.css";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setreTypePassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0 && retypePassword.length > 0;
  }

function validatePassword() {
    if(password !== retypePassword)
        alert("Passwords are not matching");
  }

  return (
    <div className="Signup">
      <form onSubmit={validatePassword}>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="retypepassword" bsSize="large">
          <ControlLabel>Retype Password</ControlLabel>
          <FormControl
            value={retypePassword}
            onChange={e => setreTypePassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Sign up
        </Button>
      </form>
    </div>
  );
}