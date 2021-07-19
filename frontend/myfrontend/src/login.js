import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./login.css";

export default function Login() {
  const [username, setusername] = useState("");
  const [pw, setpw] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:3001/test", { withCredentials: true })
      .then((res) => {
        if (res.data.loggedin === "true") {
          history.push("/movie");
        }
      });
  }, []);

  function HandleSubmit() {
    //event.preventDefault();
    // useEffect(() => {
    axios
      .post(
        "http://localhost:3001/login",
        { username: username, pw: pw },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.loggedin === "true") {
          history.push("/movie");
        } else {
          console.log(res.data.ver);
          if (res.data.ver === "true") {
            history.push("/movie");
          } else if (res.data.ver === "false") {
            console.log("not in");
          }
        }
      });
    // }, []);
  }

  return (
    <div className="content">
      <div className="parallax section1 bg1">
        <a className="signInJump" href="/signup">
          Signup
        </a>
        <h1 className="imgTitle">
          “We don’t make movies to make more money. We make money to make more
          movies.” <span className="authorname">- Walt Disney</span>
        </h1>
        <div className="scrollDown">▼ SCROLL DOWN TO RATE MOVIES! ▼</div>
      </div>
      <div className="static">
        <h1 className="comment">Movie Rating App</h1>
      </div>
      <div className="parallax section2 bg2">
        <div className="loginForm">
          <div className="formTitle">Welcome</div>
          <div className="formSub">Log in to rate movies!</div>
          <Form onSubmit={HandleSubmit}>
            <Form.Group className="formContainer c1">
              <Form.Label className="label">Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="inputBox"
              ></Form.Control>
            </Form.Group>
            <Form.Group className="formContainer c2">
              <Form.Label className="label">Password</Form.Label>
              <Form.Control
                type="password"
                value={pw}
                onChange={(e) => setpw(e.target.value)}
                className="inputBox"
              ></Form.Control>
            </Form.Group>
            <Button type="submit" className="submitButton">
              Login
            </Button>
          </Form>
          <h3>
            Wanna rate?
            <a href="/signup" className="signUp">
              Signup!
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
}
