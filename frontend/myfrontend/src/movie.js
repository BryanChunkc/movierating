import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import "./movie.css";

function Movie() {
  const [movies, displaymovies] = useState([]);
  const [rating, setrating] = useState();
  const [usernamelogined, setuser] = useState();
  const Image_url = "https://image.tmdb.org/t/p/w200/";
  const history = useHistory();
  const [errormsg, seterror] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/movie", { withCredentials: true })
      .then((res) => {
        if (res.data.loggedin === "false") {
          console.log(res.data.loggedin);
          history.push("/");
        } else {
          console.log(res.data.data.results);
          console.log(res.data.userrated);
          displaymovies(res.data.data.results);
          setuser(res.data.user);
        }
      });
  }, []);

  function HandleClick(event) {
    if (rating > -1 && rating < 6) {
      axios
        .post(
          "http://localhost:3001/rate",
          {
            title: event.title,
            rating: rating,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data.loggedin);
          if (res.data.loggedin === "false") {
            history.push("/");
          } else {
            displaymovies(movies);
            setuser(usernamelogined);
          }
        });
      window.location.reload(false);
    } else {
      seterror("Rating must be 0-5");
    }
  }

  function HandleSignout() {
    axios
      .get("http://localhost:3001/signout", { withCredentials: true })
      .then((res) => {
        if (res.data === "leave") {
          history.push("/");
        }
      });
  }

  return (
    <div className="bg">
      <div className="welcomeMSG">
        Welcome to Movie Rating app! Rate a movie!
      </div>
      <div className="usernameDisplay">Logged in as {usernamelogined}</div>
      <Button onClick={() => HandleSignout()} className="signoutButton">
        Sign Out
      </Button>
      {errormsg && <div className="error">{errormsg}</div>}
      <div className="lbcontainer">
        {movies.length > 0 &&
          movies.map((movie, index) => (
            <div key={index} className="items">
              <img
                className="images"
                src={Image_url + movie.poster_path}
                alt={movie.title}
              />
              <Form className="ratingForm">
                <Form.Group className="ratingC">
                  <Form.Label className="ratingLabel">
                    You rated: {movie.rating || "N/A"}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={movie.userrated}
                    placeholder="Your rating (0-5)"
                    min="0"
                    max="5"
                    onChange={(e) => setrating(e.target.value)}
                    className="ratingBox"
                  ></Form.Control>
                </Form.Group>
                <Button
                  onClick={() => HandleClick(movie)}
                  className="rateButton"
                >
                  Rate
                </Button>
              </Form>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Movie;
