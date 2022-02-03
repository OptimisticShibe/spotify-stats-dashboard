import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function TrackSearchResult({ track }) {
  return (
    <a href={track.trackLink} rel="noreferrer" target="_blank" className="spotify-content-link">
      <div className="item-bg m-2 shadow">
        <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" className="spotify-content-link-icon-desktop  d-none d-md-block" />
        <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" className="spotify-content-link-icon-mobile d-md-none d-xs-block" />
        <div className="d-flex data-container">
          <OverlayTrigger placement="top" overlay={<Tooltip id="track-result-spotify-link">{track.title} on Spotify</Tooltip>}>
            <img src={track.albumUrl} alt={track} className="result-image"></img>
          </OverlayTrigger>
          <div className="m-3 text-main">
            <OverlayTrigger placement="top" overlay={<Tooltip id="track-result-track-name">{track.title}</Tooltip>}>
              <div>{track.title}</div>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="track-result-artist-name">{track.artist}</Tooltip>}>
              <div className="text-sub">{track.artist}</div>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </a>
  );
}
