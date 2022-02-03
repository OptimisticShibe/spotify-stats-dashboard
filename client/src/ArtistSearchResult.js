import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function ArtistSearchResult({ artist }) {
  return (
    <a href={artist.artistLink} rel="noreferrer" target="_blank" className="spotify-content-link">
      <div className="item-bg m-2 shadow">
        <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" className="spotify-content-link-icon-desktop d-none d-md-block" />
        <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" className="spotify-content-link-icon-mobile d-md-none d-xs-block" />
        <div className="d-flex data-container">
          <img src={artist.imageUrl} alt={artist.artistName} className="result-image" />

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
    </a>
  );
}
