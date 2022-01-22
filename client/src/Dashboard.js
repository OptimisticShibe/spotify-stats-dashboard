import React from "react";
import FetchSpotifyData from "./FetchSpotifyData";

// Display Results etc
export default function Dashboard({ code }) {
  // const accessToken = useAuth(code);
  return (
    <div className="Primary-Container">
      <FetchSpotifyData code={code} />
    </div>
  );
}
