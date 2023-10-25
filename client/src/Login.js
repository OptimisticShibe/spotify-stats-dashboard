import React from "react";
import ReactMarkdown from "react-markdown";
import { Button, Container } from "react-bootstrap";
import { demoButton, info1, info2 } from "./constants";
import SpotifyWebApi from "spotify-web-api-node";
import SpotifyWebApiServer from "spotify-web-api-node/src/server-methods";

const SCOPES = ["user-read-private", "user-top-read"];
const CLIENT_ID = "f655ecf166914d6b9ecf6d7abcc91c52";
const SPACE_DELIMETER = "%20";
const REDIRECT_URI = "http://localhost:3000";
// const REDIRECT_URI = "https://topfivetrend.rafiqramadan.com";
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMETER);
const state = Math.random().toString(36).substring(7);

export default function Login() {
  SpotifyWebApi._addMethods = function (fncs) {
    Object.assign(this.prototype, fncs);
  };
  SpotifyWebApi._addMethods(SpotifyWebApiServer);
  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
  });

  const authorizeURL = spotifyApi.createAuthorizeURL(SCOPES, state);
  return (
    <div>
      <Container className="login-page-container d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "100vh", color: "white" }}>
        <h1 className="p-3">Top 5 Trend</h1>
        <div className="login-page-text">
          <ReactMarkdown children={info1} className="my-3" />
          <a className="btn btn-success btn-lg m-3" href={authorizeURL}>
            Login With Spotify
          </a>
          {/* <ReactMarkdown children={info2} className="my-3" />
          <Button variant="secondary" disabled>
            <ReactMarkdown children={demoButton} />
          </Button> */}
        </div>
      </Container>
    </div>
  );
}
