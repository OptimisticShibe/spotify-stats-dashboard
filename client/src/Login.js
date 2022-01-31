import React from "react";
import ReactMarkdown from "react-markdown";
import { Button, Container } from "react-bootstrap";

const SCOPES = ["user-read-private", "user-top-read"];
const CLIENT_ID = "f655ecf166914d6b9ecf6d7abcc91c52";
const SPACE_DELIMETER = "%20";
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMETER);
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=${SCOPES_URL_PARAM}`;

export default function Login() {
  const info1 = `
  ---

  ##### See your top 5 Spotify Tracks & Artists across time with this simple app`;

  const info2 = `
  **Don't have a Spotify account?**`;

  const demoButton = `
  **Demo Page**
  
  (Under Construction)
  `;

  const credits = `
  created by **Rafiq Ramadan** | See the code on [github](https://github.com/OptimisticShibe/spotify-stats-dashboard)
  `;

  return (
    <div style={{ backgroundColor: "#282c34" }}>
      <Container className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "100vh", color: "white" }}>
        <h1 className="p-3">Top 5 Spotify</h1>
        <div className="login-page-text">
          <ReactMarkdown children={info1} className="my-3" />
          <a className="btn btn-success btn-lg m-3" href={AUTH_URL}>
            Login With Spotify
          </a>
          <ReactMarkdown children={info2} className="my-3" />
          <Button variant="secondary" disabled>
            <ReactMarkdown children={demoButton} />
          </Button>
        </div>

        <div className="login-page-credits">
          <ReactMarkdown children={credits} className="my-4" />
        </div>

        {/* <div className="d-flex align-items-center">
          Star Icon Was Here™️
          <p className="p-3">Text goes here</p>
        </div> */}
      </Container>
    </div>
  );
}
