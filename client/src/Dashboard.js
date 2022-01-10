import React from "react";
import useAuth from "./useAuth";
import { Container } from "react-bootstrap";
import FetchSpotifyData from "./FetchSpotifyData";
import UserDisplay from "./UserDisplay";
import TrackSearchResult from "./TrackSearchResult";

// Display Results etc
export default function Dashboard({ code }) {
  // const accessToken = useAuth(code);
  return (
    <Container>
      <FetchSpotifyData code={code} />
    </Container>
  );
}
