import React from "react";
import { Container } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

const SCOPES = ["user-read-private", "user-top-read"];
const CLIENT_ID = "f655ecf166914d6b9ecf6d7abcc91c52";
const SPACE_DELIMETER = "%20";
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMETER);
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=${SCOPES_URL_PARAM}`;

export default function Login() {
  const handleLogin = () => {
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });
    const authorizeURL = spotifyApi.createAuthorizeURL();
  };

  return (
    <div style={{ backgroundColor: "#282c34" }}>
      <Container className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "100vh", color: "white" }}>
        <h1 className="p-3">Spotify Top Artists/Tracks Visualizer</h1>
        <a className="btn btn-success btn-lg m-3" href={AUTH_URL}>
          Login With Spotify
        </a>
        <div className="d-flex align-items-center">
          Star Icon Was Here™️
          <p className="p-3">Text goes here</p>
        </div>
      </Container>
    </div>
  );
}
