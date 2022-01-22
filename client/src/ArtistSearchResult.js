import React from "react";

export default function ArtistSearchResult({ artist }) {
  return (
    <div className="item-bg m-2 shadow">
      <div className="d-flex data-container">
        <img src={artist.imageUrl} alt={artist.artistName} />
        <div className="m-3 text-main">
          <div>{artist.artistName}</div>
          <div className="text-sub">{artist.genre}</div>
        </div>
      </div>
    </div>
  );
}
