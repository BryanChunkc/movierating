import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./signup.css";

export default function Signup() {
  const [username, setusername] = useState("");
  const [pw, setpw] = useState("");
  const history = useHistory();
  const [errormsg, seterror] = useState("");

  function HandleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:3001/signup", { username: username, pw: pw })
      .then((res) => {
        if (res.data.allow === "true") {
          history.push("/");
        } else if (res.data.allow === "false") {
          console.log("not in");
          seterror("Username registered or cannot be blank!");
        }
      }, []);
  }

  return (
    <div className="suPage">
      <a href="/" className="backButton">
        ❮ Back
      </a>
      <div className="signupForm">
        <h1 className="signupTitle">Sign up to rate!</h1>
        <Form onSubmit={HandleSubmit}>
          <Form.Group className="suformContainer suc1">
            <Form.Label className="labels">Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="suinputBox"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="suformContainer suc2">
            <Form.Label className="labels">Password</Form.Label>
            <Form.Control
              type="password"
              value={pw}
              onChange={(e) => setpw(e.target.value)}
              className="suinputBox"
            ></Form.Control>
          </Form.Group>
          <Button type="submit" className="susubmitButton">
            Signup
          </Button>
        </Form>
        {errormsg && (
          <div className="error" style={{ color: "aqua" }}>
            {errormsg}
          </div>
        )}
      </div>
    </div>
  );
}
