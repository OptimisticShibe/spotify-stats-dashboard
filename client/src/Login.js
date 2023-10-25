import React from "react";
import ReactMarkdown from "react-markdown";
import { Button, Container } from "react-bootstrap";
import { demoButton, info1, info2 } from "./constants";
import SpotifyWebApi from "spotify-web-api-node";
import SpotifyWebApiServer from "spotify-web-api-node/src/server-methods";

const SCOPES = ["user-top-read"];
// const SCOPES = ["user-read-private", "user-top-read"];
const CLIENT_ID = "f655ecf166914d6b9ecf6d7abcc91c52";
const SPACE_DELIMETER = "%20";
// const REDIRECT_URI = "http://localhost:3000";
const REDIRECT_URI = "https://topfivetrend.rafiqramadan.com";
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMETER);
const state = Math.random().toString(36).substring(7);
// const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=https://topfivespotify.site&scope=${SCOPES_URL_PARAM}`;
/**
 * TODO: this Auth URL no longer works as of 10.20.23
 *
 * The Spotify-web-api-node package is updated and can now generate the proper URL
 * Server-side, provide scope etc. and then return that url to the login component.
 *
 * @link https://www.npmjs.com/package/spotify-web-api-node
 * @link https://developer.spotify.com/documentation/web-api/tutorials/code-flow
 *
 * Create Auth URL here, no client secret
 * Create Auth Code Grant in server
 */
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}`;

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
          <ReactMarkdown children={info2} className="my-3" />
          <Button variant="secondary" disabled>
            <ReactMarkdown children={demoButton} />
          </Button>
        </div>
      </Container>
    </div>
  );
}
