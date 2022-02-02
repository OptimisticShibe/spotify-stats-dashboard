import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function ArtistSearchResult({ artist }) {
  return (
    <div className="item-bg m-2 shadow">
      <div className="d-flex data-container">
        <img src={artist.imageUrl} alt={artist.artistName} />
        <div className="m-2 text-main">
          <OverlayTrigger placement="top" overlay={<Tooltip id="artist-result-artist-name">{artist.artistName}</Tooltip>}>
            <div>{artist.artistName}</div>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip id="artist-result-genre-name">{artist.genre}</Tooltip>}>
            <div className="text-sub">{artist.genre}</div>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
}
