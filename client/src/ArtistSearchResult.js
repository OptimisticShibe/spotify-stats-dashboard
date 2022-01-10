import React from "react";

export default function ArtistSearchResult({ artist }) {
  return (
    <div className="d-flex m-2 align-items-center">
      <img src={artist.imageUrl} style={{ height: "64px", width: "64px" }} alt={artist.artistName} />
      <div className="m-3">
        <div>{artist.artistName}</div>
        <div className="text-muted">{artist.genre}</div>
      </div>
    </div>
  );
}
